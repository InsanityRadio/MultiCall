import React from 'react';
import { IconButton, Nav, Text } from 'office-ui-fabric-react/lib';

import Handset from './Handset';

export default class Handsets extends React.Component {

	getHandsets () {
		return [1];
	}

	_onLinkClick (event, link) {
		this.props.onChange && this.props.onChange(link);
	}

	_onRenderLink (link) {

		let line = link.routed_to ? this.props.lines.find((a) => a.extension == link.routed_to) : null;

		return <>
			<div className="icon-container">
				<span className="line-icon" style={{ backgroundColor: link.colour }}>{ link.ref }</span>
			</div>
			<div className="nav-link-inner-flex">


				<span className="nav-link-inner-flex-text">
					<Text variant="large">{ link.local && ('[ Local ] ') }{ link.name }</Text><br />
					{ link.routed_to ? 
						<Text variant="small">Connected to { link.remote } (Line { (link.routed_to % 100) })</Text> :
						( link.bridge ? 
							<Text variant="small">Line available</Text> :
							<Text variant="small">WARNING: Not connected</Text>
						)
					}
				</span>
				<span>
					{ link.outbound && <IconButton iconProps={{ iconName: 'Phone' }} style={{ color: link.colour }}></IconButton> }

					{ link.routed_to ? <>
						<IconButton iconProps={{ iconName: 'PinSolid12' }} title='Park Call' onClick={ this.props.onParkCall.bind(this, line) }></IconButton>
						<IconButton iconProps={{ iconName: 'DeclineCall', fontSize: 50 }} onClick={ this.props.onDumpCall.bind(this, line) } title='Dump Call'></IconButton>
					</> : null }
					
				</span>
			</div>
		</>;
	}
	
	render () {
		const groups = [{
			links: this.props.handsets.map((h) => Object.assign({}, h, {
				key: String(h.extension)
			}))
		}];

		return (
			<div className="handset-group">
				<Text variant="large" className="grpHead">Destinations</Text>
				<Nav
					onRenderLink={ this._onRenderLink.bind(this) }
					onLinkClick={ this._onLinkClick.bind(this) }
					selectedKey={ String(this.props.handset && this.props.handset.extension) }
					groups={ groups } />
			</div>
		)
	}

}