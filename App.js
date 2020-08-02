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
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import COLORS from './colors';
import { Landing, VerifyModal } from './components';


class App extends Component {
    //const [user, setUser] = React.useState({ loggedIn: false });
    constructor(props) {
        super(props);
        this.state = { whichView: 'landing', user: { loggedIn: false } };
    }
    updateUser = (user) => {
        this.setState({ user: user });
    }
    changeView = (newView) => {
        this.setState({ whichView: newView }); //landing, verify, or main
    }
    render() {
        return (
            <>
                <StatusBar animated={true} backgroundColor={COLORS.background} barStyle={COLORS.lightMode ? 'dark-content' : 'light-content'} />
                <SafeAreaView style={{ flex: 0, backgroundColor: COLORS.background }} />
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            {
                                this.state.whichView === 'landing'
                                    ? <Landing updateUser={this.updateUser} changeView={this.changeView} />
                                    : this.state.whichView === 'verify'
                                        ? <VerifyModal updateUser={this.updateUser} changeView={this.changeView} user={this.state.user} />
                                        : <Text style={{color: COLORS.text}}> Hello, {this.state.user.name}!</Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </>
        );
    }
};

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

export default App;
