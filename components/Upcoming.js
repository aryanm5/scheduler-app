import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, RefreshControl, Switch } from 'react-native';
import { UpcomingRow } from '../components';
import API from '../api';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const compareTime = (x, y) => {
    var xDate = x.date.split(' '); var yDate = y.date.split(' ');
    if (months.indexOf(xDate[0]) < months.indexOf(yDate[0])) {
        return -1;
    } else if (months.indexOf(yDate[0]) < months.indexOf(xDate[0])) {
        return 1;
    } else {
        //Sort by day number here
        if (Number(xDate[1]) < Number(yDate[1])) {
            return -1;
        } else if (Number(yDate[1]) < Number(xDate[1])) {
            return 1;
        } else {
            //sort by time here :o
            x = x.startTime; y = y.startTime;
            if (x.split(':')[0] === '12' && x.split(' ')[1] === 'PM' && y.split(' ')[1] === 'PM') { return -1; }
            if (y.split(':')[0] === '12' && y.split(' ')[1] === 'PM' && x.split(' ')[1] === 'PM') { return 1; }
            if (x.split(':')[0] === '12' && x.split(' ')[1] === 'AM' && y.split(' ')[1] === 'AM') { return -1; }
            if (y.split(':')[0] === '12' && y.split(' ')[1] === 'AM' && x.split(' ')[1] === 'AM') { return 1; }
            if (x.split(':')[0].length === 1) { x = '0' + x; }
            if (y.split(':')[0].length === 1) { y = '0' + y; }
            return (x.split(' ')[1] + x.split(' ')[0] > y.split(' ')[1] + y.split(' ')[0]) ? 1 : -1;
        }
    }
}

const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

const formatMD = (date) => {
    return date.toString().split(' ')[1] + ' ' + date.toString().split(' ')[2];
}

class Upcoming extends Component {
    constructor(props) {
        super(props);
        this.daysArr = this.fillDays();
        this.state = { showEmpty: true, isFetching: false, times: [], };
        this.d = new Date();
    }

    setShowEmpty = (setTo) => {
        this.setState({ showEmpty: setTo, });
    }

    addDay = (str) => {
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

    fillDays = () => {
        var d = new Date();
        var today = months[d.getMonth()] + ' ' + d.getDate();
        var result = [today];
        for (var i = 0; i < 14; ++i) {
            result.push(this.addDay(result[result.length - 1]));
        }
        return result;
    }

    fillTimes = () => {
        var result = [];
        this.d = new Date();
        if (this.props.user.events.length > 0 && this.props.user.events[0] !== 'none') {
            for (var i = 0; i < this.props.user.events.length; ++i) {
                for (var j = 0; j < this.props.user.events[i].times.length; ++j) {
                    if (this.daysArr.includes(this.props.user.events[i].times[j].date) && (this.state.showEmpty || this.props.user.events[i].times[j].clients.length > 0 && this.props.user.events[i].times[j].clients !== 'none')) {
                        result.push({ ...this.props.user.events[i].times[j], eventIndex: i, current: (compareTime({ date: formatMD(this.d), startTime: formatAMPM(this.d) }, { date: this.props.user.events[i].times[j].date, startTime: this.props.user.events[i].times[j].startTime }) >= 0 && compareTime({ date: formatMD(this.d), startTime: formatAMPM(this.d) }, { date: this.props.user.events[i].times[j].date, startTime: this.props.user.events[i].times[j].endTime }) <= 0) });
                    }
                }
            }
            result = result.sort(compareTime);
        }
        return result;
    }

    onRefresh = () => {
        this.setState({ isFetching: true });
        API.get({
            task: 'getUser',
            token: this.props.user.token,
        }, (data) => {
            if (data.err) {
                Alert.alert('Refresh Error', 'An error occurred while refreshing.\nPlease check your internet connection or logout and login again.\nError Message: ' + data.message);
            } else {
                this.props.updateUser(data);
                this.setState({ isFetching: false, times: this.fillTimes() });
            }
        });
    }

    renderTime = ({ item, index }) => {
        return <UpcomingRow current={item.current} today={item.date === this.daysArr[0]} newDate={index === 0 || item.date !== this.state.times[index - 1].date} newTime={index === 0 || item.startTime !== this.state.times[index - 1].startTime} user={this.props.user} updateUser={this.props.updateUser} time={item} event={this.props.user.events[item.eventIndex]} index={index} colors={this.props.colors} />
    }

    render() {
        this.state.times = this.fillTimes();
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderTopColor: COLORS.gray,
                borderTopWidth: 1,
            },
            relaxImage: {
                width: '90%',
            },
            filterContainer: {
                position: 'absolute',
                top: 0,
                right: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
            },
            filterText: {
                color: COLORS.text,
                fontSize: 12,
                fontWeight: 'bold',
            },
        });

        return (
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                        <Text style={styles.filterText}>SHOW EMPTY </Text>
                        <Switch onValueChange={this.setShowEmpty} value={this.state.showEmpty} trackColor={{ true: COLORS.button }} ios_backgroundColor={COLORS.lightMode ? undefined : COLORS.secondary} style={{ transform: [{ scaleX: .75 }, { scaleY: .75 }] }} />
                    </View>
                {
                    this.state.times.length > 0
                        ? <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            refreshControl={<RefreshControl
                                colors={[COLORS.button]}
                                tintColor={COLORS.button}
                                refreshing={this.state.isFetching}
                                onRefresh={this.onRefresh} />}
                            data={this.state.times}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderTime}
                            style={{ paddingTop: 10, }} />
                        : <View style={{ marginTop: 80, width: '100%', alignItems: 'center', }}>
                            <Text style={{ color: COLORS.text, fontSize: 18, textAlign: 'center' }}>
                                You have nothing scheduled for the next two weeks!
                            </Text>
                            <Image
                                resizeMode='contain'
                                style={styles.relaxImage}
                                source={require('../images/relax.png')}
                            />
                        </View>
                }

            </View>
        );
    }
}


export { Upcoming };