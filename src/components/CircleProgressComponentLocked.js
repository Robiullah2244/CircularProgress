import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useValue} from '@shopify/react-native-skia';
import {DonutChart} from './DonutChart';

const radius = 40;
const STROKE_WIDTH = 3;

export default function CircleProgressComponentLocked({data}) {

  const localDashed = true;
  const localColor = "#D3D3D3";

  return (
    <View style={styles.ringChartContainer}>
      <DonutChart
        radius={radius}
        strokeWidth={STROKE_WIDTH}
        percentageComplete={useValue(1)}
        targetPercentage={1}
        strokeColor={localColor}
        image={data.image}
        dashed={localDashed ? true : false}
      />
      <View
        style={[styles.imageContainer,{ position: 'absolute', 
        height: 64,
        width: 64,
        borderRadius:64,
        alignItems:'center',
        justifyContent:'center', marginTop: 8, marginLeft: 8}]}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Image
            source={require('../../resources/images/Locked.png')}
            style={[{position:'absolute', height:24, width:18, opacity: 1}]}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
  imageContainer:{
    height: 80,
    width: 80,
    borderRadius:80,
    alignItems:'center',
    justifyContent:'center',
  },
});
