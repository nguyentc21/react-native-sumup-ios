import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import CheckIntegrationBtn from './components/CheckIntegrationBtn';
import InitBtn from './components/InitBtn';
import CheckLoginBtn from './components/CheckLoginBtn';
import LoginWithViewControllerBtn from './components/LoginWithViewControllerBtn';
import PrepareForCheckoutBtn from './components/PrepareForCheckoutBtn';
import LoginWithTokenBtn from './components/LoginWithTokenBtn';
import CheckoutBtn from './components/CheckoutBtn';
import LogoutBtn from './components/LogoutBtn';

const REPOSITORY = 'https://github.com/nguyentc21/react-native-sumup-ios';

export default function App() {
  const [affiliateKey, setAffiliateKey] = useState('');
  const [accessToken, setAccessToken] = useState('');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#000' }}
      contentContainerStyle={{ paddingVertical: 100, alignItems: 'center' }}
    >
      <View
        style={{
          backgroundColor: '#fff',
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderRadius: 100,
        }}
      >
        <Text
          style={[
            styles.text,
            { fontSize: 20, fontWeight: 'bold', color: '#111' },
          ]}
        >
          react-native-sumup-ios
        </Text>
      </View>
      <Pressable
        style={{ paddingTop: 5, paddingBottom: 10, marginBottom: 50 }}
        onPress={() => {
          Linking.openURL(REPOSITORY);
        }}
      >
        <Text
          style={[
            styles.text,
            { color: '#016fff', textDecorationLine: 'underline' },
          ]}
        >
          {REPOSITORY}
        </Text>
      </Pressable>
      <Text style={styles.text}>Enter affiliate key:</Text>
      <TextInput
        style={[
          styles.text,
          styles.button,
          { backgroundColor: '#333', marginBottom: 10 },
        ]}
        value={affiliateKey}
        onChangeText={(text) => {
          setAffiliateKey(text);
        }}
        placeholder="Enter..."
      />
      <Text style={styles.text}>Enter access token:</Text>
      <TextInput
        style={[
          styles.text,
          styles.button,
          { backgroundColor: '#333', marginBottom: 80 },
        ]}
        value={accessToken}
        onChangeText={(text) => {
          setAccessToken(text);
        }}
        placeholder="Enter..."
      />

      <CheckIntegrationBtn />
      <InitBtn affiliateKey={affiliateKey} />
      <CheckLoginBtn />
      <LoginWithViewControllerBtn />
      <PrepareForCheckoutBtn />
      <LoginWithTokenBtn token={accessToken} />
      <CheckoutBtn />
      <LogoutBtn />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '60%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
