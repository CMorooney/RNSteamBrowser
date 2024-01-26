import React from 'react';
import {SafeAreaView} from 'react-native';
import store from './src/app/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Library from './src/screens/Library';
import Wishlist from './src/screens/Wishlist';
import Settings from './src/screens/Settings';

const LibraryScreen = () => (
  <SafeAreaView>
    <Library />
  </SafeAreaView>
);

const WishlistScreen = () => (
  <SafeAreaView>
    <Wishlist />
  </SafeAreaView>
);

const SettingsScreen = () => (
  <SafeAreaView>
    <Settings />
  </SafeAreaView>
);

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#1b2838'},
            headerTitleStyle: {color: '#c7d5e0'},
            tabBarActiveBackgroundColor: '#1b2838',
            tabBarActiveTintColor: '#66c0f4',
            tabBarInactiveBackgroundColor: '#171a21',
            tabBarInactiveTintColor: '#c7d5e0',
          }}>
          <Tab.Screen
            options={{title: 'Library'}}
            name="LibraryScreen"
            component={LibraryScreen}
          />
          <Tab.Screen
            options={{title: 'Wishlist'}}
            name="WishlistScreen"
            component={WishlistScreen}
          />
          <Tab.Screen
            options={{title: 'Settings'}}
            name="SettingScreen"
            component={SettingsScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
