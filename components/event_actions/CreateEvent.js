import React, { Component } from 'react';
import { View, Text, Keyboard, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import getEventActionStyles from './styles';
import { MultiStepButton } from '../../components';
import { CreateEvent0, CreateEvent1, CreateEvent2, CreateEvent3 } from '../event_actions';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.d = new Date();
        this.state = { values: { times: [], startDate: months[this.d.getMonth()] + ' ' + this.d.getDate(), eventPassword: '', clientInfo: ['', '', ''], manualApprove: true, emailNotify: true, eventName: '', eventDesc: '', eventNameError: '', eventDescError: '', duration: 60, step0valid: false, error: '' }, showingNavigation: true, step: 0 };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow = () => {
        this.hideNavigation();
    }
    _keyboardDidHide = () => {
        this.showNavigation();
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
        this.setState({ values: old }, () => { if(after !== undefined) { after(); } });
    }

    changeStep = (changeTo) => {
        if (changeTo >= 0 && changeTo < 4 && changeTo - this.state.step <= 1) {
            if (changeTo < this.state.step) {
                this.setState({ step: changeTo, });
            } else {
                //check for valid
                if (this.state.values.step0valid) {
                    this.setState({ step: changeTo });
                }
            }
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
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={styles.backButton} />
                <Text style={styles.title}>CREATE EVENT</Text>

                <View style={styles.content}>
                    {this.renderContent()}
                </View>
                {this.state.showingNavigation &&
                    <>{this.state.step > 0 &&
                        <AntIcon onPress={() => { this.changeStep(this.state.step - 1); }} name='arrowleft' size={36} color={COLORS.text} style={[styles.stepArrow, { left: 0 }]} />
                    }
                        <AntIcon onPress={() => { this.changeStep(this.state.step + 1); }} name='arrowright' size={36} color={COLORS.text} style={[styles.stepArrow, { right: 0 }]} />
                        <Text style={styles.error}>{this.state.values.error}</Text>
                        <View style={styles.multiStepContainer}>
                            <MultiStepButton changeStep={this.changeStep} step={this.state.step} num={0} colors={COLORS} />
                            <MultiStepButton changeStep={this.changeStep} step={this.state.step} num={1} colors={COLORS} />
                            <MultiStepButton changeStep={this.changeStep} step={this.state.step} num={2} colors={COLORS} />
                            <MultiStepButton changeStep={this.changeStep} step={this.state.step} num={3} colors={COLORS} />
                        </View></>
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
                return <CreateEvent3 showNav={this.showNavigation} hideNav={this.hideNavigation} values={this.state.values} setValue={this.setValue} step={this.state.step} changeStep={this.changeStep} colors={this.props.colors} />;
        }
    }
}


export { CreateEvent };