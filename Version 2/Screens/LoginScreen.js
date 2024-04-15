
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const host = "172.20.10.2:5000";

  const handleLogin = () => {
    // Simulating authentication logic
    if (email && password) {

      axios.post(`http://${host}/api/auth/login`, { email: email, password: password })
        .then(async (res) => {
          console.log(res.data.authToken);
          await AsyncStorage.setItem('token', String(res.data.authToken));

          navigation.replace('Home'); // Assuming you have a HomeScreen

        })
        .catch(err => console.log(err));

      // Successful login, navigate to the home screen or any other screen
    } else {
      // Display an error message
      Alert.alert('Login Failed', 'Please fill in all fields');
    }
  };

  const handleSignUpPress = () => {
    navigation.navigate("SignupScreen");
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={{ display: "flex", flexDirection: 'row', marginBottom: 12 }}>
        <Text>Don't have an account ? </Text>
        <TouchableOpacity onPress={handleSignUpPress}>
          <Text style={{ color: "#0000FF" }} >Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#9A7FAE', // Light purple
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;