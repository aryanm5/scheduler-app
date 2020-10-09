import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Platform, TouchableHighlight, TouchableOpacity } from 'react-native';
import getEventActionStyles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

class CreateEvent1 extends Component {
    constructor(props) {
        super(props);
        this.state = { showTimePicker: false };
        this.iosVersion = parseInt(Platform.Version, 10);
    }
    setTimePickerVisible = (setTo) => {
        this.setState({ showTimePicker: setTo, });
    }
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
            timePicker: {
                width: '100%',
                ...(Platform.OS === 'android' && { height: 120 }),
                ...((Platform.OS === 'ios' && this.iosVersion < 14) && { height: 60, }),
            },
        });

        return (
            <View style={styles.container}>
                <Text style={commonStyles.inputLabel}>Event Password (optional):</Text>
                <TextInput onFocus={this.props.hideNav} onBlur={this.props.showNav} defaultValue={this.props.values.eventPassword} style={[commonStyles.textInput, { borderWidth: COLORS.lightMode ? 2 : 0, }]} onChangeText={(val) => { this.props.setValue('eventPassword', val); }} placeholder='None' placeholderTextColor='#808080' selectionColor='#000' />
                <Text style={[commonStyles.inputLabel, { marginTop: 20, }]}>Questions for clients (optional):</Text>

                {this.renderClientInfoInput(0, 'Example: Phone Number', styles)}
                {this.renderClientInfoInput(1, 'Example: Street Address', styles)}
                {this.renderClientInfoInput(2, 'Example: Date Of Birth', styles)}

                <View style={{ flexDirection: 'row-reverse', width: '100%', marginTop: Platform.OS === 'ios' && this.iosVersion < 14 ? 10 : 20, paddingLeft: 15, }}>
                    <Switch onValueChange={(val) => { this.props.setValue('manualApprove', val); }} value={this.props.values.manualApprove} trackColor={{ true: COLORS.button }} />
                    <Text style={[commonStyles.inputLabel, { paddingTop: 2, marginLeft: 0, marginRight: 2 }]}>Manually approve clients </Text>
                </View>
                <View style={{ flexDirection: 'row-reverse', width: '100%', marginTop: 10, paddingLeft: 15, }}>
                    <Switch onValueChange={(val) => { this.props.setValue('emailNotify', val); }} value={this.props.values.emailNotify} trackColor={{ true: COLORS.button }} />
                    <Text style={[commonStyles.inputLabel, { paddingTop: 2, marginLeft: 0, marginRight: 2 }]}>Notify me on sign ups </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', marginTop: Platform.OS === 'ios' && this.iosVersion < 14 ? 10 : 20 }}>
                    <Text style={[commonStyles.inputLabel, { textAlignVertical: 'center', marginTop: 10, }]}>Grid start time: </Text>
                    {
                        Platform.OS === 'android' &&
                        <TouchableOpacity style={[commonStyles.button, { marginLeft: 10, paddingVertical: 10, }]} onPress={() => { this.setTimePickerVisible(true); }}><Text style={commonStyles.buttonText}>{this.props.values.startTime}</Text></TouchableOpacity>
                    }
                </View>
                {
                    (Platform.OS === 'ios' || this.state.showTimePicker) &&
                    <DateTimePicker
                        style={styles.timePicker}
                        value={new Date(2000, 0, 0, Number(this.props.values.startTime.split(':')[0]) + (this.props.values.startTime.split(' ')[1] === 'AM' ? 0 : 12), Number(this.props.values.startTime.split(' ')[0].split(':')[1]))}
                        mode='time'
                        is24Hour={false}
                        minuteInterval={5}
                        textColor={COLORS.text}
                        display={Platform.OS === 'ios' ? 'default' : 'spinner'}
                        onChange={(event, selectedDate) => { this.props.setValue('startTime', formatAMPM(selectedDate), () => { this.setTimePickerVisible(Platform.OS === 'ios'); }); }}
                    />}
            </View>
        );
    }
}


export { CreateEvent1 };