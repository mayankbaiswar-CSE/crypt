import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, NetInfo
} from 'react-native';
import Header from '../widgets/Header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DetailActions from './Actions';
import styles from './DetailScreen.styles';
import GetCurrencyById from '../../../lib/libservices/GetCurrencyById';
import GetCurrencyGraph from '../../../lib/libservices/GetCurrencyGraph';
import * as ActionTypes from './ActionTypes';
import APIActionsBuilder from '../../../lib/libapi/APIActionsBuilder';
import makeInterceptedRequest, { addBasicInterceptors } from '../../../lib/libapi/interceptors/makeInterceptedRequest';
import ErrorView from '../widgets/ErrorView';
import fonts from '../../assets/fonts';
import normalize, { verticalScale } from '../config/device/normalize';

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: true
        };
    }

    async componentDidMount() {
        const isConnected = await NetInfo.isConnected.fetch();
        if (isConnected) {
            const { state: { params } } = this.props.navigation;
            console.log(params.currency);
            this.props.getGraphData(params.currency.id, Date.now() - 24 * 3600 * 1000, Date.now());
        } else {
            this.setState({ isConnected });
        }
    }

    _onBackPress = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    renderError() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ErrorView
                    errorText={"oops! Something went wrong."}
                    onPress={this.props.getGraphData.bind(this, params.currency.id, Date.now() - 24 * 3600 * 1000, Date.now())}
                />
            </View>
        );
    }

    getDetailView(currency) {
        const p1h = currency.percent_change_1h < 0 ? true : false;
        const p24h = currency.percent_change_24h < 0 ? true : false;
        const p7d = currency.percent_change_7d < 0 ? true : false;
        return (
            <View>
                <View style={[styles.detailRowStyle, { backgroundColor: 'rgb(26,37,52)' }]} >
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>Symbol</Text>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>{currency.symbol}</Text>
                </View>

                <View style={styles.detailRowStyle} >
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>Price in BTC</Text>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>{'฿ ' + currency.price_btc}</Text>
                </View>

                <View style={[styles.detailRowStyle, { backgroundColor: 'rgb(26,37,52)' }]} >
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>Market Cap</Text>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>{'₹ ' + currency.market_cap_inr}</Text>
                </View>

                <View style={styles.detailRowStyle} >
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>Volume in 24h</Text>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>{'₹ ' + currency['24h_volume_inr']}</Text>
                </View>

                <View style={[styles.detailRowStyle, { backgroundColor: 'rgb(26,37,52)' }]}>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>Total Supply</Text>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>{currency.total_supply}</Text>
                </View>

                <View style={styles.detailRowStyle} >
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>Available Supply</Text>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>{currency.available_supply}</Text>
                </View>

                <View style={[styles.detailRowStyle, { backgroundColor: 'rgb(26,37,52)' }]}>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>1h change</Text>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: p1h ? 'red' : 'rgb(0,255,0)'
                    }}>{currency.percent_change_1h + (p1h ? '% ↓' : '% ↑')}</Text>
                </View>

                <View style={styles.detailRowStyle} >
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>24h change</Text>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: p24h ? 'red' : 'rgb(0,255,0)'
                    }}>{currency.percent_change_24h + (p24h ? '% ↓' : '% ↑')}</Text>
                </View>

                <View style={[styles.detailRowStyle, { backgroundColor: 'rgb(26,37,52)' }]} >
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: '#ffffff'
                    }}>7d change</Text>
                    <Text style={{
                        fontFamily: fonts.MontserratLight,
                        color: p7d ? 'red' : 'rgb(0,255,0)'
                    }}>{currency.percent_change_7d + (p7d ? '% ↓' : '% ↑')}</Text>
                </View>
            </View>
        );
    }

    renderDetail(currency) {
        let last_updated = new Date(currency.last_updated);
        console.log("last_updated: ", currency.last_updated);
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: "center", padding: 12, marginVertical: verticalScale(24) }} >
                    <View>
                        <Text style={{
                            fontFamily: fonts.MontserratRegular, fontSize: normalize(25),
                            color: '#ffffff', textAlign: 'center'
                        }}>{'₹ ' + currency.price_inr}</Text>
                        <Text style={{
                            fontFamily: fonts.MontserratLight,
                            color: '#ffffff'
                        }}>{new Date(currency.last_updated * 1000).toString()}</Text>
                    </View>
                </View>
                {this.getDetailView(currency)}
            </View>
        );
    }

    render() {
        const { state: { params } } = this.props.navigation;
        const { currency } = params;
        return (
            <View style={styles.container}>
                <Header onBackPress={this._onBackPress} title={currency.name} />
                {!this.state.isConnected && this.renderError()}

                {this.state.isConnected && this.renderDetail(currency)}


            </View>
        );
    }
}

Details.navigationOptions = {
    header: null
}

function mapStateToProps(state) {
    return {
        state: state.detailReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...DetailActions }, dispatch),
        getCurrencyById: (id) => {
            const dispatchedActions = new APIActionsBuilder(ActionTypes.GET_CRYPTO_DETAILS_SUCCESS, ActionTypes.GET_CRYPTO_DETAILS_ERROR,
                ActionTypes.GET_CRYPTO_DETAILS_LOADING)
                .build();
            let currencyByIdApi = new GetCurrencyById(dispatchedActions);
            dispatch(makeInterceptedRequest(currencyByIdApi, { id }));
        },
        getGraphData: (id, start, end) => {
            const dispatchedActions = new APIActionsBuilder(ActionTypes.GET_GRAPH_DATA_SUCCESS, ActionTypes.GET_GRAPH_DATA_ERROR,
                ActionTypes.GET_GRAPH_DATA_LOADING)
                .build();
            let currencyGraph = new GetCurrencyGraph(dispatchedActions);
            dispatch(makeInterceptedRequest(currencyGraph, { id, start, end }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
