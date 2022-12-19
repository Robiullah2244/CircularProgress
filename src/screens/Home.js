import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Platform, StyleSheet, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
import CircleProgressComponentFromInProgessToComplete from '../components/CircleProgressComponentFromInProgessToComplete'
import CircleProgressComponentFromLockedToInProgress from '../components/CircleProgressComponentFromLockedToInProgress'
import CircleProgressComponentLocked from '../components/CircleProgressComponentLocked'
import Toast from 'react-native-toast-message'
import ToastConfigCustomComponent from '../components/ToastConfigCustomComponent'
 const size = 78;

const getBackupData = () => [
  {name:'goal1', image:require('../../resources/images/Goal1.png'), fromStatus: "inProgress", toStatus: "complete"},
  {name:'goal2', image:require('../../resources/images/Goal2.png'), fromStatus: "locked", toStatus: "inProgress"},
  {name:'goal3', image:require('../../resources/images/Goal3.png'), fromStatus: "locked", toStatus: "locked"},
  {name:'goal4', image:require('../../resources/images/Goal4.png'), fromStatus: "locked", toStatus: "locked"},
  {name:'PopQuiz', image:require('../../resources/images/PopQuiz.png'), fromStatus: "locked", toStatus: "locked"},
]

export default function Home() {
    const [data, setData] = useState(getBackupData())
    const [uniqueValue, setUniqueValue] = useState(1)
    const flatListRef = useRef(null)
    const [secondAnimation, setSecondAnimation] = useState(false)

    const completeToastShow = () => {
        Toast.show({
            text1:'Goal Complete',
            type:'success'
        })
    }

    const onAnimateComplete = (_data) => {
        if(_data?.fromStatus == "inProgress" && _data?.toStatus == "complete"){
            // console.log('dsvfsd',  flatListRef.current.index)
            flatListRef?.current?.scrollToIndex({animated: true, index: 1})
            setSecondAnimation(true)
        }
    }

    const restart = () => {
        setData(getBackupData());
        setSecondAnimation(false);
        setUniqueValue(prevUniqueValue => prevUniqueValue+1)
    }

    return (
        <SafeAreaView key={uniqueValue} style={{backgroundColor: 'white', flex: 1}}>
            <StatusBar barStyle="dark-content" backgroundColor={'white'} />
            <View style={{flexDirection:'row', marginTop: 80, alignItems: 'center'}}>
                <View style={{height: size, width: size, marginLeft: 12, marginRight: 4}}>
                    <View style={{marginTop: 8}}>
                        <View 
                            style={styles.headerContainer}>
                            <Text style={styles.headerText}>GETTING STARTED</Text>
                        </View>
                        <View style={styles.footerContainer}>
                            <Text style={styles.headerText}>1/5</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    ref={flatListRef}
                    contentContainerStyle={{paddingRight:12}}
                    data={data}
                    renderItem={({item, index})=>
                        <View style={{marginHorizontal:4}}>
                            {item.fromStatus == "inProgress" &&  item.toStatus == "complete" &&
                            <CircleProgressComponentFromInProgessToComplete data={item} animate={true} onAnimateComplete={onAnimateComplete} completeToastShow={completeToastShow}/>
                            }
                            {item.fromStatus == "locked" &&  item.toStatus == "inProgress" &&
                            <CircleProgressComponentFromLockedToInProgress data={item} animate={secondAnimation} onAnimateComplete={onAnimateComplete}/>
                            }
                            {item.fromStatus == "locked" &&  item.toStatus == "locked" &&
                            <CircleProgressComponentLocked data={item} animate={false} onAnimateComplete={onAnimateComplete}/>
                            }
                        </View>
                    }
                    horizontal
                    keyExtractor={(item, index)=> item.name}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <TouchableOpacity onPress={restart} style={{height: 40, width: 80, backgroundColor: 'red', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop: 40}}>
                <Text>Restart</Text>
            </TouchableOpacity>
            <Toast config={ToastConfigCustomComponent} topOffset={Platform.OS == 'android' ? 12 : 50} visibilityTime={1500} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
      width: size-8,
      height: size-8,
      backgroundColor: '#FFF4E2',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    headerText: {
      fontSize: 12,
      color: '#E6B270',
      fontWeight: '800',
    },
    footerContainer: {
      position: 'absolute',
      bottom: 0,
      right: -6,
      backgroundColor: '#FFF4E2',
      height: 24,
      width: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth:1,
      borderColor:'#fff',
      borderRadius:10, 
      marginTop:-12,
    },
  });