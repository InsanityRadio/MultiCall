import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ActionButton, Customizer, createTheme, PrimaryButton, Dialog, ComboBox, IconButton, DefaultButton, Toggle, Dropdown, Text } from 'office-ui-fabric-react/lib';

import CallerReadyState from './CallerReadyState';

import Handsets from './Handsets';
import Incoming from './Incoming.jsx';
import MediaDropdown from './MediaDropdown';

import Setup from './Setup';

const dark = {
	settings: {
		theme: createTheme({
			palette: {
				neutralLighterAlt: '#282828',
				neutralLighter: '#313131',
				neutralLight: '#3f3f3f',
				neutralQuaternaryAlt: '#484848',
				neutralQuaternary: '#4f4f4f',
				neutralTertiaryAlt: '#6d6d6d',
				neutralTertiary: '#c8c8c8',
				neutralSecondary: '#d0d0d0',
				neutralPrimaryAlt: '#dadada',
				neutralPrimary: '#ffffff',
				neutralDark: '#f4f4f4',
				black: '#f8f8f8',
				white: '#1f1f1f',
				themePrimary: '#fff',
				themeLighterAlt: '#020609',
				themeLighter: '#091823',
				themeLight: '#112d43',
				themeTertiary: '#235a85',
				themeSecondary: '#3385c3',
				themeDarkAlt: '#4ba0e1',
				themeDark: '#65aee6',
				themeDarker: '#8ac2ec',
				accent: '#3a96dd'
			}
		})
	}
}

const SERVER = 'sip.insn.it';
const WS_HOST = 'wss://sip.insn.it/ws';
const EXT = '6000';

const SIPml = window.SIPml;

class App extends React.Component {

	handsets = {};

	state = {
		isSIPClient: false,
		handsets: [],
		lines: []
	}

	componentDidMount () {
		this.setState({
			CONFIG: localStorage.getItem('MCSETTINGS') && JSON.parse(localStorage.getItem('MCSETTINGS'))
		}, () => this.connect())
	}

	connect () {
		this.setState({
			handset: this.state.handsets.find((h) => this.isLocal(h.extension)),
		}, () => {
			this.connectToBackend();
			// this.connectToSIP();
		})
	}

	connectToBackend () {
		let socket = this.webSocket = new WebSocket(WS_HOST);

		let ready = false;

		socket.onopen = () => {
			console.log('!! CONNECTED TO BE')
		}

		socket.onclose = () => {
			this.connectToBackend();
		}

		socket.onmessage = (message) => {
			let data = JSON.parse(message.data);
			console.log('BE MESSAGE !!', data)

			if (data.type != 'state') {
				return;
			}

			this.setState((oldState) => {
				let newState = Object.assign({}, oldState);

				const handsets = oldState.handsets.slice(0);
				for (var i in data.handsets) {
					handsets[i] = Object.assign({}, handsets[i], data.handsets[i], {
						local: this.isLocal(data.handsets[i].extension)
					});
				}

				const lines = oldState.lines.slice(0);
				for (var i in data.lines) {
					lines[i] = Object.assign({}, lines[i], data.lines[i]);
				}

				return {
					handsets,
					lines
				}
			}, () => {
				if (ready == true || this.state.handsets.length == 0) {
					return;
				}
				ready = true;
				this.connectToSIP();
			})
		}
	}

	connectToSIP () {

		if (!this.state.CONFIG) {
			// we don't have a local configuration profile, show wizard
			this.setState({
				blocking: 'setup'
			})
			return;
		}

		this.setState({
			handset: this.state.handsets.find((h) => this.isLocal(h.extension)),
		})

		SIPml.init((e) => {
			// create the public routing stack
			// and log into every LOCAL handset

			if (window.location.search.toLowerCase().indexOf('sip_stack_client') < 0) {
				return;
			}

			this.setState({
				isSIPClient: true
			})

			let h = { id: EXT, isDefault: true }

			var stack = this.stack = new SIPml.Stack({
				realm: SERVER,
				impi: EXT,
				impu: 'sip:' + EXT + '@' + SERVER + ':5060',
				websocket_proxy_url: 'wss://' + SERVER + ':8089/ws',
				password: 'FB8C005A87',
				events_listener: { events: '*', listener: (e) => this.onSipEvent(h, stack, e) }
			});
			// stack.start();


			this.state.handsets.filter((a) => this.isLocal(a.extension)).map((h) => {
				var stack = new SIPml.Stack({
					realm: SERVER,
					impi: String(5000), //  String(h.extension),
					impu: 'sip:5000@' + SERVER + ':5060',
					websocket_proxy_url: 'wss://' + SERVER + ':8089/ws',
					password: 'FB8C005A87',
					events_listener: { events: '*', listener: (e) => this.onSipEvent(h, stack, e) }
				});
				this.handsets[h.id] = stack;
				stack.start();
			});

		});
	}

	isLocal (extension) {
		return this.state.CONFIG && this.state.CONFIG[extension] && this.state.CONFIG[extension].enabled
	}

	findExtension () {
		return 'sip:6000@' + SERVER;
	}

	setExtensionState (extension, busy) {
		var contentType = 'application/pidf+xml';
		let content = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n' +
			'<presence xmlns=\"urn:ietf:params:xml:ns:pidf\"\n' +
			' xmlns:im=\"urn:ietf:params:xml:ns:pidf:im\"' +
			' entity=\"' + extension.replace('sip:', 'pres:') + '\">\n' +
			'<tuple id=\"s8794\">\n' +
			'<status>\n'+
			'   <basic>' + (busy ? 'closed' : 'open') + '</basic>\n' +
			'   <im:im>' + (busy ? 'away' : 'present') + '</im:im>\n' +
			'</status>\n' +
			'<contact priority=\"0.8\">tel:+33600000000</contact>\n' +
			'<note  xml:lang=\"en\">test</note>\n' +
			'</tuple>\n' +
			'</presence>';

		this.publishSession.publish(content, contentType, {
			expires: 200,
			sip_headers: [
				{ name: 'Event', value: 'presence' }
			],
			sip_caps: [
				{ name: '+g.oma.sip-im', value: null },
				{ name: '+sip.ice', value: null },
				{ name: 'language', value: '\"en\"' }
			]
		})
	}

	dial (handset, stack) {

		stack.callSession = stack.newSession('call-audio', {
			audio_remote: document.getElementById('audio-remote-' + handset.extension),
			events_listener: { events: '*', listener: (event) => {
				console.log('got event', event)

				if (event.type == 'connected') {
					// chrome wont do this itself apparently
					let el = document.getElementById('audio-remote-' + handset.extension);

					if (false && el.paused)
						el.play(); 
				}
			}}
		})

		console.log('dialing out ', handset)

		stack.callSession.call(String(parseInt(handset.extension) + 100));

	}

	onSipEvent (handset, stack, event) {
		console.log('1!', event);

		if (event.type == 'started') {
			let registerSession = stack.newSession('register', {
				events_listener: { events: '*', listener: (event) => {
					if (event.type == 'connected') {
						console.log('!! connected', handset.extension, event)
						this.dial(handset, stack)
					} else {
						console.log('!! [register] ', handset.extension, event)
					}
				}}
			})
			registerSession.register();

		}

		if (event.type == 'i_new_call' && handset != EXT) {
			// we should auto answer any calls we receive as they'll be coming from a screener

			console.log('got a call event type')

			event.newSession.accept();
		}
	}

	async componentDidUpdate (prevProps, prevState) {
		if (prevState.outputDevice != this.state.outputDevice) {
			console.log('Setting output sink ID for ' + this.state.handset.extension + ' to ' + this.state.outputDevice)
			let element = document.getElementById('audio-remote-' + this.state.handset.extension)
			let srcObject = element.srcObject;

			// we need to set 
			try {
				element.srcObject = null;
				await element.setSinkId(this.state.outputDevice);
				element.srcObject = srcObject;
				element.play();
			} catch (e) {
				console.error('Could not set sink ID to ' + this.state.outputDevice + ':', e)
				this.setState({
					outputDevice: element.sinkId
				})
			}
		}
	}

	onAnswer (line) {
		console.log('request answer line', line, this.state.handset.extension)

		this.webSocket.send(JSON.stringify({
			type: 'answer',
			line: line.extension,
			destination: this.state.handset.extension
		}))
	}

	onBlockNumber (line) {
		this.onDumpCall(line);
	}

	onParkCall (line) {
		this.webSocket.send(JSON.stringify({
			type: 'park',
			line: line.extension,
			destination: line.routed_to
		}))
	}

	onDumpCall (line) {
		this.webSocket.send(JSON.stringify({
			type: 'dump',
			line: line.extension
		}))
	}

	renderDialog (name) {
		switch (name) {
			case 'setup':
				return (
					<Dialog 
						hidden={ false }
						key="setup"
						onDismiss={ () => this.setState({ dialog: null }) } // yes this won't allow us to dismiss setup
						className="setup-diag"
						dialogContentProps={{ title: 'Setup' }}>

						<Setup handsets={ this.state.handsets } />

					</Dialog>
				);
		}
		return null;
	}

	render () {

		let localHandsets = this.state.handsets.filter((a) => this.isLocal(a.extension))

		if (this.state.blocking != null) {
			return (
				<Customizer {...dark}>
					<div className="root">
						{ this.renderDialog(this.state.blocking) }
					</div>
				</Customizer>
			)
		}

		return (
			<Customizer {...dark}>
				<div className="root">

					{ this.state.dialog && this.renderDialog(this.state.dialog) }

					<div className="column column-left">
						<Handsets
							handsets={ this.state.handsets }
							lines={ this.state.lines }
							onChange={ (handset) => this.setState({ handset }) }
							handset={ this.state.handset }
							onParkCall={ this.onParkCall.bind(this) }
							onBlockNumber={ this.onBlockNumber.bind(this) }
							onDumpCall={ this.onDumpCall.bind(this) }
							onAnswer={ this.onAnswer.bind(this) } />

						<div className="left-controls">
							<Toggle inlineLabel label="Monitor Studio" />
							{ /* <MediaDropdown label="Input Device" kind="audioinput" onChange={ (_, v) => this.setState({ inputDevice: v.key }) } selectedKey={ this.state.inputDevice } />
							<MediaDropdown label="Output Device" kind="audiooutput" onChange={ (_, v) => this.setState({ outputDevice: v.key }) } selectedKey={ this.state.outputDevice } /> */ }
							<IconButton iconProps={{ iconName: 'Settings' }} onClick={
								() => (
									window.confirm('This will cause Multicall to reconnect to the server. This may result in calls being dropped and is not recommended during use. Continue?') &&
									this.setState({ dialog: 'setup' })
								)
							} />
						</div>

						<Text variant="medium">{ this.state.isSIPClient ? 'Local VOIP client running here' : (
								<ActionButton onClick={ () => window.location.href = '?sip_stack_client=1' }>
									Enable local VOIP client
								</ActionButton>
							) }</Text>
					</div>

					<div className="column column-right">
						<Incoming
							lines={ this.state.lines }
							handsets={ this.state.handsets }
							handset={ this.state.handset }
							onParkCall={ this.onParkCall.bind(this) }
							onBlockNumber={ this.onBlockNumber.bind(this) }
							onDumpCall={ this.onDumpCall.bind(this) }
							onAnswer={ this.onAnswer.bind(this) } />
					</div>


					<div className="hide">
						{
							localHandsets.map((handset) => <audio id={ "audio-remote-" + handset.extension } autoPlay key={ handset.extension } />)
						}
					</div>
				</div>
			</Customizer>
		);
	}
}

export default App;
