import React from 'react';
import { View, StyleSheet, Animated, linear } from 'react-native';

import CardInTable from './CardInTable.js'
export default class AnimListCardTable extends React.Component {
    state = {
        fadeAnim1: new Animated.Value(0),
        fadeAnim2: new Animated.Value(1),
        fadeAnim3: new Animated.Value(0),
    };
    componentDidMount() {
        Animated.timing(this.state.fadeAnim3, {
            toValue: 1,
            duration: 150,
            easing: linear
        }).start();
        Animated.parallel([
            Animated.timing(this.state.fadeAnim1, {
                toValue: -60,
                duration: 150,
                easing: linear
            }),
            Animated.timing(this.state.fadeAnim2, {
                toValue: 0.6,
                duration: 150,
                easing: linear
            })
        ]).start();
    }
    render() {
        const { listCardItem } = this.props;
        return (
            <Animated.View
                style={{
                    transform: this.props.zoomOut ? [
                        { translateY: this.state.fadeAnim1 },
                        { scale: this.state.fadeAnim2 },
                    ] : [{ scale: this.state.fadeAnim3 }],
                    position: 'absolute',
                }}>
                <View style={{ flexDirection: 'row', paddingRight: 42 }}>
                    {listCardItem.map((value) =>
                        <CardInTable value={value} />)}
                </View>
            </Animated.View >
        );
    }
}
const styles = StyleSheet.create({});
