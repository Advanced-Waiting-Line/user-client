import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Button from '../../component/FloatingButton';
import Card from './components/card';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
    selectedCompany @client
  }
`;

const GET_COMPANY_PROBLEM = gql`
  query getCompanyProblem($companyId: String){
    getCompanyProblem(
      companyId: $companyId
    ){
      _id
      name
      description
      duration
    }
  }
`;

const SelectProblem = ({ navigation }) => {
  const state = useApolloClient()
  const { data } = useQuery(GET_LOCAL_STATE);
  const { data: dataProblem } = useQuery(GET_COMPANY_PROBLEM, { variables: {companyId: data.selectedCompany} })
  
  const [active, setActive] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState('');
  const [detailedProblem, setDetailedProblem] = useState('');

  let problems = []
  if(dataProblem){
    problems = dataProblem.getCompanyProblem
  }

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 180, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 24, color: '#0095FE' }}>Pilih Layanan</Text>
          {
            problems.map((problem, uniqueKey) => {
              return <Card onPress={() => {
                setActive(uniqueKey)
                setSelectedProblem(problem._id)
                setDetailedProblem({
                  name: problem.name,
                  duration: problem.duration
                })
              }
            }
            problem={problem}
            active={active}
            uniqueKey={uniqueKey}
            key={uniqueKey}/>
            })
          }
          <Button title='Lanjut' onPress={() => {
            state.writeData({ data: { selectedProblem: selectedProblem, detailedProblem: {...detailedProblem, "__typename": "ProblemDetail" }}})
            navigation.navigate('Review')
          }}
          />
        </View>
      </ImageBackground>
    )
  }
}

export default SelectProblem;