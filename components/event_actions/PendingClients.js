import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getEventActionStyles from './styles';
import { PendingClient } from '../event_actions';
import API from '../../api';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class PendingClients extends Component {
    constructor(props) {
        super(props);
        this.state = { isFetching: false, clients: this.fillClients(), }
    }

    fillClients = () => {
        var result = [];
        for (var i = 0; i < this.props.event.times.length; ++i) {
            if (this.props.event.times[i].pendingClients !== 'none') {
                for (var j = 0; j < this.props.event.times[i].pendingClients.length; ++j) {
                    result.push({ ...this.props.event.times[i].pendingClients[j], startTime: this.props.event.times[i].startTime, date: this.props.event.times[i].date });
                }
            }
        }
        /*result = result.sort((x, y) => {
            var xMonth = x.date.split(' ')[0]; var yMonth = y.date.split(' ')[0];
            if(months.indexOf(xMonth) < months.indexOf(yMonth)) {
                return -1;
            } else if(months.indexOf(yMonth) < months.indexOf(xMonth)) {
                return 1;
            } else {
                //Sort by day number here
            }
        });*/
        return result;
    }

    renderPendingClient = ({ item, index }) => {
        return <PendingClient newDate={index === 0 || item.date !== this.state.clients[index - 1].date} newTime={index === 0 || item.startTime !== this.state.clients[index - 1].startTime} colors={this.props.colors} item={item} event={this.props.event} index={index} />
    }

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
                <Text style={commonStyles.title}>PENDING CLIENTS</Text>
                {this.state.clients.length === 0
                    ? <View style={{ marginTop: 80 }}>
                        <Text style={commonStyles.text}>
                            This event has no pending clients.
                        </Text>
                    </View>
                    : <View style={{ flex:1, top: 80, }}>
                        <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={<RefreshControl
                            colors={[COLORS.button]}
                            tintColor={COLORS.button}
                            refreshing={this.state.isFetching}
                            onRefresh={this.refreshUser} />}
                        data={this.state.clients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderPendingClient}
                        contentContainerStyle={{paddingBottom: 100}} />
                    </View>
                }
            </View>
        );
    }
}


export { PendingClients };