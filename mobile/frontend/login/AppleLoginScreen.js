import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';

export default function AppleLoginScreen() {
  const [userInfo, setUserInfo] = useState(null);

  const handleAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [
          appleAuth.Scope.EMAIL,
          appleAuth.Scope.FULL_NAME,
        ],
      });

      console.log(appleAuthRequestResponse);

      setUserInfo({
        email: appleAuthRequestResponse.email,
        fullName: appleAuthRequestResponse.fullName,
      });
    } catch (error) {
      console.log('Apple login error:', error);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Apple 로그인</Text>

        {Platform.OS === 'ios' && (
            <AppleButton
                style={styles.appleButton}
                cornerRadius={5}
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                onPress={handleAppleLogin}
            />
        )}

        {userInfo && (
            <View style={styles.userBox}>
              <Text style={styles.welcome}>
                환영합니다, {userInfo.fullName?.givenName || '사용자'}님!
              </Text>
              <Text style={styles.email}>{userInfo.email}</Text>
            </View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4B2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    color: 'brown',
    fontWeight: 'bold',
  },
  appleButton: {
    width: 250,
    height: 45,
  },
  userBox: {
    marginTop: 30,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    color: 'brown',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
});
