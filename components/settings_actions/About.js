import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getSettingsActionStyles from './styles';


class About extends Component {
    constructor(props) {
        super(props);
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
            text: {
                ...commonStyles.text,
            },
            sectionTitle: {
                ...commonStyles.text,
                fontWeight: 'bold',
                fontSize: 22,
            },
            creatorImage: {
                alignSelf: 'center',
                width: Dimensions.get('window').width * 0.3,
                height: Dimensions.get('window').width * 0.3,
                borderRadius: Dimensions.get('window').width * 0.15,
                borderColor: COLORS.text,
                borderWidth: COLORS.lightMode ? 1 : 0,
            },
            versionText: {
                ...commonStyles.text,
                fontFamily: Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
                //position: 'absolute',
                //bottom: 60,
                color: COLORS.gray,
                fontWeight: 'bold',
                fontSize: 16,
            },
        });

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionTitle}>Scheduler</Text>
                    <Text style={[styles.text, { paddingHorizontal: 5, }]}>
                        A centralized, end-to-end platform to quickly and easily set up appointments, classes, and meetings, made with React Native.{'\n'}
                        <Text style={{ ...styles.text, color: COLORS.button, fontWeight: 'bold', }}
                        onPress={() => Linking.openURL('https://github.com/aryanm5/scheduler-app')}>
                        View Repository
                    </Text>
                    </Text>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 60 }}>
                        <Image
                            style={styles.creatorImage}
                            source={require('../../images/creator-image.png')}
                        />
                        <View style={{ flex: 1, marginLeft: 10, }}>
                            <Text style={[styles.sectionTitle, { textAlign: 'left', }]}>Aryan Mittal</Text>
                            <Text style={[styles.text, { textAlign: 'left', }]}>                                
                                Along with writing for his school's newspaper, Aryan enjoys playing tennis with his friends and developing apps for his community. 
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.sectionTitle, { marginTop: 60, }]}>Contact Me</Text>
                    <Text style={styles.text}>
                        Have feedback? Found a bug?{'\n'}Contact me at{'\n'}
                        <Text style={[styles.text, { fontWeight: 'bold', }]}>aryan@mittaldev.com</Text>
                    </Text>
                </ScrollView>
                <Icon name='angle-left' size={40} color={COLORS.text} onPress={this.props.goBack} style={commonStyles.backButton} />
                <Text style={commonStyles.title}>ABOUT THE APP</Text>
                <Text style={styles.versionText}>
                    AM Scheduler v1.0.0
                </Text>
            </View>
        );
    }
}


export { About };