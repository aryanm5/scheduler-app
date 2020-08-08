import { StyleSheet } from 'react-native';

const getSettingsActionStyles = (COLORS) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
        },
        textInput: {
            width: '100%',
            height: 50,
            backgroundColor: '#FFF',
            borderRadius: 25,
            borderWidth: COLORS.lightMode ? 3 : 0,
            borderColor: COLORS.brown,
            paddingHorizontal: 20,
            color: 'black',
        },
        text: {
            color: COLORS.text,
            fontSize: 18,
            textAlign: 'center',
        },
        title: {
            position: 'absolute',
            right: 0,
            top: 0,
            paddingVertical:10,
            color: COLORS.text,
            fontSize: 18,
            fontWeight: 'bold',
            textAlignVertical: 'center',
        },
        backButton: {
            position: 'absolute',
            left:0,
            top:0,
            paddingVertical:0,
            paddingHorizontal:15,
        },
        button: {
            backgroundColor: COLORS.button,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 15,
            marginTop: 20,
        },
        buttonText: {
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
        },
        errorText: {
            color: '#FF0000',
            fontSize: 16,
            marginTop: 10,
            textAlign: 'center',
        },
    });
}

export default getSettingsActionStyles;