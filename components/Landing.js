import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LoginModal, SignUpModal, SwitchButton } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
};

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { showDarkModeToggle: true, };
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
                flex: 2,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
            contentSection: {
                flex: 3,
                flexDirection: 'column',
                alignItems: 'center',
            },
            title: {
                color: COLORS.text,
                fontFamily: Platform.OS === 'ios'
                    ? 'Futura'
                    : 'Roboto',
                fontSize: 40,
                fontWeight: 'bold',
                marginTop: 20,
            },
            subtitle: {
                paddingHorizontal: 20,
                textAlign: 'center',
                marginTop: 20,
                fontSize: 16,
            },
            text: {
                color: COLORS.text,
            },
            lightModeToggle: {
                position: 'absolute',
                right: 10,
                bottom: 5,
                padding: 20,
                //transform: [{ scaleX: -1 }],
            },
        });

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.topSection}>
                        <Text style={styles.title}>SCHEDULER</Text>
                        <Text style={[styles.text, styles.subtitle]}>A centralized, end-to-end platform to quickly and easily set up appointments, classes, and meetings.</Text>
                    </View>
                    <View style={styles.contentSection}>

                        <SwitchButton
                            initialValue={this.props.view}
                            onValueChange={(val) => this.props.landingChangeView(val)}      // this is necessary for this component
                            text1='LOGIN'                        // optional: first text in switch button --- default ON
                            text2='SIGN UP'                       // optional: second text in switch button --- default OFF
                            switchWidth={Dimensions.get('window').width}                 // optional: switch width --- default 44
                            switchHeight={Dimensions.get('window').height * 3 / 5 / 8}                 // optional: switch height --- default 100
                            switchdirection='ltr'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                            switchBorderRadius={0}          // optional: switch border radius --- default oval
                            switchSpeedChange={250}           // optional: button change speed --- default 100
                            switchBorderColor='rgba(52, 52, 52, 0)'       // optional: switch border color --- default #d4d4d4
                            switchBackgroundColor={COLORS.background}      // optional: switch background color --- default #fff
                            btnBorderColor={COLORS.button}          // optional: button border color --- default #00a4b9
                            btnBackgroundColor={COLORS.button}      // optional: button background color --- default #00bcd4
                            fontColor={COLORS.gray}               // optional: text font color --- default #b1b1b1
                            activeFontColor='#fff'            // optional: active font color --- default #fff
                        />
                        {
                            this.props.view === 1
                                ? <LoginModal colors={this.props.colors} updateUser={this.props.updateUser} changeView={this.props.changeView} />
                                : <SignUpModal colors={this.props.colors} updateUser={this.props.updateUser} changeView={this.props.changeView} />
                        }
                    </View>
                    {this.state.showDarkModeToggle &&
                        <Icon name={COLORS.lightMode ? 'moon-sharp' : 'sunny'} size={26} color={COLORS.text} onPress={this.toggleLightMode} style={styles.lightModeToggle} />
                    }
                </View>
            </TouchableWithoutFeedback >
        );
    }
}



export { Landing };