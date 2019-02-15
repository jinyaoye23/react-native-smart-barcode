/*
 * A smart barcode scanner for react-native apps
 * https://github.com/react-native-component/react-native-smart-barcode/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */


import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    View,
    requireNativeComponent,
    NativeModules,
    AppState,
    Platform,
    ViewPropTypes
} from 'react-native'

const BarcodeManager = Platform.OS == 'ios' ? NativeModules.Barcode : NativeModules.CaptureModule


export default class Barcode extends Component {

    static defaultProps = {
        barCodeTypes: Object.values(BarcodeManager.barCodeTypes),
        scannerRectWidth: 255,
        scannerRectHeight: 255,
        scannerRectTop: 0,
        scannerRectLeft: 0,
        scannerLineInterval: 3000,
        scannerRectCornerColor: `#09BB0D`,
    }

    static propTypes = {
        ...ViewPropTypes,
        //         onBarCodeReaded: PropTypes.func.isRequired,
        onBarCodeReaded: PropTypes.func,
        barCodeTypes: PropTypes.array,
        scannerRectWidth: PropTypes.number,
        scannerRectHeight: PropTypes.number,
        scannerRectTop: PropTypes.number,
        scannerRectLeft: PropTypes.number,
        scannerLineInterval: PropTypes.number,
        scannerRectCornerColor: PropTypes.string,
    }

    render() {
        let onBarCodeRead = this.props.onBarCodeReaded ? this.props.onBarCodeReaded : this.props.onBarCodeRead;
        delete this.props.onBarCodeRead;
        return (
            <NativeBarCode
                {...this.props}
                onBarCodeReaded={onBarCodeRead}
            />
        )
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    startScan() {
        BarcodeManager.startSession()
    }

    stopScan() {
        BarcodeManager.stopSession()
    }

    /* add by David at 2019-02-14 start */
    // 识别相册二维码
    static async analysisQRcode(path) {
        let result = await BarcodeManager.analysisQRcode(path)
        return result
    }
    /* add by David at 2019-02-14 end */

    _handleAppStateChange = (currentAppState) => {
        if (currentAppState !== 'active') {
            this.stopScan()
        }
        else {
            this.startScan()
        }
    }
}

const NativeBarCode = requireNativeComponent(Platform.OS == 'ios' ? 'RCTBarcode' : 'CaptureView', Barcode)
