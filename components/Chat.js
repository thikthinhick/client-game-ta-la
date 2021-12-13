import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Animated } from 'react-native';
import socket from '../Socket.io/Socket';
import { connect } from 'react-redux';
import { addChat } from '../Redux/Action';
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { inputChat: '', fadeAnim: new Animated.Value(-300)}
  }
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 200,
    }).start()
  }
  resetInput() {
    socket.emit('sendChat', { name: this.props.userName, content: this.state.inputChat, idRoom: this.props.idRoom, idUser: this.props.idUser})
    this.setState({ inputChat: '' })
  }
  changeText(text) {
    this.setState({ inputChat: text })
  }
  render() {
    return (
      <Animated.View style={[styles.container, {transform: [{translateX: this.state.fadeAnim}]}]}>
        <ScrollView style={styles.contentChat}>
          {this.props.messages.map((value) =>
            <View style={styles.msg}>
              <Text style={styles.name}>
                {value.name}:{' '}
                <Text style={styles.contentText}>
                  {value.content}
                </Text>
              </Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.inputChat}>
          <TextInput
            style={styles.input}
            placeholder="Nội dung chat"
            placeholderTextColor="#fff"
            onChangeText={text => this.changeText(text)}
            value={this.state.inputChat}
          />
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10
            }}>
            <TouchableOpacity
              onPress={() => this.resetInput()}>
              <Image
                source={require('../assets/send.png')}
                style={{
                  height: 30,
                  width: 30,
                  zIndex: 2
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#e3d0b2',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10
  },
  input: {
    backgroundColor: '#ab8e75',
    height: '100%',
    marginTop: 5,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 40,
    fontSize: 18
  },
  name: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 18,
    color: '#8d4e43',

  },
  msg: {
    flexDirection: 'row',
    marginLeft: 5,
    marginBottom: 2,
    marginTop: 2
  },
  contentText: {
    fontWeight: 'normal',
    color: '#755a45',
    fontSize: 18,
  },
  contentChat: {
    height: 100,
    width: '100%',
    backgroundColor: '#f5ead7',
    flex: 6,
    borderRadius: 4,
    overflow: 'scroll',
  },
  inputChat: {
    height: 40,
    position: 'relative',
    fontSize: 20,
    marginBottom: 5,
  },
});
const mapStateToProps = (state) => {
  return {
    chat: state.ReducerChat,
    userName: state.ReducerLogin.userName,
    idRoom: state.ReducerGame.idRoom,
    idUser: state.ReducerLogin.idUser
  }
};
const mapDispatchToProps = () => {
  return {
    addChat: addChat
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(Chat);
