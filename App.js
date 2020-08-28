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
    ScrollView,
    Dimensions,
} from 'react-native';
import getColors from './colors';
import { Landing, VerifyModal, Main } from './components';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = { landingKey: 1, showLanding: true, loadingColors: true, whichView: 'landing', landingWhichView: 1, user: { loggedIn: false }, colors: {}, };
        getColors('check', (result) => {
            this.setState({ colors: result, loadingColors: false });
        });
    }

    landingChangeView = (changeTo) => {
        this.setState({ landingWhichView: changeTo });
    }
    updateUser = (user) => {
        this.setState({ user: user });
    }
    changeView = (newView) => {
        var oldView = this.state.whichView;
        this.setState({ showLanding: true, whichView: newView }, () => {
            if (oldView !== 'main' && newView === 'main') {
                setTimeout(() => { this.swiper.scrollToEnd({ animated: true }); }, 25);
                setTimeout(() => { this.setState({ showLanding: false, landingKey: this.state.landingKey + 1 }, () => { setTimeout(() => { this.swiper.scrollToEnd({ animated: false, }); }, 20); }); }, 800);
            } else if (newView === 'landing') {
                this.swiper.scrollTo({ y: 0, });
            }
        }); //landing, verify, or main
        if (newView === 'landing') {
            this.updateUser({ loggedIn: false });
        }
    }
    setColors = (setTo, after) => {
        this.setState({ colors: getColors(setTo) }, () => { if (after !== undefined) { after(); } });
    }


    render() {
        const COLORS = this.state.colors;
        const styles = StyleSheet.create({
            container: {
                backgroundColor: COLORS.background,
                flex: 1,
                justifyContent: 'flex-start',
            },
            loadingColorsContainer: {
                flex: 1,
                backgroundColor: '#F4F4F8',
            },
        });
        return (
            <>
                {
                    this.state.loadingColors
                        ? <View style={styles.loadingColorsContainer}></View>
                        : <>
                            <StatusBar animated={true} backgroundColor={COLORS.background} barStyle={COLORS.lightMode ? 'dark-content' : 'light-content'} />
                            <SafeAreaView style={{ flex: 0, backgroundColor: COLORS.background }} />
                            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                                <View style={styles.container}>
                                    <ScrollView
                                        ref={(component) => { this.swiper = component; }}
                                        decelerationRate={0}
                                        snapToInterval={Dimensions.get('window').height}
                                        snapToAlignment={'center'}
                                        contentContainerStyle={{ height: this.state.whichView === 'main' && this.state.showLanding ? '200%' : '100%', }}
                                        overScrollMode='never'
                                        bounces={false}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                    >
                                        <View style={{ flex: 1 }}>
                                            {
                                                this.state.whichView === 'verify'
                                                    ? <VerifyModal colors={this.state.colors} updateUser={this.updateUser} landingChangeView={this.landingChangeView} changeView={this.changeView} user={this.state.user} />
                                                    : this.state.showLanding && <Landing key={this.state.landingKey.toString()} colors={this.state.colors} setColors={this.setColors} view={this.state.landingWhichView} landingChangeView={this.landingChangeView} updateUser={this.updateUser} changeView={this.changeView} />
                                            }
                                            {
                                                this.state.whichView === 'main' &&
                                                <Main colors={this.state.colors} setColors={this.setColors} user={this.state.user} updateUser={this.updateUser} changeView={this.changeView} />
                                            }
                                        </View>
                                    </ScrollView>
                                </View>
                            </KeyboardAvoidingView>
                        </>
                }
            </>
        );
    }
};


export default App;
