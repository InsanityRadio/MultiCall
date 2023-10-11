import React from 'react';
import { IconButton, DetailsList, Text } from 'office-ui-fabric-react/lib';
import Line from './Line';

import CallerReadyState from './CallerReadyState';

export default class Handsets extends React.Component {

	getHandsets () {
		return [1];
	}

	_onLinkClick (event, link) {
		if (!link.connected) {
			return;
		}

		if (link.connected && !link.destination) {
			// answer call 
			return this.props.onAnswer(link)
		}
		if (link.connected && link.destination) {
			// hang up
			return;
		}
	}

	onClickDefault (link) {
		if (link.connected) {
			let fn = link.routed_to ? this.props.onParkCall : this.props.onAnswer;
			fn && fn(link)
		}
	}

	_onRenderLink (link) {
		link = link.item;

		let unscreened = link.connected && link.readyState < CallerReadyState.SCREENED;

		let handset = link.routed_to && this.props.handsets.find((a) => a.extension == link.routed_to)
		return <>
			<div className="icon-container">
				{ handset && <span className="line-icon" style={{ backgroundColor: handset.colour }}>{ handset.ref }</span> }

				{ /*  link.iconProps && <IconButton iconProps={ link.iconProps } /> */ }
			</div>

			<div className={ "nav-link-inner-flex " + (link.readyState > 0 ? 'active ' : '') + (unscreened ? "caller-unscreened" : '') }>

				<span className="nav-link-inner-flex-text" onClick={ this.onClickDefault.bind(this, link) }>
					<Text variant="medium">{ link.name }</Text><br />
					{ link.connected ? 
						( link.routed_to ? 
							<Text variant="small">Connected to { link.remote } on ext. { link.routed_to }</Text> :
							<Text variant="small">{ link.remote }, ringing - tap to answer on { this.props.handset ? this.props.handset.name : '?' }</Text>
						) :
						<Text variant="small">No connected call</Text>
					}
				</span>

				<span>
					{ link.readyState > 0 && (<>

						{ link.routed_to ? (
							<IconButton iconProps={{ iconName: 'PinSolid12' }} title='Park Call' onClick={ this.props.onParkCall.bind(this, link) }></IconButton>
						) : (
							<IconButton iconProps={{ iconName: 'Phone', fontSize: 50}} style={{ color: this.props.handset && this.props.handset.colour }}  onClick={ this.props.onAnswer.bind(this, link) }></IconButton>
						)}
						<IconButton iconProps={{ iconName: 'BlockContact', fontSize: 50 }} onClick={ this.props.onBlockNumber.bind(this, link) } title='Block Number'></IconButton>
						<IconButton iconProps={{ iconName: 'DeclineCall', fontSize: 50 }} onClick={ this.props.onDumpCall.bind(this, link) } title='Dump Call'></IconButton>

					</>) }
				</span>
			</div>
		</>;
	}
	
	render () {
		const groups = this.props.lines.map(
				(inc) =>Object.assign({}, inc, {
					// connected: this.props.handsets.find((a) => a.id == inc.destination) != null
				})).map((inc) => Object.assign({}, inc, {
					key: String(inc.extension),
					disabled: true, // !inc.connected,
					iconProps: inc.connected ? { iconName: 'NetworkTower', className: 'on-air-icon' } : null,
				})
			)

		return (
			<div className="line-group">
				<Text variant="large" className="grpHead">Incoming Lines</Text>
				<DetailsList
					onRenderRow={ this._onRenderLink.bind(this) }
					isHeaderVisible={ false }
					onLinkClick={ this._onLinkClick.bind(this) }
					selectedKey="0"
					items={ groups } />
			</div>
		)
	}

}