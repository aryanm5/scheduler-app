import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { UpcomingRow } from '../components';
import API from '../api';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class Upcoming extends Component {
    constructor(props) {
        super(props);
        this.daysArr = this.fillDays();
        this.state = { isFetching: false, times: [], };
    }

    addDay = (str) => {
        var month = months.indexOf(str.split(" ")[0]);
        var day = Number(str.split(" ")[1]);
        day++;
        if (day > daysInMonth[month]) {
            day = 1;
            month++;
        }
        if (month >= 12) {
            month = 0;
        }
        return months[month] + " " + day;
    }

    fillDays = () => {
        var d = new Date();
        var today = months[d.getMonth()] + " " + d.getDate();
        var result = [today];
        for (var i = 0; i < 14; ++i) {
            result.push(this.addDay(result[result.length - 1]));
        }
        return result;
    }

    fillTimes = () => {
        var result = [];
        for (var i = 0; i < this.props.user.events.length; ++i) {
            for (var j = 0; j < this.props.user.events[i].times.length; ++j) {
                if (this.daysArr.includes(this.props.user.events[i].times[j].date)) {
                    result.push({...this.props.user.events[i].times[j], eventIndex: i});
                }
            }
        }
        result = result.sort((x, y) => {
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
                    if (x.split(':')[0] == '12' && x.split(' ')[0].split(':')[1] == '00' && y.split(' ')[1] == 'PM') { return -1; }
                    if (y.split(':')[0] == '12' && y.split(' ')[0].split(':')[1] == '00' && x.split(' ')[1] == 'PM') { return 1; }
                    if (x.split(':')[0].length === 1) { x = '0' + x; }
                    if (y.split(':')[0].length === 1) { y = '0' + y; }
                    return (x.split(' ')[1] + x.split(' ')[0] > y.split(' ')[1] + y.split(' ')[0]) ? 1 : -1;
                }
            }
        });
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
        return <UpcomingRow newDate={index === 0 || item.date !== this.state.times[index - 1].date} newTime={index === 0 || item.startTime !== this.state.times[index - 1].startTime} colors={this.props.colors} user={this.props.user} updateUser={this.props.updateUser} time={item} event={this.props.user.events[item.eventIndex]} index={index} colors={this.props.colors} />
    }

    render() {
        this.state.times = this.fillTimes();
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
            },
        });
        console.log(this.state.times);

        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        colors={[COLORS.button]}
                        tintColor={COLORS.button}
                        refreshing={this.state.isFetching}
                        onRefresh={this.onRefresh} />}
                    data={this.state.times}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderTime} />
            </View>
        );
    }
}


export { Upcoming };