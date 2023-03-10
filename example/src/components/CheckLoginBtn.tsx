import React, { useState } from 'react';
import { Alert } from 'react-native';
import SumUpModule from 'react-native-sumup-ios';
import Button from './Button';

const CheckIntegrationBtn = () => {
  const [processing, setProcessing] = useState(false);
  const _onPress = async () => {
    try {
      setProcessing(true);
      const result = await SumUpModule.checkLogin();
      setProcessing(false);
      Alert.alert('Check login', result ? 'Already' : 'Not yet!');
    } catch (error) {
      Alert.alert('Check login failure', 'Something went wrong!');
      setProcessing(false);
    }
  };
  return (
    <Button label={'Check login'} onPress={_onPress} processing={processing} />
  );
};

export default CheckIntegrationBtn;
