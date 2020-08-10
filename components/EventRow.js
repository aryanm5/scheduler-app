import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { SectionRowButton } from '../components';
import { EventInfo, EditEvent, PendingClients, Clients, TimeSlots, EventLink, DeleteEvent } from './event_actions';
import Modal from '@kazzkiq/react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';


class EventRow extends Component {
    constructor(props) {
        super(props);
        this.state = { showingModal: false, modalView: 'event' };
        this.willRemoveModalView = false;
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
        this.setState({ modalView: 'event', showingModal: false });
    }
    setModalView = (setTo) => {
        this.setState({ modalView: setTo }, () => { setTimeout(() => { this.swiper.scrollToEnd(); }, 1); });
    }
    modalBack = () => {
        this.willRemoveModalView = true;
        this.swiper.scrollTo({ x: 0 });
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
                borderRadius: 20,//30
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
                paddingVertical: 20,
                paddingHorizontal: 15,
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
                borderTopRightRadius: 20,//30
                borderBottomRightRadius: 20,
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
                        ? <TouchableOpacity style={styles.numPending} activeOpacity={0.9} onPress={() => { this.showModal(); setTimeout(() => { this.setModalView('pending') }, 400); }}>
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
                        <ScrollView
                            ref={(component) => { this.swiper = component; }}
                            horizontal={true}
                            decelerationRate={0}
                            snapToInterval={Dimensions.get('window').width - 30}
                            snapToAlignment={'center'}
                            contentContainerStyle={{ width: this.state.modalView === 'event' ? '100%' : '200%', }}
                            onMomentumScrollEnd={(e) => { if (this.willRemoveModalView || this.state.modalView !== 'event' && e.nativeEvent.contentOffset.x <= 2) { this.setState({ modalView: 'event' }); this.willRemoveModalView = false; } }}
                            overScrollMode='never'
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ flex: 1 }}>

                                <ScrollView style={{ width: '100%', position: 'absolute', top: 30, bottom: 35, paddingHorizontal: 20, }} showsVerticalScrollIndicator={false}>
                                    <Text style={styles.modalEventName} numberOfLines={2}>
                                        {this.props.event.name}
                                    </Text>
                                    <View style={styles.rowButtonGroup}>
                                        <SectionRowButton onPress={() => { this.setModalView('info'); }} colors={COLORS} text='EVENT INFO' first />
                                        <SectionRowButton onPress={() => { this.setModalView('edit'); }} colors={COLORS} text='EDIT EVENT' />
                                        <SectionRowButton onPress={() => { this.setModalView('link'); }} colors={COLORS} text='GET EVENT LINK' />
                                    </View>
                                    <View style={styles.rowButtonGroup}>
                                        <SectionRowButton onPress={() => { this.setModalView('pending'); }} colors={COLORS} text={`PENDING CLIENTS (${this.numPending})`} first />
                                        <SectionRowButton onPress={() => { this.setModalView('clients'); }} colors={COLORS} text='APPROVED CLIENTS' />
                                        <SectionRowButton onPress={() => { this.setModalView('times'); }} colors={COLORS} text='VIEW TIME SLOTS' />
                                    </View>
                                    <View style={[styles.rowButtonGroup, { paddingVertical: 2 }]}>
                                        <SectionRowButton onPress={() => { this.setModalView('delete'); }} colors={COLORS} text='DELETE EVENT' color='#FF0000' first />
                                    </View>
                                </ScrollView>
                            </View>

                            {
                                this.state.modalView === 'event'
                                    ? null
                                    : <View style={{ flex: 1 }}>{this.renderModalView(this.state.modalView)}</View>
                            }
                        </ScrollView>

                        <Icon name="angle-down" size={50} color={COLORS.gray} style={styles.closeModalButton} onPress={this.hideModal} />
                    </SafeAreaView>
                </Modal>
            </>
        );
    }

    renderModalView = (whichView) => {
        switch (whichView) {
            case 'info': return <EventInfo event={this.props.event} user={this.props.user} colors={this.props.colors} goBack={this.modalBack} />;
            case 'edit': return <EditEvent event={this.props.event} user={this.props.user} updateUser={this.props.updateUser} colors={this.props.colors} goBack={this.modalBack} />;
            case 'pending': return <PendingClients event={this.props.event} user={this.props.user} updateUser={this.props.updateUser} colors={this.props.colors} goBack={this.modalBack} />;
            case 'clients': return <Clients event={this.props.event} user={this.props.user} updateUser={this.props.updateUser} colors={this.props.colors} goBack={this.modalBack} />;
            case 'times': return <TimeSlots event={this.props.event} user={this.props.user} updateUser={this.props.updateUser} colors={this.props.colors} goBack={this.modalBack} />;
            case 'link': return <EventLink event={this.props.event} user={this.props.user} colors={this.props.colors} goBack={this.modalBack} />;
            case 'delete': return <DeleteEvent hideModal={this.hideModal} event={this.props.event} user={this.props.user} updateUser={this.props.updateUser} colors={this.props.colors} goBack={this.modalBack} />;
        }
    }
}


export { EventRow };