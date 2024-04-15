// screens/ProductDetailScreen.js
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reviews from '../Reviews';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productName, price, image, description, productId } = route.params.product;
  // const description =
  //   "Elevate your style with our cozy SweatShirts comfort meets fashion in every stitch. Perfect for casual chic vibes, these pieces redefine your wardrobe essentials.";

  const host = "192.168.228.33:5000";
  const [reviews, setReviews] = React.useState([]);
  const [newReview, setNewReview] = React.useState('');
  const [selectedSize, setSelectedSize] = React.useState(null); // Track selected size

  const handleAddReview = () => {
    if (newReview.trim() !== '') {
      setReviews([...reviews, { user: 'Anonymous', comment: newReview }]);
      setNewReview('');
    }
  };

  let token;
  let headers = {};

  const setHeaders = async () => {
    token = await AsyncStorage.getItem('token');
    headers = {
      "auth-token": token
    }
    console.log(headers);
  }

  // useLayoutEffect(() => {
  //   setHeaders();
  // }, [])

  const handleAddToCart = async () => {
    if (selectedSize) {
      // Pass the selected product and size to the CartScreen
      // navigation.navigate('Cart', { product: { productName, price, image, size: selectedSize, productId } });
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
      Alert.alert('Please select a size before adding to the cart');
    }
  };

  const handleVRButtonPress = () => {
    console.log("VR button pressed");
    navigation.navigate("cameraScreen", { image: image });
  };

  const sizeChart = [
    { size: 'S', measurement: '36-38' },
    { size: 'M', measurement: '38-40' },
    { size: 'L', measurement: '40-42' },
    { size: 'XL', measurement: '42-44' },
    // Add more sizes as needed
  ];

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

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
        <Text style={styles.productPrice}>{`₹. ${price}`}</Text>
        <Text style={styles.productDescription}>{description}</Text>
        <TouchableOpacity style={styles.vrButton} onPress={handleVRButtonPress}>
          <Text style={styles.vrButtonText}>VR</Text>
        </TouchableOpacity>
        <View style={styles.sizeChartContainer}>
          <Text style={styles.sizeChartTitle}>Size Chart</Text>
          <View style={styles.sizeChart}>
            {sizeChart.map((item) => (
              <TouchableOpacity
                key={item.size}
                style={[
                  styles.sizeCircle,
                  selectedSize === item.size && { backgroundColor: '#2ecc71' },
                ]}
                onPress={() => setSelectedSize(item.size)}
              >
                <Text style={styles.sizeText}>{item.size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        {/* Reviews Section */}
        
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
    backgroundColor: '#3498db',
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
  sizeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  sizeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  reviewItem: {
    marginBottom: 10,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewComment: {
    fontSize: 14,
  },
  reviewInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  addReviewButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  reviewSection: {
    marginTop: 20,
    width: '100%',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProductDetailScreen;