import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { verticalScale, normalScale } from '../device/normalize';

import Details from '../../DetailScreen';
import Home from '../../HomeScreen';

const Root = StackNavigator({
    home: { screen: Home },
    details: { screen: Details },
});

export default Root;