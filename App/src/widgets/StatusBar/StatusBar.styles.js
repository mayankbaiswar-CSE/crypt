import { StyleSheet, Platform, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
        zIndex: 200
    }
});

export default styles;