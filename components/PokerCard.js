import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability'
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, ImageBackground } from 'react-native'
import ButtonRectangle from './ButtonRectangle'
import CardItem from './CardItem'
import CoinUp from './RoomPlay/CoinUp'
export class PokerCard extends Component {
    render() {
        return (
            <View
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}>
                
                {(this.props.isTurn) ? <View style={{ flexDirection: 'row', position: 'absolute', right: 38, top: -30 }}>
                    {this.props.hiddenButton ? <TouchableOpacity style={styles.button} onPress={() => { this.props.fight() }}>
                        <ButtonRectangle color={'green'} name={'Đánh'} />
                    </TouchableOpacity> : <></>}
                    <TouchableOpacity style={styles.button} onPress={() => this.props.skip()}>
                        <ButtonRectangle color={'red'} name={'Bỏ qua'} />
                    </TouchableOpacity>
                </View> : <></>}
                <View style={styles.container}>
                    {this.props.listCard.map((value, index) =>
                        <CardItem key={value.data.value + value.data.type} pickCard={this.props.pickCard} value={value} length={this.props.listCard.length} index={index} />)}
                </View>
                <TouchableOpacity style={{ position: 'absolute', top: 40, right: -40 }} onPress={() => this.props.shortCards()}>
                    <Image style={{ height: 50, width: 50 }} source={require('../assets/button_circle_sort.png')} />
                </TouchableOpacity>
                {this.props.showCardError ? <ImageBackground source={require('../assets/backgroundCardError.png')} style={{ top: '60%', left: '35%', height: 24, width: 150, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                    <Text style={{ color: '#FFF', fontSize: 12 }}>Lựa chọn không hợp lệ!</Text>
                </ImageBackground> : <></>}
                {this.props.showCoinUp ? <View style={{ position: 'absolute', top: 25 }}><CoinUp tiencuoc={this.props.tiencuoc} sub={true}/></View> : <></>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    button: {
        padding: 3,
        borderRadius: 2,
        margin: 5
    },
    buttonBack: {
        height: 40,
        width: 40
    },
})
export default PokerCard
