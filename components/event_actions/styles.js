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
            left:0,
            top:0,
            paddingVertical:5,
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
        }
    });
}

export default getEventActionStyles;