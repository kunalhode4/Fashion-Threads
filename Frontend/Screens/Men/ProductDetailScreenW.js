// screens/ProductDetailScreenW.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook for navigation

const ProductDetailScreenW = ({ route }) => {
  const navigation = useNavigation(); // Get the navigation object

  const { name, price, image } = route.params.product;
  const description =
    "From blank slate to bold statement, the printed T-shirt: wearable art, silent screams, and whispered secrets";
  const [reviews, setReviews] = React.useState([]);
  const [newReview, setNewReview] = React.useState('');
  const [selectedSize, setSelectedSize] = React.useState('');

  const handleAddReview = () => {
    if (newReview.trim() !== '') {
      setReviews([...reviews, { user: 'Anonymous', comment: newReview }]);
      setNewReview('');
    }
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      // Pass the selected product and size to the CartScreen
      navigation.navigate('Cart', { product: { name, price, image, size: selectedSize } });
    } else {
      console.log('Please select a size before adding to the cart');
    }
  };

  const handleVRButtonPress = () => {
    console.log("VR button pressed");
  };

  const sizeChart = [
    { size: 'S', measurement: '36-38' },
    { size: 'M', measurement: '38-40' },
    { size: 'L', measurement: '40-42' },
    { size: 'XL', measurement: '42-44' },
    // Add more sizes as needed
  ];

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.productImage} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{price}</Text>
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
                selectedSize === item.size ? styles.selectedSize : null,
              ]}
              onPress={() => setSelectedSize(item.size)}
            >
              <Text style={styles.sizeText}>{item.size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Reviews Section */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Customer Reviews</Text>
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <Text style={styles.reviewUser}>{item.user}</Text>
              <Text style={styles.reviewComment}>{item.comment}</Text>
            </View>
          )}
        />
        <TextInput
          style={styles.reviewInput}
          placeholder="Add your review"
          value={newReview}
          onChangeText={(text) => setNewReview(text)}
        />
        <TouchableOpacity style={styles.addReviewButton} onPress={handleAddReview}>
          <Text style={styles.addReviewButtonText}>Add Review</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  selectedSize: {
    backgroundColor: '#2ecc71', // Customize the background color for the selected size
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
    textAlign: "center",
  },
});

export default ProductDetailScreenW;
