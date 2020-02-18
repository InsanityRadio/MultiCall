'use strict';

const client = require('ari-client');
const util = require('util');
const WebSocket = require('ws');

let ARI;

const CallerReadyState = {
	EMPTY: 0,
	NEW: 1,
	ANSWERED: 2,
	BLOCKED: 4,
	SCREENED: 8,
	ONAIR: 16,
	FINISHED: 32
}

class CallerMap {
	constructor (extension, name) {
		this.extension = extension;
		this.name = name || ('Line ' + (extension % 100))

		this.channel = null;
		this.answered = false;

		this.readyState = CallerReadyState.EMPTY;
	}

	setChannel (channel) {
		console.log('CallerMap ' + this.extension + ' - setting channel' + channel.id)
		this.channel = channel;
		this.answered = false;

		this.readyState = CallerReadyState.NEW;
	}

	setTimeout (length, handler) {
		this.clearTimeout();
		this.timeout = setTimeout(handler, length);
	}

	clearTimeout () {
		clearTimeout(this.timeout)
	}

	dump () {
		if (!this.channel) {
			return false;
		}

		if (this.route) {
			this.route.dumpIncoming();
		}

		this.channel.hangup();
		this.channel = null;
		this.readyState = CallerReadyState.EMPTY;
	}

	setRoute (route) {
		this.route = route;

		this.answered = true; // if we're calling setRoute (null) we've called setRoute (line) before so the call has been answered
		if (route && route.isOnAir) {
			this.readyState = route ? CallerReadyState.ONAIR : CallerReadyState.FINISHED;
		} else {
			this.readyState = route ? CallerReadyState.ANSWERED : CallerReadyState.SCREENED;
		}
	}

	get remote () {
		if (!this.channel) {
			return null;
		}

		return this.channel.caller.number;
	}

	toJSON () {
		const { extension, name, remote, channel, answered, readyState } = this;
		return {
			extension, name, remote,
			channel: !!channel,
			connected: !!channel,
			readyState,
			routed_to: this.route && this.route.extension,
			routed_to_handler: this.route && this.route.handler,
			answered
		}
	}
}

class RouteMap extends CallerMap {
	constructor (extension, handler, name, isOnAir, colour) {
		super(extension, name[0])
		this.handler = handler;
		this.ref = name[1];
		this.isOnAir = !!isOnAir;
		this.colour = colour;
	}

	offline () {
		this.bridge && this.bridge.destroy();
		this.bridge = null;

		this.CALL && this.CALL.hangup();
		this.CALL = null;
	}

	setBridge (bridge) {
		this.bridge = bridge;
	}

	setCall (call) {
		// this.CALL = call;
	}

	acceptCall (call) {
		this.CALL && this.dumpIncoming();

		this.CALL = call;
		this.CALL.setRoute(this);

		console.log('RouteMap', this.extension, ': adding', call.channel.id, 'to bridge', this.bridge.id)
		this.bridge.addChannel({ channel: this.CALL.channel.id })
	}

	async dumpIncoming () {
		let resp = this.CALL && this.bridge.removeChannel({ channel: this.CALL.channel.id }, (err) => null)
		this.CALL.setRoute(null);
		this.CALL = null;
		await resp;
		return true;
	}

	toJSON () {
		return Object.assign({}, super.toJSON(), {
			bridge: !!this.bridge,
			connected: !!this.CALL,
			colour: this.colour,
			ref: this.ref,
			remote: this.CALL && this.CALL.remote,
			routed_to: this.CALL && this.CALL.extension,
			routed_to_handler: undefined,
			answered: undefined
		})
	}
}

const ROUTE_MAP = {
	5000: new RouteMap(5000, 5100, ['Operator', 'O'], false, '#8E48C3'),
	5001: new RouteMap(5001, 5101, ['1A Phone 1', '1'], true, '#ef8930'),
	5002: new RouteMap(5002, 5102, ['1A Phone 2', '2'], true, '#7dc348')
}

const CALLER_MAP = {
	6001: new CallerMap(6001),
	6002: new CallerMap(6002),
	6003: new CallerMap(6003),
	6004: new CallerMap(6004),
	6005: new CallerMap(6005),
	6006: new CallerMap(6006)
}

const EXTENSION_MAP = {};

async function acceptCall (extension, internal) {
	extension = parseInt(extension);
	internal = parseInt(internal);

	if (!CALLER_MAP[extension]) {
		console.log('failed to accept call for extension', extension)
		return false;
	}

	const entry = CALLER_MAP[extension];

	entry.clearTimeout();

	if (internal != null) {
		// user wants to *answer* the call (hopefully off air) - route the call to an incoming phone
		// console.log('accept?', await ARI.channels.redirect({ channelId: entry.channel.id, endpoint: 'SIP/' + internal }))

		/* await ARI.channels.continueInDialplan({
			channelId: entry.channel.id,
			extension: internal,
			priority: 1
		}) */

		// create bridge between channels 6001 and 5000 and store it in ROUTE_MAP 

		let bridges = await ARI.bridges.list();

		console.log('got bridges', bridges);

		entry.channel.answer();

		if (!ROUTE_MAP[internal].channel || !ROUTE_MAP[internal].bridge) {
			console.log("cannot answer call because internal route isn't online")
			return;
		}

		const bridge = ROUTE_MAP[internal].bridge;

		/* entry.channel.answer(function (err) {
			if (err) {
				console.log('error answering call', err)
				dumpCall(extension);
				return;
			}

			/* bridge.addChannel({ channel: entry.channel.id }, function (err) {
				if (err) {
					// throw err;
					console.log('i have an error!', err)
				}
			}) * /
		}) */

		// if someone else has already answered this call, at this stage we want to steal the call from them
		if (entry.route) {
			entry.route.dumpIncoming();
		}

		ROUTE_MAP[internal].acceptCall(entry);

		/* entry.bridge = true;
		entry.remote = internal;

		entry.destination = internal;
		entry.answered = false; */
	} else {
		await entry.channel.accept();
		entry.answered = true;
	}

	sendState();
	return true;
}

async function dumpCall (extension, internal) {
	if (!CALLER_MAP[extension]) {
		console.log('failed to dump call for extension', extension)
		return false;
	}

	const entry = CALLER_MAP[extension];

	ROUTE_MAP[internal] && ROUTE_MAP[internal].dumpIncoming();
	entry.dump();
}

function serializeMap (map) {
	return Object.keys(map).map((key) => serializeChannel(map[key], key))
}

function serializeChannel (entry, key) {

	return entry && entry.toJSON();

	// old 

	let rawChannel = entry && entry.channel;
	return rawChannel ? Object.assign({}, entry, {
		timeout: null,
		bridge: !!entry.bridge,
		channel: {
			name: rawChannel.name,
			id: rawChannel.id,
			state: rawChannel.state,
			caller: rawChannel.caller,
			connected: rawChannel.connected,
			dialplan: rawChannel.dialplan,
			creationtime: rawChannel.creationtime
		}
	}) : {
		extension: key,
		connected: false,
		remote: null,
		destination: null,
		answered: false
	}
}

async function sendState (ws) {
	let message = JSON.stringify({
		type: 'state',
		handsets: serializeMap(ROUTE_MAP),
		lines: serializeMap(CALLER_MAP)
	})

	ws ? ws.send(message) : wss.clients.forEach((ws) => ws.readyState == WebSocket.OPEN && ws.send(message));
}

// replace ari.js with your Asterisk instance
client.connect('http://134.219.89.3:8088', 'multicall', 'NQ5oxpeFFxNDqwACPH0hTE',
	async function(err, ari) {

		console.log('we are connected')

		ARI = ari;

		// Use once to start the application
		ari.on('StasisStart', async (event, incoming) => {

			const extension = incoming.dialplan.exten.replace('_', '')

			console.log('incoming call on extension', extension)

			EXTENSION_MAP[incoming.id] = extension;


			if (event.application == 'multicall-site') {

				let ext = String(parseInt(extension) - 100);

				if (ROUTE_MAP[ext] == null) {
					return;
				}

				ROUTE_MAP[ext].setChannel(incoming)

				/* ROUTE_MAP[ext] = Object.assign({}, ROUTE_MAP[ext], {
					channel: incoming,
					remote: incoming.caller.number,
					extension: ext,
					answered: false,
					destination: null,
					startTime: null
				}) */

				incoming.answer();

				let entry = ROUTE_MAP[ext];

				if (!entry.bridge) {
					entry.setBridge(await ARI.bridges.create({ type: ['mixing', 'proxy_media'] }));
				}

				entry.bridge.addChannel({ channel: incoming.id });

				console.log('created new bridge for call', entry.bridge.id, ', adding channel', incoming.id)

				sendState();

				return;
			}

			

			EXTENSION_MAP[incoming.id] = extension;

			// hang up after 30s if there is no answer from client app
			CALLER_MAP[extension].setTimeout(30000, () => incoming.hangup());

			//incoming.answer((e) => {
				/* var playback = ari.Playback();
				incoming.play({media: 'sound:queue-thankyou'}, playback, (err) => {
					err && console.log('there was an error', err)
				}); */

				CALLER_MAP[extension].setChannel(incoming)
			//	sendState();
			//});


			sendState();

		});

		ari.on('StasisEnd', async (event, channel) => {
			//const extension = channel.dialplan.exten.replace('_', '');

			const extension = EXTENSION_MAP[channel.id];

			console.log('call terminated on', extension)

			if (extension == undefined) {
				console.log('there is still a call from a previous instance of multicall. this should be dropped.')
			}

			if (event.application == 'multicall-site') {
				if (extension && !isNaN(parseInt(extension))) {
					let adj = String(parseInt(extension) - 100);

					ROUTE_MAP[adj] && ROUTE_MAP[adj].offline();
					console.log(extension, 'is now unavailable')
				}
				return;
			}

			let entry = CALLER_MAP[extension];
			entry && entry.clearTimeout();
			entry && entry.dump();

			/* for (var i in ROUTE_MAP) {
				if (ROUTE_MAP[i] && ROUTE_MAP[i].extension == extension) {
					ROUTE_MAP[i] = Object.assign({}, ROUTE_MAP[i], {
						channel: incoming,
						connected: true,
						remote: incoming.caller.number,
						extension: ext,
						answered: false,
						destination: null,
						startTime: null
					})
				}
			} */

			sendState();

		});

		/**
		 *  Register playback dtmf events to control playback.
		 *
		 *  @function registerDtmfListeners
		 *  @memberof playback-example
		 *  @param {Error} err - error object if any, null otherwise
		 *  @param {module:resources~Playback} playback - the playback object to
		 *    control
		 *  @param {module:resources~Channel} incoming - the incoming channel
		 *    responsible for playing and controlling the playback sound
		 */
		function registerDtmfListeners(err, playback, incoming) {
			incoming.on('ChannelDtmfReceived', function () { } );
		}

		// can also use ari.start(['app-name'...]) to start multiple applications
		ari.start(['multicall', 'multicall-site']);

		let bridges = await ari.bridges.list();
		bridges.forEach((b) => console.log('destroyed bridge', b.destroy()))

	}
);

const wss = new WebSocket.Server({
	port: process.env.PORT || 8580
})

wss.on('connection', (ws) => {
	console.log('connected web client')

	sendState(ws);

	ws.on('message', async (message) => {
		console.log('received message from client', message)

		let data = JSON.parse(message), retval;

		switch (data.type) {
			case 'answer':
				console.log('Answering line', data.line, 'on phone', data.destination);
				retval = await acceptCall(data.line, data.destination);
				break;
			case 'dump':
				console.log('Dumping line', data.line)
				retval = await dumpCall(data.line);
				break;
			case 'park':
				console.log('Parking line ', data.line, 'which is on phone', data.destination);
				retval = await CALLER_MAP[data.line].route.dumpIncoming();
				sendState();
				break;
		}

		ws.send(JSON.stringify({
			type: data.type,
			id: data.id,
			result: retval
		}))
	})
})
