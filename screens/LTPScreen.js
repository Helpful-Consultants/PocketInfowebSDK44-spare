import React, { Component } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { getLtpRequest } from '../actions/ltp';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';

import headerWithHomeAndMenu from '../components/headerWithHomeAndMenu';

// import { LTPLinksView } from '@expo/samples';
import LtpList from './LtpList';

import ltpDummyData from '../dummyData/ltpDummyData.js';

class LtpScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('in LtpScreen constructor', this.props);
    // this.props.getLtpRequest();

    // console.log(props);
  }
  render() {
    // const { ltp } = this.props;
    // console.log('in LtpScreen, ltp ', this.props.ltpItems);
    // const items = this.props.ltpItems || [];
    const items = ltpDummyData;

    // console.log('in LtpScreen, ltp ', ltp && ltp.items);
    // console.log('in LtpScreen, ltp ', ltp && ltp);
    // console.log('in LtpScreen,ltp', ltp && ltp);
    return (
      <View>
        <ScrollView>
          {/* <Text>LTP, count is {ltpItems && ltpItems.length}</Text> */}
          <LtpList items={items} />
        </ScrollView>
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <Text>LTP Screen...</Text>
    //   </View>
    // );
  }
}

// LtpScreen.navigationOptions = {
//   headerTitle: <TitleWithAppLogo title='Loan Tool Programme' />,
//   headerStyle: {
//     backgroundColor: '#efefef'
//   },
//   headerTintColor: '#333',
//   headerTitleStyle: {
//     // fontWeight: 'bold'
//   }
// };
// console.log(this.props);

// LtpScreen.navigationOptions = ({ navigation }) => ({
//   headerWithHomeAndMenu(navigation )
// });

LtpScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='LTP' />,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          console.log('pressed homescreen icon');
          navigation.navigate('Home');
        }}
      />
    </HeaderButtons>
  ),
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='menu'
        iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        onPress={() => {
          console.log('pressed menu icon');
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = state => {
  //   const { friends } = state;
  //   console.log('in mapStateToProps');
  console.log(state.ltp);
  //   console.log('end mapStateToProps');
  return state.ltp;
};

const mapDispatchToProps = dispatch => {
  return {
    getLtpRequest: () => dispatch(getLtpRequest())
  };
};

// export default connect(mapStateToProps)(LtpScreen);
export default connect(
  mapStateToProps,
  mapDispatchToProps
  //   ({ ltp }) => ({ ltp }),
  //   {
  //     getLTPRequest,
  //     createUserRequest,
  //     deleteUserRequest,
  //     ltpError
  //   }
)(LtpScreen);