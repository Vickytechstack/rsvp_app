import React from 'react';
import Localities from '../graphs/Localities';
import Students from '../graphs/Students';
import {View, StyleSheet} from 'react-native';

const ThirdScreen = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.localities}>
        <Localities />
      </View>
      <View style={styles.students}>
        <Students />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    margin: 40,
  },
  localities: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  students: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
});

export default ThirdScreen;
