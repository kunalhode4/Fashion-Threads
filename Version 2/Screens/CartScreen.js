// screens/CartScreen.js
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const host = "172.20.10.5:5000";
  const [product, setProduct] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);
  let token;
  let headers = {};

  const [isLoggedIn, setLoggedIn] = useState(false);
  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      // navigation.navigate("LoginScreen");
      setLoggedIn(false);
    }
    else {
      setLoggedIn(true);
    }
  }

  const setHeaders = async () => {
    token = await AsyncStorage.getItem('token');
    headers = {
      "auth-token": token
    }
    // console.log(headers);
  }

  useLayoutEffect(() => {
    checkLogin();
    isLoggedIn ?
      setHeaders()
        .then(res => {
          axios.get(`http://${host}/api/cart-products`, { headers: headers })
            .then((res) => {
              setProduct(res.data);
              setApiStatus(true);
              // console.log("Cart : ", res.data);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err))

      : null;
  }, []);

  useLayoutEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setHeaders()
        .then(res => {
          axios.get(`http://${host}/api/cart-products`, { headers: headers })
            .then((res) => {
              setProduct(res.data);
              setApiStatus(true);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const updateProductState = (cartItemId, updatedQuantity) => {
    setProduct(prevProducts => {
      return prevProducts.map(prevProduct => {
        if (prevProduct.cartItemId === cartItemId) {
          // Update the quantity of the product with the matching cartItemId
          return { ...prevProduct, quantity: updatedQuantity };
        }
        return prevProduct;
      });
    });
  };

  const deleteItemFromCart = async (cartItemId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const headers = {
            "auth-token": token
        };
        const response = await axios.delete(`http://${host}/api/delete-cart-item/${cartItemId}`, { headers: headers });
       
        // navigation.goBack();
    } catch (error) {
        console.error(error);
    }
};
  const decreaseQuantity = async (item) => {
    try {
      const updatedQuantity = item.quantity - 1;
      if (updatedQuantity === 0) {
        await deleteItemFromCart(item.cartItemId);
        // updateProductState(item.cartItemId, 0);
        return;
      }
      await updateCartItem(item.cartItemId, updatedQuantity);
      updateProductState(item.cartItemId, updatedQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = async (item) => {
    try {
      const updatedQuantity = item.quantity + 1;
      await updateCartItem(item.cartItemId, updatedQuantity);
      updateProductState(item.cartItemId, updatedQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (cartItemId, updatedQuantity) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const headers = {
        "auth-token": token
      };
      const data = {
        cartItemId: cartItemId,
        updatedQuantity: updatedQuantity
      };
      const response = await axios.post(`http://${host}/api/update-cart`, data, { headers: headers });
      if (response) {

        setHeaders()
          .then(res => {
            axios.get(`http://${host}/api/cart-products`, { headers: headers })
              .then((res) => {
                setProduct(res.data);
                console.log("Cart : ", res.data);
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderProductItem = ({ item }) => (
    <>
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => navigation.navigate('OrderPlacing', { selectedProduct: item })}
      >
        <Image source={{ uri: `http://${host}/images/${item.image}` }} style={styles.productImage} />
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.size}>{`Size: ${item.size}`}</Text>
        <Text style={styles.productPrice}>{`Price: ₹${item.price * item.quantity}`}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );



  return (
    <>
      {isLoggedIn ?
        <View style={styles.container}>
          <Text style={styles.text}>Cart Screen</Text>
          {product.length !== 0 && apiStatus ?
            <FlatList
              data={product}
              renderItem={renderProductItem}
              numColumns={2}
            />
            :
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>There are no items in your cart</Text>
            </View>
          }
        </View>
        :
        <View style={styles.container}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Please login to see your Cart</Text>
          </View>
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;