import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, TouchableOpacity
} from 'react-native';
import normalize, { normalScale, verticalScale } from '../../config/device/normalize';
import { width } from '../../config/device/device';
import PropTypes from 'prop-types';
import fonts from '../../../assets/fonts';
import error from '../../../assets/images/error.png'

export default class ErrorView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={error}
                    style={{ width: normalScale(150), height: verticalScale(150) }}
                    resizeMode={"contain"}
                />
                <Text style={{ fontFamily: fonts.MontserratRegular, color: "#ffffff" }}>{this.props.errorText}</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.props.onPress}
                    style={styles.buttonStyle}>
                    <Text style={{ fontFamily: fonts.MontserratRegular, color: "#ffffff" }}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

ErrorView.propTypes = {
    errorText: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

ErrorView.defaultProps = {
    errorText: "",
    onPress: () => { }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    headerText: {
        fontSize: normalize(20),
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: fonts.MontserratRegular
    },
    buttonStyle: {
        marginTop: verticalScale(12),
        width: normalScale(130),
        height: verticalScale(50),
        borderColor: "rgb(26,37,52)",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    }
});
