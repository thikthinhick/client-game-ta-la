import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { fadeAnim: new Animated.Value(0), count: 25 }
  }
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 52,
        duration: 25000,
        easing: Easing.linear,
      }
    ).start();
    this.timerId = setInterval(() => {
      this.setState({ count: this.state.count - 1 })
      if (this.state.count === 0) {
        clearInterval(this.timer);
          this.props.skip()
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerId)
  }
  render() {
    return (
      <View style={{
        height: 52,
        width: 52,
        borderRadius: 9,
        overflow: "hidden",
        position: 'relative'
      }}>
        <Animated.View                 // Special animatable View
          style={{
            width: '100%',
            backgroundColor: 'rgba(0, 0 , 0 , 0.6)',
            height: '100%',
            position: 'absolute',
            transform: [{translateY: this.state.fadeAnim}],
            bottom: 0
          }}
        >
        </Animated.View>
        <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>{this.state.count}</Text>
        </View>
      </View>
    );
  }
}

export default Timer;
