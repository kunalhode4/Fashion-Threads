import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reviews from '../Reviews';

const ProductDetailScreenK = ({ route }) => {
  const navigation = useNavigation();
  const host = "192.168.228.33:5000";

  const { productName, price, image, description, productId } = route.params.product;
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (selectedSize) {
      await setHeaders();
      let data = {
        productId: productId,
        size: selectedSize,
        quantity: quantity,
      }

      axios.post(`http://${host}/api/add-to-cart`, data, { headers: headers })
        .then((res) => {
          Alert.alert("Product added to Cart");
        })
        .catch(err => console.log(err));
    } else {
      Alert.alert('Please select an age range before adding to the cart');
    }
  };

  const handleVRButtonPress = () => {
    console.log("VR button pressed");
    navigation.navigate("cameraScreen", { image: image });
  };

  const yearsChart = [
    { year: '2-3', description: '2-3' },
    { year: '4-5', description: '4-5' },
    { year: '6-7', description: '6-7' },
    { year: '8-9', description: '8-9' },
    // Add more years as needed
  ];

  const scrollViewRef = useRef();

  useEffect(() => {
    // Scroll to top when the component mounts
    scrollViewRef.current.scrollTo({ y: 0 });
  }, []);

  return (
    <ScrollView ref={scrollViewRef}>
      <View style={styles.container}>
        <Image source={{ uri: `http://${host}/images/${image}` }} style={styles.productImage} />
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.productPrice}>{`₹.${price}`}</Text>
        <Text style={styles.productDescription}>{description}</Text>
        <TouchableOpacity style={styles.vrButton} onPress={handleVRButtonPress}>
          <Text style={styles.vrButtonText}>VR</Text>
        </TouchableOpacity>
        <View style={styles.sizeChartContainer}>
          <Text style={styles.sizeChartTitle}>Age Chart</Text>
          <View style={styles.sizeChart}>
            {yearsChart.map((item) => (
              <TouchableOpacity
                key={item.year}
                style={[
                  styles.sizeSquare,
                  selectedSize === item.year ? styles.selectedSize : null,
                ]}
                onPress={() => setSelectedSize(item.year)}
              >
                <Text style={styles.sizeText}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Customer Reviews</Text>
          <Reviews productId={productId} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  vrButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    
  },
  vrButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sizeChartContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  sizeChartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sizeChart: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sizeSquare: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  sizeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedSize: {
    backgroundColor: '#2ecc71',
  },
  addToCartButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewSection: {
    marginTop: 20,
    width: '100%',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreenK;
