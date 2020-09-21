import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Share, ActivityIndicator, Dimensions } from 'react-native';
import getEventActionStyles from './styles';
import Ionicon from 'react-native-vector-icons/Ionicons';


class CreateEvent3 extends Component {
    constructor(props) {
        super(props);
        this.state = { created: false, loading: false, errorMessage: '', shareError: '', };
        this.eventId = '';
    }

    shareURL = async (url) => {
        this.setState({ shareError: '' });
        try {
            const result = await Share.share({
                url: url
            });
        } catch (error) {
            this.setState({ shareError: error.message });
        }
    };

    createEvent = () => {
        this.setState({ loading: true });
        this.props.createEvent((data) => {
            this.setState({ loading: false });
            if (data.err) {
                this.setState({ errorMessage: data.message });
            } else {
                for (var i = 0; i < data.events.length; ++i) {
                    if (data.events[i].name === this.props.values.eventName) {
                        this.eventId = data.events[i].id;
                        break;
                    }
                }
                this.setState({ created: true, });
            }
        });
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                ...commonStyles.container,
                paddingHorizontal: 10,
            },
            eventName: {
                ...commonStyles.text,
                fontSize: 20,
                fontWeight: 'bold',
            },
            eventLink: {
                ...commonStyles.text,
                color: COLORS.button,
                fontWeight: 'bold',
            },
            button: {
                ...commonStyles.button,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
        });

        const eventURL = this.state.created ? `https://tinyurl.com/scdlr?e=${this.props.user.userId}-${this.eventId}` : '';
        return (
            <View style={styles.container}>
                {this.state.created
                    ? <>
                        <Ionicon name='checkmark-circle' size={Dimensions.get('window').width*0.5} color={COLORS.green} style={{ marginLeft: 10, textAlign: 'center', marginBottom: 30, }} />
                        <Text style={styles.eventName}>{this.props.values.eventName + '\n'}</Text>
                        <Text style={commonStyles.text}>Your event has been created! Send this permanent URL to your clients for them to select time slots:{'\n'}</Text>
                        <Text style={styles.eventLink}
                            onPress={() => Linking.openURL(eventURL)}>
                            {eventURL}
                        </Text>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', }}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => { this.shareURL(eventURL); }} style={styles.button}>
                                <Text style={commonStyles.buttonText}><Ionicon name='ios-share-outline' size={16} color={commonStyles.buttonText.color} /> Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={this.props.goBack} style={[styles.button, { marginLeft: 20 }]}>
                                <Text style={commonStyles.buttonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={commonStyles.errorText}>{this.state.shareError}</Text>
                    </>
                    : <>
                        <Text style={styles.eventName}>{this.props.values.eventName + '\n'}</Text>
                        <Text style={commonStyles.text}>Press the button below to create your event.{'\n'}</Text>
                        <TouchableOpacity style={commonStyles.button} onPress={this.createEvent} activeOpacity={0.9}>
                            {this.state.loading
                                ? <ActivityIndicator size='small' color='#FFF' animating={this.state.loading} style={{ paddingHorizontal: 15 }} />
                                : <Text style={commonStyles.buttonText}>Create My Event!</Text>
                            }
                        </TouchableOpacity>
                        <Text style={commonStyles.errorText}>{this.state.errorMessage}</Text>
                    </>
                }

            </View>
        );
    }
}


export { CreateEvent3 };