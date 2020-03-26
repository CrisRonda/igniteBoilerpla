import React, {useState, useRef} from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingViewBase,
} from 'react-native';
import SearchMap from './SearchMap';
const Container = styled.KeyboardAvoidingView`
  flex-grow: 1;
`;

const Header = styled.View`
  position: absolute;
  padding: 10px 15px;
  top: 32px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const SearchField = styled.TextInput`
  height: 45px;
  flex-grow: 1;
  padding: 0 5px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-right: 10px;
`;

const App = () => {
  const searchField = useRef();
  const [query, setQuery] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const showSearchOverlay = () => {
    setIsOverlayVisible(true);
  };
  const hideSearchOverlay = () => {
    setIsOverlayVisible(false);
    searchField.current.blur();
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container behavior="height" keyboardVerticalOffset={0}>
        <Header>
          <SearchField
            ref={searchField}
            value={query}
            placeholder={'Search for a place'}
            onChange={setQuery}
            onFocus={showSearchOverlay}
          />
          <TouchableOpacity onPress={hideSearchOverlay}>
            <Text>Done</Text>
          </TouchableOpacity>
        </Header>
        <SearchMap isVisible={isOverlayVisible} />
        <MapView
          style={{flex: 1}}
          region={{
            latitude: -0.2316246,
            longitude: -78.5020347,
            latitudeDelta: 0.1,
            longitudeDelta: 0.2,
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

export default App;
