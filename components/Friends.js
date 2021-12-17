
import * as React from 'react';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default class AssetExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {button: [false, true, false]}
  }
  changeScreen = (index) => {
    if(index === 0)
    this.setState({button: [true, false, false]})
    else if(index === 1) this.setState({button: [false, true, false]})
    else this.setState({button: [false, false, true]})
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tool}>
          <TouchableOpacity>
            <Image
              style={{ height: 40, width: 40 }}
              source={require('../assets/back_button.png')}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>BẠN BÈ</Text>
        </View>
        <View
          style={{
            backgroundColor: '#e3d0b2',
            overflow: 'hidden',
            borderRadius: 10,
            marginHorizontal: 25,
            height: '83%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgba(0,0,0,0.7)',
              height: 45,
            }}>
            <TouchableOpacity
              style={[styles.button, this.state.button[0] ? { backgroundColor: '#2ac03c' } : {}]}
              onPress={() => this.changeScreen(0)}>
              <Text style={styles.buttonText}>DANH SÁCH BẠN BÈ</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={[styles.button, this.state.button[1] ? { backgroundColor: '#2ac03c' } : {}]}
            onPress={() => this.changeScreen(1)}>
              <Text style={styles.buttonText}>CHỜ XÁC NHẬN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, this.state.button[2] ? { backgroundColor: '#2ac03c' } : {}]}
            onPress={() => this.changeScreen(2)}>
              <Text style={styles.buttonText}>DANH SÁCH YÊU CẦU</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              margin: 10,
              flexDirection: 'row',
            }}>
            <TextInput style={styles.inputSearch} placeholder="Tìm kiếm bạn" />
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                backgroundColor: '#20a2cd',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 0.5,
              }}>
              <FontAwesome5 name="search" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              {[0, 0, 0].map((value) => (
                <View style={styles.boxContainer}>
                  <View style={styles.boxContainerItem}>
                    <Image
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 10,
                        marginRight: 5,
                        borderColor: 'black',
                        borderWidth: 2,
                        borderColor: 'orange',
                      }}
                      source={require('../assets/user.png')}
                    />
                    <View style={{height: 12, width: 12, position: 'absolute', backgroundColor: '#2ac03c', borderRadius: 6, borderWidth: 1, borderColor: '#FFf'}}>
                    </View>
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                      <Text style={{ fontSize: 16 }}>Chương</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.buttonItemUser}>
                          <Text style={{ color: '#fff', fontSize: 13 }}>
                            MỜI BẠN
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonItemUser}>
                          <Text style={{ color: '#fff', fontSize: 13 }}>
                            NHẮN TIN
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row' }}>
              {[0, 0, 0].map((value) => (
                <View style={styles.boxContainer}>
                  <View style={styles.boxContainerItem}>
                    <Image
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 10,
                        marginRight: 5,
                        borderColor: 'black',
                        borderWidth: 2,
                        borderColor: 'orange',
                      }}
                      source={require('../assets/user.png')}
                    />

                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                      <Text style={{ fontSize: 16 }}>Chương</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.buttonItemUser}>
                          <Text style={{ color: '#fff', fontSize: 13 }}>
                            MỜI BẠN
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonItemUser}>
                          <Text style={{ color: '#fff', fontSize: 13 }}>
                            NHẮN TIN
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row' }}>
              {[0, 0, 0].map((value) => (
                <View style={styles.boxContainer}>
                  <View style={styles.boxContainerItem}>
                    <Image
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 10,
                        marginRight: 5,
                        borderColor: 'black',
                        borderWidth: 2,
                        borderColor: 'orange',
                      }}
                      source={require('../assets/user.png')}
                    />

                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                      <Text style={{ fontSize: 16 }}>Chương</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.buttonItemUser}>
                          <Text style={{ color: '#fff', fontSize: 13 }}>
                            MỜI BẠN
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonItemUser}>
                          <Text style={{ color: '#fff', fontSize: 13 }}>
                            NHẮN TIN
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  tool: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputSearch: {
    borderWidth: 0.5,
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 15,
  },

  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonItemUser: {
    paddingHorizontal: 4,
    backgroundColor: '#20a2cd',
    borderWidth: 0.5,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  boxContainerItem: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#f5ead7',
    width: '100%',
    padding: 4,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
