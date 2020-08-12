import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import getSettingsActionStyles from './styles';
import API from '../../api';


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = { hidden: true, oldPass: '', newPass: '', confirmPass: '', loading: false, errorMessage: '' };
    }

    toggleHidden = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    changePass = () => {
        if (this.state.oldPass.length > 0 && this.state.newPass.length > 0 && this.state.confirmPass.length > 0) {
            if(this.state.newPass !== this.state.confirmPass) {
                this.setState({ errorMessage: 'New Password and Confirm Password don\'t match' });
            } else {
                this.setState({ loading: true, errorMessage: '' });
                API.get({
                    task: 'changePassword',
                    email: this.props.user.email,
                    oldPassword: this.state.oldPass,
                    newPassword: this.state.newPass,
                }, (data) => {
                    this.setState({ loading: false });
                    if(data.err) {
                        this.setState({ errorMessage: data.message });
                    } else {
                        this.props.updateUser(data);
                        this.props.goBack();
                    }
                });
            }
        }
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getSettingsActionStyles(COLORS);

        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>CHANGE PASSWORD</Text>
                <TextInput style={commonStyles.textInput} onChangeText={(val) => { this.setState({ oldPass: val }); }} placeholder='CURRENT PASSWORD' placeholderTextColor='#808080' selectionColor='#000' secureTextEntry={true} autoCompleteType='password' autoCapitalize='none' textContentType='password' />
                <View style={{ width: '100%', justifyContent: 'center', marginTop: 30 }}>
                    <TextInput style={commonStyles.textInput} onChangeText={(val) => { this.setState({ newPass: val }); }} placeholder='NEW PASSWORD' placeholderTextColor='#808080' selectionColor='#000' secureTextEntry={this.state.hidden} autoCompleteType='password' autoCapitalize='none' textContentType='password' />
                    <Ionicon name={this.state.hidden ? 'eye-off' : 'eye'} size={28} color='#000' onPress={this.toggleHidden} style={{ position: 'absolute', right: 12 }} />
                </View>
                <TextInput style={[commonStyles.textInput, { marginTop: 30 }]} onChangeText={(val) => { this.setState({ confirmPass: val }); }} placeholder='CONFIRM NEW PASSWORD' placeholderTextColor='#808080' selectionColor='#000' secureTextEntry={true} autoCompleteType='password' autoCapitalize='none' textContentType='password' />
                <TouchableOpacity activeOpacity={0.9} style={commonStyles.button} onPress={this.changePass}>
                    {this.state.loading
                        ? <ActivityIndicator size='small' color={commonStyles.buttonText} animating={this.state.loading} style={{ paddingHorizontal: 25 }} />
                        : <Text style={commonStyles.buttonText}>CHANGE PASSWORD</Text>
                    }
                </TouchableOpacity>
                <Text style={commonStyles.errorText}>{this.state.errorMessage}</Text>
            </View>
        );
    }
}


export { ChangePassword };