import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


class MultiStepButton extends Component {
    render() {
        const stage = this.props.num < this.props.step ? 'done' : this.props.num > this.props.step ? 'above' : 'current';
        const COLORS = this.props.colors;
        const styles = StyleSheet.create({
            container: {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: stage === 'done' ? '#00FF00' : stage === 'above' ? COLORS.background : COLORS.button,
                borderColor: stage === 'above' ? COLORS.button : '#000',
                borderWidth: stage === 'above' ? 3 : COLORS.lightMode && stage === 'done' ? 2 : 0,
                height: Dimensions.get('window').width / 6,
                width: Dimensions.get('window').width / 6,
                borderRadius: Dimensions.get('window').width / 18,
            },
            buttonText: {
                fontSize: 24,
                fontWeight: 'bold',
                color: stage === 'above' ? COLORS.text : '#FFF',
                textAlignVertical: 'center',
            },
        });

        return (
            <TouchableOpacity onPress={() => { this.props.changeStep(this.props.num); }} activeOpacity={0.9} style={styles.container}>
                {stage === 'done'
                    ? <Icon name='check' size={styles.container.width/1.9} color='#000' />
                    : <Text style={styles.buttonText}>{this.props.num + 1}</Text>
                }
            </TouchableOpacity>
        );
    }
}


export { MultiStepButton };