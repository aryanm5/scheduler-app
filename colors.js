import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const getColorsLD = (light) => {
    return {
        background: light ? '#F4F4F8' : '#000',//'#121212',
        text: light ? '#000' : '#fff',
        button: light ? '#007aff' : '#4E67EB',//#ff5d73
        brown: light ? '#433633' : '#b5651d',
        gray: light ? '#8e8e93' : '#b1b1b1',
        secondary: light ? '#dfdfdf' : '#343434',
        red: light ? '#ff0000' : '#ff0000',
        green: light ? '#228B22' : '#00ff00',
        gold: light ? '#FCA311' : '#FCA311',
        lightMode: light,
    }
}

const getColors = (light, after) => {
    if (light === 'check') {
        AsyncStorage.getItem('schedMode', (err, result) => {
            if (err || result === null) {
                after(getColorsLD(Appearance.getColorScheme() === 'light'));
            } else {
                after(getColorsLD(result === 'light'));
            }
        });
    } else {
        return getColorsLD(light === 'light');
    }
};

export default getColors;