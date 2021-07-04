import React from "react";
import { PieChart } from 'react-native-svg-charts'
import {
    Text,
    View
} from 'react-native';


const GuestCount = () => {
    const data = [50, 10, 40, 95]

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))

    return (<View>
        <Text>Number of people by localities.</Text>
        <PieChart style={{ height: 150 }} data={pieData} />
    </View>
    )

}

export default GuestCount;