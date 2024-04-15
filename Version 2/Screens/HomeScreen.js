import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FirstPage = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    // Hide the header
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const categories = [
    {
      id: 1,
      name: 'Men',
      image: require('../Imag/Men.jpeg'),
      screen: 'MenClothingScreen',
    },
    {
      id: 2,
      name: 'Women',
      image: require('../Imag/Women.jpeg'),
      screen: 'WomenClothingScreen',
    },
    {
      id: 3,
      name: 'Kids',
      image: require('../Imag/Kid.jpeg'),
      screen: 'KidsClothingScreen',
    },
  ];

  const handleCategoryPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Fashion Threads</Text>
        <Text style={styles.tagline}>Explore the Latest Fashion Trends</Text>
      </View>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.screen)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf0e6', // pastel orange
  },
  header: {
    backgroundColor: '#afeeee', // pastel turquoise
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  categoryItem: {
    width: '45%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e6e6fa', // pastel lavender
    elevation: 4,
  },
  categoryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#e6e6fa', // pastel lavender
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default FirstPage;
