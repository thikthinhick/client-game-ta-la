import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 100
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 100);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 100
      }).start();
    }
  };
  return (
    <React.Fragment>
      {visible ? <View style={styles.container}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }]}]}>
          {children}
        </Animated.View>
      </View> : <View></View>
      }
    </React.Fragment>
  );
};
export default ModalPoup;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});