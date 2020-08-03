import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import API from '../api';
import COLORS from '../colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';


class EventRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.index%2===0 ? [styles.container, styles.even] : styles.container}>
                <Text style={styles.eventName}>
                    {this.props.event.name}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 20,
    },
    eventName: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    even: {
        backgroundColor:COLORS.background,
    },
});

export { EventRow };