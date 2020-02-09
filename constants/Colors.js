import { Platform } from 'react-native';

const tintColor = '#2f95dc';
const errorText = '#a9043f';
const vwgLink = Platform.OS === 'ios' ? '#00A1D0' : '#0288D1';

export default {
  tintColor,
  errorText,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  transparentBackground: 'rgba(0, 0, 0, 0)',
  iosBlue: 'rgba(0, 122, 125, 1)',
  //   vwgLinkColor: '#00A1D0',
  vwgLinkColor: vwgLink,

  vwgWarmOrange: '#e2a933',
  vwgCoolOrange: '#eaad00',
  vwgWarmRed: '#a9043f',
  vwgWarmPink: '#a21e4d',
  vwgDeepPurple: '#601939',
  vwgLightMintGreen: '#c2cca6',
  vwgMintGreen: '#95a844',
  vwgKhaki: '#848b00',
  vwgMidBlue: '#006384',
  vwgLightSkyBlue: '#c6dfe7',
  vwgSkyBlue: '#80b0c8',
  vwgDarkSkyBlue: '#4777a3',
  vwgDeepBlue: '#004466',
  vwgWarmLightBlue: '#3689b1',
  vwgWarmMidBlue: '#0b4a76',
  vwgCoolLightIosBlue: '#4a9ced',
  vwgNiceBlue: '#0096da',
  vwgVeryVeryLightGray: '#f6f6f6',
  vwgVeryLightGray: '#f0f0f0',
  vwgLightGray: '#ccc',
  vwgMidGray: '#999',
  vwgDarkGray: '#666',
  vwgVeryDarkGray: '#333',
  vwgBlack: '#000',
  vwgWhite: '#fff',
  //   vwgSearchBarContainer: '#80b0c8',
  vwgSearchBarContainer: '#fff',
  vwgSearchBarInputContainer: '#c6dfe7'
};
