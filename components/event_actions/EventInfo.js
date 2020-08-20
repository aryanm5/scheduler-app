import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import getEventActionStyles from './styles';
import ViewMoreText from 'react-native-view-more-text';


class EventInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '' };
    }

    sharePassword = async () => {
        this.setState({ errorMessage: '' });
        try {
            await Share.share({
                message: this.props.event.password,
            });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
    }

    render() {
        const COLORS = this.props.colors;
        const commonStyles = getEventActionStyles(COLORS);
        const styles = StyleSheet.create({
            section: {
                width: '100%',
                alignItems: 'flex-start',
                marginBottom: 30,
            },
            text: {
                ...commonStyles.text,
                textAlign: 'left',
                fontSize: 24,
            },
            textBold: {
                ...commonStyles.text,
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 14,
            },
            toggleRead: {
                color: COLORS.button,
                fontSize: 16,
                fontWeight: 'bold',
            },
        });
        return (
            <View style={commonStyles.container}>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>EVENT INFO</Text>
                <ScrollView centerContent showsVerticalScrollIndicator={false} style={{ width: '100%', marginTop: 50, }}>
                    <View style={styles.section}>
                        <Text style={styles.textBold}>NAME</Text>
                        <Text style={styles.text}>
                            {this.props.event.name}
                        </Text>

                    </View>
                    {this.props.event.passwordProtected &&
                        <View style={styles.section}>
                            <Text style={styles.textBold}>PASSWORD</Text>
                            <Text style={styles.text}>
                                {this.props.event.password}
                            </Text>
                            <TouchableOpacity onPress={this.sharePassword} style={[commonStyles.button, { flexDirection: 'row', alignItems: 'center', marginTop: 5, paddingVertical: 10, paddingHorizontal: 15, }]}>
                                <Ionicon name='ios-share-outline' size={22} color={commonStyles.buttonText.color} />
                                <Text style={commonStyles.buttonText}>Share</Text>
                            </TouchableOpacity>
                            {this.state.errorMessage.length > 0 &&
                                <Text style={commonStyles.errorText}>{this.state.errorMessage}</Text>
                            }
                        </View>
                    }
                    <View style={[styles.section, { flexDirection: 'row', }]}>
                        <Text style={styles.textBold}>SLOT DURATION: </Text>
                        <Text style={[styles.text, { marginTop: -5, }]}>
                            {` ${this.props.event.times[0].duration} min`}
                        </Text>
                    </View>
                    <View style={[styles.section, { flexDirection: 'row', }]}>
                        <Text style={styles.textBold}>MAX CLIENTS: </Text>
                        <Text style={[styles.text, { marginTop: -5, }]}>
                            {' ' + this.props.event.maxClients}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.textBold}>DESCRIPTION</Text>
                        <ViewMoreText
                            numberOfLines={5}
                            renderViewMore={(onPress) => <Text onPress={onPress} style={styles.toggleRead}>Read More</Text>}
                            renderViewLess={(onPress) => <Text onPress={onPress} style={styles.toggleRead}>Read Less</Text>}
                        >
                            <Text style={[styles.text, { fontSize: 16 }]}>
                                {this.props.event.desc}
                            </Text>
                        </ViewMoreText>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


export { EventInfo };