import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import getEventActionStyles from './styles';
import { MultiStepButton } from '../../components';
import { CreateEvent0, CreateEvent1, CreateEvent2, CreateEvent3 } from '../event_actions';
import API from '../../api';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.d = new Date();
        this.state = { values: { times: [], startDate: months[this.d.getMonth()] + ' ' + this.d.getDate(), eventPassword: '', clientInfo: ['', '', ''], manualApprove: true, emailNotify: true, eventName: '', eventDesc: '', eventNameError: '', eventDescError: '', duration: 60, maxClients: 1, step0valid: false, }, created: false, showingNavigation: true, step: 0, };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.hideNavigation);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.showNavigation);
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    showNavigation = () => {
        this.setState({ showingNavigation: true, });
    }
    hideNavigation = () => {
        this.setState({ showingNavigation: false, });
    }

    setValue = (set, setTo, after) => {
        var old = this.state.values;
        old[set] = setTo;
        this.setState({ values: old }, () => { if (after !== undefined) { after(); } });
    }

    changeStep = (changeTo) => {

        if (!this.state.created && changeTo >= 0 && changeTo < 4 && changeTo - this.state.step <= 1) {
            if (changeTo < this.state.step) {
                this.setState({ step: changeTo, });
            } else {
                //check for valid
                switch (changeTo) {
                    case 1:
                        if (this.state.values.step0valid) {
                            this.setState({ step: changeTo });
                        }
                        break;
                    case 3:
                        if (this.state.values.times.length > 0) {
                            this.setState({ step: changeTo });
                            return;
                        } else {
                            Alert.alert('Please tap the time slots you\'re available for.');
                        }
                        break;
                    default: this.setState({ step: changeTo });
                }
            }
        }
    }

    createEvent = (after) => {
        var clientInfo = [];
        for (var i = 0; i < 3; ++i) {
            if (this.state.values.clientInfo[i].length > 0 && this.state.values.clientInfo[i].toLowerCase() !== 'name' && this.state.values.clientInfo[i].toLowerCase() !== 'email') {
                clientInfo.push(this.state.values.clientInfo[i]);
            }
        }
        API.post({
            task: 'createEvent',
            token: this.props.user.token,
            name: this.state.values.eventName,
            desc: this.state.values.eventDesc,
            maxClients: this.state.values.maxClients >= 1 ? this.state.values.maxClients : 1,
            emailNotify: this.state.values.emailNotify,
            clientInfo: JSON.stringify(clientInfo),
            manualApprove: this.state.values.manualApprove,
            passwordProtected: (this.state.values.eventPassword.length > 0),
            password: this.state.values.eventPassword,
            times: JSON.stringify(this.state.values.times),
        }, (data) => {
            if (!data.err) {
                this.props.updateUser(data);
                this.setState({ step: 4, created: true, });
            }
            after(data);
        });
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                ...commonStyles.container,
                paddingHorizontal: 0,
            },
            title: {
                ...commonStyles.title,
                fontSize: 24,
            },
            backButton: {
                ...commonStyles.backButton,
                paddingLeft: 10,
                paddingRight: 50,
            },
            multiStepContainer: {
                position: 'absolute',
                bottom: 10,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
            },
            multiStepButton: {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.button,
                height: Dimensions.get('window').width / 6,
                width: Dimensions.get('window').width / 6,
                borderRadius: Dimensions.get('window').width / 18,
            },
            multiStepButtonText: {
                fontSize: 22,
                fontWeight: 'bold',
                color: '#FFF',
                textAlignVertical: 'center',
            },
            stepArrow: {
                position: 'absolute',
                bottom: Dimensions.get('window').width / 6 + 15,
                paddingHorizontal: 20,
            },
            error: {
                position: 'absolute',
                left: 46,
                right: 46,
                bottom: Dimensions.get('window').width / 6 + 20,
                color: COLORS.red,
                fontSize: 16,
                textAlign: 'center',
            },
            content: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 60,
                bottom: this.state.showingNavigation ? Dimensions.get('window').width / 6 + 55 : 0,
            },
        });

        return (
            <View style={styles.container}>
                {this.state.showingNavigation &&
                    <>
                        <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={styles.backButton} />
                        <Text style={styles.title}>CREATE EVENT</Text>
                    </>
                }

                <View style={styles.content}>
                    {this.renderContent()}
                </View>
                {(!this.state.created && this.state.showingNavigation) &&
                    <>
                        {this.state.step > 0 &&
                            <AntIcon onPress={() => { this.changeStep(this.state.step - 1); }} name='arrowleft' size={36} color={COLORS.text} style={[styles.stepArrow, { left: 0 }]} />
                        }
                        {this.state.step < 3 &&
                            <AntIcon onPress={() => { this.changeStep(this.state.step + 1); }} name='arrowright' size={36} color={COLORS.text} style={[styles.stepArrow, { right: 0 }]} />
                        }
                        <Text style={styles.error}>{this.state.values.error}</Text>
                        <View style={styles.multiStepContainer}>
                            <MultiStepButton changeStep={this.changeStep} step={this.state.step} num={0} colors={COLORS} />
                            <MultiStepButton changeStep={this.changeStep} step={this.state.step} num={1} colors={COLORS} />
                            <MultiStepButton changeStep={this.changeStep} step={this.state.step} num={2} colors={COLORS} />
                            <MultiStepButton changeStep={this.changeStep} step={this.state.step} num={3} colors={COLORS} />
                        </View>
                    </>
                }

            </View>
        );
    }

    renderContent = () => {
        switch (this.state.step) {
            case 0:
                return <CreateEvent0 showNav={this.showNavigation} hideNav={this.hideNavigation} values={this.state.values} setValue={this.setValue} step={this.state.step} changeStep={this.changeStep} colors={this.props.colors} />;
            case 1:
                return <CreateEvent1 showNav={this.showNavigation} hideNav={this.hideNavigation} values={this.state.values} setValue={this.setValue} step={this.state.step} changeStep={this.changeStep} colors={this.props.colors} />;
            case 2:
                return <CreateEvent2 showNav={this.showNavigation} hideNav={this.hideNavigation} values={this.state.values} setValue={this.setValue} step={this.state.step} changeStep={this.changeStep} colors={this.props.colors} />;
            case 3:
            case 4:
                return <CreateEvent3 goBack={this.props.goBack} user={this.props.user} createEvent={this.createEvent} showNav={this.showNavigation} hideNav={this.hideNavigation} values={this.state.values} setValue={this.setValue} step={this.state.step} changeStep={this.changeStep} colors={this.props.colors} />;
        }
    }
}


export { CreateEvent };