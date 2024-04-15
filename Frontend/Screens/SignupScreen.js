import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'; // Fixed import
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {

  const host = "192.168.228.33:5000";

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSignup = () => {
    // Simulating signup logic
    if (details.name != "" && details.email != "" && details.password != "") {
      // Successful signup, navigate to the login screen
      console.log(details);

      axios.post(`http://${host}/api/auth/createuser`, details)
        .then(async (res) => {
          console.log(res.data);
          console.log(typeof res.data.authToken, res.data.authToken);

          await AsyncStorage.setItem('token', String(res.data.authToken));
          console.log("Done")
          // Navigate to the login screen
          navigation.navigate('Home');

        })
        .catch(err => Alert.alert(err));

      // navigation.navigate('LoginScreen', { email, password });
    } else {
      // Display an error message if any field is empty
      Alert.alert('Signup Failed', 'Please fill in all fields');
    }
  };

  const handleLoginPress = () => {
    navigation.navigate("LoginScreen");
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="text"
        value={details.name}
        onChangeText={(name) => setDetails({ ...details, name })}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={details.email}
        onChangeText={(email) => setDetails({ ...details, email })}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={details.password}
        onChangeText={(password) => setDetails({ ...details, password })}
      />

      <View style={{ display: "flex", flexDirection: 'row', marginBottom: 12 }}>
        <Text>Don't have an account ? </Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={{ color: "#0000FF" }} >Login</Text>
        </TouchableOpacity>
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
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
    backgroundColor: '#C5B3D7', // Lighter purple
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
