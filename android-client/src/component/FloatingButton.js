import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button } from 'react-native-elements';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const MainButton = ({ title, onPress }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  if(data && data.fontLoaded){
    return (
      <Button title={ title } raised={ true } onPress={onPress}
          containerStyle={{ borderRadius: 24, position: 'absolute', bottom: 20, left: 240, right: 20, zIndex: 3 }}
          titleStyle={{ fontSize: 24, fontFamily: 'nunito' }}
          buttonStyle={{ backgroundColor: '#0095FE', borderRadius: 24 }}
      />
    )
  } else {
    return null
  }
}

export default MainButton;