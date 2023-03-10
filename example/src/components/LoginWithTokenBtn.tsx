import React, { useState } from 'react';
import { Alert } from 'react-native';
import SumUpModule from 'react-native-sumup-ios';
import Button from './Button';

const LoginWithTokenBtn = (props: { token: string }) => {
  const [processing, setProcessing] = useState(false);
  const _onPress = async () => {
    try {
      setProcessing(true);
      const result = await SumUpModule.loginWithToken(props.token);
      setProcessing(false);
      Alert.alert(
        'Login with access token',
        result ? 'Successful' : 'You are not logged in!'
      );
    } catch (error) {
      Alert.alert('Login with access token', 'Something went wrong!');
      setProcessing(false);
    }
  };
  return (
    <Button
      label={'Login with access token'}
      onPress={_onPress}
      processing={processing}
    />
  );
};

export default LoginWithTokenBtn;
