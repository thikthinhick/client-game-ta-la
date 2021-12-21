import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native'
import { numberWithCommas } from '../styles/config'
import {images} from '../styles/global'
export class User extends Component {
    render() {
        return (
            <ImageBackground style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 46,
                width: 162.3
            }} source={require('../assets/backgroundUser.png')}>
                <View style={{ justifyContent: "center", alignItems: 'center', height: 40, width: 40, backgroundColor: '#fff', borderRadius: 5, marginLeft: 3}}>
                    <Image source={images.users[this.props.url]} style={{
                        height: 38,
                        width: 38,
                        borderRadius: 4,
                    }} />
                </View>
                <View style={{ height: 60, justifyContent: 'space-between', padding: 9}}>
                    <Text style={{ color: '#fff', fontWeight: 'bold'}}>{this.props.userName}</Text>
                    <Text style={{ color: 'gold'}}>{numberWithCommas(this.props.coin)} <Image style={{ height: 15, width: 15 }} source={require('../assets/coin.png')} /></Text>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    textName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#9b6c36',
        fontFamily: 'Play'
    }
})
export default User
