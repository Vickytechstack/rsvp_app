import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Image } from 'react-native';
import FirstScreen from './firstScreen';
import SecondScreen from './second_screen';
import ThirdScreen from './thirdScreen';

const Drawer = createDrawerNavigator();

const SplashScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate('FirstScreen');
  }, 3000);
  return (
    <View style={styles.Container}>
      <Image source={require('../assets/splash_image.jpg')} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    backgroundColor: '#66CDAA',
  },
});

export default function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="SplashScreen">
        <Drawer.Screen name="SplashScreen" component={SplashScreen} />
        <Drawer.Screen name="FirstScreen" component={FirstScreen} />
        <Drawer.Screen name="SecondScreen" component={SecondScreen} />
        <Drawer.Screen name="ThirdScreen" component={ThirdScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
