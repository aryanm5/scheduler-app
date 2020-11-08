import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getEventActionStyles from './styles';
import API from '../../api';


class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = { nameText: props.event.name, passwordText: props.event.passwordProtected ? props.event.password : '', descText: props.event.desc, manualApprove: props.event.manualApprove, emailNotify: props.event.emailNotify, loadingName: false, loadingDesc: false, loadingPassword: false, loadingToggle: false, nameError: '', passwordError: '', descError: '', toggleError: '', };
    }

    changeName = () => {
        if (this.state.nameText.length > 0 && this.state.nameText !== this.props.event.name) {
            this.setState({ loadingName: true, nameError: '' });
            API.get({
                task: 'editEventName',
                token: this.props.user.token,
                eventName: this.props.event.name,
                newName: this.state.nameText,
            }, (data) => {
                this.setState({ loadingName: false });
                if (data.err) {
                    this.setState({ nameError: data.message });
                } else {
                    this.props.updateUser(data);
                    this.props.goBack();
                }
            });
        }
    }

    changePassword = () => {
        if (this.state.passwordText !== (this.props.event.passwordProtected ? this.props.event.password : '') || !this.props.event.passwordProtected && this.state.passwordText === 'none') {
            this.setState({ loadingPassword: true, passwordError: '' });
            API.get({
                task: 'changeEventPassword',
                token: this.props.user.token,
                eventName: this.props.event.name,
                password: this.state.passwordText,
            }, (data) => {
                this.setState({ loadingPassword: false });
                if (data.err) {
                    this.setState({ passWordError: data.message });
                } else {
                    this.props.updateUser(data);
                    this.props.goBack();
                }
            });
        }
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
                <ScrollView style={{ width: '100%', top: 40, }} contentContainerStyle={{ paddingBottom: 30, }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <Text style={[commonStyles.text, { fontSize: 24, fontWeight: 'bold', }]}>
                        {`${this.props.event.name}\n`}
                    </Text>
                    <View style={{ width: '100%', }}>
                        <Text style={[commonStyles.text, { textAlign: 'left', fontWeight: 'bold', fontSize: 15, }]}> NAME</Text>
                        <TextInput defaultValue={this.props.event.name} style={commonStyles.textInput} onChangeText={(val) => { this.setState({ nameText: val }); }} placeholder='Event Name' autoCapitalize='words' placeholderTextColor='#808080' selectionColor='#000' />
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <TouchableOpacity onPress={this.changeName} activeOpacity={0.9} style={[commonStyles.button, { width: '40%', paddingVertical: 10, marginTop: 5, }]}>
                                {
                                    this.state.loadingName
                                        ? <ActivityIndicator size='small' color={commonStyles.buttonText.color} animating={this.state.loadingName} />
                                        : <Text style={[commonStyles.buttonText, { fontSize: 16, }]}>Save</Text>
                                }
                            </TouchableOpacity>
                        </View>
                        {this.state.nameError.length > 0 &&
                            <Text style={commonStyles.errorText}>{this.state.nameError}</Text>
                        }
                    </View>
                    <View style={{ width: '100%', marginTop: 30, }}>
                        <Text style={[commonStyles.text, { textAlign: 'left', fontWeight: 'bold', fontSize: 15, }]}> DESCRIPTION</Text>
                        <TextInput multiline={true} defaultValue={this.props.event.desc} style={[commonStyles.textInput, commonStyles.multilineTextInput]} onChangeText={(val) => { this.setState({ descText: val }); }} placeholder='Event Description...' placeholderTextColor='#808080' selectionColor='#000' />
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <TouchableOpacity onPress={this.changeDesc} activeOpacity={0.9} style={[commonStyles.button, { width: '40%', paddingVertical: 10, marginTop: 5, }]}>
                                {
                                    this.state.loadingDesc
                                        ? <ActivityIndicator size='small' color={commonStyles.buttonText.color} animating={this.state.loadingDesc} />
                                        : <Text style={[commonStyles.buttonText, { fontSize: 16, }]}>Save</Text>
                                }
                            </TouchableOpacity>
                        </View>
                        {this.state.descError.length > 0 &&
                            <Text style={commonStyles.errorText}>{this.state.descError}</Text>
                        }
                    </View>
                    <View style={{ width: '100%', marginTop: 30, }}>
                        <Text style={[commonStyles.text, { textAlign: 'left', fontWeight: 'bold', fontSize: 15, }]}> PASSWORD</Text>
                        <TextInput defaultValue={this.props.event.passwordProtected ? this.props.event.password : ''} style={commonStyles.textInput} onChangeText={(val) => { this.setState({ passwordText: val }); }} placeholder='Blank = no password' autoCapitalize='none' placeholderTextColor='#808080' selectionColor='#000' />
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <TouchableOpacity onPress={this.changePassword} activeOpacity={0.9} style={[commonStyles.button, { width: '40%', paddingVertical: 10, marginTop: 5, }]}>
                                {
                                    this.state.loadingPassword
                                        ? <ActivityIndicator size='small' color={commonStyles.buttonText.color} animating={this.state.loadingPassword} />
                                        : <Text style={[commonStyles.buttonText, { fontSize: 16, }]}>Save</Text>
                                }
                            </TouchableOpacity>
                        </View>
                        {this.state.passwordError.length > 0 &&
                            <Text style={commonStyles.errorText}>{this.state.passwordError}</Text>
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
                    {this.state.loadingToggle &&
                        <ActivityIndicator size='small' color={COLORS.text} animating={this.state.loadingToggle} />
                    }
                    {this.state.toggleError.length > 0 &&
                        <Text style={commonStyles.errorText}>{this.state.toggleError}</Text>
                    }
                </ScrollView>
            </View>
        );
    }
}


export { EditEvent };