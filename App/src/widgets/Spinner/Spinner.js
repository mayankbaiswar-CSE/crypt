import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import PropTypes from "prop-types";

const Spinner = ({ size, bgColor, ...props }) => {
    return (
        <View style={[styles.spinnerStyle, { backgroundColor: bgColor }]} {...props}>
            <ActivityIndicator size={size} color={props.spinnerColor} />
        </View>
    );
};

export default Spinner;

Spinner.propTypes = {
    size: PropTypes.oneOf([
        "small",
        "large"
    ]),
    bgColor: PropTypes.string
};

Spinner.defaultProps = {
    size: "large",
    bgColor: "rgba(0, 0, 0, 0.65)"
};

const styles = StyleSheet.create({
    spinnerStyle: {
        elevation: 6,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'

    }
})


export { Spinner };