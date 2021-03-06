import React, { Component, Children } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
export default class Animbutton extends Component {
  constructor(props) {
    super(props);
    console.log("hrllo");
    this.state = {
      status: false
    }
  }
  _onPress() {
    this.props._onPress(!this.state.status);
    this.setState({ status: !this.state.status })
    switch (this.props.effect) {
      case 'bounce':
        this.refs.view.bounce(800)
        break;
      case 'flash':
        this.refs.view.flash(800)
        break;
      case 'jello':
        this.refs.view.jello(800)
        break;
      case 'pulse':
        this.refs.view.pulse(800)
        break;
      case 'rotate':
        this.refs.view.rotate(800)
        break;
      case 'rubberBand':
        this.refs.view.rubberBand(800)
        break;
      case 'shake':
        this.refs.view.shake(800)
        break;
      case 'swing':
        this.refs.view.swing(800)
        break;
      case 'tada':
        this.refs.view.tada(800)
        break;
      case 'wobble':
        this.refs.view.wobble(800)
        break;
    }

  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this._onPress()}>
        <Animatable.View ref="view"
          style={[styles.optionStyle ,{ backgroundColor: this.state.status ? this.props.onColor : "white" }]}>
          <Text style={[ styles.optionText , { color: this.state.status ? "white" : "#696969" }]}>{this.props.text}</Text>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  optionStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1
  },
  optionText:{
    fontWeight: "bold"
  }
})