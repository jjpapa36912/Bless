import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function GoogleLoginScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // 👈 Firebase에서 발급받은 웹 클라이언트 ID
      offlineAccess: false,
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // 안드로이드에서 Google Play 서비스 확인
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo.user);

      // 로그인 성공 후 메인 화면으로 이동
      navigation.replace('MainScreen', {
        name: userInfo.user.name,
        email: userInfo.user.email,
      });

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('로그인 취소됨');
      } else {
        Alert.alert('로그인 실패', error.message);
        console.error('Google Sign-In Error:', error);
      }
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Google 로그인</Text>

        <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
          <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png',
              }}
              style={styles.googleIcon}
          />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>

        {userInfo && (
            <View style={styles.userBox}>
              <Text style={styles.welcome}>환영합니다, {userInfo.name}님!</Text>
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
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: '#FFD54F',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
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
