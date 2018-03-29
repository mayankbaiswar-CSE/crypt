import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, NetInfo, ScrollView,
    InteractionManager
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
import GraphView from './GraphView';
import moment from 'moment';
import nextFrame from 'next-frame';
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
            this.fetchGraphData(moment().subtract(1, 'd').valueOf(), moment().valueOf());
        } else {
            this.setState({ isConnected });
        }
        await nextFrame();
    }

    componentWillMount() {
        const { currencyData } = this.props.state;
        if (currencyData && currencyData.price_usd && currencyData.price_usd.length !== 0) {
            this._resetAllGraphData();
        }
    }

    componentWillUnmount() {
        this._resetAllGraphData();
    }

    _resetAllGraphData() {
        const { resetCurrencyGraphData } = this.props.actions;
        resetCurrencyGraphData();
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
                    onPress={this.fetchGraphData.bind(this, moment().subtract(1, 'd').valueOf(), moment().valueOf())}
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
                        flex: 1,
                        textAlign: "right",
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

    returnGraphData(graphData) {
        let graphPoints = [];
        graphPoints = graphData.map((item) =>
            ({ x: moment(item[0]).format('MMM D, LT'), y: item[1] }));
        return graphPoints;
    }

    async fetchGraphData(start, end) {
        let isConnected = await NetInfo.isConnected.fetch();
        if (isConnected) {
            const { state: { params } } = this.props.navigation;
            this._resetAllGraphData();
            this.props.getGraphData(params.currency.id, start, end);
        } else {
            this.setState({ isConnected });
        }
    }

    renderDetail(currency) {
        let last_updated = new Date(currency.last_updated);
        const { currencyData, loading } = this.props.state;
        let data = [];
        if (currencyData && currencyData.price_usd && currencyData.price_usd.length !== 0) {
            data = this.returnGraphData(currencyData.price_usd);
        }
        return (
            <ScrollView style={{ flex: 1 }}>
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
                {currencyData && <GraphView detail={this} loading={loading} data={data} />}
            </ScrollView>
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
