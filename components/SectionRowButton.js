import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../colors';
import Icon from 'react-native-vector-icons/FontAwesome';


class SectionRowButton extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '' };
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={this.props.first ? [styles.container, styles.first] : styles.container} activeOpacity={0.8}>
                <Text style={this.props.color ? [styles.text, {color: this.props.color}] : styles.text}>
                    {this.props.text}
                </Text>
                <Icon name='angle-right' size={36} color={this.props.color || COLORS.text} style={styles.arrow} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: COLORS.background,
        borderTopColor: COLORS.gray,
        borderTopWidth:1,
    },
    first: {
        borderTopWidth: 0,
    },
    text: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    arrow: {
        position:'absolute',
        right: 0,
    }
});

export { SectionRowButton };