import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Countdown2 extends Component {
	state = { count: 20 }
	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({ count: this.state.count - 1 });
			if (this.state.count === 0) {
				clearInterval(this.timer)
				this.props.startGame();
			}
		}, 1000)
	}
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Ván đấu sẽ bắt đầu sau:</Text>
				<Text style={styles.text}>{this.state.count}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 18,
		color: '#FFF',
		fontStyle: 'italic',
		fontWeight: 'bold'
	}
})
