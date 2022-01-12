import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
export default class Attention extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ImageBackground source={require('../assets/backgroundAttention.png')} style={{ height: 178.5, width: 197.3, alignItems: 'center', padding: 5}}>
                <View style={{ height: 30 }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 5, fontWeight: 'bold', color: '#fff' }}>LƯU Ý</Text>
                </View>
                <View style={{ height: 100, paddingHorizontal: 10}}>
                    <Text style={{ textAlign: 'center', marginTop: 10, color: '#fff' }}>Bạn có chắc chắn thoát khỏi bàn, nếu thoát khỏi bàn mọi tiền cược bạn đã cược sẽ mất hết.</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => this.props.closeShow('showAttention')}>
                        <ImageBackground source={require('../assets/backgroundButton1.png')} style={{ height: 30, width: 85, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, color: '#fff' }}>TỪ CHỐI</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => this.props.acceptLogoutRoom()}>
                        <ImageBackground source={require('../assets/backgroundButton2.png')} style={{ height: 30, width: 85, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, color: '#fff' }}>ĐỒNG Ý</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({})
