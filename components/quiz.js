import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animbutton from '../animation/animbutton'
const { width, height } = Dimensions.get('window')
let arrnew = []
const jsonData = {
  "quiz": {
    "quiz1": {
      "question1": {
        "correctoption": "option3",
        "question_id": "1.",
        "question_posints": "10",
        "options": {
          "option1": "A. Java",
          "option2": "B. PHP",
          "option3": "C. Javascript",
          "option4": "D. IOS",
          "option5": "E. Android"
        },
        "question": "React is a ____ library"
      },
      "question2": {
        "correctoption": "option4",
        "question_id": "2.",
        "question_posints": "10",
        "options": {
          "option1": "A. XML",
          "option2": "B. YML",
          "option3": "C. HTML",
          "option4": "D. JSX",
          "option5": "E. PHP"
        },
        "question": "____ tag syntax is used in React"
      },
      "question3": {
        "correctoption": "option1",
        "question_id": "3.",
        "question_posints": "10",
        "options": {
          "option1": "A. Single root DOM node",
          "option2": "B. Double root DOM node",
          "option3": "C. Multiple root DOM node",
          "option4": "D. None of the above",
          "option5": "E. All of the above"
        },
        "question": "Application built with just React usually have ____"
      },
      "question4": {
        "correctoption": "option2",
        "question_id": "4.",
        "question_posints": "10",
        "options": {
          "option1": "A. mutable",
          "option2": "B. immutable",
          "option3": "C. variable",
          "option4": "D. none of the above",
          "option5": "E. Changeble"
        },
        "question": "React elements are ____"
      },
      "question5": {
        "correctoption": "option3",
        "question_id": "5.",
        "question_posints": "10",
        "options": {
          "option1": "A. functions",
          "option2": "B. array",
          "option3": "C. components",
          "option4": "D. json data",
          "option5": "E. XML"
        },
        "question": "React allows to split UI into independent and reusable pieses of ____"
      }
    }
  }
}
export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.qno = 0;
    this.score = 0;
    this.currentAnswer = false;
    this.isAnswered = 0 ;


    const jdata = jsonData.quiz.quiz1
    arrnew = Object.keys(jdata).map(function (k) { return jdata[k] });
    this.state = {
      question: arrnew[this.qno].question,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correctoption,
      countCheck: 0,
      questionId: arrnew[this.qno].question_id,
      question_posints: arrnew[this.qno].question_posints,
      status: "q1"
    }
  }

   ////////////    function to press back button icon    //////////////
  _onPressBack() {
    this.props.navigation.pop();
  }

  ////////////    function to fire when press submit    //////////////
  next() {
    /// check if the user select an option or not 
    if (this.isAnswered != 0) {
      this.isAnswered = false;

      // check if the option is true then increase the score by 10 
      if (this.currentAnswer == 1) { 
        this.score += 10;
        this.currentAnswer = 0;
      }
      if (this.qno < arrnew.length - 1) {
        this.qno++
        this.setState({
          countCheck: 0,
          question: arrnew[this.qno].question,
          options: arrnew[this.qno].options,
          correctoption: arrnew[this.qno].correctoption,
          questionId: arrnew[this.qno].question_id,
          question_posints: arrnew[this.qno].question_posints,
          status: arrnew[this.qno].question_id
        })
      } else {
        this.props.quizFinish(this.score);
      }
    }
    
  }

  ////////////    handler when timer get out     //////////////
  timeOut() {
    this.props.quizFinish(this.score)
  }

////////////    function to detect when the user press on option      //////////////
  _answer(status, ans) {
    if (status == true) {
      this.isAnswered = 1 ;
      const count = this.state.countCheck + 1;
      this.setState({ countCheck: count })
      if (ans == this.state.correctoption) {
        this.currentAnswer = 1;
      }
    } else {
      this.isAnswered = 0 ;
      const count = this.state.countCheck - 1
      this.setState({ countCheck: count });
      if (this.state.countCheck < 1 || ans == this.state.correctoption) {
        this.currentAnswer = 0;
      }
    }
  }

  render() {
    let _this = this
    const currentOptions = this.state.options
    const options = Object.keys(currentOptions).map(function (k) {
      return (
        <View key={k} style={{ margin: 12 }}>
          <Animbutton
            countCheck={_this.state.countCheck}
            onColor={"#5950f5"}
            effect={"tada"}
            _onPress={(status) => _this._answer(status, k)}
            text={currentOptions[k]}
            check_current_id={_this.state.status}
          />
        </View>
      )
    });

    return (
      <View style={styles.screen}>
        <View style={styles.appNavBar}>
          <TouchableOpacity style={styles.leftNavBarIcon} onPress={() => _this._onPressBack()}>
            <Ionicons name="ios-arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <View style={styles.centerNavBarIcon}>
            <CountDown
              size={11}
              until={300}
              onFinish={() => this.timeOut()}
              digitStyle={{ backgroundColor: 'rgba(0,0,0, 0.0)' }}
              digitTxtStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
              separatorStyle={{ color: 'white' }}
              timeToShow={['M', 'S']}
              timeLabels={{ m: null, s: null }}
              showSeparator
            />
          </View>
          <TouchableOpacity onPress={() => this.next()} style={styles.rightNavBarIcon}>
            <Text style={styles.sumbitButton}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.quizBody}>
            <View style={styles.questionContainer} >
              <View style={styles.quistionHeading}>
                <View>
                  <Text style={styles.quistionId}>
                    {this.state.questionId}
                  </Text>
                </View>

                <View style={styles.rewardSection}>
                  <Text style={styles.questionPoints}>
                    {this.state.question_posints}
                  </Text>
                  <Icon style={styles.coinsIcon} name="coins" size={18} color="#fed847" />
                </View>

              </View>
              <Text style={styles.questionText}>
                {this.state.question}
              </Text>
            </View>

            <View>
              {options}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  appNavBar: {
    flexDirection: 'row',
    marginTop: 50
  },
  leftNavBarIcon: {
    marginLeft: "5%"
  },
  rightNavBarIcon: {
    position: 'absolute',
    right: "5%",
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2
  },
  sumbitButton: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  centerNavBarIcon: {
    alignItems: 'center',
    width: "80%"
  },
  questionContainer: {
    marginBottom: 7,
  },
  quizBody: {
    marginTop: 40,
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: height - 150,
  },
  quistionHeading: {
    flexDirection: 'row'
  },
  questionText: {
    fontSize: 20,
    marginTop: 5
  },
  quistionId: {
    fontWeight: 'bold',
    fontSize: 17
  },
  rewardSection: {
    position: 'absolute',
    right: '5%',
    flexDirection: 'row'
  },
  coinsIcon: {
    paddingLeft: 4
  },
  questionPoints: {
    color: '#e95c84',
    fontWeight: 'bold',
    fontSize: 17
  }
});