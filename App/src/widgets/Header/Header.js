import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Image
} from 'react-native';
import normalize, { normalScale, verticalScale } from '../../config/device/normalize';
import { width } from '../../config/device/device';
import PropTypes from 'prop-types';
import fonts from '../../../assets/fonts';
import back from '../../../assets/images/back.png'

export default class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.showBack && <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.props.onBackPress}
                    style={{
                        position: "absolute", left: 0, bottom: 0,
                        justifyContent: "center",
                        height: verticalScale(56), width: normalScale(65)
                    }}>
                    <Image
                        style={{ marginLeft: 10, height: verticalScale(25), width: normalScale(25) }}
                        source={back}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>}
                <Text style={styles.headerText}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    showBack: PropTypes.bool,
    onBackPress: PropTypes.func
}

Header.defaultProps = {
    title: "",
    showBack: true,
    onBackPress: () => { }
}

const styles = StyleSheet.create({
    container: {
        height: verticalScale(56),
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(26,37,52)',
    },
    headerText: {
        fontSize: normalize(20),
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: fonts.MontserratRegular
    }
});
