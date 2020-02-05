import React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib';

export default class MediaDropdown extends React.Component {

	state = {
		devices: []
	}

	async componentWillMount () {
		let devices = await navigator.mediaDevices.enumerateDevices();

		this.setState({
			devices
		})
	}

	render () {
		const options = this.state.devices
			.filter((a) => a.kind == this.props.kind)
			.map((a) => ({
				text: a.label,
				key: a.deviceId
			}));

		return <Dropdown {...this.props} options={ options } />;
	}
}