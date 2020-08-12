import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getSettingsActionStyles from './styles';
import API from '../../api';


class ChangeName extends Component {
    constructor(props) {
        super(props);
        this.state = { nameText: props.user.name, loading: false, errorMessage: '' };
    }

    changeName = () => {
        if (this.state.nameText.length > 0 && this.state.nameText !== this.props.user.name) {
            this.setState({ errorMessage: '', loading: true, });
            API.get({
                task: 'changeName',
                token: this.props.user.token,
                newName: this.state.nameText,
            }, (data) => {
                this.setState({ loading: false });
                if (data.err) {
                    this.setState({ errorMessage: data.message });
                } else {
                    this.props.updateUser(data);
                    this.props.goBack();
                }
            });
        }
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getSettingsActionStyles(COLORS);

        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>CHANGE NAME</Text>
                <TextInput defaultValue={this.props.user.name} style={commonStyles.textInput} onChangeText={(val) => { this.setState({ nameText: val }); }} placeholder='NEW NAME' placeholderTextColor='#808080' selectionColor='#000' autoCompleteType='name' autoCapitalize='words' textContentType='name' />
                <TouchableOpacity activeOpacity={0.9} style={commonStyles.button} onPress={this.changeName}>
                    {this.state.loading
                        ? <ActivityIndicator size='small' color={commonStyles.buttonText.color} animating={this.state.loading} style={{ paddingHorizontal: 20 }} />
                        : <Text style={commonStyles.buttonText}>CHANGE NAME</Text>
                    }
                </TouchableOpacity>
                <Text style={commonStyles.errorText}>{this.state.errorMessage}</Text>
            </View>
        );
    }
}


export { ChangeName };