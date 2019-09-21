import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons'

import LandingScreen from './src/screens/Landing';
import LoginScreen from './src/screens/Signin';
import SignupScreen from './src/screens/Signup';

import HomePageScreen from './src/screens/Homepage';
import HistoryScreen from './src/screens/History';
import UserScreen from './src/screens/User';

import SelectLocationScreen from './src/screens/SelectLocation';
import SelectCompanyScreen from './src/screens/SelectCompany';
import SelectProblemScreen from './src/screens/SelectProblem';
import ReviewScreen from './src/screens/Review';
import DoneScreen from './src/screens/Done';

const queueStack = createStackNavigator({
  HomePage: {
    screen: HomePageScreen,
    navigationOptions: {
      header: null,
    }
  },
  SelectLocation: {
    screen: SelectLocationScreen,
  },
  SelectCompany: {
    screen: SelectCompanyScreen,
  },
  SelectProblem: {
    screen: SelectProblemScreen,
  },
  Review: {
    screen: ReviewScreen
  },
  Done: {
    screen: DoneScreen,
  }
},{

});

const homeTab = createBottomTabNavigator({
  Queue: {
    screen: queueStack
  },
  History: {
    screen: HistoryScreen,
  },
  User: {
    screen: UserScreen,
  },
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      
      let IconComponent = FontAwesome;
      let iconName;
      if (routeName === 'Queue') {
        iconName = 'home';
      } else if (routeName === 'History') {
        iconName = 'history';
      } else if (routeName === 'User') {
        iconName = 'user';
      }

      return <IconComponent name={iconName} size={25} color={ tintColor } />
    }
  }),
  tabBarOptions: {
    activeTintColor: '#0095FE',
    inactiveTintColor: 'gray',
    showLabel: false,
    style: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingVertical: 30,
      elevation: 50,
      borderTopColor: '#dedede',
      borderColor: '#dedede',
      borderWidth: 1,
    }
  },
});

const rootSwitch = createSwitchNavigator({
  Landing: {
    screen: LandingScreen
  },
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
  },
  Home: {
    screen: homeTab,
  }
  
},{
  initialRouteName: 'Home'
})

const Navigation = createAppContainer(rootSwitch)

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  resolvers: {}
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navigation/>
    </ApolloProvider>
  )
}

export default App;