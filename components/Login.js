import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { addAudio, changeScreen, login } from '../Redux/Action'
import { connect } from 'react-redux'
import { ip } from '../styles/config'
import { AntDesign } from '@expo/vector-icons';
import socket from '../Socket.io/Socket';
import { Audio } from 'expo-av';
import Test from './Test'
import ConvertNumber from './ConvertNumber';
export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { login: true, emailLogin: "", passwordLogin: "", emailSignup: "", passwordSignup: "", passwordConfirmSignup: "", sound: null, showError: false, text: '', loading: false };
  }
  async componentDidMount() {
    this.music = new Audio.Sound()
    this.music.loadAsync(require('../assets/Audio/music.mp3'))
    this.click = new Audio.Sound()
    this.click.loadAsync(require('../assets/Audio/click.mp3'))
    this.danhbai = new Audio.Sound()
    this.danhbai.loadAsync(require('../assets/Audio/danhbai.mp3'))
    this.music_win = new Audio.Sound()
    this.music_win.loadAsync(require('../assets/Audio/music_win.mp3'))
    this.music_lose = new Audio.Sound()
    this.music_lose.loadAsync(require('../assets/Audio/music_lose.mp3'))
    this.s_denluot = new Audio.Sound()
    this.s_denluot.loadAsync(require('../assets/Audio/s_denluot.mp3'))
  }
  changeText = (name, value) => {
    this.setState({ [name]: value })
  }
  changeScreen = (name) => {
    if (name === 'login') this.setState({ login: true });
    else this.setState({ login: false });
  };
  sendLogin = () => {
    if (this.state.passwordLogin === '' || this.state.email === '') {
      this.setState({ text: 'Các mục không thể để trống', showError: true })
      setTimeout(() => {
        this.setState({ showError: false })
      }, 2000)
    }

    else
      this.setState({ loading: true })
    axios.post(`${ip}/login`,
      {
        email: this.state.emailLogin,
        password: this.state.passwordLogin
      }).then(response => {
        this.setState({ loading: false })
        const data = response.data
        if (!data.login) console.log('Tài khoản hoặc mật khẩu không đúng')
        else {
          this.props.login({ userName: data.user_name, idUser: data.id_user, coin: data.coin, url: data.url})
          this.props.changeScreen('HomeGame')
          this.props.addAudio(
            {
              music: this.music,
              click: this.click,
              danhbai: this.danhbai,
              music_win: this.music_win,
              music_lose: this.music_lose,
              s_denluot: this.s_denluot
            })
          socket.emit('addUserId', data.id_user)
        }
      }).catch(err => {
        this.setState({ text: 'Kết nối thất bại', showError: true, loading: false })
        setTimeout(() => {
          this.setState({ showError: false })
        }, 2000)
        console.log(err)
      })
  }
  sendSignUp = () => {
    if (this.state.passWordSignup === '' || this.state.email === '' || this.state.passwordConfirmSignup === '') {
      this.setState({ showError: true, text: 'Các mục không thể để trống' })
      setTimeout(() => {
        this.setState({ showError: false })
      }, 2000)
    }

    else if (this.state.passwordSignup !== this.state.passwordConfirmSignup) {
      this.setState({ showError: true, text: 'Mật khẩu không giống nhau' })
      setTimeout(() => {
        this.setState({ showError: false })
      }, 2000)
    }
    else {
      this.setState({loading: true})
      axios.post(`${ip}/signup`,
        {
          password: this.state.passwordSignup,
          email: this.state.emailSignup
        }).then(res => {
          this.setState({loading: false})
          const data = res.data;
          if (data.signup) {
            this.props.login({ email: this.state.emailSignup, idUser: data.idUser, userName: data.userName, coin: 5000})
            this.props.changeScreen('HomeGame')
            this.props.addAudio(
              {
                music: this.music,
                click: this.click,
                danhbai: this.danhbai,
                music_win: this.music_win,
                music_lose: this.music_lose,
                s_denluot: this.s_denluot
              })
            socket.emit('addUserId', data.idUser)
          }
          else {
            this.setState({ showError: true, text: 'Đăng kí thất bại' })
            setTimeout(() => {
              this.setState({ showError: false })
            }, 2000)
          }
        }).catch(err => {
          this.setState({ text: 'Kết nối thất bại', showError: true, loading: false })
          setTimeout(() => {
            this.setState({ showError: false })
          }, 2000)
          console.log(err)
        })
    }

  }

  render() {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Image
          source={require('../assets/background_profile_level.png')}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}
        />
        {this.state.showError ?
          <ImageBackground source={require('../assets/backgroundText.png')} style={{ height: 40, width: 266, justifyContent: 'center', alignItems: 'center', position: "absolute", top: 10 }}>
            <Text style={{ color: '#fff' }}>{this.state.text}</Text>
          </ImageBackground> : <></>
        }
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 30, color: '#fff', fontWeight: 'bold'}}>TIẾN LÊN MIỀN NAM</Text>
        </View>
        <View style={{
          borderWidth: 3, borderRadius: 5, borderColor: '#ef1456', width: 270, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)'
        }}>
          <View style={styles.title}>
            <TouchableOpacity
              style={[
                styles.titleItem,
                this.state.login ? styles.titleshow : {},
              ]}
              onPress={() => this.changeScreen('login')}
              activeOpacity={0.6}>
              <Text
                style={[styles.textTitle, !this.state.login ? { color: '#949494' } : {}]}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.titleItem,
                !this.state.login ? styles.titleshow : {},
              ]}
              onPress={() => this.changeScreen('signup')}
              activeOpacity={0.6}>
              <Text
                style={[styles.textTitle, this.state.login ? { color: '#949494' } : {}]}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.login ? (
            <>
              <View style={styles.containerInput}>
                <View style={styles.iconInput}>
                  <AntDesign name="mail" size={20} color="#fff" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#666"
                  value={this.state.emailLogin}
                  onChangeText={(text) => this.changeText('emailLogin', text)}
                />
              </View>
              <View style={styles.containerInput}>
                <View style={styles.iconInput}>
                  <AntDesign name="lock1" size={20} color="#fff" />
                </View>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="#666"
                  value={this.state.passwordLogin}
                  onChangeText={(text) => this.changeText('passwordLogin', text)}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => this.sendLogin()}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>LOGIN</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.containerInput}>
                <View style={styles.iconInput}>
                  <AntDesign name="mail" size={20} color="#fff" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#666"
                  value={this.state.emailSignup}
                  onChangeText={(text) => this.changeText('emailSignup', text)}
                />
              </View>
              <View style={styles.containerInput}>
                <View style={styles.iconInput}>
                  <AntDesign name="lock1" size={20} color="#fff" />
                </View>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#666"
                  value={this.state.passwordSignup}
                  onChangeText={(text) => this.changeText('passwordSignup', text)}
                />
              </View>
              <View style={styles.containerInput}>
                <View style={styles.iconInput}>
                  <AntDesign name="lock1" size={20} color="#fff" />
                </View>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor="#666"
                  value={this.state.passwordConfirmSignup}
                  onChangeText={(text) => this.changeText('passwordConfirmSignup', text)}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={this.sendSignUp}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: '#fff' }}>SIGN UP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {this.state.loading ? <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/loading.gif')} style={{ height: 20, width: 20 }} />
        </View> : <></>}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    paddingRight: 15,
    paddingLeft: 15,
    justifyContent: 'center',
    backgroundColor: '#ef1456',
    marginBottom: 10
  },
  textTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  titleItem: {
    marginVertical: 3,
    flex: 1,
    alignItems: 'center',
    padding: 2,
  },
  input: {
    backgroundColor: "#ebebeb",
    marginBottom: 5,
    marginTop: 5,
    borderColor: '#4c555d',
    height: 35,
    width: 200,
    paddingLeft: 10,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconInput: {
    backgroundColor: '#ef1456',
    color: '#fff',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 35,
    width: 235,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#ef1456',
    marginBottom: 15,
    marginTop: 10,
  },
});
const mapStateToProps = (state) => {
  return {

  }
};
const mapDispatchToProps = () => {
  return {
    login: login,
    changeScreen: changeScreen,
    addAudio: addAudio
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(Login);

