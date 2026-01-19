import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

const AppNavigator = () => {
 

  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName='Main'
      screenOptions={{ headerShown: false }}>
        
          <Stack.Screen name="Main" component={BottomTabs} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
