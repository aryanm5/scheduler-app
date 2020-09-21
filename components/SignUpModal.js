import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API from '../api';
import AntIcon from 'react-native-vector-icons/AntDesign';


class SignUpModal extends Component {
    constructor(props) {
        super(props);
        this.state = { hidden: true, nameText: '', emailText: '', passwordText: '', confirmPasswordText: '', errorMessage: '', loading: false, };
    }

    toggleHidden = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    signup = () => {
        if (this.state.emailText.length > 0 && this.state.passwordText.length > 0) {
            if (this.state.nameText.length === 0) {
                this.setState({ errorMessage: 'Enter a name!', });
            } else if (this.state.confirmPasswordText !== this.state.passwordText) {
                this.setState({ errorMessage: 'Confirm password must match', });
            } else {
                this.setState({ loading: true });
                API.get({
                    task: 'createUser',
                    name: this.state.nameText,
                    email: this.state.emailText,
                    password: this.state.passwordText,
                    emailNotify: true,
                }, (data) => {
                    if (data.err) {
                        this.setState({ loading: false });
                        this.setState({ errorMessage: data.message });
                    } else {
                        this.props.updateUser(data);
                        this.setState({ loading: false });
                        this.props.changeView('verify');
                    }
                });
            }
        }
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
                color: '#000',
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
                paddingHorizontal: 30,
            },
        });

        return (
            <View style={styles.container}>
                <AntIcon name='arrowleft' size={36} color={COLORS.text} onPress={this.props.goBack} style={styles.backButton} />
                <Text style={styles.welcome}>Create Account</Text>
                <Text style={styles.text}>Create a Scheduler account to easily manage events and clients.</Text>

                <View style={[styles.textInputContainer, { marginTop: 30, }]}>
                    <TextInput style={styles.textInput} onChangeText={(val) => { this.setState({ nameText: val }); }} placeholder='FULL NAME' placeholderTextColor='#808080' selectionColor='#000' autoCompleteType='name' autoCapitalize='words' textContentType='name' />
                    <View style={styles.textInputIcon}><Icon name='person-outline' size={24} style={styles.iconColor} /></View>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={(val) => { this.setState({ emailText: val }); }} placeholder='EMAIL ADDRESS' placeholderTextColor='#808080' selectionColor='#000' autoCompleteType='email' autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress' />
                    <View style={styles.textInputIcon}><Icon name='mail-outline' size={24} style={styles.iconColor} /></View>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={(val) => { this.setState({ passwordText: val }); }} placeholder='PASSWORD' placeholderTextColor='#808080' selectionColor='#000' autoCompleteType='password' secureTextEntry={this.state.hidden} autoCapitalize='none' returnKeyType='done' textContentType='password' />
                    <View style={styles.textInputIcon}><Icon name='lock-outline' size={24} style={styles.iconColor} /></View>
                    <View style={[styles.textInputIcon, { left: null, right: 10 }]}><Ionicon name={this.state.hidden ? 'eye-off' : 'eye'} size={28} color='#000' onPress={this.toggleHidden} /></View>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={(val) => { this.setState({ confirmPasswordText: val }); }} placeholder='CONFIRM PASSWORD' placeholderTextColor='#808080' selectionColor='#000' autoCompleteType='password' secureTextEntry={true} autoCapitalize='none' returnKeyType='done' textContentType='password' />
                    <View style={styles.textInputIcon}><Icon name='lock-outline' size={24} style={styles.iconColor} /></View>
                </View>
                <TouchableOpacity activeOpacity={0.9} onPress={this.signup} style={styles.submitButton}>
                    {this.state.loading
                        ? <ActivityIndicator size='small' color='#FFF' animating={this.state.loading} style={{ paddingHorizontal: 15 }} />
                        : <Text style={styles.submitText}>SIGN UP</Text>
                    }
                </TouchableOpacity>
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            </View>
        );
    }
}


export { SignUpModal };