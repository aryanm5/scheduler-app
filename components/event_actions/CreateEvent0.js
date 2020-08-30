import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, } from 'react-native';
import getEventActionStyles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome';


class CreateEvent0 extends Component {
    constructor(props) {
        super(props);
    }

    validateName = () => {
        this.props.showNav();
        if (this.props.values.eventName.length < 1) {
            this.props.setValue('eventNameError', 'Please enter an Event name.');
            this.props.setValue('step0valid', false);
        } else {
            this.props.setValue('eventNameError', '');
            if (this.props.values.eventDesc.length >= 1) { this.props.setValue('step0valid', true); }
        }
    }
    validateDesc = () => {
        this.props.showNav();
        if (this.props.values.eventDesc.length < 1) {
            this.props.setValue('eventDescError', 'Please enter an Event description.');
            this.props.setValue('step0valid', false);
        } else {
            this.props.setValue('eventDescError', '');
            if (this.props.values.eventName.length >= 1) { this.props.setValue('step0valid', true); }
        }
    }
    fixMaxClients = () => {
        this.props.showNav();
        if (this.props.values.maxClients < 1) {
            this.props.setValue('maxClients', 1);
        } else if (this.props.values.maxClients > 99) {
            this.props.setValue('maxClients', 99);
        }
    }
    incMaxClients = () => {
        if (this.props.values.maxClients < 99) {
            this.props.setValue('maxClients', this.props.values.maxClients + 1);
        }
    }
    decMaxClients = () => {
        if (this.props.values.maxClients > 1) {
            this.props.setValue('maxClients', this.props.values.maxClients - 1);
        }
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
            textInputError: {
                ...commonStyles.textInput,
                borderColor: COLORS.red,
                borderWidth: COLORS.lightMode ? commonStyles.textInput.borderWidth : 3,
            },
            multilineTextInputError: {
                ...commonStyles.textInput,
                ...commonStyles.multilineTextInput,
                borderColor: COLORS.red,
                borderWidth: COLORS.lightMode ? commonStyles.textInput.borderWidth : 2,
            },
            radioButtonRow: {
                width: '100%',
                height: '10%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
            radioButton: {
                height: '100%',
                flex: 1,
                justifyContent: 'center',
                backgroundColor: COLORS.secondary,
                margin: 5,
                paddingHorizontal: 10,
                borderRadius: 12,
            },
            radioButtonSelected: {
                backgroundColor: COLORS.button,
            },
            radioButtonText: {
                color: COLORS.text,
                textAlignVertical: 'center',
                textAlign: 'center',
                fontSize: 15,
            },
            radioButtonTextSelected: {
                color: '#FFF',
                fontWeight: 'bold',
            },
            maxClientsLabel: {
                ...commonStyles.inputLabel,
            },
            numberInput: {
                ...commonStyles.textInput,
                width: '16%',
                height: 35,
                fontSize: 16,
                paddingHorizontal: 5,
                borderRadius: 5,
                borderWidth: COLORS.lightMode ? 2 : 0
            },
            numberChanger: {
                paddingHorizontal: 8,
            },
        });

        return (
            <View style={styles.container}>
                <Text style={commonStyles.inputLabel}>Event Name:</Text>
                <TextInput onFocus={this.props.hideNav} defaultValue={this.props.values.eventName} onBlur={this.validateName} style={this.props.values.eventNameError.length > 0 ? styles.textInputError : commonStyles.textInput} onChangeText={(val) => { this.props.setValue('eventName', val); }} placeholder='Tennis Lessons with Joe' placeholderTextColor='#808080' selectionColor='#000' />
                <Text style={commonStyles.createEventError}>{this.props.values.eventNameError.length > 0 && <Icon name='warning' size={18} />}{' ' + this.props.values.eventNameError}</Text>

                <Text style={[commonStyles.inputLabel, { marginTop: 10, }]}>Description:</Text>
                <TextInput onFocus={this.props.hideNav} multiline={true} defaultValue={this.props.values.eventDesc} onBlur={this.validateDesc} style={this.props.values.eventDescError.length > 0 ? styles.multilineTextInputError : [commonStyles.textInput, commonStyles.multilineTextInput]} onChangeText={(val) => { this.props.setValue('eventDesc', val); }} placeholder={`Sign up for tennis lessons with Coach Joe at Joe Tennis Academy!\n\nContact Joe at joe@example.com.`} placeholderTextColor='#808080' selectionColor='#000' />
                <Text style={commonStyles.createEventError}>{this.props.values.eventDescError.length > 0 && <Icon name='warning' size={18} />}{' ' + this.props.values.eventDescError}</Text>

                <Text style={[commonStyles.inputLabel, { marginTop: 10, }]}>Time Slot Duration:</Text>
                <View style={styles.radioButtonRow}>
                    {this.renderRadioButton(15, '15 min', styles)}{this.renderRadioButton(30, '30 min', styles)}{this.renderRadioButton(45, '45 min', styles)}
                </View>
                <View style={[styles.radioButtonRow, { marginTop: 10, }]}>
                    {this.renderRadioButton(60, '1 hour', styles)}{this.renderRadioButton(90, '90 min', styles)}{this.renderRadioButton(120, '2 hour', styles)}
                </View>

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                    <Text style={styles.maxClientsLabel}>Max Clients/Slot: </Text>
                    <View style={{ width: '100%', marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={styles.numberChanger} onPress={this.decMaxClients} activeOpacity={0.8}><FontIcon name='minus' color={COLORS.text} size={24} /></TouchableOpacity>
                        <TextInput maxLength={2} onFocus={this.props.hideNav} defaultValue={this.props.values.maxClients.toString()} onBlur={this.fixMaxClients} style={styles.numberInput} onChangeText={(val) => { this.props.setValue('maxClients', val); }} textAlign='center' placeholder='1' placeholderTextColor='#808080' selectionColor='#000' keyboardType='numeric' />
                        <TouchableOpacity style={[styles.numberChanger, { paddingRight: 5, }]} onPress={this.incMaxClients} activeOpacity={0.8}><FontIcon name='plus' color={COLORS.text} size={24} /></TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }

    renderRadioButton = (num, val, styles) => {
        return <TouchableOpacity onPress={() => { this.props.setValue('duration', num); }} style={this.props.values.duration === num ? [styles.radioButton, styles.radioButtonSelected] : styles.radioButton} activeOpacity={0.8}><Text style={this.props.values.duration === num ? [styles.radioButtonText, styles.radioButtonTextSelected] : styles.radioButtonText}>{val}</Text></TouchableOpacity>;
    }
}


export { CreateEvent0 };