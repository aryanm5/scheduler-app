import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import Slider from '@react-native-community/slider';
import getEventActionStyles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class TimeSlots extends Component {
    constructor(props) {
        super(props);
        this.today = new Date();
        this.timeObj = {};
        this.dates = [];
        this.times = [];
        this.prepGrid();
        this.state = { startDay: 0, daysShowing: this.dates.length >= 7 ? 7 : this.dates.length, };
    }

    getDay = (str) => {
        return days[new Date(this.today.getFullYear(), months.indexOf(str.split(' ')[0]), str.split(' ')[1]).getDay()];
    };

    renderTime = (date, startTime, type, styles) => {
        return (
            <View style={[styles.time, styles['time' + type]]} key={date + '-' + startTime}>
                <Text numberOfLines={2} style={[styles.timeText, styles['timeText' + type]]}>{type === 'Unreal' ? '.\n.' : startTime.replace(' ', '\n')}</Text>
            </View>
        );
    }

    renderColumn = (date, styles) => {
        var times = [];
        for (var i = 0; i < this.times.length; ++i) {
            var time = this.timeObj[date + '-' + this.times[i]];
            var timeType = '';
            if (time !== undefined) {
                if (time.clients !== 'none' && time.clients.length >= this.props.event.maxClients) {
                    timeType = 'Full';
                } else {
                    timeType = 'Open';
                }
            } else {
                //not a real slot -> gray
                timeType = 'Unreal';
            }
            times.push(this.renderTime(date, this.times[i], timeType, styles));
        }
        var dayOfWeek = this.getDay(date);
        var todayDay = months[this.today.getMonth()] + ' ' + this.today.getDate();
        return (
            <View style={styles.timeColumn} key={date}>
                <Text numberOfLines={1} style={date === todayDay ? [styles.timeColumnDay, { backgroundColor: this.props.colors.lightMode ? '#f8ff00' : '#9b870c', }] : styles.timeColumnDay}>{date === todayDay ? 'Today' : dayOfWeek}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={date === todayDay ? [styles.timeColumnDate, { backgroundColor: this.props.colors.lightMode ? '#f8ff00' : '#9b870c', }] : styles.timeColumnDate}>{date}</Text>
                {times}
            </View>
        );
    }

    prepGrid = () => {
        var event = this.props.event;
        for (var i = 0; i < event.times.length; ++i) {
            this.timeObj[event.times[i].date + '-' + event.times[i].startTime] = event.times[i];
            if (!this.dates.includes(event.times[i].date)) {
                this.dates.push(event.times[i].date);
            }
            if (!this.times.includes(event.times[i].startTime)) {
                this.times.push(event.times[i].startTime);
            }
        }

        this.dates.sort((x, y) => {
            if (months.indexOf(x.split(' ')[0]) < months.indexOf(y.split(' ')[0])) {
                return -1;
            }
            if (months.indexOf(y.split(' ')[0]) < months.indexOf(x.split(' ')[0])) {
                return 1;
            }
            if (Number(x.split(' ')[1]) < Number(y.split(' ')[1])) {
                return -1;
            }
            if (Number(y.split(' ')[1]) < Number(x.split(' ')[1])) {
                return 1;
            }
            return 0;
        });

        this.times.sort((x, y) => {
            if (x.split(':')[0] === '12' && x.split(' ')[0].split(':')[1] === '00' && y.split(' ')[1] === 'PM') { return -1; }
            if (y.split(':')[0] === '12' && y.split(' ')[0].split(':')[1] === '00' && x.split(' ')[1] === 'PM') { return 1; }
            if (x.split(':')[0].length === 1) { x = '0' + x; }
            if (y.split(':')[0].length === 1) { y = '0' + y; }
            return (x.split(' ')[1] + x.split(' ')[0] > y.split(' ')[1] + y.split(' ')[0]) ? 1 : -1;
        });
    }

    renderGrid = (styles) => {
        var columns = [];
        for (var i = 0; i < this.state.daysShowing && i + this.state.startDay < this.dates.length; ++i) {
            columns.push(this.renderColumn(this.dates[i + this.state.startDay], styles));
        }
        return columns;
    }

    backDays = () => {
        this.setState({ startDay: this.state.startDay - this.state.daysShowing >= 0 ? this.state.startDay - this.state.daysShowing : 0 });
    }
    forwardDays = () => {
        console.log('startDay: ' + this.state.startDay);
        console.log('daysShowing: ' + this.state.daysShowing);
        this.setState({ startDay: this.state.startDay + this.state.daysShowing * 2 < this.dates.length ? this.state.startDay + this.state.daysShowing : this.dates.length - this.state.daysShowing });
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                ...commonStyles.container,
                paddingHorizontal: this.dates.length > 2 ? 5 : 10,
            },
            gridContainer: {
                width: '100%',
                height: '80%',
            },
            scrollContainer: {
                flexGrow: 1,
                flexDirection: 'row',
                paddingRight: 6,
                paddingTop: 5,
            },
            timeColumn: {
                flex: 1,
                marginRight: 2,
            },
            timeColumnDay: {
                textAlign: 'center',
                color: COLORS.text,
                fontWeight: 'bold',
            },
            timeColumnDate: {
                textAlign: 'center',
                color: COLORS.text,
            },
            time: {
                width: '100%',
                marginTop: 2,
            },
            timeFull: {
                backgroundColor: COLORS.red,
            },
            timeOpen: {
                backgroundColor: COLORS.button,
            },
            timeUnreal: {
                backgroundColor: COLORS.secondary,
            },
            timeText: {
                width: '100%',
                textAlign: 'center',
                paddingHorizontal: 5,
                paddingVertical: 10,
            },
            timeTextFull: {
                color: '#FFF',
            },
            timeTextOpen: {
                color: '#FFF',
            },
            timeTextUnreal: {
                opacity: 0,
            },
            gridControls: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
            },
            button: {
                ...commonStyles.button,
                backgroundColor: 'transparent',
                paddingVertical: 0,
                borderRadius: 0,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            buttonDisabled: {
                opacity: 0.2,
            },
            daysShowing: {
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: this.dates.length > 0 ? 8 : 0,
            },
            sliderLabel: {
                ...commonStyles.text,
                fontSize: null,
            },
        });

        return (
            <View style={styles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>TIME SLOTS</Text>
                <View style={styles.gridControls}>
                    <TouchableHighlight onPress={this.backDays} style={this.state.startDay <= 0 ? [styles.button, styles.buttonDisabled] : styles.button}><Icon5 name='angle-left' color={COLORS.text} size={32} /></TouchableHighlight>

                    <View style={styles.daysShowing}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.sliderLabel, { marginBottom: this.dates.length > 1 ? -8 : 0, }]}>Days to show:</Text>
                        {this.dates.length > 1 &&
                            <Slider
                                style={{ width: '100%', }}
                                minimumValue={1}
                                maximumValue={this.dates.length >= 7 ? 7 : this.dates.length}
                                minimumTrackTintColor={COLORS.button}
                                maximumTrackTintColor={COLORS.background}
                                thumbTintColor={COLORS.button}
                                step={1}
                                value={this.state.daysShowing}
                                onValueChange={(val) => { this.setState({ daysShowing: val }); if (this.state.startDay > this.dates.length - val) { this.setState({ startDay: this.dates.length - this.state.daysShowing, }); } }}
                            />}
                        <Text style={[styles.sliderLabel, { marginTop: this.dates.length > 1 ? -8 : 0, fontWeight: this.dates.length > 1 ? 'normal' : 'bold', fontSize: this.dates.length > 1 ? undefined : 18, }]}>{this.state.daysShowing}</Text>
                    </View>

                    <TouchableHighlight onPress={this.forwardDays} style={this.state.startDay + this.state.daysShowing >= this.dates.length ? [styles.button, styles.buttonDisabled] : styles.button}><Icon5 name='angle-right' color={COLORS.text} size={32} /></TouchableHighlight>
                </View>

                <View style={styles.gridContainer}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}>
                        {this.renderGrid(styles)}
                    </ScrollView>
                </View>
            </View>
        );
    }
}


export { TimeSlots };