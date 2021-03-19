import React, {useEffect, useState} from 'react';
import withDeepLinking from './deepLinking.js';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Link, NavigationContainer, useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function Name() {
  const [data, setData] = useState(null);
  const route = useRoute();
  console.log(route.params.name);
  useEffect(() => {
    fetch(`http://192.168.1.20:3000/${route.params.name}`)
      .then(response => response.json())
      .then(dataa => setData(dataa.user));
  }, []);
  console.log(data);

  return (
    <View>
      <Text>This page is for {route.params.name}</Text>
    </View>
  );
}
export default Name;
