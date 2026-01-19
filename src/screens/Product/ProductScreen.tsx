import React, { useEffect,useState } from 'react';
import { View, Text, FlatList, StyleSheet,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiServiceGet } from '../../globalFunctions/apiService';
import IndicatorModal from '../../components/IndicatorModal';
import { useDispatch, useSelector } from 'react-redux';
import {styles} from '../Favourites/FavouritesStyle';
import ProductCard from '../../components/ProductCard';
import EmptyList from '../../globalFunctions/EmptyList';
const ProductScreen = () => {
    const [products, setProducts] = useState<any>([]);
          const [isAnimate, setAnimate] = useState(false);
    

const getProducts = async () => {
   
    setAnimate(true);
    let api_url = 'products' ;
    const data1 = await ApiServiceGet(api_url);
    console.log(data1,'data---');
    if(data1){
      setProducts(data1);
    }
    setAnimate(false)

    
  };
useEffect(()=>{
getProducts();
},[])
  return (
    <SafeAreaView style={styles.container}>
    <IndicatorModal isLoading={isAnimate} />
       
 <View style={styles.header}>
        <Text style={styles.hello}>Hello !</Text>
      </View>
      <FlatList
      horizontal
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList />}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;


