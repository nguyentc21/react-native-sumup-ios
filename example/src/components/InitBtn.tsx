import React, { useState } from 'react';
import { Alert } from 'react-native';
import SumUpModule from 'react-native-sumup-ios';
import Button from './Button';

const CheckIntegrationBtn = (props: { affiliateKey: string }) => {
  const [processing, setProcessing] = useState(false);
  const _onPress = async () => {
    try {
      if (!props.affiliateKey) {
        Alert.alert('Fail', 'Please enter Affiliate key first.');
        return;
      }
      setProcessing(true);
      const result = await SumUpModule.init(props.affiliateKey);
      setProcessing(false);
      Alert.alert('Init', result ? 'Success.' : 'Already set up!!!');
    } catch (error) {
      Alert.alert('Init', 'Error!!!\nInvalid key');
      setProcessing(false);
    }
  };
  return (
    <Button
      label={'Init (set affiliate key)'}
      description={'Only need set key once.'}
      onPress={_onPress}
      processing={processing}
    />
  );
};

export default CheckIntegrationBtn;
