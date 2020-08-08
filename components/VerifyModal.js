import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import API from '../api';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { openInbox } from 'react-native-email-link';


class VerifyModal extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '', loading: false, };
    }

    checkVerified = () => {
        this.setState({ errorMessage: '', loading: true, });
        API.get({
            task: 'getUser',
            token: this.props.user.token,
        }, (data) => {
            this.setState({ loading: false });
            if (data.err) {
                this.setState({ errorMessage: data.message });
            } else {
                if (data.validated) {
                    this.props.updateUser(data);
                    this.props.changeView('main');
                } else {
                    this.setState({ errorMessage: `Error: You haven't verified ${this.props.user.email} yet.` });
                }
            }
        });
    }

    goBack = () => {
        this.props.landingChangeView(2);
        this.props.changeView('landing');
    }

    inboxPressed = () => {
        openInbox({
            title: 'Open Mail',
            message: 'Which app would you like to open?'
        });
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 30,
            },
            backButton: {
                position: 'absolute',
                left: 0,
                top: 0,
                paddingVertical: 10,
                paddingHorizontal: 15,
            },
            header: {
                fontSize: 32,
                fontWeight: 'bold',
                marginBottom: 30,
                color: COLORS.text,
            },
            mainText: {
                textAlign: 'center',
                fontSize: 16,
                color: COLORS.text,
            },
            button: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.button,
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderRadius: 15,
                marginTop: 20,
            },
            buttonText: {
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: 16,
            },
            errorText: {
                color: '#FF0000',
                fontSize: 16,
                marginTop: 10,
                textAlign: 'center',
            }
        });

        return (
            <View style={styles.container}>
                <Icon name='arrowleft' size={36} color={COLORS.text} onPress={this.goBack} style={styles.backButton} />
                <Text style={styles.header}>
                    Account Created!
                </Text>
                <Text style={styles.mainText}>
                    Your account has been created. Now you must verify that you own <Text style={{ fontWeight: 'bold' }}>{this.props.user.email}</Text>.{'\n\n'}
                    An email has been sent to you. Click the link in the email to verify your account and continue.{'\n\n'}
                    There may be a small delay (≈10 min) before you receive the email.{'\n'}
                </Text>
                <TouchableOpacity activeOpacity={0.9} style={[styles.button, { paddingVertical: 13, }]} onPress={this.inboxPressed}>
                    <MaterialIcon name='mail' size={28} color={COLORS.text} />
                    <Text style={styles.buttonText}> Open Mail</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={this.checkVerified}>
                    {
                        this.state.loading
                            ? <ActivityIndicator size="small" color='#FFF' animating={this.state.loading} style={{ paddingHorizontal: 30, }} />
                            : <Text style={styles.buttonText}>I Verified My Account</Text>
                    }
                </TouchableOpacity>
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            </View>
        );
    }
}


export { VerifyModal };