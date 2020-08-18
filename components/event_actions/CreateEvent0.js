import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import getEventActionStyles from './styles';


class CreateEvent0 extends Component {
    constructor(props) {
        super(props);
        this.state = { step: 2, errorMessage: '' };
    }

    changeStep = (changeTo) => {
        if (changeTo >= 0 && changeTo < 4 && changeTo - this.state.step <= 1) {
            this.setState({ step: changeTo, });
        }
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                ...commonStyles.container,
                paddingHorizontal: 0,
            },
        });

        return (
            <View style={styles.container}>
                <Text style={commonStyles.text}>STEP 1!!</Text>
            </View>
        );
    }
}


export { CreateEvent0 };