import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native';
import getEventActionStyles from './styles';
import { TimeChooser } from '../event_actions';
import Icon from 'react-native-vector-icons/FontAwesome5';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const addMinutes = (str, min) => {
    var hour = Number(str.split(' ')[0].split(':')[0]);
    var minute = (Number(str.split(' ')[0].split(':')[1]) + min);
    var ampm = str.split(' ')[1];
    while (minute >= 60) {
        hour++;
        minute -= 60;
    }
    if (hour == 12 && ampm == 'AM') { ampm = 'PM'; }
    if (hour > 12 && ampm == 'AM') { ampm = 'PM'; hour -= 12; }
    if (hour >= 13 && ampm == 'PM') { hour -= 12; }
    return hour + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + ampm;
}

const backDay = (str) => {
    var month = months.indexOf(str.split(' ')[0]);
    var day = Number(str.split(' ')[1]);
    day--;
    if (day <= 0) {
        month--;
        day = daysInMonth[(month < 0 ? 11 : month)];
    }
    if (month < 0) {
        month = 11;
    }
    return months[month] + ' ' + day;
}
const addDay = (str) => {
    var month = months.indexOf(str.split(' ')[0]);
    var day = Number(str.split(' ')[1]);
    day++;
    if (day > daysInMonth[month]) {
        day = 1;
        month++;
    }
    if (month >= 12) {
        month = 0;
    }
    return months[month] + ' ' + day;
}

class CreateEvent2 extends Component {
    constructor(props) {
        super(props);
        this.state = { readyToLoad: false, loading: true, errorMessage: '', };
        setTimeout(() => { this.setState({ readyToLoad: true, }); }, 30);
    }

    doneLoading = () => {
        this.setState({ loading: false, });
    }

    addTime = (date, startTime, endTime) => {
        this.props.setValue('times', [...this.props.values.times, {
            'duration': this.props.values.duration,
            'date': date,
            'startTime': startTime,
            'endTime': addMinutes(startTime, this.props.values.duration),
        }]);
    }

    removeTime = (date, startTime) => {
        for (var i = 0; i < this.props.values.times.length; ++i) {
            if (this.props.values.times[i].date === date && this.props.values.times[i].startTime === startTime) {
                var old = this.props.values.times;
                old.splice(i, 1);
                this.props.setValue('times', old);
                break;
            }
        }
    }

    clearTimes = () => {
        this.props.setValue('times', []);
    }

    newEventBackWeek = () => {
        var temp = this.props.values.startDate;
        for(var i = 0; i < 7; ++i) {
            temp = backDay(temp);
        }
        this.props.setValue('startDate', temp);
    }
    newEventAddWeek = () => {
        var temp = this.props.values.startDate;
        for(var i = 0; i < 7; ++i) {
            temp = addDay(temp);
        }
        this.props.setValue('startDate', temp);
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                ...commonStyles.container,
                paddingHorizontal: 0,
                justifyContent: 'flex-start',
                marginTop: -10,
            },
            gridControls: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
            },
            gridContainer: {
                height: '100%',
                width: '100%',
            },
            button: {
                ...commonStyles.button,
                paddingVertical: 10,
                borderRadius: 0,
                marginHorizontal: 5,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
        });

        return (
            <View style={styles.container}>
                <View style={styles.gridContainer}>
                    <View style={styles.gridControls}>
                        <TouchableOpacity onPress={this.newEventBackWeek} style={styles.button} activeOpacity={0.8}><Icon name='angle-left' color='#FFF' size={26} /></TouchableOpacity>
                        <TouchableOpacity onPress={this.clearTimes} style={styles.button} activeOpacity={0.8}><Text style={commonStyles.buttonText}>CLEAR</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this.newEventAddWeek} style={styles.button} activeOpacity={0.8}><Icon name='angle-right' color='#FFF' size={26} /></TouchableOpacity>
                    </View>
                    <>
                        {this.state.loading &&
                            <ActivityIndicator size='large' color={COLORS.text} animating={this.state.loading} style={{ marginTop: '16%' }} />
                        }
                        {this.state.readyToLoad &&
                            <TimeChooser addTime={this.addTime} removeTime={this.removeTime} loading={this.state.loading} doneLoading={this.doneLoading} values={this.props.values} colors={COLORS} />
                        }
                    </>
                </View>
            </View>
        );
    }
}


export { CreateEvent2 };