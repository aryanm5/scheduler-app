import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getEventActionStyles from './styles';
import API from '../../api';


class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = { descText: props.event.desc, manualApprove: props.event.manualApprove, emailNotify: props.event.emailNotify, loadingDesc: false, loadingToggle: false, descError: '', toggleError: '' };
    }

    changeDesc = () => {
        if (this.state.descText.length > 0 && this.state.descText !== this.props.event.desc) {
            this.setState({ loadingDesc: true, descError: '' });
            API.get({
                task: 'editEventDesc',
                token: this.props.user.token,
                eventName: this.props.event.name,
                desc: this.state.descText,
            }, (data) => {
                this.setState({ loadingDesc: false });
                if (data.err) {
                    this.setState({ descError: data.message });
                } else {
                    this.props.updateUser(data);
                    this.props.goBack();
                }
            });
        }
    }
    manualApproveToggled = () => {
        this.setState({ manualApprove: !this.state.manualApprove, loadingToggle: true, toggleError: '' }, () => {
            API.get({
                task: 'setManualApprove',
                token: this.props.user.token,
                eventName: this.props.event.name,
                setTo: this.state.manualApprove,
            }, (data) => {
                this.setState({ loadingToggle: false });
                if (data.err) {
                    this.setState({ toggleError: data.message });
                } else {
                    this.props.updateUser(data);
                }
            });
        });
    }
    emailNotifyToggled = () => {
        this.setState({ emailNotify: !this.state.emailNotify, loadingToggle: true, toggleError: '' }, () => {
            API.get({
                task: 'setEmailNotify',
                token: this.props.user.token,
                eventName: this.props.event.name,
                setTo: this.state.emailNotify,
            }, (data) => {
                this.setState({ loadingToggle: false });
                if (data.err) {
                    this.setState({ toggleError: data.message });
                } else {
                    this.props.updateUser(data);
                }
            });
        });
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);

        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>EDIT EVENT</Text>
                <Text style={[commonStyles.text, { fontSize: 24, fontWeight: 'bold', }]}>
                    {`${this.props.event.name}\n`}
                </Text>
                <View style={{ width: '100%' }}>
                    <Text style={[commonStyles.text, { textAlign: 'left', fontWeight: 'bold', fontSize: 15, }]}> DESCRIPTION</Text>
                    <TextInput multiline={true} defaultValue={this.props.event.desc} style={[commonStyles.textInput, commonStyles.multilineTextInput]} onChangeText={(val) => { this.setState({ descText: val }); }} placeholder='Event Description...' placeholderTextColor='#808080' selectionColor='#000' />
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity onPress={this.changeDesc} activeOpacity={0.9} style={[commonStyles.button, { width: '40%', paddingVertical: 10, marginTop: 5, }]}>
                            {
                                this.state.loadingDesc
                                    ? <ActivityIndicator size="small" color={commonStyles.buttonText.color} animating={this.state.loadingDesc} />
                                    : <Text style={[commonStyles.buttonText, { fontSize: 16, }]}>Save</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.descError.length > 0
                            ? <Text style={commonStyles.errorText}>{this.state.descError}</Text>
                            : null
                    }
                </View>
                <View style={{ width: '80%', flexDirection: 'row', marginTop: 70, }}>
                    <Text style={commonStyles.text}>Manually Approve Clients: </Text>
                    <Switch disabled={this.state.loadingToggle} onValueChange={this.manualApproveToggled} value={this.state.manualApprove} trackColor={{ true: COLORS.button }} style={{ position: 'absolute', right: 0 }} />
                </View>
                <View style={{ width: '80%', marginTop: 30, marginBottom: 30, }}>
                    <Text style={commonStyles.text}>Email Notifications: </Text>
                    <Switch disabled={this.state.loadingToggle} onValueChange={this.emailNotifyToggled} value={this.state.emailNotify} trackColor={{ true: COLORS.button }} style={{ position: 'absolute', right: 0 }} />
                </View>
                {
                    this.state.loadingToggle
                        ? <ActivityIndicator size="small" color={COLORS.text} animating={this.state.loadingToggle} />
                        : null
                }
                {
                    this.state.toggleError.length > 0
                        ? <Text style={commonStyles.errorText}>{this.state.toggleError}</Text>
                        : null
                }
            </View>
        );
    }
}


export { EditEvent };