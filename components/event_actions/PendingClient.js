import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, } from 'react-native';
import getEventActionStyles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const fullMonth = (date) => {
    return {
        'Jan': 'January',
        'Feb': 'February',
        'Mar': 'March',
        'Apr': 'April',
        'May': 'May',
        'Jun': 'June',
        'Jul': 'July',
        'Aug': 'August',
        'Sep': 'September',
        'Oct': 'October',
        'Nov': 'November',
        'Dec': 'December',
    }[date.split(' ')[0]] + ' ' + date.split(' ')[1];
}

class PendingClient extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                minWidth: '100%',
                paddingHorizontal: 20,
                paddingVertical: 20,
                backgroundColor: COLORS.background,
                marginTop: this.props.newTime ? 10 : 0,
            },
            date: {
                ...commonStyles.text,
                textAlign: 'left',
                marginTop: this.props.index > 0 ? 20 : 0,
                fontSize: 28,
                fontWeight: 'bold',
            },
            time: {
                ...commonStyles.text,
                textAlign: 'left',
                marginLeft: 10,
                fontSize: 20,
            },
            buttons: {
                position: 'absolute',
                right: 5,
                top: 0,
                height: 64,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            },
            actionButton: {
                paddingRight: 25,
            },
            clientInfo: {
                ...commonStyles.text,
                textAlign: 'left',
                marginLeft: 10,
                fontSize: 17,
            },
            divider: {
                width: '95%',
                alignSelf: 'center',
                borderTopColor: 'rgba(50, 50, 50, 0.2)',
                borderTopWidth: 1,
                marginTop: -20,
                paddingBottom: 20,
            },
        });
        return (
            <>
                {this.props.newDate
                    ? <Text style={styles.date}>{fullMonth(this.props.item.date)}</Text>
                    : this.props.newTime
                        ? null
                        : null
                }
                <View style={styles.container}>
                    {
                        !this.props.newDate && !this.props.newTime
                            ? <View style={styles.divider} />
                            : null
                    }

                    <View style={styles.buttons}>
                        <Icon name='check' size={34} color={COLORS.green} onPress={this.props.goBack} style={styles.actionButton} />
                        <Icon name='times' size={34} color={COLORS.red} onPress={this.props.goBack} style={styles.actionButton} />
                    </View>
                    <Text style={styles.time}>{this.props.item.startTime}</Text>
                    <Text style={styles.clientInfo}>{this.props.event.clientInfo.map(i => { return <><Text style={{ fontWeight: 'bold', }}>{'\n'+i}:</Text><Text> {this.props.item[i]}</Text></>; })}</Text>
                </View>
            </>
        );
    }
}


export { PendingClient };