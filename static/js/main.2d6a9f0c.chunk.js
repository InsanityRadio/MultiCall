(this.webpackJsonpmulticall=this.webpackJsonpmulticall||[]).push([[0],{87:function(e,t,n){e.exports=n(97)},92:function(e,t,n){},94:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},95:function(e,t,n){},97:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),s=n(19),o=n.n(s),r=(n(92),n(35)),c=n.n(r),l=n(46),d=n(9),u=n(13),m=n(15),h=n(14),p=n(16),_=(n(94),n(95),n(3)),f=n(134),v=n(147),g=n(145),w=n(146),k=n(136),b=function e(){Object(d.a)(this,e)};b.EMPTY=0,b.NEW=1,b.ANSWERED=2,b.BLOCKED=4,b.SCREENED=8,b.ONAIR=16,b.FINISHED=32;var y=n(140),E=(a.a.Component,function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"getHandsets",value:function(){return[1]}},{key:"_onLinkClick",value:function(e,t){this.props.onChange&&this.props.onChange(t)}},{key:"_onRenderLink",value:function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"icon-container"},a.a.createElement("span",{className:"line-icon",style:{backgroundColor:e.colour}},e.ref)),a.a.createElement("div",{className:"nav-link-inner-flex"},a.a.createElement("span",{className:"nav-link-inner-flex-text"},a.a.createElement(k.a,{variant:"large"},e.local&&"[ Local ] ",e.name),a.a.createElement("br",null),e.routed_to?a.a.createElement(k.a,{variant:"small"},"Connected to ",e.remote," (",e.routed_to,")"):e.bridge?a.a.createElement(k.a,{variant:"small"},"Line available"):a.a.createElement(k.a,{variant:"small"},"WARNING: Not connected")),a.a.createElement("span",null,e.outbound&&a.a.createElement(w.a,{iconProps:{iconName:"Phone"},style:{color:e.colour}}))))}},{key:"render",value:function(){var e=[{links:this.props.handsets.map((function(e){return Object.assign({},e,{key:String(e.extension)})}))}];return a.a.createElement("div",{className:"handset-group"},a.a.createElement(k.a,{variant:"large",className:"grpHead"},"Destinations"),a.a.createElement(y.a,{onRenderLink:this._onRenderLink.bind(this),onLinkClick:this._onLinkClick.bind(this),selectedKey:String(this.props.handset&&this.props.handset.extension),groups:e}))}}]),t}(a.a.Component)),S=n(131),C=(a.a.Component,function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"getHandsets",value:function(){return[1]}},{key:"_onLinkClick",value:function(e,t){if(t.connected)return t.connected&&!t.destination?this.props.onAnswer(t):void(!t.connected||t.destination)}},{key:"onClickDefault",value:function(e){if(e.connected){var t=e.routed_to?this.props.onParkCall:this.props.onAnswer;t&&t(e)}}},{key:"_onRenderLink",value:function(e){var t=(e=e.item).connected&&e.readyState<b.SCREENED,n=e.routed_to&&this.props.handsets.find((function(t){return t.extension==e.routed_to}));return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"icon-container"},n&&a.a.createElement("span",{className:"line-icon",style:{backgroundColor:n.colour}},n.ref)),a.a.createElement("div",{className:"nav-link-inner-flex "+(e.readyState>0?"active ":"")+(t?"caller-unscreened":"")},a.a.createElement("span",{className:"nav-link-inner-flex-text",onClick:this.onClickDefault.bind(this,e)},a.a.createElement(k.a,{variant:"medium"},e.name),a.a.createElement("br",null),e.connected?e.routed_to?a.a.createElement(k.a,{variant:"small"},"Connected to ",e.remote," on ext. ",e.routed_to):a.a.createElement(k.a,{variant:"small"},e.remote,", ringing - tap to answer on ",this.props.handset?this.props.handset.name:"?"):a.a.createElement(k.a,{variant:"small"},"No connected call")),a.a.createElement("span",null,e.readyState>0&&a.a.createElement(a.a.Fragment,null,e.routed_to?a.a.createElement(w.a,{iconProps:{iconName:"PinSolid12"},title:"Park Call",onClick:this.props.onParkCall.bind(this,e)}):a.a.createElement(w.a,{iconProps:{iconName:"Phone",fontSize:50},style:{color:this.props.handset&&this.props.handset.colour},onClick:this.props.onAnswer.bind(this,e)}),a.a.createElement(w.a,{iconProps:{iconName:"BlockContact",fontSize:50},onClick:this.props.onBlockNumber.bind(this,e),title:"Block Number"}),a.a.createElement(w.a,{iconProps:{iconName:"DeclineCall",fontSize:50},onClick:this.props.onDumpCall.bind(this,e),title:"Dump Call"})))))}},{key:"render",value:function(){var e=this.props.lines.map((function(e){return Object.assign({},e,{})})).map((function(e){return Object.assign({},e,{key:String(e.extension),disabled:!0,iconProps:e.connected?{iconName:"NetworkTower",className:"on-air-icon"}:null})}));return a.a.createElement("div",{className:"line-group"},a.a.createElement(k.a,{variant:"large",className:"grpHead"},"Incoming Lines"),a.a.createElement(S.a,{onRenderRow:this._onRenderLink.bind(this),isHeaderVisible:!1,onLinkClick:this._onLinkClick.bind(this),selectedKey:"0",items:e}))}}]),t}(a.a.Component)),O=n(133),N=function(e){function t(){var e,n;Object(d.a)(this,t);for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return(n=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).state={devices:[]},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.enumerateDevices();case 2:t=e.sent,this.setState({devices:t});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.devices.filter((function(t){return t.kind==e.props.kind})).map((function(e){return{text:e.label,key:e.deviceId}}));return a.a.createElement(O.a,Object.assign({},this.props,{options:t}))}}]),t}(a.a.Component),j=n(74),x=n(39),D=n(73),I=n(75),T=n(141),L=function(e){var t=e.handset,n=e.onChange,s=e.defaultValue,o=function(e,t,i){var a=Object(D.a)({},l,Object(x.a)({},e,i&&i.key?i.key:i));d(a),n&&n(a)},r=Object(i.useState)(Object.assign({enabled:!1,inputDevice:"",outputDevice:""},s)),c=Object(j.a)(r,2),l=c[0],d=c[1];return a.a.createElement("div",{style:{marginBottom:"10px"}},a.a.createElement(g.a,{label:t.name,checked:l.enabled,onChange:o.bind(void 0,"enabled"),inlineLabel:!0}),a.a.createElement(N,{disabled:!l.enabled,label:"Input Device",kind:"audioinput",onChange:o.bind(void 0,"inputDevice"),selectedKey:l.inputDevice}),a.a.createElement(N,{disabled:!l.enabled,label:"Output Device",kind:"audiooutput",onChange:o.bind(void 0,"outputDevice"),selectedKey:l.outputDevice}))},P=function(e){function t(){var e,n;Object(d.a)(this,t);for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return(n=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).state={formData:{}},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){this.setState({formData:window.localStorage.getItem("MCSETTINGS")?JSON.parse(window.localStorage.getItem("MCSETTINGS")):{}})}},{key:"onSave",value:function(){window.localStorage.setItem("MCSETTINGS",JSON.stringify(this.state.formData)),window.location.reload()}},{key:"render",value:function(){var e=this;return console.log("cuck render",this.state),a.a.createElement(a.a.Fragment,null,a.a.createElement(k.a,{variant:"medium"},"What devices would you like to use on this machine?"),this.props.handsets.map((function(t){return a.a.createElement(L,{handset:t,defaultValue:e.state.formData[t.extension],onChange:function(n){return e.setState((function(e){return{formData:Object.assign({},e.formData,Object(x.a)({},t.extension,n))}}))}})})),a.a.createElement(I.a,null,a.a.createElement(T.a,{onClick:this.onSave.bind(this)},"Save")))}}]),t}(a.a.Component),A={settings:{theme:Object(_.s)({palette:{neutralLighterAlt:"#282828",neutralLighter:"#313131",neutralLight:"#3f3f3f",neutralQuaternaryAlt:"#484848",neutralQuaternary:"#4f4f4f",neutralTertiaryAlt:"#6d6d6d",neutralTertiary:"#c8c8c8",neutralSecondary:"#d0d0d0",neutralPrimaryAlt:"#dadada",neutralPrimary:"#ffffff",neutralDark:"#f4f4f4",black:"#f8f8f8",white:"#1f1f1f",themePrimary:"#fff",themeLighterAlt:"#020609",themeLighter:"#091823",themeLight:"#112d43",themeTertiary:"#235a85",themeSecondary:"#3385c3",themeDarkAlt:"#4ba0e1",themeDark:"#65aee6",themeDarker:"#8ac2ec",accent:"#3a96dd"}})}},M="sip.insn.it",R="6000",B=window.SIPml,G=function(e){function t(){var e,n;Object(d.a)(this,t);for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return(n=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).handsets={},n.state={isSIPClient:!1,handsets:[],lines:[]},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({CONFIG:localStorage.getItem("MCSETTINGS")&&JSON.parse(localStorage.getItem("MCSETTINGS"))},(function(){return e.connect()}))}},{key:"connect",value:function(){var e=this;this.setState({handset:this.state.handsets.find((function(t){return e.isLocal(t.extension)}))},(function(){e.connectToBackend()}))}},{key:"connectToBackend",value:function(){var e=this,t=this.webSocket=new WebSocket("ws://10.32.4.36:8002/ws"),n=!1;t.onopen=function(){console.log("!! CONNECTED TO BE")},t.onclose=function(){e.connectToBackend()},t.onmessage=function(t){var i=JSON.parse(t.data);console.log("BE MESSAGE !!",i),"state"==i.type&&e.setState((function(t){Object.assign({},t);var n=t.handsets.slice(0);for(var a in i.handsets)n[a]=Object.assign({},n[a],i.handsets[a],{local:e.isLocal(i.handsets[a].extension)});var s=t.lines.slice(0);for(var a in i.lines)s[a]=Object.assign({},s[a],i.lines[a]);return{handsets:n,lines:s}}),(function(){1!=n&&0!=e.state.handsets.length&&(n=!0,e.connectToSIP())}))}}},{key:"connectToSIP",value:function(){var e=this;this.state.CONFIG?(this.setState({handset:this.state.handsets.find((function(t){return e.isLocal(t.extension)}))}),B.init((function(t){if(!(window.location.search.toLowerCase().indexOf("sip_stack_client")<0)){e.setState({isSIPClient:!0});var n={id:R,isDefault:!0},i=e.stack=new B.Stack({realm:M,impi:R,impu:"sip:6000@"+M+":5060",websocket_proxy_url:"wss://"+M+":8089/ws",password:"FB8C005A87",events_listener:{events:"*",listener:function(t){return e.onSipEvent(n,i,t)}}});e.state.handsets.filter((function(t){return e.isLocal(t.extension)})).map((function(t){var n=new B.Stack({realm:M,impi:String(t.extension),impu:"sip:"+t.extension+"@"+M+":5060",websocket_proxy_url:"wss://"+M+":8089/ws",password:"FB8C005A87",events_listener:{events:"*",listener:function(i){return e.onSipEvent(t,n,i)}}});e.handsets[t.id]=n,n.start()}))}}))):this.setState({blocking:"setup"})}},{key:"isLocal",value:function(e){return this.state.CONFIG&&this.state.CONFIG[e]&&this.state.CONFIG[e].enabled}},{key:"findExtension",value:function(){return"sip:6000@"+M}},{key:"setExtensionState",value:function(e,t){var n='<?xml version="1.0" encoding="UTF-8"?>\n<presence xmlns="urn:ietf:params:xml:ns:pidf"\n xmlns:im="urn:ietf:params:xml:ns:pidf:im" entity="'+e.replace("sip:","pres:")+'">\n<tuple id="s8794">\n<status>\n   <basic>'+(t?"closed":"open")+"</basic>\n   <im:im>"+(t?"away":"present")+'</im:im>\n</status>\n<contact priority="0.8">tel:+33600000000</contact>\n<note  xml:lang="en">test</note>\n</tuple>\n</presence>';this.publishSession.publish(n,"application/pidf+xml",{expires:200,sip_headers:[{name:"Event",value:"presence"}],sip_caps:[{name:"+g.oma.sip-im",value:null},{name:"+sip.ice",value:null},{name:"language",value:'"en"'}]})}},{key:"dial",value:function(e,t){t.callSession=t.newSession("call-audio",{audio_remote:document.getElementById("audio-remote-"+e.extension),events_listener:{events:"*",listener:function(e){console.log("got event",e)}}}),console.log("dialing out ",e),t.callSession.call(String(parseInt(e.extension)+100))}},{key:"onSipEvent",value:function(e,t,n){var i=this;(console.log("1!",n),"started"==n.type)&&t.newSession("register",{events_listener:{events:"*",listener:function(n){"connected"==n.type?(console.log("!! connected",e.extension,n),i.dial(e,t)):console.log("!! [register] ",e.extension,n)}}}).register();"i_new_call"==n.type&&e!=R&&(console.log("got a call event type"),n.newSession.accept())}},{key:"componentDidUpdate",value:function(){var e=Object(l.a)(c.a.mark((function e(t,n){var i,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.outputDevice==this.state.outputDevice){e.next=16;break}return console.log("Setting output sink ID for "+this.state.handset.extension+" to "+this.state.outputDevice),i=document.getElementById("audio-remote-"+this.state.handset.extension),a=i.srcObject,e.prev=4,i.srcObject=null,e.next=8,i.setSinkId(this.state.outputDevice);case 8:i.srcObject=a,i.play(),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(4),console.error("Could not set sink ID to "+this.state.outputDevice+":",e.t0),this.setState({outputDevice:i.sinkId});case 16:case"end":return e.stop()}}),e,this,[[4,12]])})));return function(t,n){return e.apply(this,arguments)}}()},{key:"onAnswer",value:function(e){console.log("request answer line",e,this.state.handset.extension),this.webSocket.send(JSON.stringify({type:"answer",line:e.extension,destination:this.state.handset.extension}))}},{key:"onBlockNumber",value:function(e){this.onDumpCall(e)}},{key:"onParkCall",value:function(e){this.webSocket.send(JSON.stringify({type:"park",line:e.extension,destination:e.routed_to}))}},{key:"onDumpCall",value:function(e){this.webSocket.send(JSON.stringify({type:"dump",line:e.extension}))}},{key:"renderDialog",value:function(e){var t=this;switch(e){case"setup":return a.a.createElement(f.a,{hidden:!1,key:"setup",onDismiss:function(){return t.setState({dialog:null})},className:"setup-diag",dialogContentProps:{title:"Setup"}},a.a.createElement(P,{handsets:this.state.handsets}))}return null}},{key:"render",value:function(){var e=this,t=this.state.handsets.filter((function(t){return e.isLocal(t.extension)}));return null!=this.state.blocking?a.a.createElement(v.a,A,a.a.createElement("div",{className:"root"},this.renderDialog(this.state.blocking))):a.a.createElement(v.a,A,a.a.createElement("div",{className:"root"},this.state.dialog&&this.renderDialog(this.state.dialog),a.a.createElement("div",{className:"column column-left"},a.a.createElement(E,{handsets:this.state.handsets,onChange:function(t){return e.setState({handset:t})},handset:this.state.handset}),a.a.createElement("div",{className:"left-controls"},a.a.createElement(g.a,{inlineLabel:!0,label:"Monitor Studio"}),a.a.createElement(w.a,{iconProps:{iconName:"Settings"},onClick:function(){return window.confirm("This will cause Multicall to reconnect to the server. This may result in calls being dropped and is not recommended during use. Continue?")&&e.setState({dialog:"setup"})}})),a.a.createElement(k.a,{variant:"medium"},this.state.isSIPClient?"Local VOIP client running here":a.a.createElement("a",{href:"?sip_stack_client=1"},"UI only, not running local VOIP client"))),a.a.createElement("div",{className:"column column-right"},a.a.createElement(C,{lines:this.state.lines,handsets:this.state.handsets,handset:this.state.handset,onParkCall:this.onParkCall.bind(this),onBlockNumber:this.onBlockNumber.bind(this),onDumpCall:this.onDumpCall.bind(this),onAnswer:this.onAnswer.bind(this)})),a.a.createElement("div",{className:"hide"},t.map((function(e){return a.a.createElement("audio",{id:"audio-remote-"+e.extension,key:e.extension})})))))}}]),t}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var z=n(132);Object(z.a)(),window.tmedia_session_jsep01.prototype.__get_lo=function(){var e,t,n=this,i=n.o_mgr.o_usr_data.o_session.o_stack.identity.s_impi;if(parseInt(i)){console.log("injecting into getUserMedia call for "+i);try{e={deviceId:JSON.parse(window.localStorage.getItem("MCSETTINGS"))[i].inputDevice}}catch(o){}}else console.log("could not inject call");if(!this.o_pc&&!this.b_lo_held){var a={mandatory:{},optional:[]};if((this.e_type.i_id&window.tmedia_type_e.SCREEN_SHARE.i_id)==window.tmedia_type_e.SCREEN_SHARE.i_id&&(a.mandatory.chromeMediaSource="screen"),this.e_type.i_id&window.tmedia_type_e.VIDEO.i_id){this.o_video_size&&(this.o_video_size.minWidth&&(a.mandatory.minWidth=this.o_video_size.minWidth),this.o_video_size.minHeight&&(a.mandatory.minHeight=this.o_video_size.minHeight),this.o_video_size.maxWidth&&(a.mandatory.maxWidth=this.o_video_size.maxWidth),this.o_video_size.maxHeight&&(a.mandatory.maxHeight=this.o_video_size.maxHeight));try{window.tsk_utils_log_info("Video Contraints:"+JSON.stringify(a))}catch(r){}}var s=this.ao_ice_servers;s||(s=[{url:"stun:stun.l.google.com:19302"}]);try{window.tsk_utils_log_info("ICE servers:"+JSON.stringify(s))}catch(r){}this.o_pc=new window.RTCPeerConnection(s&&!s.length?null:{iceServers:s,rtcpMuxPolicy:"negotiate"},this.o_media_constraints),this.o_pc.onicecandidate=window.tmedia_session_jsep01.mozThis?window.tmedia_session_jsep01.onIceCandidate:function(e){window.tmedia_session_jsep01.onIceCandidate(e,n)},this.o_pc.onnegotiationneeded=window.tmedia_session_jsep01.mozThis?window.tmedia_session_jsep01.onNegotiationNeeded:function(e){window.tmedia_session_jsep01.onNegotiationNeeded(e,n)},this.o_pc.onsignalingstatechange=window.tmedia_session_jsep01.mozThis?window.tmedia_session_jsep01.onSignalingstateChange:function(e){window.tmedia_session_jsep01.onSignalingstateChange(e,n)},this.subscribe_stream_events()}this.o_sdp_lo||this.b_sdp_lo_pending||(this.b_sdp_lo_pending=!0,this.b_sdp_ro_pending&&this.o_sdp_ro&&this.__set_ro(this.o_sdp_ro,!0),this.e_type==window.tmedia_type_e.AUDIO&&this.b_cache_stream&&window.__o_jsep_stream_audio?window.tmedia_session_jsep01.onGetUserMediaSuccess(window.__o_jsep_stream_audio,n):this.e_type==window.tmedia_type_e.AUDIO_VIDEO&&this.b_cache_stream&&window.__o_jsep_stream_audiovideo?window.tmedia_session_jsep01.onGetUserMediaSuccess(window.__o_jsep_stream_audiovideo,n):this.b_lo_held||this.o_local_stream||(this.o_mgr.callback(window.tmedia_session_events_e.STREAM_LOCAL_REQUESTED,this.e_type),navigator.getUserMedia(t={audio:e||this.e_type!=window.tmedia_type_e.SCREEN_SHARE&&!!(this.e_type.i_id&window.tmedia_type_e.AUDIO.i_id),video:!!(this.e_type.i_id&window.tmedia_type_e.VIDEO.i_id)&&a,data:!1},window.tmedia_session_jsep01.mozThis?window.tmedia_session_jsep01.onGetUserMediaSuccess:function(e){window.tmedia_session_jsep01.onGetUserMediaSuccess(e,n)},window.tmedia_session_jsep01.mozThis?window.tmedia_session_jsep01.onGetUserMediaError:function(e){window.tmedia_session_jsep01.onGetUserMediaError(e,n)}),console.log("fuuck shit",t,e)));return this.o_sdp_lo},o.a.render(a.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[87,1,2]]]);
//# sourceMappingURL=main.2d6a9f0c.chunk.js.map