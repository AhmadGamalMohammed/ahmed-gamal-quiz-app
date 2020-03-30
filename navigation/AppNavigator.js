import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer , createSwitchNavigator }  from 'react-navigation';
import { Platform} from 'react-native';
import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import Colors from '../constants/Colors';
 
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


const AppNavigator = createStackNavigator(
  {
    Intro:IntroScreen,
    home: HomeScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  main: AppNavigator,
});


export default createAppContainer(MainNavigator);
