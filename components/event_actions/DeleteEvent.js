import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getEventActionStyles from './styles';


class DeleteEvent extends Component {
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
                <Text style={commonStyles.title}>DELETE EVENT</Text>
                <Text style={commonStyles.text}>
                    Delete Event !!
                </Text>
            </View>
        );
    }
}


export { DeleteEvent };