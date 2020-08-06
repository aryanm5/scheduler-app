/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    StatusBar,
} from 'react-native';
import getColors from './colors';
import { Landing, VerifyModal, Main } from './components';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = { whichView: 'landing', landingWhichView: 1, user: { loggedIn: false }, colors: getColors('check'), };
    }

    landingChangeView = (changeTo) => {
        this.setState({ landingWhichView: changeTo });
    }
    updateUser = (user) => {
        this.setState({ user: user });
    }
    changeView = (newView) => {
        this.setState({ whichView: newView }); //landing, verify, or main
        if (newView === 'landing') {
            this.updateUser({ loggedIn: false });
        }
    }
    setColors = (setTo) => {
        this.setState({ colors: getColors(setTo) });
    }


    render() {
        const COLORS = this.state.colors;
        const styles = StyleSheet.create({
            container: {
                backgroundColor: COLORS.background,
                flex: 1,
                justifyContent: 'flex-start',
            },
            text: {
                color: COLORS.text,
            }
        });
        return (
            <>
                <StatusBar animated={true} backgroundColor={COLORS.background} barStyle={COLORS.lightMode ? 'dark-content' : 'light-content'} />
                <SafeAreaView style={{ flex: 0, backgroundColor: COLORS.background }} />
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                    <View style={styles.container}>
                        {
                            this.state.whichView === 'landing'
                                ? <Landing colors={this.state.colors} view={this.state.landingWhichView} landingChangeView={this.landingChangeView} updateUser={this.updateUser} changeView={this.changeView} />
                                : this.state.whichView === 'verify'
                                    ? <VerifyModal colors={this.state.colors} updateUser={this.updateUser} landingChangeView={this.landingChangeView} changeView={this.changeView} user={this.state.user} />
                                    : <Main colors={this.state.colors} setColors={this.setColors} user={this.state.user} updateUser={this.updateUser} changeView={this.changeView} />
                        }
                    </View>
                </KeyboardAvoidingView>
            </>
        );
    }
};


export default App;
