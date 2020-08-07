import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { Events, Upcoming, Settings } from '../components';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';


const viewNames = ['My Events', 'Upcoming', 'Settings'];

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { whichView: 0 };
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 30,
            },
            header: {
                flex: 0,
                flexDirection: 'row',
                height: Dimensions.get('window').height / 12,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                paddingLeft: 15,
            },
            headerText: {
                color: COLORS.text,
                fontWeight: 'bold',
                fontSize: 36,
                textAlign: 'left',
            },
            createEventButton: {
                position: 'absolute',
                right: 5,
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

        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            {viewNames[this.state.whichView]}
                        </Text>
                        {
                            this.state.whichView < 2
                                ? <TouchableOpacity activeOpacity={0.9} onPress={() => { }} style={styles.createEventButton}>
                                    <Icon name='pluscircleo' size={38} color={COLORS.button} />
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                    <View style={styles.content}>
                        <Swiper
                            loadMinimal={true}
                            loadMinimalSize={2}
                            loop={false}
                            onIndexChanged={(index) => { this.setState({ whichView: index }); }}
                            dot={<View style={{
                                backgroundColor: 'rgba(160,160,160,.8)',
                                width: 10,//8
                                height: 10,
                                borderRadius: 40,
                                marginLeft: 5,
                                marginRight: 5,
                                marginTop: 3,
                                marginBottom: 0,
                            }}
                            />}
                            activeDot={<View style={{
                                backgroundColor: COLORS.button,
                                width: 10,//8
                                height: 10,
                                borderRadius: 40,
                                marginLeft: 5,
                                marginRight: 5,
                                marginTop: 3,
                                marginBottom: 0,
                            }}
                            />
                            }>
                            <Events colors={COLORS} user={this.props.user} updateUser={this.props.updateUser} />
                            <Upcoming colors={COLORS} user={this.props.user} updateUser={this.props.updateUser} />
                            <Settings colors={COLORS} setColors={this.props.setColors} user={this.props.user} updateUser={this.props.updateUser} changeView={this.props.changeView} />
                        </Swiper>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}


export { Main };