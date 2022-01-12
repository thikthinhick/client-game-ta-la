import React, { Component } from 'react'
import { Text, StyleSheet,Animated, View } from 'react-native'
import ConvertNumber from '../ConvertNumber';

export default class CoinUp extends Component {
    constructor(props) {
        super(props);
        this.state = { fadeAnim: new Animated.Value(0)}
      }
      componentDidMount() {
        Animated.timing(
          this.state.fadeAnim,
          {
            toValue: -40,
            duration: 1500,
          }
        ).start();
      }
    render() {
        return (
            <Animated.View style={{
              transform: [{ translateX: 0}, {translateY: this.state.fadeAnim }]
            }}>
              <ConvertNumber number={-this.props.tiencuoc} sub={this.props.sub}/>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({})
