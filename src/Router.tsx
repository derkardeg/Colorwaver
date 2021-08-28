import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {App} from './App';
import {Splash} from './Splash';

const Stack = createNativeStackNavigator();

export function Router() {
  console.log('re-rendering Router.');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const result = await Camera.getCameraPermissionStatus();
        setHasPermission(result === 'authorized');
      } catch (e) {
        Alert.alert(
          'Failed to request permissions!',
          'Failed to request Camera permission. Please verify that you have granted Camera Permission in your Settings app.',
        );
      }
    };
    requestPermission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
