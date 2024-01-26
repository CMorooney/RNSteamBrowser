import React from 'react';
import 'react-native-gesture-handler';
import store from './src/app/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Library from './src/screens/Library';
import Wishlist from './src/screens/Wishlist';
import GameDetails from './src/screens/GameDetails';
import LibraryFilter from './src/screens/LibraryFilter';

export type LibraryStackParamList = {
  Library: undefined;
  GameDetails: {name: string};
  LibraryFilter: undefined;
};

const LibraryStack = createStackNavigator<LibraryStackParamList>();
const LibraryScreen = () => (
  <LibraryStack.Navigator screenOptions={stackScreenOptions}>
    <LibraryStack.Group>
      <LibraryStack.Screen
        options={{
          title: 'Library',
        }}
        name="Library"
        component={Library}
      />
      <LibraryStack.Screen
        options={{title: 'Game Details'}}
        name="GameDetails"
        component={GameDetails}
      />
    </LibraryStack.Group>
    <LibraryStack.Group screenOptions={{presentation: 'modal'}}>
      <LibraryStack.Screen
        options={{title: 'Library Display Settings'}}
        name="LibraryFilter"
        component={LibraryFilter}
      />
    </LibraryStack.Group>
  </LibraryStack.Navigator>
);

export type WishlistStackParamList = {
  Wishlist: undefined;
  GameDetails: {name: string};
};
const WishlistStack = createStackNavigator<WishlistStackParamList>();
const WishlistScreen = () => (
  <WishlistStack.Navigator screenOptions={stackScreenOptions}>
    <WishlistStack.Screen
      options={{title: 'Wishlist'}}
      name="Wishlist"
      component={Wishlist}
    />
    <WishlistStack.Screen
      options={{title: 'Game Details'}}
      name="GameDetails"
      component={GameDetails}
    />
  </WishlistStack.Navigator>
);

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveBackgroundColor: '#1b2838',
            tabBarActiveTintColor: '#66c0f4',
            tabBarInactiveBackgroundColor: '#171a21',
            tabBarInactiveTintColor: '#c7d5e0',
            headerShown: false,
          }}>
          <Tab.Screen
            options={{title: 'Library'}}
            name="LibraryTab"
            component={LibraryScreen}
          />
          <Tab.Screen
            options={{title: 'Wishlist'}}
            name="WishlistTab"
            component={WishlistScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const stackScreenOptions = {
  headerStyle: {backgroundColor: '#1b2838'},
  headerTitleStyle: {color: '#c7d5e0'},
  headerTintColor: '#66c0f4',
};

export default App;
