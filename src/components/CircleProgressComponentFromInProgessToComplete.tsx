import * as React from 'react';
import {View, StyleSheet, Pressable, Animated} from 'react-native';
import {Easing, runTiming, useFont, useValue} from '@shopify/react-native-skia';
import {DonutChart} from './DonutChart';

const radius = 40;
const STROKE_WIDTH = 3;

export default function CircleProgressComponentFromInProgessToComplete({data, animate, onAnimateComplete, completeToastShow}: any) {
  const [isComplete, setIsComplete] = React.useState(false);
  const [isFullProcessComplete, setIsFullProcessComplete] = React.useState(false);

  const [localDashed, setLocalDashed] = React.useState(false);
  const [localColor, setLocalColor] = React.useState("#6530e1");
  const [animationColor, setAnimationColor] = React.useState("#D3D3D3");
  const [dashed, setDashed] = React.useState(true);
  const duration = 1000;

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in duration
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: duration
    }).start();
  };

  const targetPercentage = 100 / 100;
  const animationState = useValue(0);

  const animateChart = () => {
    if(!isComplete){
      animationState.current = 0;
      runTiming(animationState, targetPercentage, {
        duration: duration,
        easing: Easing.inOut(Easing.exp),
      })
    }
  };

  React.useEffect(() => {
    if(animate){
      animateChart();
    }
  }, [animate]);
  

  // useEffect that listens to the value going over 1 and then resets value and applies some state updates 
  React.useEffect(() => {
  const unsubscribe = animationState.addListener((value) => {
    // console.log('value', value);
    if (value > 0.9995) {
      // Alert.alert('Done!!!');
      setLocalColor('#D3D3D3')
      setLocalDashed(true)
      setAnimationColor('#1eac69')
      animateChart();
      setDashed(false)
      setIsComplete(true);
      fadeIn();
      completeToastShow?.();
      setTimeout(() => {
        setIsFullProcessComplete(true);
        onAnimateComplete(data);
      }, duration);
    }
  })
  return () => {
    unsubscribe()
  }
}, [animationState, isComplete])

  return (
    <Pressable /*onPress={animateChart}*/ >
      <View style={styles.ringChartContainer}>
        <View style={[styles.ringChartContainer, {
          position: 'absolute',
        }]}>
          <DonutChart
            radius={radius}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={useValue(1)}
            targetPercentage={1}
            strokeColor={localColor}
            image={null}
            dashed={localDashed ? true : false}
          />
        </View>
        <View style={[styles.ringChartContainer, {
          position: 'absolute'
        }]}>
          <DonutChart
            radius={radius}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={animationState}
            targetPercentage={targetPercentage}
            strokeColor={'white'}
            image={null}
            dashed={false}
          />
        </View>
        <View style={[styles.ringChartContainer, {
          position: 'absolute'
        }]}>
          <DonutChart
            radius={radius}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={animationState}
            targetPercentage={targetPercentage}
            strokeColor={animationColor}
            image={data.image}
            dashed={dashed}
          />

          {isComplete &&
            <Animated.View
              style={[styles.imageContainer,{opacity: fadeAnim, backgroundColor: 'rgba(30,172,105,0.4)', position: 'absolute',
              height: 64,
              width: 64,
              borderRadius:64,
              alignItems:'center',
              justifyContent:'center', marginTop: 8, marginLeft: 8}]}>
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Animated.Image
                  source={require('../../resources/images/Checkmark.png')}
                  style={[{position:'absolute', height:24, width:24, opacity: fadeAnim}]}
                  resizeMode="cover"
                />
              </View>
            </Animated.View>
          }
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  imageContainer:{
    height: 80,
    width: 80,
    borderRadius:80,
    alignItems:'center',
    justifyContent:'center',
  },
  image:{
    width: 60,
    height:60, 
    borderRadius:80,
    padding:4
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
  button: {
    marginTop: 40,
    backgroundColor: 'orange',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
