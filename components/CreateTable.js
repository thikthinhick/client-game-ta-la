import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import socket from '../Socket.io/Socket.js'
const countries = [2, 3, 4]
export default class AssetExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {nameroom: '', coin: '', amount: '', password: '' }
  }
  changeText = (value, text) => {
    this.setState({[value]: text})
  }
  createRoom = () => {
    this.props.closeCreateTable()
    const {nameroom, coin, amount, password} = this.state
    socket.emit('createRoom', {nameroom: nameroom, coin: coin, amount: amount, password: password})
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{
            padding: 20,
            paddingTop: 10,
            borderWidth: 4,
            borderColor: '#fff',
            borderRadius: 6,
            position: 'relative'
          }}
          source={require('../assets/backgroundpoker.jpg')}>
          <TouchableOpacity style={{position: 'absolute', right: -10, top: -10}} onPress={() => this.props.closeCreateTable()}>
            <Image style={{ height: 30, width: 30 }} source={require('../assets/close.png')} />
         </TouchableOpacity>  
          <View style={{position: 'relative'}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
                width: '100%',
                textAlign: 'center'
              }}>
              Tạo phòng chơi
            </Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
              <Text style={{ width: 80, color: '#fff' }}>Tên bàn: </Text>
              <TextInput
                placeholder="Nhập tên bàn"
                style={{
                  width: 250,
                  borderWidth: 1,
                  borderColor: '#fff',
                  borderRadius: 5,
                  paddingLeft: 10,
                  color: '#FFf',
                }}
                onChangeText = {(text) => this.changeText('nameroom', text)}
                value={this.state.nameroom}
                placeholderTextColor={'#fff'}/>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ width: 80, color: '#fff' }}>Mức cược:</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Nhập số tiền"
                style={{
                  width: 250,
                  borderWidth: 1,
                  borderColor: '#fff',
                  borderRadius: 5,
                  paddingLeft: 10,
                  color: '#FFf',
                }}
                onChangeText = {(text) => this.changeText('coin', text)}
                value = {this.state.coin}
                placeholderTextColor={'#fff'}></TextInput>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ width: 80, color: '#fff' }}>Cài đặt:</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 250,
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <SelectDropdown
                  data={countries}
                  onSelect={(selectedItem, index) => {
                    this.setState({amount: selectedItem})
                  }}
                  buttonStyle={{ height: 30, width: 100, borderRadius: 5 }}
                  buttonTextStyle={{ fontSize: 14 }}
                  defaultButtonText={"Số người"}
                  rowTextStyle={{ fontSize: 14 }}
                  rowStyle={{ height: 30 }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
                <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    style={{
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 5,
                      paddingLeft: 10,
                      paddingRight: 5,
                      color: '#FFf'
                    }}
                    onChangeText = {(text) => this.changeText('password', text)}
                    value = {this.state.password}
                    placeholderTextColor={'#fff'}
                  />
                </View>
                <Image style={{ height: 25, width: 25 }} source={require('../assets/Images/unlocked.png')} />
              </View>
            </View>
            <Button title="Tạo bàn" onPress={() => this.createRoom()}/>
          </View>
        </ImageBackground>
      </View>)
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  rowUserList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowUserItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
