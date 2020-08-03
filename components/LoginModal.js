import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import API from '../api';
import COLORS from '../colors';


class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = { emailText: '', passwordText: '', errorMessage: '' };
    }

    login = () => {
        Keyboard.dismiss();
        if (this.state.emailText.length > 0 && this.state.passwordText.length > 0) {
            API.get({
                task: 'tryLogin',
                email: this.state.emailText,
                password: this.state.passwordText,
            }, (data) => {
                if (data.err) {
                    this.setState({ errorMessage: data.message });
                } else {
                    this.props.updateUser(data);
                    this.props.changeView('main');
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput} onChangeText={(val) => { this.setState({ emailText: val }); }} placeholder='EMAIL ADDRESS' placeholderTextColor='#808080' selectionColor='#000' autoCompleteType='email' autoCapitalize='none' returnKeyType='next' keyboardType='email-address' textContentType='emailAddress' />
                <TextInput style={styles.textInput} onChangeText={(val) => { this.setState({ passwordText: val }); }} placeholder='PASSWORD' placeholderTextColor='#808080' selectionColor='#000' secureTextEntry={true} autoCompleteType='password' onSubmitEditing={this.login} returnKeyType='go' autoCapitalize='none' textContentType='password' />
                <TouchableOpacity activeOpacity={0.9} style={styles.submitButton} onPress={this.login}>
                    <Text style={styles.submitText}>LOGIN</Text>
                </TouchableOpacity>
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
    },
    textInput: {
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        marginBottom: 20,
        borderWidth: COLORS.lightMode ? 3 : 0,
        borderColor: COLORS.brown,
        paddingHorizontal: 20,
        color: 'black',
    },
    submitButton: {
        backgroundColor: COLORS.button,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 20,
    },
    submitText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: '#FF0000',
        fontSize: 16,
        marginTop: 10,
    }
});

export { LoginModal };