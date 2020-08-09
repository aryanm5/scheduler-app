import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getSettingsActionStyles from './styles';
import API from '../../api';


class DisableEmails extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, errorMessage: '' };
    }

    disableEmails = () => {
        this.setState({ loading: true, errorMessage: '' });
        API.get({
            task: 'toggleAllEmails',
            token: this.props.user.token,
        }, (data) => {
            this.setState({ loading: false });
            if(data.err) {
                this.setState({ errorMessage: data.message });
            } else {
                this.props.updateUser(data);
                this.props.goBack();
            }
        });
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getSettingsActionStyles(COLORS);

        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={[commonStyles.title, { color: COLORS.red }]}>DISABLE EMAILS</Text>
                <Text style={commonStyles.text}>
                    Turn off all emails from Scheduler (not recommended).{'\n\n'}
                    You may turn off emails for individual events if that better fits your needs.{'\n\n'}
                    You can still enable emails again if you change your mind.{'\n'}
                </Text>
                <TouchableOpacity onPress={this.disableEmails} activeOpacity={0.9} style={[commonStyles.button, { backgroundColor: COLORS.red }]}>
                    {this.state.loading
                        ? <ActivityIndicator size="small" color={commonStyles.buttonText.color} animating={this.state.loading} style={{ paddingHorizontal: 30 }} />
                        : <Text style={commonStyles.buttonText}>DISABLE ALL EMAILS</Text>
                    }
                </TouchableOpacity>
                <Text style={commonStyles.errorText}>{this.state.errorMessage}</Text>
            </View>
        );
    }
}


export { DisableEmails };