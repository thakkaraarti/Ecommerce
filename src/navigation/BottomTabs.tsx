import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductScreen from '../screens/Product/ProductScreen';
import Favourites from '../screens/Favourites/Favourites';
import CartScreen from '../screens/Cart/CartScreen';

import Eventicon from '../assets/svg/Calendar.svg';
import FavouritesIcon from '../assets/svg/heart.svg';
import ProfileIcon from '../assets/svg/user.svg';
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
            })}
        
        >
            

            <Tab.Screen
                name={'Products'}
                component={ProductScreen}
                options={({ route }) => ({
                    headerShown: false,
                    tabBarLabel: 'Products',
                     tabBarIcon: ({ focused }) => {
                        return (
                            <Eventicon
                                width={24}
                                height={24}
                                color={focused ? '#4CAF50' : '#999'}
                            />
                        );
                    },
                    tabBarStyle: {
                        borderColor: 'lightgrey',
                    },
                })}
            />
            <Tab.Screen
                name={'Favourites'}
                component={Favourites}
                options={({ route }) => ({
                    headerShown: false,
                    tabBarLabel: 'Favourites',
                     tabBarIcon: ({ focused }) => {
                        return (
                            <FavouritesIcon
                                width={24}
                                height={24}
                                color={focused ? '#4CAF50' : '#999'}
                            />
                        );
                    },
                    tabBarStyle: {
                        borderColor: 'lightgrey',
                    },
                })}
            />
            <Tab.Screen
                name={'Cart'}
                component={CartScreen}
                options={({ route }) => ({
                    headerShown: false,
                    tabBarLabel: 'Cart',
                     tabBarIcon: ({ focused }) => {
                        return (
                            <ProfileIcon
                                width={24}
                                height={24}
                                color={focused ? '#4CAF50' : '#999'}
                            />
                        );
                    },
                    tabBarStyle: {
                        borderColor: 'lightgrey',
                    },
                })}
            />


        </Tab.Navigator>
    );
};
export default BottomTabs;