import React from 'react';
import styled from 'styled-components';
function Home(props) {
  return (
    <Container>
      <Title>Hola mundo</Title>
      <ButtonContainer>
        <ButtonText>Click me</ButtonText>
      </ButtonContainer>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: palevioletred;
`;
const ButtonContainer = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
  background-color: #a23e21;
  margin: 16px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
  text-align: center;
`;

export default Home;
