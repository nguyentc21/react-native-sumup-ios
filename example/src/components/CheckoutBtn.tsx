import React, { useState } from 'react';
import { Alert } from 'react-native';
import SumUpModule from 'react-native-sumup-ios';
import Button from './Button';

const PrepareForCheckoutBtn = () => {
  const [processing, setProcessing] = useState(false);
  const _onPress = async () => {
    try {
      setProcessing(true);
      const checkoutResult = await SumUpModule.checkout(
        'Test checkout SumUp',
        2,
        'USD',
        1
      );
      setProcessing(false);
      Alert.alert('Checkout successful', checkoutResult.transactionCode);
    } catch (error) {
      Alert.alert('Checkout', 'Something went wrong!');
      setProcessing(false);
    }
  };
  return (
    <Button label={'Checkout'} onPress={_onPress} processing={processing} description='Test an order with 2$ (1$ tip)'/>
  );
};

export default PrepareForCheckoutBtn;
