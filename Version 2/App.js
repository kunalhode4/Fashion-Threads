import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './Navigation/AppNavigation';
import { RNCamera } from "react-native-camera"
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs();
// import "expo-camera"


export default function App() {
  return (
<AppNavigation>
  
</AppNavigation>
  );
}