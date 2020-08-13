import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getEventActionStyles from './styles';
import { Client } from '../event_actions';
import API from '../../api';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = { refresh: false, isFetching: false, clients: this.fillClients(), }
    }

    fillClients = () => {
        var result = [];
        for (var i = 0; i < this.props.event.times.length; ++i) {
            if (this.props.event.times[i].clients !== 'none') {
                for (var j = 0; j < this.props.event.times[i].clients.length; ++j) {
                    result.push({ ...this.props.event.times[i].clients[j], startTime: this.props.event.times[i].startTime, endTime: this.props.event.times[i].endTime, date: this.props.event.times[i].date });
                }
            }
        }
        result = result.sort((x, y) => {
            var xDate = x.date.split(' '); var yDate = y.date.split(' ');
            if(months.indexOf(xDate[0]) < months.indexOf(yDate[0])) {
                return -1;
            } else if(months.indexOf(yDate[0]) < months.indexOf(xDate[0])) {
                return 1;
            } else {
                //Sort by day number here
                if(Number(xDate[1]) < Number(yDate[1])) {
                    return -1;
                } else if(Number(yDate[1]) < Number(xDate[1])) {
                    return 1;
                } else {
                    //sort by time here :o
                    x = x.startTime; y = y.startTime;
                    if(x.split(':')[0] == '12' && x.split(' ')[0].split(':')[1] == '00' && y.split(' ')[1] == 'PM') { return -1; }
                    if(y.split(':')[0] == '12' && y.split(' ')[0].split(':')[1] == '00' && x.split(' ')[1] == 'PM') { return 1; }
                    if(x.split(':')[0].length === 1) { x = '0' + x; }
                    if(y.split(':')[0].length === 1) { y = '0' + y; }
                    return (x.split(' ')[1] + x.split(' ')[0] > y.split(' ')[1] + y.split(' ')[0]) ? 1 : -1;
                }
            }
        });
        return result;
    }

    renderClient = ({ item, index }) => {
        return <Client pending={false} fillClients={() => { this.setState({ isFetching: false, clients: this.fillClients() }); }} newDate={index === 0 || item.date !== this.state.clients[index - 1].date} newTime={index === 0 || item.startTime !== this.state.clients[index - 1].startTime} colors={this.props.colors} user={this.props.user} updateUser={this.props.updateUser} item={item} event={this.props.event} index={index} />
    };


    refreshUser = () => {
        this.setState({ isFetching: true });
        API.get({
            task: 'getUser',
            token: this.props.user.token,
        }, (data) => {
            if (data.err) {
                Alert.alert('Refresh Error', 'An error occurred while refreshing.\nPlease check your internet connection or logout and login again.\nError Message: ' + data.message);
            } else {
                this.props.updateUser(data);
                this.setState({ isFetching: false, clients: this.fillClients() });
            }
        });
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);

        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>APPROVED CLIENTS</Text>
                {this.state.clients.length === 0
                    ? <View style={{ marginTop: 80 }}>
                        <Text style={commonStyles.text}>
                            This event has no approved clients.
                        </Text>
                    </View>
                    : <View style={{ flex: 1, top: 80, }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            refreshControl={<RefreshControl
                                colors={[COLORS.button]}
                                tintColor={COLORS.button}
                                refreshing={this.state.isFetching}
                                onRefresh={this.refreshUser} />}
                            data={this.state.clients}
                            keyExtractor = {(item, index) => index.toString()}
                            renderItem={this.renderClient}
                            contentContainerStyle={{ paddingBottom: 100 }} />
                    </View>
                }
            </View>
        );
    }
}


export { Clients };