import React from 'react';
import {PieChart} from 'react-native-svg-charts';
import {Text, View, StyleSheet} from 'react-native';

const Students = () => {
  const profession = [
    'Employed',
    'Student',
    'Employed',
    'Student',
    'Employed',
    'Student',
    'Student',
    'Student',
    'Employed',
    'Student',
    'Employed',
    'Student',
  ];
  var professionCount = profession.reduce((prev, cur) => {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});
  const data = [professionCount.Employed, professionCount.Student];

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
      <Text style={styles.heading}>Number of people by Profession</Text>
      <Text style={styles.title}>Employed : {professionCount.Employed}</Text>
      <Text style={styles.title}>Student : {professionCount.Student}</Text>
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

export default Students;
