import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import API from '../api';
import COLORS from '../colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';


class EventRow extends Component {
    constructor(props) {
        super(props);
    }

    countPendingClients = () => {
        var num = 0;
        for (var i = 0; i < this.props.event.times.length; ++i) {
            if (this.props.event.times[i].pendingClients !== 'none') {
                num += this.props.event.times[i].pendingClients.length;
            }
        }
        return num;
    }

    render() {
        this.numPending = this.countPendingClients();
        return (
            <View style={this.props.index % 2 === 0 ? [styles.container, styles.even] : styles.container}>
                <Text style={styles.eventName}>
                    {this.props.event.name}
                </Text>
                {this.numPending > 0
                    ? <TouchableOpacity style={styles.numPending} activeOpacity={0.9} onPress={() => { }} >
                        <Text style={styles.numPendingText}>
                            {this.numPending}
                        </Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minWidth: '100%',
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 20,
        overflow: 'hidden',
    },
    eventName: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    numPending: {
        backgroundColor: COLORS.button,
        position: 'absolute',
        width: '12%',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        right: 0,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    numPendingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    even: {
        backgroundColor: COLORS.background,
    },
});

export { EventRow };