import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class SectionRowButton extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '' };
    }

    render() {
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingLeft: this.props.leftIcon ? 2 : 10,
                paddingVertical: 20,
                borderTopColor: COLORS.gray,
                borderTopWidth: this.props.first ? 0 : 1,
            },
            text: {
                color: this.props.color || COLORS.text,
                fontSize: 17,
                fontWeight: 'bold',
                paddingLeft: this.props.leftIcon && 15,
            },
            arrow: {
                position: 'absolute',
                right: 0,
            }
        });

        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.container} activeOpacity={0.8}>
                {this.props.leftIcon}
                <Text style={styles.text}>
                    {this.props.text}
                </Text>
                {
                    this.props.icon
                        ? <View style={styles.arrow}>{this.props.icon}</View>
                        : <Icon name='angle-right' size={36} color={this.props.color || COLORS.text} style={styles.arrow} />
                }
            </TouchableOpacity>
        );
    }
}


export { SectionRowButton };