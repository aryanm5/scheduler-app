import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Alert, RefreshControl, TouchableOpacity, LayoutAnimation } from 'react-native';
import API from '../api';
import { EventRow } from '../components';
import Icon from 'react-native-vector-icons/AntDesign';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = { isFetching: false, }
    }

    setDeleteAnimation = () => {
        LayoutAnimation.configureNext(LayoutAnimation.create(500, 'easeInEaseOut', 'opacity'));
    }

    eventRenderItem = ({ item, index }) => (<EventRow setDeleteAnimation={this.setDeleteAnimation} colors={this.props.colors} user={this.props.user} updateUser={this.props.updateUser} event={item} index={index} />);

    refreshUser = () => {
        API.get({
            task: 'getUser',
            token: this.props.user.token,
        }, (data) => {
            if (data.err) {
                Alert.alert('Refresh Error', 'An error occurred while refreshing.\nPlease check your internet connection or logout and login again.\nError Message: ' + data.message);
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
                paddingHorizontal: 20,
                alignItems: 'center',
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
                {this.props.user.events.length === 0 || this.props.user.events[0] === 'none'
                    ? <><View style={{ marginTop: 80 }}>
                        <Text style={styles.text}>
                            You don't have any events yet.
                            </Text>
                        <TouchableOpacity onPress={this.props.showCreate} activeOpacity={0.9} style={styles.noEventsCreate}>
                            <Text style={styles.buttonText}>Create Event</Text>
                        </TouchableOpacity>
                    </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 80, width: '100%' }}>
                            <Text style={[styles.text, { fontSize: 20, }]}>
                                Swipe{' '}
                            </Text>
                            <Icon name='arrowright' size={32} color={styles.text.color} />
                        </View>

                    </>
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
        );
    }
}


export { Events };