import React, { Component } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import API from '../api';
import { EventRow } from '../components';


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
        }
    }

    eventRenderItem = ({ item, index }) => (<EventRow colors={this.props.colors} event={item} index={index} />);

    refreshUser = () => {
        API.get({
            task: 'getUser',
            token: this.props.user.token,
        }, (data) => {
            if (data.err) {
                Alert.alert('Refresh Error', 'An error occurred while refreshing.\nPlease check your internet connection.\nError Message: ' + data.message);
            } else {
                this.props.updateUser(data);
                this.setState({ isFetching: false, });
            }
        });
    }

    onRefresh = () => {
        this.setState({ isFetching: true, }, this.refreshUser);
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            },
            eventsContainer: {
                flex: 1,
            },
            text: {
                color: COLORS.text,
                fontSize: 18,
            },
            buttonText: {
                color: '#FFF',
                fontSize: 18,
            },
            noEventsCreate: {
                backgroundColor: COLORS.button,
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderRadius: 15,
                marginTop: 20,
                alignItems: 'center',
            },
        });

        return (
            <View style={styles.container}>
                <View style={styles.eventsContainer}>
                    {this.props.user.events.length === 0 || this.props.user.events[0] === 'none'
                        ? <View style={{ marginTop: 80 }}>
                            <Text style={styles.text}>
                                You don't have any events yet.
                            </Text>
                            <TouchableOpacity onPress={() => { }} activeOpacity={0.9} style={styles.noEventsCreate}>
                                <Text style={styles.buttonText}>Create Event</Text>
                            </TouchableOpacity>
                        </View>
                        : <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            refreshControl={<RefreshControl
                                colors={[COLORS.button]}
                                tintColor={COLORS.button}
                                refreshing={this.state.isFetching}
                                onRefresh={this.onRefresh} />}
                            data={this.props.user.events}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.eventRenderItem} />
                    }
                </View>
            </View>
        );
    }
}


export { Events };