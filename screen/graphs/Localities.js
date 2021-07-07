import React from 'react';
import {PieChart} from 'react-native-svg-charts';
import {Text, View, StyleSheet} from 'react-native';

const Localities = () => {
  const locality = [
    'Mumbai',
    'Chennai',
    'Madurai',
    'Coimbatore',
    'Trichy',
    'Mumbai',
    'Chennai',
    'Madurai',
    'Coimbatore',
    'Trichy',
    'Virudhunagar',
    'Mumbai',
  ];

  var localitiesCount = locality.reduce((prev, cur) => {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});

  const data = [
    localitiesCount.Mumbai,
    localitiesCount.Madurai,
    localitiesCount.Chennai,
    localitiesCount.Coimbatore,
    localitiesCount.Trichy,
    localitiesCount.Virudhunagar,
  ];

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
      },
      key: `pie-${index}`,
    }));

  return (
    <View>
      <Text style={styles.heading}>Number of people by localities.</Text>
      <Text style={styles.title}>Mumbai :{localitiesCount.Mumbai}</Text>
      <Text style={styles.title}>Chennai :{localitiesCount.Chennai}</Text>
      <Text style={styles.title}>Madurai :{localitiesCount.Madurai}</Text>
      <Text style={styles.title}>
        Coimbatore : {localitiesCount.Coimbatore}
      </Text>
      <PieChart style={{height: 150}} data={pieData} />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'brown',
    fontSize: 20,
  },
  title: {
    color: 'blue',
    fontSize: 18,
  },
});

export default Localities;
