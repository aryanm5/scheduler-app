import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getEventActionStyles from './styles';
import API from '../../api';


class DeleteEvent extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, errorMessage: '' };
    }

    deleteEvent = () => {
        this.setState({ errorMessage: '', loading: true, });
        API.get({
            task: 'deleteEvent',
            token: this.props.user.token,
            eventName: this.props.event.name,
        }, (data) => {
            this.setState({ loading: false });
            if (data.err) {
                this.setState({ errorMessage: data.message });
            } else {
                this.props.setDeleteAnimation();
                this.props.hideModal();
                this.props.updateUser(data);
            }
        });
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);

        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>DELETE EVENT</Text>
                <Text style={commonStyles.text}>
                    Are you sure you want to delete <Text style={{ fontWeight: 'bold' }}>{this.props.event.name}</Text>?{'\n\n'}
                    Clients will not be notified that you deleted this event.{'\n\n'}
                    This action cannot be undone.
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 20, }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={this.props.goBack} style={[commonStyles.button, { flex: 1 }]}>
                        <Text style={commonStyles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} onPress={this.deleteEvent} style={[commonStyles.button, { backgroundColor: COLORS.red, marginLeft: 20, flex: 1 }]}>
                        {this.state.loading
                            ? <ActivityIndicator size='small' color={commonStyles.buttonText} animating={this.state.loading} style={{ paddingHorizontal: 15 }} />
                            : <Text style={commonStyles.buttonText}>Delete</Text>
                        }
                    </TouchableOpacity>
                </View>
                <Text style={commonStyles.errorText}>{this.state.errorMessage}</Text>
            </View>
        );
    }
}


export { DeleteEvent };