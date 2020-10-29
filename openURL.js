import { Alert, Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

async function openURL(url, COLORS) {
    try {
        if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'close',
                preferredBarTintColor: COLORS.background,
                preferredControlTintColor: COLORS.button,
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: COLORS.background,
                secondaryToolbarColor: COLORS.button,
                enableUrlBarHiding: false,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
                hasBackButton: false,
                showInRecents: false,
            });
        } else {
            //in app browser not available, open link normally
            Linking.openURL(url);
        }
    } catch (error) {
        Alert.alert(error.message);
    }
}

export default openURL;