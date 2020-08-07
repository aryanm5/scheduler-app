import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getSettingsActionStyles from './styles';


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '' };
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getSettingsActionStyles(COLORS);
        
        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>ACCOUNT</Text>
                <Text style={commonStyles.text}>
                    Account !!
                </Text>
            </View>
        );
    }
}


export { Account };