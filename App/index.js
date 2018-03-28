import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from "react-redux";
import store from "./src/config/store";
import Root from './src/config/routes';
import AppStatusBar from './src/widgets/StatusBar';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <AppStatusBar backgroundColor="rgb(26,37,52)" barStyle="light-content" />
                    <Root />
                </View>
            </Provider>
        );
    }
}

export default App;
