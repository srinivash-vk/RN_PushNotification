import {
  Text,
  View,
} from 'react-native';
import {NotificationListener, requestUserPermission} from './src/utils/PushNotification_Helper'
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';


function App(): JSX.Element {

  useEffect(() => {
    requestUserPermission()
    NotificationListener()
  }, [])
  
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  
  return (
      <View style={{flex:1 ,alignSelf:'center',justifyContent:'center',}}>
      <Text style={{fontWeight:'bold',fontSize:20}}>Push Notification Tester</Text>
      </View>
  );
}


export default App;
