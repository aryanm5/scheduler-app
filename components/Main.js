import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Keyboard, ScrollView, Platform } from 'react-native';
import { Events, Upcoming, Settings } from '../components';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
import { CreateEvent } from './event_actions';


const viewNames = ['My Events', 'Upcoming', 'Settings'];

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { showingCreate: false, whichView: 0 };
        this.willRemoveCreate = false;
    }

    showCreate = () => {
        this.setState({ showingCreate: true, }, () => { setTimeout(() => { this.createSwiper.scrollToEnd(); }, 1); });
    }
    hideCreate = () => {
        this.willRemoveCreate = true;
        this.createSwiper.scrollTo({ x: 0 });
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 0,
            },
            header: {
                flex: 0,
                flexDirection: 'row',
                height: Dimensions.get('window').height / 14,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                paddingLeft: 25,
            },
            headerText: {
                color: COLORS.text,
                fontWeight: 'bold',
                fontSize: 36,
                textAlign: 'left',
            },
            createEventButton: {
                position: 'absolute',
                right: 20,
            },
            settingsButton: {
                position: 'absolute',
                right: 10,
            },
            content: {
                flex: 1,
                paddingTop: 15,
            },
            text: {
                textAlign: 'center',
                fontSize: 16,
                color: COLORS.text,
            },
            footer: {
                paddingTop: 5,
            },
        });
        const dotSize = (this.props.user.events.length === 0 || this.props.user.events[0] === 'none' ? 15 : 10);

        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView
                        ref={(component) => { this.createSwiper = component; }}
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={Dimensions.get('window').width - styles.container.paddingHorizontal * 2}
                        snapToAlignment='center'
                        contentContainerStyle={{ width: this.state.showingCreate ? '200%' : '100%', }}
                        onMomentumScrollEnd={(e) => { if (this.willRemoveCreate || this.state.showingCreate && e.nativeEvent.contentOffset.x <= 10) { this.setState({ showingCreate: false }); this.willRemoveCreate = false; } }}
                        onScroll={(event) => {
                            if (Platform.OS === 'android') {
                                if (this.willRemoveCreate && event.nativeEvent.contentOffset.y <= 10) {
                                    this.setState({ showingCreate: false }); this.willRemoveCreate = false;
                                }
                            }
                        }}
                        scrollEventThrottle={100}
                        overScrollMode='never'
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={this.state.showingCreate}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>
                                    {viewNames[this.state.whichView]}
                                </Text>
                                {this.state.whichView < 2 &&
                                    <TouchableOpacity activeOpacity={0.9} onPress={this.showCreate} style={styles.createEventButton}>
                                        <Icon name='pluscircleo' size={38} color={COLORS.button} />
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={styles.content}>
                                <Swiper
                                    loadMinimal={true}
                                    loadMinimalSize={2}
                                    loop={false}
                                    onIndexChanged={(index) => { Keyboard.dismiss(); this.setState({ whichView: index }); }}
                                    dot={<View style={{
                                        backgroundColor: 'rgba(160,160,160,.8)',
                                        width: dotSize,
                                        height: dotSize,
                                        borderRadius: 40,
                                        marginLeft: 5,
                                        marginRight: 5,
                                        marginTop: 3,
                                        marginBottom: 0,
                                    }}
                                    />}
                                    activeDot={<View style={{
                                        backgroundColor: COLORS.button,
                                        width: dotSize,
                                        height: dotSize,
                                        borderRadius: 40,
                                        marginLeft: 5,
                                        marginRight: 5,
                                        marginTop: 3,
                                        marginBottom: 0,
                                    }}
                                    />
                                    }>
                                    <Events showCreate={this.showCreate} colors={COLORS} user={this.props.user} updateUser={this.props.updateUser} />
                                    <Upcoming colors={COLORS} user={this.props.user} updateUser={this.props.updateUser} />
                                    <Settings colors={COLORS} setColors={this.props.setColors} user={this.props.user} updateUser={this.props.updateUser} changeView={this.props.changeView} />
                                </Swiper>
                            </View>
                        </View>

                        {this.state.showingCreate &&
                            <CreateEvent goBack={this.hideCreate} user={this.props.user} updateUser={this.props.updateUser} colors={COLORS} />
                        }
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }

}


export { Main };