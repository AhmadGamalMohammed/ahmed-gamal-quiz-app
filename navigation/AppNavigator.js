import React  from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer , createSwitchNavigator }  from 'react-navigation';
import { createDrawerNavigator ,DrawerItems } from 'react-navigation-drawer';
import { Platform  , SafeAreaView , Button , View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';
import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import StartUpScreen from '../screens/StartUpScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth'; 
 
const defaultNavOptions = {  
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  }, 
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Home: ProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                 props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Intro:IntroScreen,
    home: HomeScreen,
    SignUp:SignUpScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup : StartUpScreen,
  Auth: AuthNavigator,
  Shop: AppNavigator
});


export default createAppContainer(MainNavigator);
