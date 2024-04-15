import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSignupPress = () => {
    navigation.navigate('SignupScreen');
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("token")
      .then((res) => {
        navigation.navigate("LoginScreen");
      })
      .catch(err => console.log(err));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Fashion Threads</Text>

      {/* Login Button */}
      <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Button */}
      <TouchableOpacity onPress={handleSignupPress} style={[styles.button, styles.signupButton]}>
        <Text style={[styles.buttonText, styles.signupButtonText]}>Signup</Text>
      </TouchableOpacity>
      
      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
        <Text style={[styles.buttonText, styles.signupButtonText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Set background color to white
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#92B6D4', // Light blue
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#FFD180', // Light orange
    marginVertical: 5,
  },
  logoutButton: {
    backgroundColor: '#FF0000', 
    marginVertical: 5,
  },
  signupButtonText: {
    color: 'black',
  },
});

export default ProfileScreen;
