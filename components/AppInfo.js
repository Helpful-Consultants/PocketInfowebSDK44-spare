import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';

export default AppInfo = props => {
  const userDataObj = useSelector(state => state.user.userData[0]);
  const brandText =
    (userDataObj && userDataObj.brand) || (userDataObj && 'All brands') || '';
  //   console.log(props);
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>{Constants.manifest.name}</Text>
      {userDataObj && userDataObj.userName ? (
        <Text style={styles.brand}>{userDataObj.userName}</Text>
      ) : null}
      <Text style={styles.brand}>{brandText}</Text>
      {Constants && Constants.deviceName ? (
        <Text style={styles.deviceVersion}>
          {Platform && Platform.OS && Platform.Version ? (
            <Text>
              {`${Platform.constants.systemName} v${Platform.Version}`}
              {Constants.nativeBuildVersion
                ? ` ${Constants.nativeBuildVersion} (Store)`
                : null}
            </Text>
          ) : null}
        </Text>
      ) : null}

      <Text style={styles.appVersion}>
        Build
        {Constants.manifest.nativeAppVersion
          ? ` ${Constants.manifest.nativeAppVersion} (Native) `
          : null}
        {Constants.manifest.version
          ? ` ${Constants.manifest.version} (OTA)`
          : null}
        {Constants.manifest.releaseChannel
          ? Constants.manifest.releaseChannel
            ? Constants.manifest.releaseChannel === 'default'
              ? ' (Prod)'
              : ' (Staging)'
            : null
          : null}
      </Text>
      <Text style={styles.appVersion}>Test A.23</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-end',
    // backgroundColor: 'red'
  },
  appName: {
    paddingTop: 100,
    paddingLeft: 18,
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(2.2)
    // fontStyle: 'italic'
  },
  brand: {
    paddingTop: 5,
    paddingLeft: 18,
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(1.9)
    // fontStyle: 'italic'
  },
  appVersion: {
    paddingTop: 5,
    paddingLeft: 18,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8)
    // fontStyle: 'italic'
  },
  deviceVersion: {
    paddingTop: 15,
    paddingLeft: 18,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8)
    // fontStyle: 'italic'
  }
});