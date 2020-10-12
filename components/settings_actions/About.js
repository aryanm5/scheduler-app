import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import getSettingsActionStyles from './styles';

class About extends Component {
    openEmail = () => {
        Linking.openURL(`mailto:aryan@mittaldev.com?subject=Scheduler%20${Platform.OS === 'ios' ? 'iOS' : 'Android'}%20-%20Contact%20Aryan`);
    }
    openWebsite = () => {
        Linking.openURL('https://mittaldev.com?fromApp=' + Platform.OS);
    }
    render() {
        const COLORS = this.props.colors;
        const commonStyles = getSettingsActionStyles(COLORS);
        const styles = StyleSheet.create({
            container: {
                ...commonStyles.container,
                paddingHorizontal: 0,
            },
            scrollContainer: {
                paddingTop: 80,
                width: '100%',
            },
            sectionTitle: {
                ...commonStyles.text,
                fontWeight: 'bold',
                fontSize: 22,
            },
            paragraph: {
                ...commonStyles.text,
                paddingHorizontal: 5,
            },
            contactRow: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
            },
            contactIcon: {
                paddingRight: 6,
            },
            contactRowText: {
                ...commonStyles.text,
                fontWeight: 'bold',
            },
            versionText: {
                ...commonStyles.text,
                fontFamily: Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
                color: COLORS.gray,
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 20,
                paddingBottom: 120,
            },
        });

        return (
            <View style={styles.container}>
                <ScrollView  style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionTitle}>Scheduler</Text>
                    <Text style={styles.paragraph}>
                        A centralized, end-to-end platform to quickly and easily set up appointments, classes, and meetings.{'\n'}Made with React Native.{'\n'}
                    </Text>
                    <Text style={[styles.sectionTitle, { marginTop: 60, }]}>Aryan Mittal</Text>
                    <Text style={styles.paragraph}>
                        Along with writing for his school's newspaper, Aryan enjoys playing tennis with his friends and developing apps for his community.
                    </Text>
                    <Text style={[styles.sectionTitle, { marginTop: 60, }]}>Contact Me</Text>
                    <Text style={commonStyles.text}>
                        Have feedback? Found a bug?{'\n'}
                    </Text>

                    <View style={{ alignSelf: 'center', alignItems: 'flex-start', }}>
                        <TouchableOpacity style={styles.contactRow} onPress={this.openEmail} activeOpacity={0.5}>
                            <MaterialIcon name='mail-outline' size={26} color={COLORS.text} style={styles.contactIcon} />
                            <Text style={styles.contactRowText}>aryan@mittaldev.com</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contactRow} onPress={this.openWebsite} activeOpacity={0.5}>
                            <MaterialCIcon name='web' color={COLORS.text} size={26} style={styles.contactIcon} />
                            <Text style={styles.contactRowText}>mittaldev.com</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.versionText}>
                        AM Scheduler v1.0.2
                    </Text>
                </ScrollView>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>ABOUT THE APP</Text>
            </View>
        );
    }
}


export { About };