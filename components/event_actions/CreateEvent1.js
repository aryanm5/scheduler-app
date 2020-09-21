import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, } from 'react-native';
import getEventActionStyles from './styles';


class CreateEvent1 extends Component {
    setClientInfo = (num, newVal) => {
        var old = this.props.values.clientInfo;
        old[num] = newVal;
        this.props.setValue('clientInfo', old);
    }

    renderClientInfoInput(num, placeholder, styles) {
        return (
            <View style={{ width: '100%' }}>
                <TextInput onFocus={this.props.hideNav} onBlur={this.props.showNav} defaultValue={this.props.values.clientInfo[num]} style={styles.clientInfoInput} onChangeText={(val) => { this.setClientInfo(num, val); }} placeholder={placeholder} placeholderTextColor='#808080' selectionColor='#000' />
                <View style={styles.clientInfoNum}><Text style={styles.clientInfoNumText}>{num + 1}.</Text></View>
            </View>
        );
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                ...commonStyles.container,
                alignItems: 'flex-start',
                paddingHorizontal: 20,
            },
            clientInfoInput: {
                ...commonStyles.textInput,
                marginBottom: 10,
                paddingLeft: 45,
                borderWidth: COLORS.lightMode ? 2 : 0,
            },
            clientInfoNum: {
                position: 'absolute',
                left: 0,
                height: 50,
                paddingLeft: 20,
                paddingRight: 10,
                justifyContent: 'center',
            },
            clientInfoNumText: {
                fontWeight: 'bold',
                fontVariant: ['tabular-nums'],
                color: COLORS.gray,
            },
        });

        return (
            <View style={styles.container}>
                <Text style={commonStyles.inputLabel}>Event Password (optional):</Text>
                <TextInput onFocus={this.props.hideNav} onBlur={this.props.showNav} defaultValue={this.props.values.eventPassword} style={[commonStyles.textInput, { borderWidth: COLORS.lightMode ? 2 : 0, }]} onChangeText={(val) => { this.props.setValue('eventPassword', val); }} placeholder='None' placeholderTextColor='#808080' selectionColor='#000' />
                <Text style={[commonStyles.inputLabel, { marginTop: 20, }]}>Questions for clients (optional):</Text>

                {this.renderClientInfoInput(0, 'Phone Number', styles)}
                {this.renderClientInfoInput(1, 'Street Address', styles)}
                {this.renderClientInfoInput(2, 'Date Of Birth', styles)}

                <View style={{ flexDirection: 'row-reverse', width: '100%', marginTop: 25, paddingLeft: 15, }}>
                    <Switch onValueChange={(val) => { this.props.setValue('manualApprove', val); }} value={this.props.values.manualApprove} trackColor={{ true: COLORS.button }} />
                    <Text style={[commonStyles.inputLabel, { paddingTop: 2, marginLeft: 0, marginRight: 2 }]}>Manually approve clients </Text>
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