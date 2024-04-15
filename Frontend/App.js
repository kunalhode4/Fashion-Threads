import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './Navigation/AppNavigation';
import { RNCamera } from "react-native-camera"
import { LogBox } from 'react-native';
// import "expo-camera"
LogBox.ignoreAllLogs();


export default function App() {
  return (
<AppNavigation>
  
</AppNavigation>
  );
}