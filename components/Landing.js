import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LoginModal, SignUpModal } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import API from '../api';

const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
};

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { loadingLogin: false, whichView: 'landing', showDarkModeToggle: true, };
        AsyncStorage.getItem('schedToken', (err, result) => {
            if (!err && result !== null) {
                this.setState({ loadingLogin: true });
                API.get({
                    task: 'getUser',
                    token: result,
                }, (data) => {
                    this.setState({ loadingLogin: false });
                    if (data.err) {
                        AsyncStorage.removeItem('schedToken');
                    } else {
                        this.props.updateUser(data);
                        this.props.changeView('main');
                    }
                });
            }
        });
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow = () => {
        this.setState({ showDarkModeToggle: false, });
    }
    _keyboardDidHide = () => {
        this.setState({ showDarkModeToggle: true, });
    }

    toggleLightMode = () => {
        ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
        this.props.setColors(this.props.colors.lightMode ? 'dark' : 'light', () => {
            AsyncStorage.setItem('schedMode', (this.props.colors.lightMode ? 'light' : 'dark'));
        });
    }

    changeView = (changeTo) => {
        this.setState({ whichView: changeTo }, () => { setTimeout(() => { this.swiper.scrollToEnd(); }, 1); });
    }

    goBack = () => {
        this.willRemoveView = true;
        this.swiper.scrollTo({ x: 0 });
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                backgroundColor: COLORS.background,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            },
            topSection: {
                flex: 3,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
            bottomSection: {
                flex: 2,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: 25,
            },
            title: {
                color: COLORS.text,
                fontFamily: Platform.OS === 'ios'
                    ? 'Futura'
                    : 'sans-serif-medium',
                fontSize: 40,
                fontWeight: 'bold',
                marginTop: 20,
            },
            subtitle: {
                color: COLORS.text,
                paddingHorizontal: 20,
                textAlign: 'center',
                marginTop: 20,
                fontSize: 16,
            },
            text: {
                color: COLORS.text,
                textAlign: 'center',
            },
            lightModeToggle: {
                paddingTop: 10,
                paddingBottom: 25,
                paddingHorizontal: 30,
                alignSelf: 'flex-end',
            },
            button: {
                width: '100%',
                backgroundColor: COLORS.button,
                color: '#FFF',
                alignItems: 'center',
                padding: 15,
                marginVertical: 10,
                borderRadius: 3,
            },
            buttonText: {
                color: '#FFF',
                fontWeight: 'bold',
            },
        });

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
                <ScrollView
                    ref={(component) => { this.swiper = component; }}
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={Dimensions.get('window').width}
                    snapToAlignment='center'
                    contentContainerStyle={{ width: this.state.whichView === 'landing' ? '100%' : '200%', }}
                    onMomentumScrollEnd={(e) => { if (this.willRemoveView || this.state.whichView !== 'landing' && e.nativeEvent.contentOffset.x <= 5) { this.setState({ whichView: 'landing' }); this.willRemoveView = false; } }}
                    overScrollMode='never'
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, width: '100%', height: '100%', }}>
                    <View style={{ flex: 1, }}>
                        <View style={styles.topSection}>
                            <Text style={styles.title}>SCHEDULER</Text>
                            <Text style={styles.subtitle}>A centralized, end-to-end platform to quickly and easily set up appointments, classes, and meetings.</Text>
                        </View>
                        <View style={styles.bottomSection}>
                            <TouchableOpacity style={styles.button} onPress={() => { this.changeView('login'); }} activeOpacity={0.6}>
                                {this.state.loadingLogin
                                    ? <ActivityIndicator size='small' color='#FFF' animating={this.state.loadingLogin} />
                                    : <Text style={styles.buttonText}>Login</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => { this.changeView('signup'); }} activeOpacity={0.6}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
                        </View>
                        <Icon name={COLORS.lightMode ? 'moon-sharp' : 'sunny'} size={26} color={COLORS.text} onPress={this.toggleLightMode} style={styles.lightModeToggle} />
                    </View>
                    {
                        this.state.whichView === 'login'
                            ? <LoginModal colors={this.props.colors} updateUser={this.props.updateUser} changeView={this.props.changeView} goBack={this.goBack} />
                            : this.state.whichView === 'signup'
                                ? <SignUpModal colors={this.props.colors} updateUser={this.props.updateUser} changeView={this.props.changeView} goBack={this.goBack} />
                                : null
                    }
                </ScrollView>
            </TouchableWithoutFeedback >
        );
    }
}



export { Landing };