import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getEventActionStyles from './styles';


class EventLink extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '' };
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);

        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>EVENT LINK</Text>
                <Text style={commonStyles.text}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{this.props.event.name}</Text>{'\n\n'}
                    Send this permanent URL to your clients for them to select time slots:{'\n\n'}
                    <Text style={{ color: COLORS.button, fontWeight: 'bold', }}
                        onPress={() => Linking.openURL(`https://tinyurl.com/scdlr?e=${this.props.user.userId}-${this.props.event.id}`)}>
                        {`https://tinyurl.com/scdlr?e=${this.props.user.userId}-${this.props.event.id}\n\n`}
                    </Text>
                </Text>
            </View>
        );
    }
}


export { EventLink };