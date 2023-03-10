import React, { useState } from 'react';
import { Alert } from 'react-native';
import SumUpModule from 'react-native-sumup-ios';
import Button from './Button';

const CheckIntegrationBtn = () => {
  const [processing, setProcessing] = useState(false);
  const _onPress = async () => {
    try {
      setProcessing(true);
      const result = await SumUpModule.testSDKIntegration();
      setProcessing(false);
      Alert.alert('Check SDK Integration', result ? 'Compatible' : 'Error!!!');
    } catch (error) {
      setProcessing(false);
    }
  };
  return (
    <Button
      label={'Check SDK Integration'}
      onPress={_onPress}
      processing={processing}
    />
  );
};

export default CheckIntegrationBtn;
