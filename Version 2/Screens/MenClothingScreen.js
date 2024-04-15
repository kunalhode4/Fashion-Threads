// screens/MenClothingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const MenClothingScreen = () => {
  const navigation = useNavigation();
  const [productDetails, setProductDetails] = useState([]);

  const host = "172.20.10.5:5000";

  useEffect(() => {

    axios.get(`http://${host}/api/get-products/male`)
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
      <Text style={styles.productPrice}>{`₹ ${item.price}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Men's Clothing</Text>
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
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
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

export default MenClothingScreen;
