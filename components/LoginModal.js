import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import API from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = { emailText: '', passwordText: '', errorMessage: '', loading: false, };
        AsyncStorage.getItem('schedToken', (err, result) => {
            if (!err && result !== null) {
                this.setState({ loading: true });
                API.get({
                    task: 'getUser',
                    token: result,
                }, (data) => {
                    this.setState({ loading: false });
                    if (data.err) {
                        this.setState({ errorMessage: data.message });
                        AsyncStorage.removeItem('schedToken');
                    } else {
                        this.props.updateUser(data);
                        this.props.changeView('main');
                    }
                });
            }
        });
    }

    login = () => {
        Keyboard.dismiss();
        if (this.state.emailText.length > 0 && this.state.passwordText.length > 0) {
            this.setState({ loading: true });
            API.get({
                task: 'tryLogin',
                email: this.state.emailText,
                password: this.state.passwordText,
            }, (data) => {
                if (data.err) {
                    this.setState({ loading: false });
                    this.setState({ errorMessage: data.message });
                } else {
                    this.props.updateUser(data);
                    this.setState({ loading: false });
                    AsyncStorage.setItem('schedToken', data.token);
                    this.props.changeView('main');
                }
            });
        }
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                width: '100%',
                alignItems: 'center',
                marginTop: 30,
            },
            textInput: {
                width: '100%',
                height: 50,
                backgroundColor: '#FFF',
                borderRadius: 25,
                marginBottom: 20,
                borderWidth: COLORS.lightMode ? 3 : 0,
                borderColor: COLORS.brown,
                paddingRight: COLORS.lightMode ? 7 : 10,
                paddingLeft: COLORS.lightMode ? 52 : 55,
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
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: 16,
            },
            errorText: {
                color: COLORS.red,
                fontSize: 16,
                marginTop: 10,
                textAlign: 'center',
            },
            textInputContainer: {
                width:'80%',
                alignItems:'center',
            },
            textInputIcon: {
                position:'absolute',
                left:0,
                height:50,
                borderTopLeftRadius: 25,
                borderBottomLeftRadius:25,
                paddingLeft:18,
                paddingRight:10,
                justifyContent:'center',
                alignItems:'center',
            },
            iconColor: {
                color: COLORS.lightMode ? COLORS.brown : COLORS.secondary,
            },
        });

        return (
            <View style={styles.container}>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={(val) => { this.setState({ emailText: val }); }} placeholder='EMAIL ADDRESS' placeholderTextColor='#808080' selectionColor='#000' autoCompleteType='email' autoCapitalize='none' returnKeyType='next' keyboardType='email-address' onSubmitEditing={() => { this.passwordTextInput.focus(); }} blurOnSubmit={false} textContentType='emailAddress' />
                    <View style={styles.textInputIcon}><Icon name='mail-outline' size={24} style={styles.iconColor} /></View>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput ref={(input) => { this.passwordTextInput = input; }} style={styles.textInput} onChangeText={(val) => { this.setState({ passwordText: val }); }} placeholder='PASSWORD' placeholderTextColor='#808080' selectionColor='#000' secureTextEntry={true} autoCompleteType='password' onSubmitEditing={this.login} returnKeyType='go' autoCapitalize='none' textContentType='password' />
                    <View style={styles.textInputIcon}><Icon name='lock-outline' size={24} style={styles.iconColor} /></View>
                </View>
                <TouchableOpacity activeOpacity={0.9} style={styles.submitButton} onPress={() => { if (!this.state.loading) { this.login(); } }}>
                    {this.state.loading
                        ? <ActivityIndicator size='small' color='#FFF' animating={this.state.loading} style={{ paddingHorizontal: 15 }} />
                        : <Text style={styles.submitText}>LOGIN</Text>
                    }
                </TouchableOpacity>
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            </View >
        );
    }
}



export { LoginModal };