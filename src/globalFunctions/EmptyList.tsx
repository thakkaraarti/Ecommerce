import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyList = ({ text = 'No data found' }: { text?: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default React.memo(EmptyList);
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: '#999',
  },
});
