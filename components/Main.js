import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import API from '../api';
import COLORS from '../colors';
import Icon from 'react-native-vector-icons/Octicons';
import SwitchButton from 'switch-button-react-native';
import { Events, Upcoming } from '../components';

const viewNames = ['My Events', 'Upcoming'];

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { whichView: 1 };
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            {viewNames[this.state.whichView - 1]}
                        </Text>
                        <Icon name='gear' size={32} color={COLORS.text} style={styles.settingsButton} />
                    </View>
                    <View style={styles.content}>
                        {
                            this.state.whichView === 1
                            ? <Events />
                            : <Upcoming />
                        }
                    </View>
                    <SwitchButton
                        onValueChange={(val) => this.setState({ whichView: val })}      // this is necessary for this component
                        text1={viewNames[0]}                        // optional: first text in switch button --- default ON
                        text2={viewNames[1]}                       // optional: second text in switch button --- default OFF
                        switchWidth={Dimensions.get('window').width - 20}                 // optional: switch width --- default 44
                        switchHeight={Dimensions.get('window').height / 15}                 // optional: switch height --- default 100
                        switchSpeedChange={80}           // optional: button change speed --- default 100
                        switchBorderColor={COLORS.gray}       // optional: switch border color --- default #d4d4d4
                        switchBackgroundColor={COLORS.background}      // optional: switch background color --- default #fff
                        btnBorderColor='#00a4b9'          // optional: button border color --- default #00a4b9
                        btnBackgroundColor={COLORS.button}      // optional: button background color --- default #00bcd4
                        fontColor={COLORS.gray}               // optional: text font color --- default #b1b1b1
                        activeFontColor='#fff'            // optional: active font color --- default #fff
                    />
                </SafeAreaView>
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
    header: {
        flex: 0,
        height: Dimensions.get('window').height / 18,
        justifyContent: 'center',
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 2,
    },
    headerText: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    settingsButton: {
        position: 'absolute',
        right: 10,
    },
    content: {
        flex: 1
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: COLORS.text,
    },
});

export { Main };