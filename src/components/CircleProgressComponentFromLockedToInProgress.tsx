import * as React from 'react';
import {View, StyleSheet, Pressable, Animated} from 'react-native';
import {Easing, runTiming, useValue} from '@shopify/react-native-skia';
import {DonutChart} from './DonutChart';

const radius = 40;
const STROKE_WIDTH = 3;

export default function CircleProgressComponentFromLockedToInProgress({data, animate, onAnimateComplete}: any) {
  const [isComplete, setIsComplete] = React.useState(false);

  const localDashed = true;
  const localColor = "#D3D3D3";
  const animationColor = "#6530e1";
  const dashed = false;
  const duration = 1000;

  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const fadeOut = () => {
    // Will change fadeAnim value to 1 in duration
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 0,
      duration: duration
    }).start();
  };

  const targetPercentage = 100 / 100;
  const animationState = useValue(0);

  const animateChart = () => {
    animationState.current = 0;
    runTiming(animationState, targetPercentage, {
      duration: duration,
      easing: Easing.inOut(Easing.exp),
    })
  };

  React.useEffect(() => {
    if(animate){
      fadeOut();
      animateChart();
    }
  }, [animate]);
  
  // useEffect that listens to the value going over 1 and then resets value and applies some state updates 
  React.useEffect(() => {
  const unsubscribe = animationState.addListener((value) => {
    // console.log('value', value);
    if (value > 0.9995) {
      // Alert.alert('Done!!!');
      setIsComplete(true);
      onAnimateComplete(data);
    }
  })
  return () => {
    unsubscribe()
  }
}, [animationState])

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
            strokeColor={animationColor}
            image={data.image}
            dashed={dashed}
          />
          {!isComplete &&
            <View
              style={[styles.imageContainer,{ position: 'absolute', 
              height: 64,
              width: 64,
              borderRadius:64,
              alignItems:'center',
              justifyContent:'center', marginTop: 8, marginLeft: 8}]}>
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Animated.Image
                  source={require('../../resources/images/Locked.png')}
                  style={[{position:'absolute', height:24, width:18, opacity: fadeAnim}]}
                  resizeMode="cover"
                />
              </View>
            </View>
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
