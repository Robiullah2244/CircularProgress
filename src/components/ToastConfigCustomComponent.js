import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ToastConfigCustomComponent = {
  success: ({text1, text2, props}) => (
    <View>
      <View style={[styles.container]}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <View style={{height:24, width:24, borderRadius:24, backgroundColor:'#1eac69', justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../../resources/images/SmallCheckmark.png')} style={{height:8, width:8}}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, {color:'#000' }]}>{text1}</Text>
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    paddingRight:32,
    borderRadius:32,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 1, height: 2},
    elevation: 10,
    backgroundColor:'white',
  },
  textContainer: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});
export default ToastConfigCustomComponent;
