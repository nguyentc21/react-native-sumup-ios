import React, { useState } from 'react';
import { Alert } from 'react-native';
import SumUpModule from 'react-native-sumup-ios';
import Button from './Button';

const PrepareForCheckoutBtn = () => {
  const [processing, setProcessing] = useState(false);
  const _onPress = async () => {
    try {
      setProcessing(true);
      const result = await SumUpModule.prepareForCheckout();
      setProcessing(false);
      Alert.alert(
        'Prepare for checkout',
        result ? 'Ready now' : 'You are not logged in!'
      );
    } catch (error) {
      Alert.alert('Prepare for checkout', 'Something went wrong!');
      setProcessing(false);
    }
  };
  return (
    <Button
      label={'Prepare for checkout'}
      onPress={_onPress}
      processing={processing}
    />
  );
};

export default PrepareForCheckoutBtn;
