import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { SectionRowButton } from '../components';
import { ChangeName, ChangePassword, DisableEmails, EnableEmails } from './settings_actions';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = { whichView: 'settings', swiperIndex: 0, darkModeEnabled: !this.props.colors.lightMode };
        this.willRemoveView = false;
    }

    darkModeToggled = () => {
        this.props.setColors(this.state.darkModeEnabled ? 'light' : 'dark');
        this.setState({ darkModeEnabled: !this.state.darkModeEnabled }, () => {
            AsyncStorage.setItem('schedMode', (this.state.darkModeEnabled ? 'dark' : 'light'));
        });
    }

    logout = () => {
        AsyncStorage.removeItem('schedToken');
        this.props.changeView('landing');
    }

    setWhichView = (setTo) => {
        this.setState({ whichView: setTo }, () => { setTimeout(() => { this.swiper.scrollToEnd(); }, 1); });
    }
    viewBack = () => {
        this.willRemoveView = true;
        this.swiper.scrollTo({ x: 0 });
    }
    secondView = () => {
        this.setState({ swiperIndex: 1 });
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
            },
            scrollView: {
                flex: 1,
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '100%',
            },
            rowButtonGroup: {
                flex: 1,
                width: '100%',
                backgroundColor: COLORS.secondary,
                borderRadius: 20,
                marginTop: 20,
                paddingHorizontal: 15,
                paddingVertical: 10,
            },
            name: {
                color: COLORS.text,
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 10,
                marginLeft: 5,
            },
            email: {
                color: COLORS.text,
                fontSize: 16,
                marginBottom: 10,
                marginLeft: 5,
            }
        });

        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(component) => { this.swiper = component; }}
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={Dimensions.get('window').width - 60}
                    snapToAlignment={'center'}
                    contentContainerStyle={{ width: this.state.whichView === 'settings' ? '100%' : '200%', }}
                    onMomentumScrollEnd={(e) => { if (this.willRemoveView || this.state.whichView !== 'settings' && e.nativeEvent.contentOffset.x === 0) { this.setState({ whichView: 'settings' }); this.willRemoveView = false; } }}
                    overScrollMode='never'
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flex: 1 }}>
                        <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                            <View style={styles.rowButtonGroup}>
                                <Text style={styles.name} numberOfLines={1}>{this.props.user.name}</Text>
                                <Text style={styles.email} numberOfLines={1}>{this.props.user.email}</Text>
                                <SectionRowButton onPress={() => { this.setWhichView('name'); }} colors={COLORS} text='CHANGE NAME' />
                                <SectionRowButton onPress={() => { this.setWhichView('password'); }} colors={COLORS} text='CHANGE PASSWORD' />
                                <SectionRowButton onPress={() => { this.setWhichView('toggleEmails'); }} colors={COLORS} text={this.props.user.emailNotify ? 'DISABLE ALL EMAILS' : 'ENABLE EMAILS'} color={this.props.user.emailNotify ? COLORS.red : COLORS.green} />
                            </View>
                            <View style={[styles.rowButtonGroup, { paddingVertical: 2 }]}>
                                <SectionRowButton
                                    colors={COLORS}
                                    text={`DARK ${Platform.OS === 'ios' ? 'MODE' : 'THEME'}`}
                                    icon={<Switch onValueChange={this.darkModeToggled} value={this.state.darkModeEnabled} trackColor={{ true: COLORS.button }} />}
                                    first />
                            </View>
                            <View style={[styles.rowButtonGroup, { paddingVertical: 2 }]}>
                                <SectionRowButton
                                    colors={COLORS}
                                    text='LOGOUT'
                                    icon={<Icon name='log-out-outline' size={36} color={COLORS.text} />}
                                    onPress={this.logout}
                                    first />
                            </View>
                        </ScrollView>
                    </View>

                    {
                        this.state.whichView === 'settings'
                            ? null
                            : <View style={{ flex: 1 }}>{this.renderView(this.state.whichView)}</View>

                    }
                </ScrollView>
            </View>
        );
    }

    renderView = (whichView) => {
        switch (whichView) {
            case 'name': return <ChangeName user={this.props.user} updateUser={this.props.updateUser} colors={this.props.colors} goBack={this.viewBack} />;
            case 'password': return <ChangePassword user={this.props.user} updateUser={this.props.updateUser} colors={this.props.colors} goBack={this.viewBack} />;
            case 'toggleEmails': return (this.props.user.emailNotify ? <DisableEmails user={this.props.user} updateUser={this.props.updateUser} colors={this.props.colors} goBack={this.viewBack} /> : <EnableEmails user={this.props.user} updateUser={this.props.updateUser} colors={this.props.colors} goBack={this.viewBack} />);
        }
    }
}


export { Settings };