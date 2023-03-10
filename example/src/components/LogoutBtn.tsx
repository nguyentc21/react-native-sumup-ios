import React, { useState } from 'react';
import { Alert } from 'react-native';
import SumUpModule from 'react-native-sumup-ios';
import Button from './Button';

const LogoutBtn = () => {
  const [processing, setProcessing] = useState(false);
  const _onPress = async () => {
    try {
      setProcessing(true);
      await SumUpModule.logout();
      setProcessing(false);
      Alert.alert('Logout successful');
    } catch (error) {
      Alert.alert('Logout failure!!');
      setProcessing(false);
    }
  };
  return <Button label={'Logout'} onPress={_onPress} processing={processing} />;
};

export default LogoutBtn;
