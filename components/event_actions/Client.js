import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert, } from 'react-native';
import getEventActionStyles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import API from '../../api';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months  = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getDay = (str) => {
    return days[new Date(new Date().getFullYear(), months.indexOf(str.split(' ')[0]), str.split(' ')[1]).getDay()];
};

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = { showingDecline: false, animationOver: false, declineWidth: new Animated.Value(44), };
    }

    approve = () => {
        API.get({
            task: 'approveTimeRequest',
            token: this.props.user.token,
            eventName: this.props.event.name,
            date: this.props.item.date,
            startTime: this.props.item.startTime,
            endTime: this.props.item.endTime,
            clientName: this.props.item.Name,
            clientEmail: this.props.item.Email,
        }, (data) => {
            if (data.err) {
                Alert.alert('There was an error approving this pending client: ' + data.message);
            } else {
                this.props.updateUser(data);
                if(!this.props.upcoming) { this.props.fillClients(); }
            }
        });
    }

    decline = () => {
        if (this.state.animationOver) {
            API.get({
                task: 'deleteTimeRequest',
                token: this.props.user.token,
                eventName: this.props.event.name,
                date: this.props.item.date,
                startTime: this.props.item.startTime,
                endTime: this.props.item.endTime,
                requestName: this.props.item.Name,
                requestEmail: this.props.item.Email,
            }, (data) => {
                if (data.err) {
                    Alert.alert('There was an error declining this pending client: ' + data.message);
                } else {
                    this.setState({ showingDecline: false, });
                    this.props.updateUser(data);
                    if(!this.props.upcoming) { this.props.fillClients(); }
                }
            });
        }
    }

    remove = () => {
        if (this.state.animationOver) {
            API.get({
                task: 'deleteClient',
                token: this.props.user.token,
                eventName: this.props.event.name,
                date: this.props.item.date,
                startTime: this.props.item.startTime,
                endTime: this.props.item.endTime,
                clientName: this.props.item.Name,
                clientEmail: this.props.item.Email,
            }, (data) => {
                if (data.err) {
                    Alert.alert('There was an error removing this client: ' + data.message);
                } else {
                    this.setState({ showingDecline: false, });
                    this.props.updateUser(data);
                    if(!this.props.upcoming) { this.props.fillClients(); }
                }
            });
        }
    }

    xPressed = () => {
        this.setState({ showingDecline: true, });
        this.expandDeclineAnimation = Animated.timing(this.state.declineWidth, {
            toValue: 250,
            duration: 700,
            useNativeDriver: false,
        }).start(() => { this.setState({ animationOver: true, }); });
    }

    dismissDecline = () => {
        this.setState({ animationOver: false, });
        Animated.timing(this.state.declineWidth, {
            toValue: 44,
            duration: 700,
            useNativeDriver: false,
        }).start(() => { this.setState({ showingDecline: false, }); });
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                minWidth: '100%',
                backgroundColor: COLORS.background,
                marginTop: this.props.newTime ? 10 : 0,
            },
            upcomingDate: {
                ...commonStyles.text,
                textAlign: 'left',
                fontSize: 20,
            },
            date: {
                ...commonStyles.text,
                textAlign: 'left',
                marginTop: this.props.index > 0 ? 20 : 0,
                fontSize: 28,
                fontWeight: 'bold',
            },
            time: {
                ...commonStyles.text,
                textAlign: 'left',
                marginLeft: 10,
                fontSize: 20,
            },
            buttons: {
                position: 'absolute',
                right: 10,
                top: 10,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            },
            actionButton: {
                paddingHorizontal: 10,
                paddingVertical: 5,
            },
            declineContainer: {
                backgroundColor: COLORS.red,
                padding: 5,
                borderRadius: 5,
                marginVertical: 5,
            },
            declineButtonText: {
                color: '#FFF',
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
                textAlignVertical: 'center',
            },
            clientInfo: {
                ...commonStyles.text,
                textAlign: 'left',
                marginLeft: 10,
                fontSize: 17,
            },
            divider: {
                width: '95%',
                alignSelf: 'center',
                borderTopColor: COLORS.lightMode ? 'rgba(50, 50, 50, 0.2)' : 'rgba(230, 230, 230, 0.3)',
                borderTopWidth: 1,
                marginTop: -20,
                paddingBottom: 20,
            },
        });

        return (
            <>
                {this.props.newDate
                    ? this.props.upcoming
                        ? <><Text style={styles.date} numberOfLines={2}>{this.props.event.name}</Text>
                            <Text style={styles.upcomingDate}>{getDay(this.props.item.date) + ', ' + this.props.item.date}</Text>
                            <Text style={styles.upcomingDate}>{`${this.props.item.startTime} - ${this.props.item.endTime}`}</Text></>
                        : <Text style={styles.date}>{getDay(this.props.item.date) + ', ' + this.props.item.date}</Text>
                    : null
                }
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity={1} onPress={this.dismissDecline} style={{ paddingHorizontal: 20, paddingVertical: 20, }}><>
                        {
                            !this.props.newDate && !this.props.newTime
                                ? <View style={styles.divider} />
                                : null
                        }

                        <Text style={styles.time}>{this.props.upcoming ? this.props.index+1 : this.props.item.startTime}</Text>
                        <Text style={styles.clientInfo}>{this.props.event.clientInfo.map(i => { return <><Text style={{ fontWeight: 'bold', }}>{'\n' + i}:</Text><Text> {this.props.item[i]}</Text></>; })}</Text>

                        <View style={styles.buttons}>
                            {this.props.pending
                                ? <TouchableOpacity activeOpacity={0.8} style={styles.actionButton} onPress={this.approve}><Icon name='check' size={34} color={COLORS.green} style={styles.approveButton} /></TouchableOpacity>
                                : null
                            }
                            {this.state.showingDecline
                                ? <Animated.View style={[styles.declineContainer, { maxWidth: this.state.declineWidth }]}><TouchableOpacity activeOpacity={0.8} onPress={this.props.pending ? this.decline : this.remove}><Text numberOfLines={1} ellipsizeMode='clip' style={styles.declineButtonText}>{this.props.pending ? 'DECLINE' : 'REMOVE CLIENT'}</Text></TouchableOpacity></Animated.View>
                                : <TouchableOpacity activeOpacity={0.8} style={styles.actionButton} onPress={this.xPressed}><Icon name='times' size={34} color={COLORS.red} style={styles.xButton} /></TouchableOpacity>
                            }
                        </View></>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}


export { Client };