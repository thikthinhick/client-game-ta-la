import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { images } from '../styles/global'
export default class convertNumber extends Component {
    constructor(props) {
        super(props)
        this.state = { number: '' }
    }
    componentDidMount() {
        var string = ''
        if (this.props.number > 0) string = '+' + this.props.number;
        else string = String(this.props.number)
        this.setState({ number: string })
        console.log(string)
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {this.props.sub ? new Array(this.state.number.length).fill(0).map((value, index) =>
                    this.state.number.charAt(index) === '-' ? <Image source={images.numberssub['sub']} style={{ height: 9, width: 10 }} />
                        : this.state.number.charAt(index) === '1' ? <Image source={images.numberssub[this.state.number.charAt(index)]} style={{ height: 20, width: 10 }} /> :
                            <Image source={images.numberssub[this.state.number.charAt(index)]} style={{ height: 20, width: 12 }} />
                ) : new Array(this.state.number.length).fill(0).map((value, index) =>
                this.state.number.charAt(index) === '+' ? <Image source={images.numbersadd['add']} style={{ height: 20, width: 20 }} /> :
                    this.state.number.charAt(index) === '1' ? <Image source={images.numbersadd[this.state.number.charAt(index)]} style={{ height: 30, width: 15 }} /> :
                        <Image source={images.numbersadd[this.state.number.charAt(index)]} style={{ height: 30, width: 18 }} />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({})
