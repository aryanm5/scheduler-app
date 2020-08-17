import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Platform, FlatList, RefreshControl } from 'react-native';
import Modal from '@kazzkiq/react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Client } from './event_actions';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const getDay = (str) => {
    var d = new Date(str + ', ' + (new Date().getFullYear()));
    return days[d.getDay()];
};

class UpcomingRow extends Component {
    constructor(props) {
        super(props);
        this.state = { showingModal: false, };
    }

    showModal = () => {
        if (this.props.time.clients.length > 0 && this.props.time.clients !== 'none') {
            this.setState({ showingModal: true });
        }
    }
    hideModal = () => {
        this.setState({ showingModal: false });
    }

    renderClient = ({ item, index }) => {
        return <Client user={this.props.user} updateUser={this.props.updateUser} upcoming newDate={index === 0} newTime item={{ ...item, date: this.props.time.date, startTime: this.props.time.startTime, endTime: this.props.time.endTime }} event={this.props.event} index={index} colors={this.props.colors} />
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                minWidth: '100%',
                paddingLeft: 20,
                paddingVertical: 20,
                borderBottomColor: COLORS.gray,
                borderBottomWidth: 1,
                marginBottom: 5,
            },
            date: {
                color: COLORS.text,
                textAlign: 'left',
                marginTop: this.props.index > 0 ? 20 : 10,
                fontSize: 28,
                fontWeight: 'bold',
            },
            time: {
                color: COLORS.text,
                textAlign: 'left',
                fontSize: 16,
            },
            eventName: {
                color: COLORS.text,
                fontSize: 18,
                fontWeight: 'bold',
            },
            eventNameContainer: {
                position: 'absolute',
                right: 20,
                left: '45%',
                top: 0,
                bottom: 0,
                justifyContent: 'center',
            },
            modalHandle: {
                width: 35,
                height: 5,
                borderRadius: 3,
                backgroundColor: COLORS.gray,
                alignSelf: 'center',
                marginTop: 10,
            },
            closeModalButton: {
                position: 'absolute',
                bottom: 25,
                right: 5,
            },
            modalView: {
                height: Dimensions.get('window').height * 0.95,
                width: '100%',
                position: 'absolute',
                ...(Platform.OS === 'android' && { top: 20 }),
                bottom: 0,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: COLORS.gray,
                backgroundColor: COLORS.secondary,
                paddingVertical: 20,
                paddingHorizontal: 15,
            },
        });

        return (
            <>
                {this.props.newDate
                    ? <Text style={styles.date}>{getDay(this.props.time.date) + ', ' + this.props.time.date}</Text>
                    : null
                }
                <TouchableOpacity onPress={this.showModal} activeOpacity={1} style={styles.container}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>
                            {this.props.time.startTime}
                        </Text>
                        <Text style={styles.time}>
                            {this.props.time.endTime}
                        </Text>
                    </View>
                    <View style={styles.eventNameContainer}>
                        <Text numberOfLines={1} style={styles.eventName}>
                            {this.props.event.name}
                        </Text>
                        {this.props.time.clients.length === 0 || this.props.time.clients === 'none'
                            ? null
                            : <View style={styles.clientNames}>
                                {this.props.time.clients.slice(0, (this.props.time.clients.length === 2 ? 2 : 1)).map(client => <Text numberOfLines={1} style={{ color: COLORS.text }}>{client.Name}</Text>)}
                                {this.props.time.clients.length > 2
                                    ? <Text numberOfLines={1} style={{ color: COLORS.text, fontStyle: 'italic', }}>+{this.props.time.clients.length - 1} More...</Text>
                                    : null
                                }
                            </View>
                        }
                    </View>
                </TouchableOpacity>

                <Modal
                    swipeToClose={true}
                    swipeArea={Dimensions.get('window').height * 0.05 + 50} // The height in pixels of the swipeable area, window height by default
                    swipeThreshold={50} // The threshold to reach in pixels to close the modal
                    isOpen={this.state.showingModal}
                    onClosed={this.hideModal}
                    backdropOpacity={0.3}
                    coverScreen={true}
                    backButtonClose={true}
                    style={styles.modalView}
                >
                    <SafeAreaView style={{ flex: 1, }}>
                        <View style={styles.modalHandle} />
                        {this.props.time.clients.length === 0 || this.props.time.clients === 'none'
                            ? <View style={{ marginTop: 80, width: '100%', alignItems: 'center', }}>
                                <Text style={{ color: COLORS.text }}>
                                    This time slot has no approved clients.
                                </Text>
                            </View>
                            :
                            <View style={{ flex: 1, top: 30, paddingHorizontal: 15, }}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.props.time.clients}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={this.renderClient}
                                    contentContainerStyle={{ paddingBottom: 100 }} />
                            </View>
                        }
                        <Icon name='angle-down' size={50} color={COLORS.gray} style={styles.closeModalButton} onPress={this.hideModal} />
                    </SafeAreaView>
                </Modal>
            </>
        );
    }
}


export { UpcomingRow };