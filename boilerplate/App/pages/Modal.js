import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View, Alert} from 'react-native';
import styled from 'styled-components';
const Container = styled.View`
  flex: 1;
  background-color: blueviolet;
  justify-content: center;
  align-items: center;
`;
const ContainerModal = styled.View`
  position: absolute;
  bottom: 0;
  height: 40%;
  width: 100%;
  background-color: teal;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #fff;
`;
const BtnText = styled.Text`
  font-size: 36px;
  font-weight: 900;
  color: crimson;
`;
const ModalExample = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <ContainerModal>
          <View>
            <Title>Este es el modal</Title>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}>
              <BtnText>Hide Modal</BtnText>
            </TouchableOpacity>
          </View>
        </ContainerModal>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <Title>Show Modal</Title>
      </TouchableOpacity>
    </Container>
  );
};
export default ModalExample;
