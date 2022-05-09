import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from 'screens/user/Profile';

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {useEffect, useMemo, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {createStore} from 'redux';
import {ApplicationState} from 'src/redux';
import SplashScreen from 'src/screens/login/SplashScreen';
import StackNavigationFootball from './StackNavigationFootball';
import LoginTabs from 'screens/login/LoginTabs';
import { BASE_URL } from 'src/utils';
import { setFullName, setPhoneNumber } from 'src/screens/user/userSlice';
import axios from 'axios';

const Stack = createNativeStackNavigator();
const RootStackNavigation = () => {
  //const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const {token, isLoading, isAdmin} = useSelector(
    (state: ApplicationState) => state.userReducer,
  );
  const CALL_API = async ()=>{
    let _token='';
    let _role='';
    try {
   
      _token = await AsyncStorage.getItem('token');
      _role = await AsyncStorage.getItem('role');
      console.log('token 99'+ _token);
      dispatch({type: 'RETRIEVE_TOKEN', payload: _token, role: _role});
      setTimeout( async()=>{
      
        let config = {
          method: 'get',
          url: `${BASE_URL}users/me`,
          headers: { 
            'Authorization': 'Bearer '+_token
          }
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          const {fullName} = response.data;
          dispatch(setFullName(fullName));
        })
        .catch(function (error) {
          console.log(error);
        });
     },2000)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      CALL_API();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  console.log('admin là gì ' + isAdmin);
  return (
    <NavigationContainer>
      {console.log('gg====' + token)}
      {token == null || undefined ? (
        <Stack.Navigator>
          <Stack.Screen
            name="hi"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginHome"
            component={LoginTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : isAdmin == '0' ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Navigation"
            component={StackNavigationFootball}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RootStackNavigation;
