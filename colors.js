import { Appearance } from 'react-native';

var light = false;//Appearance.getColorScheme() === 'light';
//^^ SETTING TO LIGHT FOR TESTING ONLY!!

const getColorsLD = (light) => {
    return {
        background: light ? '#F4F4F8' : '#000000',//'#121212',
        text: light ? '#000000' : '#ffffff',
        button: light ? '#007aff' : '#0a84ff',
        brown: light ? '#433633' : '#b5651d',
        gray: light ? '#8e8e93' : '#b1b1b1',
        secondary: light ? '#dfdfdf' : '#343434',
        lightMode: light,
    }
}

const getColors = (light, after) => {
    if (light === 'check') {
        light = Appearance.getColorScheme() === 'dark';
        return getColorsLD(light);
    } else {
        return getColorsLD(light === 'light');
    }
};

export default getColors;




/*
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

var light;

const setLight = async () => {
    console.log('setting light');
    try {
        const value = await AsyncStorage.getItem('@lightOrDark_Key')
        if (value !== null) {
            light = (value === 'light');
        } else {
            light = Appearance.getColorScheme() === 'light';
        }
    } catch (e) {
        console.error(e);
        light = Appearance.getColorScheme() === 'light';
    } finally {
        console.log('setting mycolors');
        global.MYCOLORS = {
            background: light ? '#F4F4F8' : '#000000',//'#121212',
            text: light ? '#000000' : '#ffffff',
            button: light ? '#007aff' : '#0a84ff',
            brown: light ? '#433633' : '#b5651d',
            gray: light ? '#8e8e93' : '#b1b1b1',
            secondary: light ? '#dfdfdf' : '#343434',
            lightMode: light,
        }
        console.log('set myoclors');
    }
}

setLight();
*/