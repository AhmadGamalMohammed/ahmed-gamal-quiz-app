import React from 'react';
import {  Platform, View, StyleSheet , Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
const ProductsOverviewScreen = props => {
  return (
<View style={styles.center}>
  <Text>
    Our home page
  </Text>
</View>
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'HOME',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  center: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default ProductsOverviewScreen;
