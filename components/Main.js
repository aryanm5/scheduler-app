import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import COLORS from '../colors';
import { Events, Upcoming, Settings } from '../components';
import Swiper from 'react-native-swiper'


const viewNames = ['My Events', 'Upcoming', 'Settings'];

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { whichView: 0 };
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            {viewNames[this.state.whichView]}
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <Swiper
                            loadMinimal={true}
                            loadMinimalSize={2}
                            loop={false}
                            onIndexChanged={(index) => { this.setState({ whichView: index }); }}
                            dot={<View style={{
                                backgroundColor: 'rgba(160,160,160,.8)',
                                width: 10,//8
                                height: 10,
                                borderRadius: 40,
                                marginLeft: 5,
                                marginRight: 5,
                                marginTop: 3,
                                marginBottom: 0,
                            }}
                            />}
                            activeDot={<View style={{
                                backgroundColor: COLORS.button,
                                width: 10,//8
                                height: 10,
                                borderRadius: 40,
                                marginLeft: 5,
                                marginRight: 5,
                                marginTop: 3,
                                marginBottom: 0,
                            }}
                            />
                            }>
                            <Events user={this.props.user} updateUser={this.props.updateUser} />
                            <Upcoming user={this.props.user} updateUser={this.props.updateUser} />
                            <Settings user={this.props.user} updateUser={this.props.updateUser} changeView={this.props.changeView} />
                        </Swiper>
                        {/*
                            this.state.whichView === 1
                                ? <Events user={this.props.user} updateUser={this.props.updateUser} />
                                : <Upcoming user={this.props.user} updateUser={this.props.updateUser} />
                        */}
                    </View>
                    {/*<View style={styles.footer}>
                        <SwitchButton
                            onValueChange={(val) => this.setState({ whichView: val })}      // this is necessary for this component
                            text1={viewNames[0]}                        // optional: first text in switch button --- default ON
                            text2={viewNames[1]}                       // optional: second text in switch button --- default OFF
                            switchWidth={Dimensions.get('window').width - 20}                 // optional: switch width --- default 44
                            switchHeight={Dimensions.get('window').height / 20}                 // optional: switch height --- default 100
                            switchSpeedChange={80}           // optional: button change speed --- default 100
                            switchBorderColor={COLORS.gray}       // optional: switch border color --- default #d4d4d4
                            switchBackgroundColor={COLORS.background}      // optional: switch background color --- default #fff
                            btnBorderColor='#00a4b9'          // optional: button border color --- default #00a4b9
                            btnBackgroundColor={COLORS.button}      // optional: button background color --- default #00bcd4
                            fontColor={COLORS.gray}               // optional: text font color --- default #b1b1b1
                            activeFontColor='#fff'            // optional: active font color --- default #fff
                        />
                    </View>*/}
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    header: {
        flex: 0,
        height: Dimensions.get('window').height / 12,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingLeft: 15,
    },
    headerText: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 36,
        textAlign: 'left',
    },
    settingsButton: {
        position: 'absolute',
        right: 10,
    },
    content: {
        flex: 1,
        paddingTop: 15,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: COLORS.text,
    },
    footer: {
        paddingTop: 5,
    },
});

export { Main };