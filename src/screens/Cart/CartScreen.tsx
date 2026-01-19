import React, { useEffect,useState } from 'react';
import { View, Text, FlatList, StyleSheet,  } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiServiceGet } from '../../globalFunctions/apiService';
import { useDispatch, useSelector } from 'react-redux';
import {styles} from '../Favourites/FavouritesStyle';
import EmptyList from '../../globalFunctions/EmptyList';
const CartScreen = () => {
    const [events, setEvents] = useState<any>([]);
    const dispatch = useDispatch();
    
      const cart = useSelector(state => state.user.cartItems);
    

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.hello}>Hello !</Text>
      </View>

      {/* List */}
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard item={item.product} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList />}
      />
    </SafeAreaView>
  );
};

export default CartScreen;


