import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity
} from 'react-native';
import normalize, { normalScale, verticalScale } from '../config/device/normalize';
import { width } from '../config/device/device';
import PropTypes from 'prop-types';
import fonts from '../../assets/fonts';
import PureChart from 'react-native-pure-chart';
import Spinner from '../widgets/Spinner';
import moment from 'moment';

class GraphView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };
    }

    setSelection = (selected) => {
        const { detail } = this.props;
        if (selected !== this.state.selected) {
            if (selected === 0) {
                detail.fetchGraphData(moment().subtract(1, 'd').valueOf(), moment().valueOf());
            } else if (selected === 1) {
                detail.fetchGraphData(moment().subtract(1, 'w').valueOf(), moment().valueOf());
            } else if (selected === 2) {
                detail.fetchGraphData(moment().subtract(1, 'M').valueOf(), moment().valueOf());
            } else if (selected === 3) {
                detail.fetchGraphData(moment().subtract(1, 'y').valueOf(), moment().valueOf());
            }
            this.setState({ selected });
        }
    }

    render() {
        const { loading, data } = this.props;
        return (
            <View style={{ backgroundColor: '#ffffff' }}>
                <View style={{
                    height: verticalScale(300), width: width, marginHorizontal: 24, marginTop: 12,
                    alignSelf: "center",
                    backgroundColor: '#ffffff'
                }}>
                    {data.length !== 0 && <PureChart height={verticalScale(200)} width={normalScale(300)} data={data} type='line' />}

                </View>
                {

                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 12 }} >
                        <TouchableOpacity onPress={() => this.setSelection(0)}
                            activeOpacity={0.8}>
                            <View style={[styles.durationButtons, { backgroundColor: this.state.selected === 0 ? 'red' : 'rgb(26,37,52)' }]} >
                                <Text style={{ color: '#ffffff' }} >24h</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setSelection(1)}
                            activeOpacity={0.8} >
                            <View style={[styles.durationButtons, { backgroundColor: this.state.selected === 1 ? 'red' : 'rgb(26,37,52)' }]} >
                                <Text style={{ color: '#ffffff' }}>7d</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setSelection(2)}
                            activeOpacity={0.8} >
                            <View style={[styles.durationButtons, { backgroundColor: this.state.selected === 2 ? 'red' : 'rgb(26,37,52)' }]} >
                                <Text style={{ color: '#ffffff' }}>1mo</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setSelection(3)}
                            activeOpacity={0.8} >
                            <View style={[styles.durationButtons, { backgroundColor: this.state.selected === 3 ? 'red' : 'rgb(26,37,52)' }]} >
                                <Text style={{ color: '#ffffff' }}>1yr</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                }
                {loading && <Spinner size={"small"} />}
                {/* rgb(17,25,33) */}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    chart: {
        width: 200,
        height: 200,
    },
    durationButtons: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    }
});

export default GraphView;