import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Animated, StyleSheet, FlatList, Text} from 'react-native';

const SearchItem = styled.TouchableOpacity`
  border-bottom-color: rgba(0, 0, 0, 0.05);
  border-bottom-width: 1px;
  padding: 20px 15px;
`;

function SearchOverlay(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity] = useState(new Animated.Value(0));
  const animateIn = () => {
    setIsVisible(true); // <= render the content before animation
    Animated.timing(opacity, {
      duration: 1000,
      useNativeDriver: true, // <=
      toValue: 1,
    }).start();
  };
  const animateOut = () => {
    Animated.timing(opacity, {
      duration: 1000,
      useNativeDriver: true, // <=
      toValue: 0,
    }).start(() => {
      setIsVisible(false); // <= hide the content after animation
    });
  };
  useEffect(() => {
    if (props.isVisible) {
      animateIn();
    } else {
      animateOut();
    }
  }, [props.isVisible]);

  const renderItem = ({item}) => {
    return (
      <SearchItem>
        <Text>{item.label}</Text>
      </SearchItem>
    );
  };

  return isVisible ? (
    <Animated.View style={[{opacity}, styles.container]}>
      <FlatList
        keyExtractor={item => item.value}
        renderItem={renderItem}
        data={[{label: 'New York', value: 1}]}
      />
    </Animated.View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    height: 200,
    zIndex: 1000000,
  },
});

export default SearchOverlay;
