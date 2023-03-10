import React, { useState } from 'react';
import { Alert } from 'react-native';
import SumUpModule from 'react-native-sumup-ios';
import Button from './Button';

const LoginWithViewControllerBtn = () => {
  const [processing, setProcessing] = useState(false);
  const _onPress = async () => {
    try {
      setProcessing(true);
      await SumUpModule.loginWithViewController();
      setProcessing(false);
      Alert.alert('Login successful');
    } catch (error) {
      Alert.alert('Login failure!!!');
      setProcessing(false);
    }
  };
  return (
    <Button
      label={'Login with View Controller'}
      onPress={_onPress}
      processing={processing}
    />
  );
};

export default LoginWithViewControllerBtn;
