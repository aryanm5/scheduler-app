import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, Platform } from 'react-native';
import { SectionRowButton } from '../components';
import API from '../api';
import Icon from 'react-native-vector-icons/Ionicons';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = { darkModeEnabled: !this.props.colors.lightMode };
    }

    darkModeToggled = () => {
        this.props.setColors(this.state.darkModeEnabled ? 'light' : 'dark');
        this.setState({ darkModeEnabled: !this.state.darkModeEnabled });
    }

    logout = () => {
        this.props.changeView('landing');
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
                <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                    <View style={styles.rowButtonGroup}>
                        <Text style={styles.name} numberOfLines={1}>{this.props.user.name}</Text>
                        <Text style={styles.email} numberOfLines={1}>{this.props.user.email}</Text>
                        <SectionRowButton colors={COLORS} text='CHANGE NAME' />
                        <SectionRowButton colors={COLORS} text='CHANGE PASSWORD' />
                        <SectionRowButton colors={COLORS} text={this.props.user.emailNotify ? 'DISABLE ALL EMAILS' : 'ENABLE EMAILS'} color={this.props.user.emailNotify ? COLORS.red : COLORS.green} />
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
        );
    }
}


export { Settings };