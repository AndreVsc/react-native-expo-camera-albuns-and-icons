// Routes.tsx

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CamScreen from '../screens/CamScreen';
import GalleryScreen from '../screens/GalleryScreen';
import { PictureProvider } from '../contexts/pictureContext';

const Tab = createMaterialTopTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <PictureProvider>
        <Tab.Navigator screenOptions={{tabBarShowLabel:false}}>
          <Tab.Screen name="Camera" component={CamScreen} />
          <Tab.Screen name="Gallery" component={GalleryScreen} />
        </Tab.Navigator>
      </PictureProvider>
    </NavigationContainer>
  );
};

export default Routes;
