import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import API from '../api';


class Upcoming extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 30,
            },
        });

        return (
            <View style={styles.container}>
                <Text style={{color: COLORS.text}}>
                    Upcoming!
                </Text>
            </View>
        );
    }
}


export { Upcoming };