import React, { Component } from 'react';
import Quiz from '../components/quiz';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  AsyncStorage,
  Button
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
export default class Playquiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quizFinish: false,
      score: 0
    }
  }
  _onPressBack() {
    const { goBack } = this.props.navigation
    goBack()
  }
  _quizFinish = async (score) => {
    this.setState({ quizFinish: true, score: score })
    await AsyncStorage.setItem('score', score.toString());
  }
  _scoreMessage(score) {
    if (score <= 30) {
      return (<View style={styles.innerContainer} >
        <View style={{ flexDirection: "row" }} >
          <Icon name="trophy" size={30} color="white" />
        </View>
        <Text style={styles.score}>You need to work hard</Text>
        <Text style={styles.score}>You scored {score} coins</Text>
      </View>)
    } else if (score > 30 && score < 60) {
      return (<View style={styles.innerContainer} >
        <View style={{ flexDirection: "row" }} >
          <Icon name="trophy" size={30} color="white" />
          <Icon name="trophy" size={30} color="white" />
        </View>
        <Text style={styles.score}>You are good</Text>
        <Text style={styles.score}>Congrats you scored {score} coins</Text>
      </View>)
    } else if (score >= 60) {
      return (<View style={styles.innerContainer}>
        <View style={{ flexDirection: "row" }} >
          <Icon name="trophy" size={30} color="white" />
          <Icon name="trophy" size={30} color="white" />
          <Icon name="trophy" size={30} color="white" />
        </View>
        <Text style={styles.score}>You are the master</Text>
        <Text style={styles.score}>Congrats you scored {score} coins </Text>
      </View>)
    }
  }
  render() {
    return (
      <LinearGradient colors={['#1f9af0', '#6c22cf', '#6c22cf']} style={styles.screen}>
        {this.state.quizFinish ?
          <View style={styles.container}>
            <View style={styles.appNavBar}>
              <TouchableOpacity style={styles.leftNavBarIcon} onPress={() => this._onPressBack()}>
                <Ionicons name="ios-arrow-back" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.circle}>
              {this._scoreMessage(this.state.score)}
              <TouchableOpacity onPress={() => { this.setState({ quizFinish: false }) }} style={styles.borderedButton}>
                <Text style={styles.buttonTitle}>
                  Try Again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <Quiz quizFinish={(score) => this._quizFinish(score)} />}
      </LinearGradient>
    );
  }
}

Playquiz.navigationOptions = navData => {
  return {
    header: null
  };
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  score: {
    color: "white",
    fontSize: 20,
    fontStyle: 'italic'
  },
  appNavBar: {
    flexDirection: 'row',
    marginTop: 50
  },
  leftNavBarIcon: {
    marginLeft: "5%"
  },
  circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderedButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginTop: 20
  },
  buttonTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});