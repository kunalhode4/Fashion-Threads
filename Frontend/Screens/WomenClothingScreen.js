// screens/WomenClothingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const WomenClothingScreen = () => {
  const navigation = useNavigation();
  const [productDetails, setProductDetails] = useState([]);

  const host = "192.168.228.33:5000";

  // Example product data for Women's Clothing
  const products = [
    {
      id: 1,
      name: 'Green Graphic Printed T-Shirt',
      price: '$50',
      image: require('../Imag/W1.png'),
    },
    {
      id: 2,
      name: 'Pink Printed T-Shirt',
      price: '$30',
      image: require('../Imag/W2.png'),
    },
    {
      id: 3,
      name: 'Floral Printed T-shirt',
      price: '$40',
      image: require('../Imag/W3.png'),
    },
    // Add more products as needed
  ];

  // const renderProductItem = ({ item }) => (
  //   <TouchableOpacity
  //     style={styles.productItem}
  //     onPress={() => navigation.navigate('ProductDetailScreenW', { product: item })}
  //   >
  //     <Image source={item.image} style={styles.productImage} />
  //     <Text style={styles.productName}>{item.name}</Text>
  //     <Text style={styles.productPrice}>{item.price}</Text>
  //   </TouchableOpacity>
  // );

  useEffect(() => {

    axios.get(`http://${host}/api/get-products/female`)
      .then(res => {
        console.log(res.data);
        setProductDetails(res.data);
      })
      .catch(err => console.log(err));

  }, []);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{uri: `http://${host}/images/${item.image}`}} style={styles.productImage} />
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productPrice}>{`₹.${item.price}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Women's Clothing</Text>
      <FlatList
        data={productDetails}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center horizontally
    marginBottom: 10,
  },
  productItem: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#777',
  },
});

export default WomenClothingScreen;
