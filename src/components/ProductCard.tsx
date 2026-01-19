import React, { useCallback, useMemo } from 'react';
import { View, Text, Image, Pressable, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleFavourite,increaseQuantity,decreaseQuantity } from '../redux/slices/userSlice';

const ProductCard = ({ item }: any) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: any) => state.user.favourites);
console.log(item,'item check---');
const cartItems = useSelector(
  (state: any) => state.user.cartItems
);
const cartItem = useMemo(() => {
  return cartItems.find(
    (cart: any) => cart.product.id === item.id
  );
}, [cartItems, item.id]);

  const isFavourite = favourites.some(
    (fav: any) => fav.id === item.id
  );
const handleAddToCart = useCallback(() => {
  dispatch(addToCart(item));
}, [dispatch, item]);

const handleIncrease = useCallback(() => {
  dispatch(increaseQuantity(item.id));
}, [dispatch, item.id]);

const handleDecrease = useCallback(() => {
  dispatch(decreaseQuantity(item.id));
}, [dispatch, item.id]);

const handleFavourite = useCallback(() => {
  dispatch(toggleFavourite(item));
}, [dispatch, item]);
  return (
    <View style={styles.card}>
      {/* Product Image */}
      <Image source={{ uri: item.images[0] }} style={styles.image} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>${item.price}</Text>
        <Text style={styles.price}>{item.title}</Text>
      </View>

      {/* Actions */}
      <View style={[styles.tagRow,{ justifyContent: 'space-between' }]}>
        {cartItem?
         <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>handleDecrease()}
        activeOpacity={0.7}
      >
        <Text style={styles.btnText}>−</Text>
      </TouchableOpacity>

      <View style={styles.countBox}>
        <Text style={styles.countText}>{cartItem.quantity}</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => handleIncrease()}
        activeOpacity={0.7}
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>:
        <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => handleAddToCart()}
        >
          <Text style={{ fontSize: 10,textDecorationLine: 'underline', color: 'blue' }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => handleFavourite()}
        >
          <Text style={{ fontSize: 18 }}>
            {isFavourite ? '💚' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default React.memo(ProductCard);

const styles = StyleSheet.create({
    card: {
        width:150,
        height: 220,
        // flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
        marginRight: 12,

    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    content: {
        flex: 1,
        marginHorizontal: 10,
    },
    title: {
        fontWeight: '600',
        fontSize: 14,
    },
    date: {
        color: '#3CB371',
        fontSize: 12,
        marginTop: 2,
    },
    price: {
        color: '#999',
        fontSize: 12,
        marginTop: 2,
    },
    tagRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
    },
    tag: {
        backgroundColor: '#EDEDED',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
        marginRight: 6,
        marginTop: 4,
    },
    tagText: {
        fontSize: 11,
        color: '#444',
    },
    actions: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    location: {
        fontSize: 11,
        color: '#999',
    },
     container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  btn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
  },
  countBox: {
    minWidth: 40,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  countText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
