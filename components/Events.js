import React, { Component } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Alert, RefreshControl } from 'react-native';
import API from '../api';
import COLORS from '../colors';
import { EventRow } from '../components';


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
        }
    }

    eventRenderItem = ({ item, index }) => (<EventRow event={item} index={index} />);

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
        return (
            <View style={styles.container}>
                <View style={styles.eventsContainer}>
                    {this.props.user.events.length === 0 || this.props.user.events[0] === 'none'
                        ? <View style={{ marginTop: 50 }}>
                            <Text style={styles.text}>
                                You don't have any events yet.
                            </Text>
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
    }
});

export { Events };