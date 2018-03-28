import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, NetInfo, FlatList, ActivityIndicator
} from 'react-native';
import Header from '../widgets/Header';
import { LargeList } from "react-native-largelist";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeActions from './Actions';
import styles from './HomeScreen.styles';
import GetCurrencies from '../../../lib/libservices/GetCurrencies';
import APIActionsBuilder from '../../../lib/libapi/APIActionsBuilder';
import * as ActionTypes from './ActionTypes';
import makeInterceptedRequest, { addBasicInterceptors } from '../../../lib/libapi/interceptors/makeInterceptedRequest';
import ErrorView from '../widgets/ErrorView';
import Spinner from '../widgets/Spinner';
import { verticalScale } from '../config/device/normalize';
import ListRow from './ListRow';
import { width } from '../config/device/device';
import fonts from '../../assets/fonts';

class Home extends Component {

    constructor(props) {
        super(props);
        this.start = 0;
        this.limit = 15;
        this.shouldPaginate = true;
        this.state = {
            isConnected: true
        };
        this.retryGetCurrency = this._retryGetCurrency.bind(this);
    }

    componentDidMount() {
        this._retryGetCurrency();
    }

    componentDidUpdate() {
        const { newFetched } = this.props.state;
        if (this.shouldPaginate && this.limit < newFetched.length) {
            this.shouldPaginate = false;
        }
    }

    async _retryGetCurrency() {
        let isConnected = await NetInfo.isConnected.fetch();
        if (isConnected) {
            this.props.getCurrencies(false, false, 0, this.limit);
        } else {
            this.setState({ isConnected });
        }
    }

    renderError() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ErrorView
                    errorText={"oops! Something went wrong."}
                    onPress={this.retryGetCurrency}
                />
            </View>
        );
    }

    renderHeader() {
        return (
            <View
                style={{ width: width, height: verticalScale(40), flexDirection: "row" }}
            >
                <View style={{ flex: 0.33 }}>
                    <Text style={{ fontFamily: fonts.MontserratRegular, color: "#ffffff" }}>{"Currency"}</Text>
                </View>

                <View style={{ flex: 0.34 }}>
                    <Text numberOfLines={2} style={{ fontFamily: fonts.MontserratRegular, color: "#ffffff" }}>{"Price (₹)"}</Text>

                </View>

                <View style={{ flex: 0.33 }}>
                    <Text numberOfLines={2} style={{ fontFamily: fonts.MontserratRegular, color: "#ffffff" }}>{"24Hr Chg%"}</Text>
                </View>
            </View>
        );
    }

    renderCurrencyList() {
        const { currencies, isPullToRefresh } = this.props.state;
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={currencies}
                    contentContainerStyle={{ paddingHorizontal: 12 }}
                    renderItem={({ item, index }) => {
                        return <ListRow
                            onPress={this.openDetails.bind(this, item)}
                            price_inr={item.price_inr}
                            percent_change_24h={item.percent_change_24h}
                            symbol={item.symbol}
                            name={item.name} />
                    }}
                    keyExtractor={item => item.id}
                    onRefresh={this.onRefresh.bind(this)}
                    refreshing={isPullToRefresh}
                    ListFooterComponent={currencies.length !== 0 && this.paginatedFooter}
                    ListHeaderComponent={this.renderHeader.bind(this)}
                    onEndReached={() => currencies.length !== 0 && this.onEndReached()}
                    onEndReachedThreshold={0.5}
                    removeClippedSubviews={true}
                    updateCellsBatchingPeriod={50}
                    initialNumToRender={50}
                />
            </View>
        );
    }

    openDetails(currency) {
        const { navigation } = this.props;
        navigation.navigate("details", { currency });
    }

    async onRefresh() {
        let isConnected = await NetInfo.isConnected.fetch();
        if (isConnected) {
            console.log(this.props);
            this.start = 0;
            this.props.getCurrencies(true, false, this.start, this.limit);
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    }

    paginatedFooter = () => {
        if (!this.state.isConnected || !this.shouldPaginate) {
            return null;
        }

        return (
            <View style={styles.bottomLoader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    onEndReached = async () => {
        if (!this.shouldPaginate) {
            return;
        }
        let isConnected = await NetInfo.isConnected.fetch();
        if (isConnected) {
            this.start = this.start + this.limit;
            this.props.getCurrencies(false, true, this.start, this.limit);
        } else {
            this.setState({ isConnected });
        }
    }

    render() {
        const { currencies, loading, error } = this.props.state;
        return (
            <View style={styles.container}>
                <Header showBack={false} title={"BitFair"} />

                {!this.state.isConnected && !loading && this.renderError()}
                {this.state.isConnected && !loading && this.renderCurrencyList()}
                {loading && <Spinner size={"large"} />}
            </View>
        );
    }
}

Home.navigationOptions = {
    header: null
}

function mapStateToProps(state) {
    return {
        state: state.homeReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...HomeActions }, dispatch),
        getCurrencies: (isPullToRefresh, isPaginating, start, limit) => {
            const dispatchedActions = new APIActionsBuilder(ActionTypes.GET_CRYPTO_SUCCESS, ActionTypes.GET_CRYPTO_ERROR, ActionTypes.GET_CRYPTO_LOADING)
                .addSuccessExtra({ isPullToRefresh })
                .addInprogressExtra({ isPullToRefresh, isPaginating })
                .build();
            let currencyApi = new GetCurrencies(dispatchedActions);
            dispatch(makeInterceptedRequest(currencyApi, { start, limit }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);