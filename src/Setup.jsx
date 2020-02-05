import React, { useState } from 'react';
import { DialogFooter, PrimaryButton, Toggle, Text } from 'office-ui-fabric-react/lib';
import MediaDropdown from './MediaDropdown';

const FormGroup = ({ handset, onChange, defaultValue }) => {

	const change = (name, e, v) => {
		let newV = { ...values, [name]: v && v.key ? v.key : v };
		setValues(newV)
		onChange && onChange(newV);
	}

	let [ values, setValues ] = useState(Object.assign({ enabled: false, inputDevice: '', outputDevice: '' }, defaultValue))

	return (
		<div style={{ marginBottom: '10px' }}>
			<Toggle label={ handset.name } checked={ values.enabled } onChange={ change.bind(this, 'enabled') } inlineLabel />
			<MediaDropdown
				disabled={ !values.enabled }
				label="Input Device"
				kind="audioinput"
				onChange={ change.bind(this, 'inputDevice') }
				selectedKey={ values.inputDevice } />
			<MediaDropdown
				disabled={ !values.enabled }
				label="Output Device"
				kind="audiooutput"
				onChange={ change.bind(this, 'outputDevice') }
				selectedKey={ values.outputDevice } />
		</div>
	);
}

const LS_KEY = 'MCSETTINGS';

export default class Setup extends React.Component {

	state = {
		formData: {}
	}

	componentWillMount () {
		this.setState({
			formData: window.localStorage.getItem(LS_KEY) ? JSON.parse(window.localStorage.getItem(LS_KEY)) : {}
		})
	}

	onSave () {
		window.localStorage.setItem(LS_KEY, JSON.stringify(this.state.formData));
		window.location.reload();
	}

	render () {
		console.log('cuck render', this.state)
		return <>
			<Text variant="medium">What devices would you like to use on this machine?</Text>
			{
				this.props.handsets.map((handset) => (
					<FormGroup 
						handset={ handset }
						defaultValue={ this.state.formData[handset.extension] }
						onChange={ (values) => this.setState((o) => ({
							formData: Object.assign({}, o.formData, {
								[handset.extension]: values
							})
						})) } />
				))
			}

			<DialogFooter>
				<PrimaryButton onClick={ this.onSave.bind(this) }>Save</PrimaryButton>
			</DialogFooter>
		</>;
	}
	
}