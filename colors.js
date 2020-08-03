import { Appearance } from 'react-native'

var light = Appearance.getColorScheme() === 'light';
//^^ SETTING TO LIGHT FOR TESTING ONLY!!

const COLORS = {
    background: light ? '#F4F4F8' : '#000000',//'#121212',
    text: light ? '#000000' : '#ffffff',
    button: light ? '#007aff' : '#0a84ff',
    brown: light ? '#433633' : '#b5651d',
    gray: light ? '#8e8e93' : '#b1b1b1',
    secondary: light ? '#dfdfdf' : '#343434',
    lightMode: light,
}
export default COLORS;