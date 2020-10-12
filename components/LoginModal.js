import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import API from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = { forgotPassword: false, forgotPasswordEmail: '', forgotPasswordLoading: false, forgotPasswordError: false, forgotPasswordResult: '', emailText: '', passwordText: '', errorMessage: '', loading: false, };
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
                this.setState({ loading: false });
                if (data.err) {
                    this.setState({ errorMessage: data.message, });
                } else {
                    this.props.updateUser(data);
                    AsyncStorage.setItem('schedToken', data.token);
                    this.props.changeView('main');
                }
            });
        }
    }

    forgotPassword = () => {
        this.setState({ forgotPassword: true, });
    }
    cancelForgotPassword = () => {
        this.setState({ forgotPasswordResult: '', forgotPassword: false, });
    }
    sendResetPassword = () => {
        if (this.state.forgotPasswordEmail.length === 0) {
            this.setState({ forgotPasswordError: true, forgotPasswordResult: 'Please enter your email address.', });
            return;
        }
        this.setState({ forgotPasswordLoading: true, });
        API.get({
            task: 'sendResetPassword',
            email: this.state.forgotPasswordEmail,
        }, (data) => {
            this.setState({ forgotPasswordLoading: false, });
            if (data.err) {
                this.setState({ forgotPasswordError: true, forgotPasswordResult: data.message, });
            } else {
                this.setState({ forgotPasswordError: false, forgotPasswordResult: 'Success! Check your email inbox for a message from Scheduler.', });
            }
        });
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
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
                width: '80%',
                alignItems: 'center',
            },
            textInputIcon: {
                position: 'absolute',
                left: 0,
                height: 50,
                paddingLeft: 18,
                paddingRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
            },
            iconColor: {
                color: COLORS.lightMode ? COLORS.brown : COLORS.secondary,
            },
            backButton: {
                position: 'absolute',
                left: 0,
                top: 0,
                paddingVertical: 10,
                paddingHorizontal: 15,
            },
            welcome: {
                color: COLORS.text,
                fontWeight: 'bold',
                fontSize: 26,
                padding: 2,
            },
            text: {
                color: COLORS.text,
                fontSize: 15,
                textAlign: 'center',
            },
            forgotPassword: {
                position: 'absolute',
                bottom: 10,
                left: 0,
                right: 0,
                alignItems: 'center',
                paddingTop:10,
                paddingBottom: 25,
            },
            forgotPasswordText: {
                color: COLORS.text,
                fontSize: 18,
            },
            forgotPasswordResult: {
                color: this.state.forgotPasswordError ? COLORS.red : COLORS.green,
                fontSize: 16,
                marginTop: 20,
                textAlign: 'center',
                maxWidth: '80%',
            }
        });

        return (
            <View style={styles.container}>
                <AntIcon name='arrowleft' size={36} color={COLORS.text} onPress={this.props.goBack} style={styles.backButton} />
                {
                    this.state.forgotPassword
                        ? <>
                            <Text style={styles.welcome}>Forgot Password</Text>
                            <Text style={[styles.text, { maxWidth: '80%', marginTop: 10, }]}>Please enter your email address below.{'\n'}An email will be sent to you with a link to reset your password.</Text>
                            <View style={[styles.textInputContainer, { marginTop: 50, }]}>
                                <TextInput style={styles.textInput} value={this.state.forgotPasswordEmail} onChangeText={(val) => { this.setState({ forgotPasswordEmail: val }); }} placeholder='EMAIL ADDRESS' placeholderTextColor='#808080' selectionColor='#000' autoCompleteType='email' autoCapitalize='none' returnKeyType='done' keyboardType='email-address' textContentType='emailAddress' />
                                <View style={styles.textInputIcon}><Icon name='mail-outline' size={24} style={styles.iconColor} /></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', maxWidth: '80%', }}>
                                <TouchableOpacity activeOpacity={0.8} onPress={this.cancelForgotPassword} style={[styles.submitButton, { flex: 1, }]}><Text style={[styles.text, { color: '#FFF' }]}>Cancel</Text></TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={this.sendResetPassword} style={[styles.submitButton, { flex: 1, marginLeft: 15, }]}>
                                    {this.state.forgotPasswordLoading
                                        ? <ActivityIndicator size='small' color='#FFF' animating={this.state.forgotPasswordLoading} style={{ paddingHorizontal: 15 }} />
                                        : <Text style={[styles.text, { color: '#FFF' }]}>Send Email</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.forgotPasswordResult}>{this.state.forgotPasswordResult}</Text>
                        </>
                        : <>
                            <Text style={styles.welcome}>Welcome back!</Text>
                            <Text style={styles.text}>Log in with your email to continue.</Text>
                            <View style={[styles.textInputContainer, { marginTop: 50, }]}>
                                <TextInput value={this.state.emailText} style={styles.textInput} onChangeText={(val) => { if (this.state.forgotPasswordEmail === this.state.emailText) { this.setState({ forgotPasswordEmail: val, }); } this.setState({ emailText: val }); }} placeholder='EMAIL ADDRESS' placeholderTextColor='#808080' selectionColor='#000' autoCompleteType='email' autoCapitalize='none' returnKeyType='next' keyboardType='email-address' onSubmitEditing={() => { this.passwordTextInput.focus(); }} blurOnSubmit={false} textContentType='emailAddress' />
                                <View style={styles.textInputIcon}><Icon name='mail-outline' size={24} style={styles.iconColor} /></View>
                            </View>
                            <View style={styles.textInputContainer}>
                                <TextInput value={this.state.passwordText} ref={(input) => { this.passwordTextInput = input; }} style={styles.textInput} onChangeText={(val) => { this.setState({ passwordText: val }); }} placeholder='PASSWORD' placeholderTextColor='#808080' selectionColor='#000' secureTextEntry={true} autoCompleteType='password' onSubmitEditing={this.login} returnKeyType='go' autoCapitalize='none' textContentType='password' />
                                <View style={styles.textInputIcon}><Icon name='lock-outline' size={24} style={styles.iconColor} /></View>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.submitButton} onPress={() => { if (!this.state.loading) { this.login(); } }}>
                                {this.state.loading
                                    ? <ActivityIndicator size='small' color='#FFF' animating={this.state.loading} style={{ paddingHorizontal: 15 }} />
                                    : <Text style={styles.submitText}>LOGIN</Text>
                                }
                            </TouchableOpacity>
                            <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                            <TouchableOpacity style={styles.forgotPassword} onPress={this.forgotPassword}><Text style={styles.forgotPasswordText}>Forgot password?</Text></TouchableOpacity>
                        </>
                }

            </View >
        );
    }
}



export { LoginModal };