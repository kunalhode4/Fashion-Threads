import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: '', rating: '', comment: '' });
  const [loading, setLoading] = useState(false); // State to track loading status
  const [showAllReviews, setShowAllReviews] = useState(false); // State to control whether to show all reviews
  const MAX_VISIBLE_REVIEWS = 3; // Maximum number of reviews to show initially
  const host = "192.168.228.33:5000";
  const scrollViewRef = useRef();

  // Fetch reviews when component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  let token;
  let headers = {};

  const setHeaders = async () => {
    token = await AsyncStorage.getItem('token');
    headers = {
      "auth-token": token
    }
  }

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://${host}/api/reviews/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setNewReview(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setHeaders()
      .then(async () => {
          const response = await axios.post(`http://${host}/api/review`, {
            ...newReview,
            product: productId
          }, { headers });
          setReviews(prevReviews => [...prevReviews, response.data.review]);
          setNewReview({ user: '', rating: '', comment: '' });
      })
      .catch(err => console.log(err));
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push('⭐️');
    }
    return stars;
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      // Load more reviews when reaching the bottom of the list
      if (!loading && !showAllReviews) {
        fetchReviews();
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={10}
      >
        {reviews.slice(0, showAllReviews ? reviews.length : MAX_VISIBLE_REVIEWS).map(review => (
          <View style={styles.reviewItem} key={review._id}>
            <Text>User: {review.user}</Text>
            <Text>Rating: {renderStars(review.rating)}</Text>
            <Text>Comment: {review.comment}</Text>
            <Text>Date: {new Date(review.createdAt).toLocaleDateString()}</Text>
          </View>
        ))}
        {loading && <Text>Loading...</Text>}
      </ScrollView>
      {reviews.length > MAX_VISIBLE_REVIEWS && (
        <View style={styles.buttonContainer}>
          {showAllReviews ? (
            <Button title="Show Less" onPress={() => setShowAllReviews(false)} />
          ) : (
            <Button title="Show More" onPress={() => setShowAllReviews(true)} />
          )}
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        keyboardType="numeric"
        value={newReview.rating}
        onChangeText={text => handleInputChange('rating', text)}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Your Review"
        multiline
        value={newReview.comment}
        onChangeText={text => handleInputChange('comment', text)}
      />
      <Button title="Submit Review" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
  reviewItem: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Reviews;
