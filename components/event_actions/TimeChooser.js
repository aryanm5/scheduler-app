import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import getEventActionStyles from './styles';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
const addMinutes = (str, min) => {
    var hour = Number(str.split(' ')[0].split(':')[0]);
    var minute = (Number(str.split(' ')[0].split(':')[1]) + min);
    var ampm = str.split(' ')[1];
    while (minute >= 60) {
        hour++;
        minute -= 60;
    }
    if (hour === 12 && ampm === 'AM') { ampm = 'PM'; }
    if (hour > 12 && ampm === 'AM') { ampm = 'PM'; hour -= 12; }
    if (hour >= 13 && ampm === 'PM') { hour -= 12; }
    return hour + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + ampm;
}

class TimeChooser extends Component {
    constructor(props) {
        super(props);
        this.d = new Date();
        this.today = months[this.d.getMonth()] + ' ' + this.d.getDate();
        this.numColumns = (23 - (Number(this.props.values.startTime.split(':')[0]) + (this.props.values.startTime.split(' ')[1] === 'AM' ? 0 : 12)))*60/this.props.values.duration;
    }

    renderColumn = (info, slots, styles) => {
        return (
            <View style={styles.column} key={info.date}>
                <Text style={info.date === this.today ? [styles.columnDay, { backgroundColor: this.props.colors.lightMode ? '#f8ff00' : '#9b870c', }] : styles.columnDay} numberOfLines={1}>{info.date === this.today ? 'Today' : days[info.dayOfWeek]}</Text>
                <Text style={info.date === this.today ? [styles.columnDate, { backgroundColor: this.props.colors.lightMode ? '#f8ff00' : '#9b870c', }] : styles.columnDate} adjustsFontSizeToFit numberOfLines={1}>{info.date}</Text>
                {slots.map(slot => { return this.renderSlot({ date: slot.date, startTime: slot.startTime, active: slot.active }, styles); })}
            </View>
        );
    }

    renderSlot = (time, styles) => {
        return (
            <TouchableOpacity onPress={() => { time.active ? this.props.removeTime(time.date, time.startTime) : this.props.addTime(time.date, time.startTime) }} style={time.active ? [styles.slot, styles.activeSlot] : styles.slot} key={time.date + '-' + time.startTime} activeOpacity={1}>
                <Text style={time.active ? [styles.slotText, styles.activeSlotText] : styles.slotText} adjustsFontSizeToFit numberOfLines={2}>
                    {time.startTime}
                </Text>
            </TouchableOpacity>
        )
    }

    renderGrid = (styles) => {
        var date = this.props.values.startDate;
        var dur = this.props.values.duration;
        var firstTime = this.props.values.startTime;
        var currentTime = firstTime;
        var tempTimeObj = {};
        for (var i = 0; i < this.props.values.times.length; ++i) {
            tempTimeObj[this.props.values.times[i].date + '-' + this.props.values.times[i].startTime] = true;
        }

        var columns = [];
        for (var i = 1; i <= 7; ++i) {
            var dayOfWeek = new Date(this.d.getFullYear(), months.indexOf(date.split(' ')[0]), Number(date.split(' ')[1])).getDay();
            var slots = [];
            for (var j = 0; j < this.numColumns; ++j) {
                slots.push({ date: date, startTime: currentTime, active: tempTimeObj[date + '-' + currentTime] === true, });
                currentTime = addMinutes(currentTime, dur);
            }

            columns.push(this.renderColumn({ date: date, dayOfWeek: dayOfWeek }, slots, styles));

            currentTime = firstTime;
            date = addDay(date);
        }

        if (this.props.loading) {
            this.props.doneLoading();
        }
        return columns;
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                flexGrow: 1,
                flexDirection: 'row',
            },
            column: {
                flex: 1,
                marginHorizontal: 1,
            },
            columnDay: {
                textAlign: 'center',
                color: COLORS.text,
                fontWeight: 'bold',
                fontSize: 15,
            },
            columnDate: {
                width: '100%',
                textAlign: 'center',
                color: COLORS.text,
            },
            slot: {
                width: '100%',
                backgroundColor: COLORS.secondary,
                margin: 1,
            },
            activeSlot: {
                backgroundColor: COLORS.button,
            },
            slotText: {
                width: '100%',
                color: COLORS.text,
                textAlign: 'center',
                paddingHorizontal: 5,
                paddingVertical: 10,
            },
            activeSlotText: {
                color: COLORS.lightMode ? '#FFF' : COLORS.text,
            },
        });

        return (
            <ScrollView
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {this.renderGrid(styles)}
            </ScrollView>
        );
    }
}


export { TimeChooser };