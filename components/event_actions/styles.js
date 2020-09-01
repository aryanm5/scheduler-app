import { StyleSheet } from 'react-native';

const getEventActionStyles = (COLORS) => {
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
            borderWidth: COLORS.lightMode ? 2 : 0,
            borderColor: COLORS.brown,
            paddingHorizontal: 20,
            color: 'black',
        },
        multilineTextInput: {
            borderRadius: 10,
            borderWidth: COLORS.lightMode ? 2 : 0,
            height: 120,
            paddingHorizontal: 10,
            paddingTop: 8,
            textAlignVertical: 'top',
        },
        text: {
            color: COLORS.text,
            fontSize: 18,
            textAlign: 'center',
        },
        title: {
            position: 'absolute',
            right: 0,
            top: 5,
            paddingVertical: 10,
            paddingHorizontal: 5,
            color: COLORS.text,
            fontSize: 20,
            fontWeight: 'bold',
            textAlignVertical: 'center',
        },
        backButton: {
            position: 'absolute',
            left: 0,
            top: 0,
            paddingVertical: 5,
            paddingHorizontal: 15,
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
            color: COLORS.red,
            fontSize: 16,
            marginTop: 10,
            textAlign: 'center',
        },
        createEventError: {
            color: COLORS.red,
            fontSize: 16,
            marginLeft: 10,
            fontWeight: COLORS.lightMode ? 'normal' : 'bold',
        },
        inputLabel: {
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 10,
            color: COLORS.text,
        },
    });
}

export default getEventActionStyles;