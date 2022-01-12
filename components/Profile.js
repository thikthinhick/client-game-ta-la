import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { ip } from '../styles/config'
import axios from 'axios';
class AssetExample extends React.Component {
    state = { loading: true, friend: true }
    componentDidMount() {
        axios.post(`${ip}/getProfile`, { id_user1: this.props.idUser, id_user2: this.props.user.idUser }).then(res => {
            this.setState({ loading: false, friend: res.data })
        }).catch(err => {
            console.log(err)
        })
    }
    addRemoveUser = (idUser, add) => {
        const id_user_send = this.props.idUser;
        const id_user_receive = idUser
        axios.post(`${ip}/addRemoveUser`, { id_user1: id_user_send, id_user2: id_user_receive, add: add }).then(res => {
            this.props.closeProfile()
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('../assets/backgroundModalItem1.png')}
            >
                {!this.state.loading ?
                    <>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>TRANG CÁ NHÂN</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', top: -10, right: -10 }} onPress={() => this.props.closeProfile()}>
                            <Image
                                style={{ height: 30, width: 30 }}
                                source={require('../assets/button_close_game.png')}
                            />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", marginHorizontal: 15, marginTop: 10, alignItems: 'center' }}>
                            <Image style={{ height: 50, width: 50, borderRadius: 5, borderWidth: 2, borderColor: '#fff' }} source={require('../assets/Images/user/54.png')} />
                            <View style={{ marginLeft: 15, justifyContent: 'space-between', margin: 5, flex: 1 }}>
                                <Text style={{ fontSize: 13, color: '#fff' }}>Tên:  <Text style={{color: 'gold'}}>{this.props.user.userName}</Text></Text>
                                <Text style={{ fontSize: 13, color: '#fff' }}>ID:  <Text style={{color: 'gold'}}>{this.props.user.idUser}</Text></Text>
                                <Text style={{ fontSize: 13, color: '#fff' }}>Coin:  <Image source={require('../assets/coin.png')} style={{ height: 15, width: 15 }} /> <Text style={{color: 'gold'}}>{this.props.user.coin}</Text></Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 15, marginTop: 5 }}>
                            <TouchableOpacity>
                                <ImageBackground style={{ height: 34, width: 94, justifyContent: 'center', alignItems: 'center' }} source={require('../assets/Images/Menu/button_blue.png')}>
                                    <Text style={{ fontSize: 13}}><Ionicons name="chatbubble-ellipses-sharp" size={16} color="black" /> Nhắn tin</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            {this.state.friend ?

                                <TouchableOpacity onPress={() => this.addRemoveUser(this.props.user.idUser, true)}>
                                    <ImageBackground style={{ height: 34, width: 94, justifyContent: 'center', alignItems: 'center' }} source={require('../assets/Images/Menu/button_yellow.png')}>
                                        <Text style={{ fontSize: 13}}><FontAwesome name="user-plus" size={16} color="black" /> Kết bạn</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.addRemoveUser(this.props.user.idUser, false)}>
                                    <ImageBackground style={{ height: 34, width: 94, justifyContent: 'center', alignItems: 'center' }} source={require('../assets/Images/Menu/button_red.png')}>
                                        <Text style={{ fontSize: 13 }}><FontAwesome name="user-times" size={16} color="black" /> Bỏ kết bạn</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, margin: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: "gold", borderTopLeftRadius: 2 }}>
                                    <Text style={{ textAlign: 'center'  }}>THẮNG</Text>
                                </View>
                                <View style={{ flex: 1, margin: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: "gold" }}>
                                    <Text style={{ textAlign: 'center' }}>THUA</Text>
                                </View>
                                <View style={{ flex: 1, margin: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: "gold", borderTopRightRadius: 2 }}>
                                    <Text style={{ textAlign: 'center' }}>HÒA</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, margin: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: "#787878", borderBottomLeftRadius: 2 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>10</Text>
                                </View>
                                <View style={{ flex: 1, margin: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: "#787878" }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>0</Text>
                                </View>
                                <View style={{ flex: 1, margin: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: "#787878", borderBottomRightRadius: 2 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>12</Text>
                                </View>
                            </View>
                        </View>
                    </> : <Text>Loading...</Text>}
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 225,
        position: 'relative',
        marginTop: 30
    },
});
const mapStateToProps = (state) => {
    return {
        idUser: state.ReducerLogin.idUser,
    }
};
const mapDispatchToProps = () => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps())(AssetExample);
