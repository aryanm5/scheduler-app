import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import getEventActionStyles from './styles';


class EventLink extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '' };
    }

    shareURL = async (url) => {
        this.setState({ errorMessage: '' });
        try {
            const result = await Share.share({
                url: url
            });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
    };

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const eventURL = `https://tinyurl.com/scdlr?e=${this.props.user.userId}-${this.props.event.id}`;
        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>EVENT LINK</Text>
                <Text style={commonStyles.text}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{this.props.event.name}</Text>{'\n\n'}
                    Send this permanent URL to your clients for them to select time slots:{'\n\n'}
                    <Text style={{ color: COLORS.button, fontWeight: 'bold', }}
                        onPress={() => Linking.openURL(eventURL)}>
                        {`${eventURL}`}
                    </Text>
                </Text>
                <TouchableOpacity activeOpacity={0.9} onPress={() => { this.shareURL(eventURL); }} style={commonStyles.button}>
                    <Text style={commonStyles.buttonText}>
                        <Ionicon name='ios-share-outline' size={18} color={commonStyles.buttonText.color} />
                        {' '}Share
                    </Text>
                </TouchableOpacity>
                <Text style={commonStyles.errorText}>
                    {this.state.errorMessage}
                </Text>
            </View>
        );
    }
}


export { EventLink };