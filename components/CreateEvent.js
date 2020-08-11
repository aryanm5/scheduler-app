import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getEventActionStyles from './event_actions/styles';


class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '' };
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                ...commonStyles.container,
                paddingHorizontal:0,
            },
            title: {
                ...commonStyles.title,
                fontSize: 24,
            },
            backButton: {
                ...commonStyles.backButton,
                paddingLeft: 10,
                paddingRight: 50,
            },
        });

        return (
            <View style={styles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={styles.backButton} />
                <Text style={styles.title}>CREATE EVENT</Text>
                <Text style={commonStyles.text}>
                    Create an event!
                </Text>
            </View>
        );
    }
}


export { CreateEvent };