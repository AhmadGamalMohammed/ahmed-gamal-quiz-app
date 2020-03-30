import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

const IntroScreen = props => {
  const [today, setToday] = useState('');
  const [scoreState, setScoreState] = useState(0);

  ///////   get current day name  ///////
  const getDayName = () => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date();
    var todayIndex = today.getDay();
    console.log(days[todayIndex]);
    setToday(days[todayIndex]);
  }

  const loadInitialData = useCallback(async () => {
    getDayName();

    ///////   save the score in async storage  ///////
    const scoreStorage = await AsyncStorage.getItem('score');
    if (scoreStorage) {
      setScoreState(scoreStorage);
    }

  }, [today]);

  useEffect(() => {
    loadInitialData();
  }, [AsyncStorage]);

  return (
    <LinearGradient colors={['#1f9af0', '#6c22cf', '#6c22cf']} style={styles.screen}>

      <View style={styles.appNavBar}>
        <Icon style={styles.leftNavBarIcon} name="bars" size={20} color="white" />
        <Icon style={styles.rightNavBarIcon} name="bell" size={20} color="white" />
      </View>

      <View style={styles.section}>
        <View style={styles.section1Container}>
          <Text style={styles.quizDayText}>
            {today + "'s"}
          </Text>
          <Text style={styles.quizHeadline}>
            Super Quiz
          </Text>
          <Text style={styles.whiteText}>
            Play Super Quiz & earn<Text style={{ fontWeight: 'bold' }}> 200 </Text>coins
          </Text>
        </View>
      </View>
      <View style={styles.section2}>
        <View style={styles.section2Container}>

          <Text style={styles.defaultText}>
            Today's Quiz on
        </Text>
          <Text style={styles.quizTitle}>
            General Knowledge
        </Text>
          <Text style={styles.defaultText}>
            This Quiz ends in
        </Text>
          <View style={styles.counterContainer}>

            <CountDown
              until={1000}
              onFinish={() => {Alert.alert('Quiz App' , 'Time out for this quiz' ) }}
              onPress={() => {}}
              size={20}
              digitStyle={styles.counterStyle}
            />
          </View>
          <View style={styles.scoreContainer}>
            <Icon style={styles.coinsIcon} name="coins" size={18} color="#fed847" />
            <Text style={styles.scoreText} >
              {scoreState} coins distributed till now
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('home') }}>
              <LinearGradient colors={['#1f9af0', '#6c22cf']} start={[0, 1]} end={[1, 0]} style={styles.gradient}>
                <Text style={styles.buttnTitle}>PLAY QUIZ NOW</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </LinearGradient>
  );
};

IntroScreen.navigationOptions = navData => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  appNavBar: {
    flexDirection: 'row',
    marginTop: 50
  },
  leftNavBarIcon: {
    position: 'absolute',
    left: 20
  },
  counterContainer: {
    alignItems: 'flex-start',
    marginVertical: 8
  },
  counterStyle: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  rightNavBarIcon: {
    position: 'absolute',
    right: 20
  },
  section: {
    height: '50%',
    flex: 1,
    width: '100%'
  },
  section1Container: {
    position: 'absolute',
    bottom: 70,
    paddingHorizontal: 30,
  },
  quizDayText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  quizHeadline: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  section2: {
    height: '50%',
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  section2Container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '90%',
    height: 45,
    marginTop: 10
  },
  buttnTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  defaultText: {
    color: '#727272',
    fontSize: 17,
    paddingBottom: 5
  },
  whiteText: {
    color: 'white',
    fontSize: 17
  },
  quizTitle: {
    color: '#2948d6',
    fontSize: 27,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  scoreContainer: {
    flexDirection: 'row'
  },
  scoreText: {
    color: '#2948d6',
    fontSize: 17,
  },
  coinsIcon: {
    paddingRight: 4
  }

});

export default IntroScreen;
