import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity
} from 'react-native';
import normalize, { normalScale, verticalScale } from '../config/device/normalize';
import { width } from '../config/device/device';
import PropTypes from 'prop-types';
import fonts from '../../assets/fonts';

export default class ListRow extends React.PureComponent {
    render() {
        let arrow = this.props.percent_change_24h < 0 ? ' ↓' : ' ↑';
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.onPress}
            >
                <View style={styles.container}>

                    <View style={{ flex: 0.33, justifyContent: "center" }}>
                        <Text numberOfLines={2} style={{ fontFamily: fonts.MontserratRegular, color: "#ffffff" }}>{this.props.name + " (" + this.props.symbol + ")"}</Text>

                    </View>

                    <View style={{ flex: 0.34, justifyContent: "center" }}>
                        <Text numberOfLines={2} style={{ flex: 1, fontFamily: fonts.MontserratRegular, color: "#ffffff" }}>{this.props.price_inr}</Text>

                    </View>

                    <View style={{ flex: 0.33, justifyContent: "center", alignItems: "center" }}>
                        <Text numberOfLines={2} style={{ fontFamily: fonts.MontserratRegular, color: this.props.percent_change_24h < 0 ? 'red' : "rgb(0,255,0)" }}>{this.props.percent_change_24h + arrow}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

ListRow.propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

ListRow.defaultProps = {
    name: "",
    onPress: () => { }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 4,
        borderRadius: 4,
        height: verticalScale(60),
        width: width,
        backgroundColor: 'rgb(26,37,52)',
    },
    headerText: {
        fontSize: normalize(20),
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: fonts.MontserratRegular
    }
});
