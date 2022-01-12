import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity,  View, ImageBackground, Image } from 'react-native'
import { connect } from 'react-redux';
import { changeSettingItem, pauseMusic } from '../Redux/Action';

class Setting extends Component {
    render() {
        return (
            <ImageBackground source={require('../assets/backgroundModalItem.png')} style={{height: 171, width: 315, zIndex: 10, position: 'relative' }}>
                <TouchableOpacity style={{ position: 'absolute', top: -10, right: -10}} onPress={() => this.props.closeShow('showSetting')}>
                    <Image source={require('../assets/button_close_game.png')} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 5 }}>CÀI ĐẶT</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 20 }}>
                    <Text style={{ color: '#fff' }}>Nhận lời mời</Text>
                    <TouchableOpacity onPress={() => this.props.changeSettingItem('background')} activeOpacity={0.8}>
                        {this.props.settingData.background ? <Image source={require('../assets/blue_switch.png')} style={{ height: 19.5, width: 35.5 }} /> :
                            <Image source={require('../assets/grey_switch.png')} style={{ height: 19.5, width: 35.5 }} />}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3, paddingHorizontal: 20 }}>
                    <Text style={{ color: '#fff' }}>Nhạc nền</Text>
                    <TouchableOpacity onPress={() => {
                        this.props.changeSettingItem('music');
                        this.props.pauseMusic(this.props.settingData.music)
                    }} activeOpacity={0.8}>
                        {this.props.settingData.music ? <Image source={require('../assets/blue_switch.png')} style={{ height: 19.5, width: 35.5 }} /> :
                            <Image source={require('../assets/grey_switch.png')} style={{ height: 19.5, width: 35.5 }} />}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3, paddingHorizontal: 20 }}>
                    <Text style={{ color: '#fff'}}>Âm thanh</Text>
                    <TouchableOpacity onPress={() => this.props.changeSettingItem('sound')} activeOpacity={0.8}>
                        {this.props.settingData.sound ? <Image source={require('../assets/blue_switch.png')} style={{ height: 19.5, width: 35.5 }} /> :
                            <Image source={require('../assets/grey_switch.png')} style={{ height: 19.5, width: 35.5 }} />}
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 30, marginTop: 3}}>
                    <View>
                        <TouchableOpacity style={{alignItems: 'center'}}>
                            <Image source={require('../assets/button_thoat.png')} style={{height: 35, width: 35}}/>
                            <Text style={{color: '#fff', fontSize: 12}}>Thoát game</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({})
const mapStateToProps = (state) => {
    return {
        settingData: state.ReducerSetting
    }
};
const mapDispatchToProps = () => {
    return {
        changeSettingItem: changeSettingItem,
        pauseMusic: pauseMusic
    };
};
export default connect(mapStateToProps, mapDispatchToProps())(Setting);
