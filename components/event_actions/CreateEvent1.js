import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, } from 'react-native';
import getEventActionStyles from './styles';


class CreateEvent1 extends Component {
    constructor(props) {
        super(props);
    }

    setClientInfo = (num, newVal) => {
        var old = this.props.values.clientInfo;
        old[num] = newVal;
        this.props.setValue('clientInfo', old);
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                ...commonStyles.container,
                alignItems: 'flex-start',
                paddingHorizontal: 15,
            },
            clientInfoInput: {
                ...commonStyles.textInput,
                marginBottom: 10,
            },
        });

        return (
            <View style={styles.container}>
                <Text style={commonStyles.inputLabel}>Event Password (optional):</Text>
                <TextInput onFocus={this.props.hideNav} onBlur={this.props.showNav} defaultValue={this.props.values.eventPassword} style={commonStyles.textInput} onChangeText={(val) => { this.props.setValue('eventPassword', val); }} placeholder='None' placeholderTextColor='#808080' selectionColor='#000' />
                <Text style={[commonStyles.inputLabel, { marginTop: 20, }]}>Questions to ask clients:</Text>
                <TextInput onFocus={this.props.hideNav} onBlur={this.props.showNav} defaultValue={this.props.values.clientInfo[0]} style={styles.clientInfoInput} onChangeText={(val) => { this.setClientInfo(0, val); }} placeholder='1 (optional)' placeholderTextColor='#808080' selectionColor='#000' />
                <TextInput onFocus={this.props.hideNav} onBlur={this.props.showNav} defaultValue={this.props.values.clientInfo[1]} style={styles.clientInfoInput} onChangeText={(val) => { this.setClientInfo(1, val); }} placeholder='2 (optional)' placeholderTextColor='#808080' selectionColor='#000' />
                <TextInput onFocus={this.props.hideNav} onBlur={this.props.showNav} defaultValue={this.props.values.clientInfo[2]} style={styles.clientInfoInput} onChangeText={(val) => { this.setClientInfo(2, val); }} placeholder='3 (optional)' placeholderTextColor='#808080' selectionColor='#000' />

                <View style={{ flexDirection: 'row-reverse', width: '100%', marginTop: 25, paddingLeft: 15, }}>
                    <Switch onValueChange={(val) => { this.props.setValue('manualApprove', !val); }} value={!this.props.values.manualApprove} trackColor={{ true: COLORS.button }} />
                    <Text style={[commonStyles.inputLabel, { paddingTop: 2, marginLeft: 0, marginRight: 2 }]}>Auto-approve all clients </Text>
                </View>
                <View style={{ flexDirection: 'row-reverse', width: '100%', marginTop: 10, paddingLeft: 15, }}>
                    <Switch onValueChange={(val) => { this.props.setValue('emailNotify', val); }} value={this.props.values.emailNotify} trackColor={{ true: COLORS.button }} />
                    <Text style={[commonStyles.inputLabel, { paddingTop: 2, marginLeft: 0, marginRight: 2 }]}>Notify me on sign ups </Text>
                </View>
            </View>
        );
    }
}


export { CreateEvent1 };