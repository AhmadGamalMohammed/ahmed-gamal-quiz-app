import React, { useReducer, useEffect, useCallback, useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import InputComponent from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};


const SignUpScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      name:'',
      password: ''
    },
    inputValidities: {
      email: false,
      name: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.name,
        formState.inputValues.password
      );
    
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }

  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );


  return (

    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <View style={styles.navLeftContainer}>
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
            size={30}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Sign Up</Text>
      </View>
      <View  style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <InputComponent
              iconName="mail"
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <InputComponent
              iconName="user"
              id="email"
              label="Name"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorText="Please enter a valid name."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <InputComponent
              iconName="lock"
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                  <Button title= 'Creat a new account' color={Colors.primary} onPress={authHandler} />
                )}
            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

SignUpScreen.navigationOptions = navData => {
  return {
    header: null
  };
};


const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  navLeftContainer: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingLeft: 20
  },
  navTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: Colors.primary,
    paddingLeft: 15
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default SignUpScreen;
