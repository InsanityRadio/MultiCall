import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons(/* optional base url */);


window.tmedia_session_jsep01.prototype.__get_lo = function() {
	var c = this;

	let EXT = c.o_mgr.o_usr_data.o_session.o_stack.identity.s_impi;

	let audioConstraints;

	if (!parseInt(EXT)) {
		console.log('could not inject call')
	} else {
		console.log('injecting into getUserMedia call for ' + EXT)

		try {
			let config = JSON.parse(window.localStorage.getItem('MCSETTINGS'))
			let deviceId = config[EXT].inputDevice;
			audioConstraints = { deviceId };
		} catch (e) {
		}

	}

	if (!this.o_pc && !this.b_lo_held) {
		var d = {
			mandatory: {},
			optional: []
		};
		if ((this.e_type.i_id & window.tmedia_type_e.SCREEN_SHARE.i_id) == window.tmedia_type_e.SCREEN_SHARE.i_id) {
			d.mandatory.chromeMediaSource = "screen"
		}
		if (this.e_type.i_id & window.tmedia_type_e.VIDEO.i_id) {
			if (this.o_video_size) {
				if (this.o_video_size.minWidth) {
					d.mandatory.minWidth = this.o_video_size.minWidth
				}
				if (this.o_video_size.minHeight) {
					d.mandatory.minHeight = this.o_video_size.minHeight
				}
				if (this.o_video_size.maxWidth) {
					d.mandatory.maxWidth = this.o_video_size.maxWidth
				}
				if (this.o_video_size.maxHeight) {
					d.mandatory.maxHeight = this.o_video_size.maxHeight
				}
			}
			try {
				window.tsk_utils_log_info("Video Contraints:" + JSON.stringify(d))
			} catch (b) {}
		}
		var a = this.ao_ice_servers;
		if (!a) {
			a = [{
				url: "stun:stun.l.google.com:19302"
			}]
		}
		try {
			window.tsk_utils_log_info("ICE servers:" + JSON.stringify(a))
		} catch (b) {}
		this.o_pc = new window.RTCPeerConnection((a && !a.length) ? null : {
			iceServers: a,
			rtcpMuxPolicy: "negotiate"
		}, this.o_media_constraints);
		this.o_pc.onicecandidate = window.tmedia_session_jsep01.mozThis ? window.tmedia_session_jsep01.onIceCandidate : function(e) {
			window.tmedia_session_jsep01.onIceCandidate(e, c)
		};
		this.o_pc.onnegotiationneeded = window.tmedia_session_jsep01.mozThis ? window.tmedia_session_jsep01.onNegotiationNeeded : function(e) {
			window.tmedia_session_jsep01.onNegotiationNeeded(e, c)
		};
		this.o_pc.onsignalingstatechange = window.tmedia_session_jsep01.mozThis ? window.tmedia_session_jsep01.onSignalingstateChange : function(e) {
			window.tmedia_session_jsep01.onSignalingstateChange(e, c)
		};
		this.subscribe_stream_events()
	}
	if (!this.o_sdp_lo && !this.b_sdp_lo_pending) {
		this.b_sdp_lo_pending = true;
		if (this.b_sdp_ro_pending && this.o_sdp_ro) {
			this.__set_ro(this.o_sdp_ro, true)
		}
		if (this.e_type == window.tmedia_type_e.AUDIO && (this.b_cache_stream && window.__o_jsep_stream_audio)) {
			window.tmedia_session_jsep01.onGetUserMediaSuccess(window.__o_jsep_stream_audio, c)
		} else {
			if (this.e_type == window.tmedia_type_e.AUDIO_VIDEO && (this.b_cache_stream && window.__o_jsep_stream_audiovideo)) {
				window.tmedia_session_jsep01.onGetUserMediaSuccess(window.__o_jsep_stream_audiovideo, c)
			} else {
				if (!this.b_lo_held && !this.o_local_stream) {
					this.o_mgr.callback(window.tmedia_session_events_e.STREAM_LOCAL_REQUESTED, this.e_type);
					let C;
					navigator.getUserMedia(C = {
						audio: audioConstraints ? audioConstraints : (this.e_type == window.tmedia_type_e.SCREEN_SHARE) ? false : !!(this.e_type.i_id & window.tmedia_type_e.AUDIO.i_id),
						video: !!(this.e_type.i_id & window.tmedia_type_e.VIDEO.i_id) ? d : false,
						data: false
					}, window.tmedia_session_jsep01.mozThis ? window.tmedia_session_jsep01.onGetUserMediaSuccess : function(e) {
						window.tmedia_session_jsep01.onGetUserMediaSuccess(e, c)
					}, window.tmedia_session_jsep01.mozThis ? window.tmedia_session_jsep01.onGetUserMediaError : function(e) {
						window.tmedia_session_jsep01.onGetUserMediaError(e, c)
					})
					console.log('fuuck shit', C, audioConstraints)
				}
			}
		}
	}
	return this.o_sdp_lo
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
