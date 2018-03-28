import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import PropTypes from "prop-types";
import { width } from '../config/device/device';
import normalize, { normalScale, verticalScale } from '../config/device/normalize';

const DetailView = ({ currency }) => {
    return (
        <View style={[styles.spinnerStyle, { backgroundColor: bgColor }]}>
        </View>
    );
};

export default DetailView;

DetailView.propTypes = {
    currency: PropTypes.object
};

DetailView.defaultProps = {
    currency: {}
};

const styles = StyleSheet.create({
    detailRowStyle: {
        width: width,
        height: verticalScale(40),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: normalScale(12),
        alignItems: "center"
    }
})


export { Spinner };