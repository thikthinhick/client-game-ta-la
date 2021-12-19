import React, { Component, memo } from 'react'
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import Result from './Result'
import Countdown from '../Countdown.js'
export class user extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const win = this.props.name === this.props.userWin
        return (
            <View style={styles.container}>
                <Text style={styles.text}>100K</Text>
                <ImageBackground style={styles.containerImage} source={require('../../assets/bachgroundUser.png')}>
                    <Image style={[styles.image, { borderColor: this.props.dangdanh && this.props.play ? '#3ab737' : 'transparent' }]} source={require("../../assets/userNone.jpg")} />
                    {this.props.Viewer ?
                        <View style={{ position: 'absolute', justifyContent: 'center' }}>
                            <Text style={{
                                fontSize: 14, color: "#fff", fontStyle: 'italic', textAlign: 'center', fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 1)',
                                textShadowOffset: { width: 1, height: 1 },
                                textShadowRadius: 10, fontWeight: 'bold'
                            }}>
                                Đang xem
                            </Text>
                        </View> : <></>}
                    <View style={{ position: 'absolute' }}>
                        {this.props.showResult ? <Result win={win} />
                            : <></>}
                    </View>
                    <View style={{ position: 'absolute', height: 52, width: 52 }}>
                        {(this.props.dangdanh && this.props.play && this.props.me) ? <Countdown skip={this.props.skip} /> : <></>}
                    </View>
                </ImageBackground>
                <Text style={styles.text}>{
                    this.props.name}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: "100%",
        justifyContent: 'center'
    },
    containerImage: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    image: {
        height: 60,
        borderRadius: 13,
        width: 60,
        borderWidth: 4,
    },
    text: {
        color: '#fff',
        fontSize: 13,
    }
})

export default user
