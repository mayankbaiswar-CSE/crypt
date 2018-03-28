import React from 'react';
import { StyleSheet } from 'react-native';
import { width } from '../config/device/device';
import normalize, { normalScale, verticalScale } from '../config/device/normalize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(17,25,33)',
    },
    detailRowStyle: {
        width: width,
        height: verticalScale(40),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: normalScale(12),
        alignItems: "center"
    }
});

export default styles;