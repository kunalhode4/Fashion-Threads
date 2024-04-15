import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderPlacingScreen = ({ route, navigation }) => {
    const { selectedProduct } = route.params;
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const host = "172.20.10.5:5000";

    let token;
    let headers = {};

    const setHeaders = async () => {
        token = await AsyncStorage.getItem('token');
        headers = {
            "auth-token": token
        }
    }

    // Function to confirm the order
    const confirmOrder = () => {
        // Check if all address details are entered
        if (!address || !state || !city || !pincode) {
            alert('Please enter all address details');
            return;
        }

        console.log('Order details:', selectedProduct);
        console.log('Address:', address);
        console.log('State:', state);
        console.log('City:', city);
        console.log('Pincode:', pincode);

        setHeaders()
            .then(() => {
                axios.post(`http://${host}/api/place-orders`, {
                    products: [selectedProduct], // Assuming selectedProduct is an object containing the product details
                    totalAmount: selectedProduct.price * selectedProduct.quantity,
                    address: {
                        address,
                        state,
                        city,
                        pincode
                    }
                }, { headers: headers })
                    .then((res) => {
                        if (res.data.message === "Order placed successfully") {
                            deleteItemFromCart(selectedProduct.cartItemId, "null");
                            // navigation.navigate("OrderDetailsScreen");
                            Alert.alert("Order Placed Successfully 😊")
                            setTimeout(() => {
                                navigation.goBack()

                            }, 1200)
                        }
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => console.log(err));

        // Navigate to success page or show confirmation message
    };

    const deleteItemFromCart = async (cartItemId, org) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                "auth-token": token
            };
            const response = await axios.delete(`http://${host}/api/delete-cart-item/${cartItemId}`, { headers: headers });
            org === "deletebutton" ? navigation.goBack() : null;
            // navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <Image source={{ uri: `http://${host}/images/${selectedProduct.image}` }} style={styles.productImage} />
                        <Text>{selectedProduct.productName}</Text>
                        <Text>{`Quantity: ${selectedProduct.quantity}`}</Text>
                        <Text>{`Size: ${selectedProduct.size}`}</Text>
                        <Text>{`Price: ₹${selectedProduct.price * selectedProduct.quantity}`}</Text>
                    </View>
                </View>

                <View style={styles.addressContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        onChangeText={text => setAddress(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="State"
                        onChangeText={text => setState(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        onChangeText={text => setCity(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Pincode"
                        onChangeText={text => setPincode(text)}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <Button title="Confirm Order (Cash on Delivery)" onPress={confirmOrder} />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => deleteItemFromCart(selectedProduct.cartItemId, "deletebutton")}>
                        <Text style={{ color: "#FFF", fontSize: 15 }}>Delete Item from Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    card: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    cardContent: {
        marginBottom: 10,
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    addressContainer: {
        width: '90%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonsContainer: {
        width: '90%',
        marginBottom: 15
    },
    buttonStyle: {
        borderColor: "#FF0000",
        borderWidth: 2,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF0000",
        borderRadius: 2
    },
});

export default OrderPlacingScreen;
