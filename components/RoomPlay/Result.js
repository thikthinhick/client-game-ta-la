import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Result extends Component {
    render() {
        const title = (this.props.win) ? 'Thắng' : 'Thua';
        return (
            <View style={styles.container}>
                <Text style={{
                    fontSize: 18, color: '#fff', textShadowColor: 'rgba(0, 0, 0, 1)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 10, fontWeight: 'bold'
                }}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
