/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'; //safeareaView is used in ios do give the header
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import AddNewPaletteModal from './screens/AddNewPaletteModal';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};

const App = () => {// mode="modal" to et app know we'll have a modal here
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }} //in one of the components, we must set headerShown: false to avoid having 2 headers
        />
        <RootStack.Screen // subsequent modals can also be added here; we do not need to configure this again
          name="AddNewPaletteModal"
          component={AddNewPaletteModal}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
