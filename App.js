import React, {useEffect, useState} from 'react';
//import withDeepLinking from './deeplzzzzzink';
import {View, Text, FlatList} from 'react-native';
import {Link, NavigationContainer, useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const config = {
  screens: {
    Home: 'user_list',
    Name: ':name',
  },
};
const linking = {
  prefixes: ['https://whispering-forest-38899.herokuapp.com'],
  config,
};

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://whispering-forest-38899.herokuapp.com/user_list')
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
const Stack = createStackNavigator();

function Name() {
  const [data, setData] = useState(null);
  const route = useRoute();
  console.log(route.params.name);
  useEffect(() => {
    fetch(`https://whispering-forest-38899.herokuapp.com/${route.params.name}`)
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

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Name" component={Name} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
//console.log(data
