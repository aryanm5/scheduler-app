import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { SectionRowButton } from '../components';
import API from '../api';
import Modal from '@kazzkiq/react-native-modalbox';
import ViewMoreText from 'react-native-view-more-text';
import Icon from 'react-native-vector-icons/FontAwesome';


class EventRow extends Component {
    constructor(props) {
        super(props);
        this.state = { showingModal: false };
    }

    countPendingClients = () => {
        var num = 0;
        for (var i = 0; i < this.props.event.times.length; ++i) {
            if (this.props.event.times[i].pendingClients !== 'none') {
                num += this.props.event.times[i].pendingClients.length;
            }
        }
        return num;
    }

    showModal = () => {
        this.setState({ showingModal: true });
    }
    hideModal = () => {
        this.setState({ showingModal: false });
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                minWidth: '100%',
                backgroundColor: COLORS.secondary,
                paddingHorizontal: 20,
                paddingVertical: 18,
                borderColor: COLORS.gray,
                borderWidth: 1,
                borderRadius: 30,
                marginBottom: 20,
                overflow: 'hidden',
            },
            rowButtonGroup: {
                flex: 1,
                backgroundColor: COLORS.background,
                borderRadius: 20,
                marginTop: 20,
                paddingHorizontal: 15,
                paddingVertical: 10,
            },
            modalHandle: {
                width: 35,
                height: 5,
                borderRadius: 3,
                backgroundColor: COLORS.gray,
                alignSelf: 'center',
                marginTop: 10,
            },
            modalView: {
                height: Dimensions.get('window').height * 0.95,
                width: '100%',
                position: 'absolute',
                bottom: 0,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: COLORS.gray,
                backgroundColor: COLORS.secondary,
                padding: 20,
            },
            modalEventName: {
                color: COLORS.text,
                fontSize: 28,
                fontWeight: 'bold',
                marginBottom: 10,
            },
            modalEventDesc: {
                color: COLORS.text,
                fontSize: 18,
            },
            toggleRead: {
                color: COLORS.button,
                fontSize: 16,
                fontWeight: 'bold',
            },
            closeModalButton: {
                position: 'absolute',
                bottom: 25,
                right: 5,
            },
            eventName: {
                color: COLORS.text,
                fontSize: 18,
                fontWeight: 'bold',
            },
            numPending: {
                backgroundColor: COLORS.button,
                position: 'absolute',
                width: '12%',
                justifyContent: 'center',
                top: 0,
                bottom: 0,
                right: 0,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
            },
            numPendingText: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                textAlignVertical: 'center',
            },
            even: {
                backgroundColor: COLORS.background,
            },
        });

        this.numPending = this.countPendingClients();
        return (
            <>
                <TouchableOpacity onPress={this.showModal} activeOpacity={1} style={this.props.index % 2 === 0 ? [styles.container, styles.even] : styles.container}>
                    <Text style={styles.eventName}>
                        {this.props.event.name}
                    </Text>
                    {this.numPending > 0
                        ? <TouchableOpacity style={styles.numPending} activeOpacity={0.9} onPress={() => { }} >
                            <Text style={styles.numPendingText}>
                                {this.numPending}
                            </Text>
                        </TouchableOpacity>
                        : null
                    }


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
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.modalHandle}></View>
                        <ScrollView style={{ width: '100%', position: 'absolute', top: 30, bottom: 35, paddingHorizontal: 20, }} showsVerticalScrollIndicator={false}>
                            <Text style={styles.modalEventName} numberOfLines={2}>
                                {this.props.event.name}
                            </Text>
                            <ViewMoreText
                                numberOfLines={3}
                                renderViewMore={(onPress) => <Text onPress={onPress} style={styles.toggleRead}>Read More</Text>}
                                renderViewLess={(onPress) => <Text onPress={onPress} style={styles.toggleRead}>Read Less</Text>}
                            >
                                <Text style={styles.modalEventDesc}>
                                    {this.props.event.desc}
                                </Text>
                            </ViewMoreText>

                            <View style={styles.rowButtonGroup}>
                                <SectionRowButton colors={COLORS} text='EDIT EVENT' first />
                                <SectionRowButton colors={COLORS} text={`PENDING CLIENTS (${this.numPending})`} />
                                <SectionRowButton colors={COLORS} text='APPROVED CLIENTS' />
                                <SectionRowButton colors={COLORS} text='VIEW TIME SLOTS' />
                                <SectionRowButton colors={COLORS} text='GET EVENT LINK' />
                            </View>
                            <View style={[styles.rowButtonGroup, { paddingVertical: 2 }]}>
                                <SectionRowButton colors={COLORS} text='DELETE EVENT' color='#FF0000' first />
                            </View>
                        </ScrollView>
                        <Icon name="angle-down" size={50} color={COLORS.gray} style={styles.closeModalButton} onPress={this.hideModal} />
                    </SafeAreaView>
                </Modal>
            </>
        );
    }
}


export { EventRow };