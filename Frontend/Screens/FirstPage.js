// // FirstPage.js
// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const FirstPage = () => {
//   const navigation = useNavigation();

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//     });
//   }, [navigation]);

//   const categories = [
//     {
//       id: 1,
//       name: 'Men',
//       image: require('../Imag/P7.jpg'),
//       screen: 'MenClothingScreen',
//     },
//     {
//       id: 2,
//       name: 'Women',
//       image: require('../Imag/P5.jpg'),
//       screen: 'WomenClothingScreen',
//     },
//     {
//       id: 3,
//       name: 'Kids',
//       image: require('../Imag/P6.jpg'),
//       screen: 'KidsClothingScreen',
//     },
//   ];

//   const handleCategoryPress = (screen) => {
//     navigation.navigate(screen);
//   };

//   const handleProfilePress = () => {
//     navigation.navigate('ProfileScreen');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.logo}>Fashion Threads</Text>
//         <Text style={styles.tagline}>Explore the Latest Fashion Trends</Text>
//       </View>
//       <View style={styles.categoryContainer}>
//         {categories.map((category) => (
//           <TouchableOpacity
//             key={category.id}
//             style={styles.categoryItem}
//             onPress={() => handleCategoryPress(category.screen)}
//           >
//             <Image source={category.image} style={styles.categoryImage} />
//             <Text style={styles.categoryName}>{category.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
//           <Image source={require('../Imag/PRF.png')} style={styles.profileImage} />
//         </TouchableOpacity>
//         <Text style={styles.footerText}>© 2023 Fashion Threads. All rights reserved.</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     backgroundColor: '#5C6AC4',
//     padding: 20,
//     alignItems: 'center',
//   },
//   logo: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   tagline: {
//     fontSize: 16,
//     color: '#fff',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     flexWrap: 'wrap',
//     marginTop: 40,
//   },
//   categoryItem: {
//     width: '45%',
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 10,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   categoryImage: {
//     width: 120,
//     height: 120,
//     marginBottom: 10,
//     resizeMode: 'cover',
//     borderRadius: 5,
//   },
//   categoryName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   footer: {
//     backgroundColor: '#333',
//     padding: 10,
//     alignItems: 'center',
//     marginTop: 40,
//   },
//   profileIcon: {
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   footerText: {
//     color: '#fff',
//   },
// });

// export default FirstPage;
