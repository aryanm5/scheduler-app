import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getSettingsActionStyles from './styles';
import API from '../../api';


class EnableEmails extends Component {
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
                <Text style={[commonStyles.title, { color: COLORS.green }]}>ENABLE EMAILS</Text>
                <Text style={commonStyles.text}>
                    Allow Scheduler to notify you when clients sign up to your events.{'\n\n'}
                    You may turn on emails for individual events if that better fits your needs.{'\n'}
                </Text>
                <TouchableOpacity onPress={this.disableEmails} activeOpacity={0.9} style={[commonStyles.button, { backgroundColor: COLORS.green }]}>
                    {this.state.loading
                        ? <ActivityIndicator size='small' color={COLORS.lightMode ? '#FFF' : '#000'} animating={this.state.loading} style={{ paddingHorizontal: 30 }} />
                        : <Text style={COLORS.lightMode ? commonStyles.buttonText : [commonStyles.buttonText, { color:'#000' }]}>ENABLE EMAILS</Text>
                    }
                </TouchableOpacity>
                <Text style={commonStyles.errorText}>{this.state.errorMessage}</Text>
            </View>
        );
    }
}


export { EnableEmails };