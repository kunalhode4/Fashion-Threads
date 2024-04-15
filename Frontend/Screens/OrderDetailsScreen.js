import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios'; // Import axios for making HTTP requests
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetailsScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]); 
  const host = "192.168.228.33:5000";

  useLayoutEffect(() => {
    // Fetch user's orders when component mounts
    fetchOrders();
  }, []);

  useLayoutEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      fetchOrders();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  let token;
  let headers = {};

  const setHeaders = async () => {
    token = await AsyncStorage.getItem('token');
    headers = {
      "auth-token": token
    }
  }


  
  const fetchOrders = async () => {
    try {
      
      setHeaders()
        .then(() => {
          axios.get(`http://${host}/api/orders`, { headers: headers })
            .then((res) => {
              setOrders(res.data);
              console.log(res.data);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Render each order item
  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text>Order ID: {item._id}</Text>
      <Text>Total Amount: ₹{item.totalAmount}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Delivery Date: {new Date(item.deliveryDate).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      {/* Render a FlatList to display orders */}
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    width: '100%',
  },
  orderItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default OrderDetailsScreen;
