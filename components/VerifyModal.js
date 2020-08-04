import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import API from '../api';
import COLORS from '../colors';
import Icon from 'react-native-vector-icons/AntDesign';


class VerifyModal extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '' };
    }

    checkVerified = () => {
        API.get({
            task: 'getUser',
            token: this.props.user.token,
        }, (data) => {
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

    render() {
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
                <TouchableOpacity activeOpacity={0.9} style={styles.checkButton} onPress={this.checkVerified}>
                    <Text style={styles.checkButtonText}>I Verified My Account</Text>
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
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    backButton: {
        position: 'absolute',
        left:0,
        top:0,
        paddingVertical:10,
        paddingHorizontal:15,
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
    checkButton: {
        backgroundColor: COLORS.button,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 20,
    },
    checkButtonText: {
        color: '#FFFFFF',
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

export { VerifyModal };