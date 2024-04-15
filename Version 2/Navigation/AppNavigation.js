// AppNavigation.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import OnboardingScreen from '../Screens/OnboardingScreen';
import SearchScreen from '../Screens/SearchScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CartScreen from '../Screens/CartScreen';
import LoginScreen from '../Screens/LoginScreen'; // Import the LoginScreen
import SignupScreen from '../Screens/SignupScreen'; // Import the SignupScreen
import Icon from 'react-native-vector-icons/Ionicons';
//import FirstPage from '../Screens/HomeScreen';
import MenClothingScreen from '../Screens/MenClothingScreen';
import WomenClothingScreen from '../Screens/WomenClothingScreen';
import KidsClothingScreen from '../Screens/KidsClothingScreen';
import ProductDetailScreen from '../Screens/Men/ProductDetailScreen';
import ProductDetailScreenW from '../Screens/Men/ProductDetailScreenW';
import ProductDetailScreenK from '../Screens/Men/ProductDetailScreenK';
import CameraScreen from '../Screens/CameraScreen';
import OrderPlacingScreen from '../Screens/OrderPlacingScreen';
import OrderDetailsScreen from '../Screens/OrderDetailsScreen';
// import ArProductsScreen from '../Screens/ArProductsScreen';
// import ArProductDetails from '../Screens/ArProductDetails';
// import ArCameraScreen from '../screens/ArCameraScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Orders" component={OrderDetailsScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            
            {/* Add more Tab.Screen components as needed */}
        </Tab.Navigator>
    );
};

export default function AppNavigation() {
    const [showTabs, setShowTabs] = useState(false);

    const handleDonePress = () => {
        setShowTabs(true);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='OnboardingScreen'>
                <Stack.Screen name='OnboardingScreen' options={{ headerShown: false }} component={OnboardingScreen} />
                <Stack.Screen name='Home' options={{ headerShown: false }} component={HomeTabs} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='SignupScreen' component={SignupScreen} />
                {/* <Stack.Screen name="FirstPage" component={FirstPage} /> */}
                <Stack.Screen name="MenClothingScreen" component={MenClothingScreen} />
                <Stack.Screen name="WomenClothingScreen" component={WomenClothingScreen} />
                <Stack.Screen name="KidsClothingScreen" component={KidsClothingScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
                <Stack.Screen name="OrderPlacing" component={OrderPlacingScreen} />
                <Stack.Screen name="ProductDetailScreenW" component={ProductDetailScreenW} />
                <Stack.Screen name="ProductDetailScreenK" component={ProductDetailScreenK} />
                <Stack.Screen name="cameraScreen" component={CameraScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                

            </Stack.Navigator>


            {showTabs && (
                <Tab.Navigator>
                    <Tab.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} />
                    <Tab.Screen name='Search' options={{ headerShown: false }} component={SearchScreen} />
                    <Tab.Screen name="Cart" options={{ headerShown: false }} component={CartScreen} />
                    <Tab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
                    {/* Add more Tab.Screen components as needed */}
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
};