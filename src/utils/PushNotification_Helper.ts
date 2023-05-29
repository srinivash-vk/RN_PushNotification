import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetToken();
  }
}

async function GetToken(){
    let token =await AsyncStorage.getItem('token')
    console.log("old token",token)
    if(!token){
        try{
            const token=await messaging().getToken()
            if(token){
                console.log("new token",token)
              await  AsyncStorage.setItem('token', token)
            }
        }catch(error){
            console.log("error",error)
        }
    }
}

export const NotificationListener =() =>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

        // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

    messaging().onMessage(async remoteMessage =>{
        console.log("notification fpr froground state..",remoteMessage)
    })
}