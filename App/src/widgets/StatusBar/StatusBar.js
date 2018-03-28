import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import styles from './StatusBar.styles';

const AppStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default AppStatusBar;
