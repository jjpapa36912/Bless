import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {useNavigation} from "@react-navigation/native";

const LoginScreen = ({navigation}) => {
  // const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoogleLogin')}>
          <Text style={styles.buttonText}>구글 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoogleLogin')}>
          <Text style={styles.buttonText}>카카오 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoogleLogin')}>
          <Text style={styles.buttonText}>애플 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoogleLogin')}>
          <Text style={styles.buttonText}>네이버 로그인</Text>
        </TouchableOpacity>
      </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4B2', // 따뜻한 노란 배경
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#A14D3A',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFE580',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#6B3E26',
    fontSize: 16,
    fontWeight: '600',
  },
});
