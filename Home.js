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

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('http://192.168.1.20:3000/user_list')
      .then(response => response.json())
      .then(dataa => setData(dataa.userList));
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <Link key={item._id} to={`/${item.name}`}>
              <View>
                <Text>{item.name}</Text>
              </View>
            </Link>
          );
        }}
        contentContainerStyle={{padding: 10}}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default Home;
