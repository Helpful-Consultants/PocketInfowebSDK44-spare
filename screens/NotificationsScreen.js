import React, { useCallback, useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import ErrorDetails from '../components/ErrorDetails';
import { getCalibrationExpiryRequest } from '../actions/calibrationExpiry';
import { getServiceMeasuresRequest } from '../actions/serviceMeasures';
import { getLtpLoansRequest } from '../actions/ltpLoans';
import InlineIcon from '../components/InlineIcon';

// const backgroundImage = { uri: 'https://reactjs.org/logo-og.png' };

export default NotificationsScreen = (props) => {
  //   console.log('NotificationsScreen props', props);
  const { navigation } = props;
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const showingDemoApp = useSelector((state) => state.user.showingDemoApp);
  const odisViewCount = useSelector((state) => state.odis.viewCount);

  const storedCalibrationExpiryOverdueCount = useSelector(
    (state) => state.calibrationExpiry.overdueCount
  );
  const storedCalibrationExpiryRedCount = useSelector(
    (state) => state.calibrationExpiry.redCount
  );
  const storedCalibrationExpiryAmberCount = useSelector(
    (state) => state.calibrationExpiry.amberCount
  );

  const storedCalibrationExpiryTotalCount = useSelector(
    (state) => state.calibrationExpiry.totalCount
  );
  const storedLtpLoansTotalCount = useSelector(
    (state) => state.ltpLoans.totalCount
  );
  const storedLtpLoansRedCount = useSelector(
    (state) => state.ltpLoans.redCount
  );
  const storedLtpLoansAmberCount = useSelector(
    (state) => state.ltpLoans.amberCount
  );
  const storedServiceMeasuresRedCount = useSelector(
    (state) => state.serviceMeasures.redCount
  );
  const storedServiceMeasuresAmberCount = useSelector(
    (state) => state.serviceMeasures.amberCount
  );
  const storedServiceMeasuresTotalCount = useSelector(
    (state) => state.serviceMeasures.totalCount
  );

  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const userRequestedDemoData = useSelector(
    (state) => state.user.requestedDemoData
  );
  const dealerId = userDataObj && userDataObj.dealerId;
  const userIntId = userDataObj && userDataObj.intId.toString();
  const [isLoadingAny, setIsLoadingAny] = useState(false);
  const [isOpenCalibrationExpiry, setIsOpenCalibrationExpiry] = useState(false);
  const [dataNameInPlay, setDataNameInPlay] = useState('');
  const [dataErrorAny, setDataErrorAny] = useState('');
  const [dataStatusCodeAny, setDataStatusCodeAny] = useState('');
  const [dataErrorUrlAny, setDataErrorUrlAny] = useState('');
  const [dataErrorSummary, setDataErrorSummary] = useState('');
  const [calibrationExpiryRedCount, setCalibrationExpiryRedCount] = useState(0);
  const [calibrationExpiryAmberCount, setCalibrationExpiryAmberCount] =
    useState(0);
  const [calibrationExpiryOverdueCount, setCalibrationExpiryOverdueCount] =
    useState(0);
  const [calibrationExpiryTotalCount, setCalibrationExpiryTotalCount] =
    useState(0);
  const [ltpLoansRedCount, setLtpLoansRedCount] = useState(0);
  const [ltpLoansAmberCount, setLtpLoansAmberCount] = useState(0);
  const [ltpLoansTotalCount, setLtpLoansTotalCount] = useState(0);
  const [serviceMeasuresRedCount, setServiceMeasuresRedCount] = useState(0);
  const [serviceMeasuresAmberCount, setServiceMeasuresAmberCount] = useState(0);
  const [serviceMeasuresGreenCount, setServiceMeasuresGreenCount] = useState(0);
  const [serviceMeasuresTotalCount, setServiceMeasuresTotalCount] = useState(0);
  const isLoadingCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.isLoading
  );
  const isLoadingLtpLoans = useSelector((state) => state.ltpLoans.isLoading);
  const dataErrorLtpLoans = useSelector((state) => state.ltpLoans.error);
  const dataStatusCodeLtpLoans = useSelector(
    (state) => state.ltpLoans.statusCode
  );
  const dataErrorUrlLtpLoans = useSelector(
    (state) => state.ltpLoans.dataErrorUrl
  );
  const isLoadingServiceMeasures = useSelector(
    (state) => state.serviceMeasures.isLoading
  );
  const dataErrorServiceMeasures = useSelector(
    (state) => state.serviceMeasures.error
  );
  const dataStatusCodeServiceMeasures = useSelector(
    (state) => state.serviceMeasures.statusCode
  );
  const dataErrorUrlServiceMeasures = useSelector(
    (state) => state.serviceMeasures.dataErrorUrl
  );
  const dataErrorCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.error
  );
  const dataStatusCodeCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.statusCode
  );
  const dataErrorUrlCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.dataErrorUrl
  );
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const userApiFetchParamsObj = {
    dealerId: dealerId,
    intId: userIntId,
  };

  //   const { navigation } = props;
  const getItems = useCallback(async (userApiFetchParamsObj) => {
    // console.log(
    //   'in calibrationExpiry getItems userApiFetchParamsObj',
    //   userApiFetchParamsObj
    // );
    dispatch(getLtpLoansRequest(userApiFetchParamsObj)), [];
    dispatch(getServiceMeasuresRequest(userApiFetchParamsObj)), [];
    dispatch(getCalibrationExpiryRequest(userApiFetchParamsObj)), [];
  });

  const getItemsAsync = async () => {
    // console.log(
    //   'rendering Notifications screen, userApiFetchParamsObj:',
    //   userApiFetchParamsObj
    // );

    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.dealerId
    ) {
      getItems(userApiFetchParamsObj);
    }
  };

  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in notifications use effect');
  //     const getItemsAsync = async () => {
  //       setIsRefreshNeeded(false);
  //       getItems();
  //     };
  //     if (isRefreshNeeded === true) {
  //       getItemsAsync();
  //     }
  //   }, [isRefreshNeeded]);

  //   const didFocusSubscription = navigation.addListener('didFocus', () => {
  //     didFocusSubscription.remove();
  //     setIsRefreshNeeded(true);
  //   });

  useEffect(() => {
    if (
      isLoadingCalibrationExpiry ||
      isLoadingLtpLoans ||
      isLoadingServiceMeasures
    ) {
      setIsLoadingAny(true);
    } else {
      setIsLoadingAny(false);
    }
  }, [isLoadingCalibrationExpiry, isLoadingLtpLoans, isLoadingServiceMeasures]);

  useEffect(() => {
    if (dataErrorLtpLoans) {
      setDataErrorAny(dataErrorLtpLoans);
      setDataStatusCodeAny(dataStatusCodeLtpLoans);
      setDataErrorUrlAny(dataErrorUrlLtpLoans);
      setDataErrorSummary('Error syncing LTP Bookings');
      setDataNameInPlay('LTP loans');
    } else if (dataErrorServiceMeasures) {
      setDataErrorAny(dataErrorServiceMeasures);
      setDataStatusCodeAny(dataStatusCodeServiceMeasures);
      setDataErrorUrlAny(dataErrorUrlServiceMeasures);
      setDataErrorSummary('Error syncing Service Measures');
      setDataNameInPlay('Service Measures');
    } else if (dataErrorCalibrationExpiry) {
      setDataErrorAny(dataErrorCalibrationExpiry);
      setDataStatusCodeAny(dataStatusCodeCalibrationExpiry);
      setDataErrorUrlAny(dataErrorUrlCalibrationExpiry);
      setDataErrorSummary('Error syncing calibration expiry');
      setDataNameInPlay('calibration expiry');
    } else {
      setDataErrorAny('');
      setDataStatusCodeAny('');
      setDataErrorUrlAny('');
      setDataErrorSummary('');
      setDataNameInPlay('');
    }
  }, [
    dataErrorLtpLoans,
    dataErrorServiceMeasures,
    dataErrorCalibrationExpiry,
    isLoadingLtpLoans,
    isLoadingServiceMeasures,
    isLoadingCalibrationExpiry,
  ]);

  useFocusEffect(
    useCallback(() => {
      //   dispatch(revalidateUserCredentials({ calledBy: 'NotificationsScreen' }));
      //   console.log('in Notifications focusEffect ');

      getItemsAsync();

      //   console.log(
      //     'in Notifications focusEffect, calling countCalibrationExpiryItems'
      //   );
    }, [])
  );

  useEffect(() => {
    if (showingDemoApp) {
      //   console.log(
      //     'in reminders nav useEffect LtpLoansCounts',
      //     ltpLoansRedCount,
      //     ltpLoansAmberCount
      //   );

      setLtpLoansRedCount(storedLtpLoansRedCount);
      setLtpLoansAmberCount(storedLtpLoansAmberCount);
      setLtpLoansTotalCount(storedLtpLoansTotalCount);
    }
  }, [
    storedLtpLoansRedCount,
    storedLtpLoansAmberCount,
    storedLtpLoansTotalCount,
  ]);

  useEffect(() => {
    if (showingDemoApp) {
      //   console.log(
      //     'in reminders nav useEffect LtpLoansCounts',
      //     ltpLoansRedCount,
      //     ltpLoansAmberCount
      //   );
      setCalibrationExpiryOverdueCount(storedCalibrationExpiryOverdueCount);
      setCalibrationExpiryRedCount(storedCalibrationExpiryRedCount);
      setCalibrationExpiryAmberCount(storedCalibrationExpiryAmberCount);
      setCalibrationExpiryTotalCount(storedCalibrationExpiryTotalCount);
    }
  }, [
    storedCalibrationExpiryOverdueCount,
    storedCalibrationExpiryRedCount,
    storedCalibrationExpiryAmberCount,
    storedCalibrationExpiryTotalCount,
  ]);

  useEffect(() => {
    if (showingDemoApp) {
      //   console.log(
      //     'in reminders nav useEffect LtpLoansCounts',
      //     ltpLoansRedCount,
      //     ltpLoansAmberCount
      //   );

      setServiceMeasuresRedCount(storedServiceMeasuresRedCount);
      setServiceMeasuresAmberCount(storedServiceMeasuresAmberCount);
      setServiceMeasuresTotalCount(storedServiceMeasuresTotalCount);
    }
  }, [
    storedServiceMeasuresRedCount,
    storedServiceMeasuresAmberCount,
    storedServiceMeasuresTotalCount,
  ]);
  //   console.log('calib exp red count', calibrationExpiryRedCount);

  //   console.log(
  //     'in notifications  calibrationExpiry Counts',
  //     calibrationExpiryOverdueCount,
  //     calibrationExpiryRedCount,
  //     calibrationExpiryAmberCount,
  //     calibrationExpiryTotalCount
  //   );
  //   console.log(
  //     'in notifications  ltpLoans Counts',
  //     ltpLoansRedCount,
  //     ltpLoansAmberCount,
  //     'n/a',
  //     ltpLoansTotalCount
  //   );
  //   console.log(
  //     'in notifications  SM  Counts',
  //     serviceMeasuresRedCount,
  //     serviceMeasuresAmberCount,
  //     serviceMeasuresGreenCount,
  //     serviceMeasuresTotalCount
  //   );

  return (
    <ImageBackground
      source={require('../assets/images/connectivity-smaller.png')}
      style={baseStyles.backgroundImage}
    >
      <ScrollView>
        <View style={baseStyles.viewPromptRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Your Important Notifications
          </Text>
        </View>
        {userRequestedDemoData && userRequestedDemoData === true ? (
          <View style={baseStyles.viewDummyDataRibbon}>
            <Text style={baseStyles.textPromptRibbon}>
              Showing sample data - change in menu.
            </Text>
            <Ionicons name='arrow-up' size={20} color={Colors.vwgWhite} />
          </View>
        ) : null}

        {!odisViewCount ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RemindersTabs', { screen: 'ODIS' })
            }
          >
            <View style={baseStyles.viewSectionRibbon}>
              <Ionicons
                name='tv'
                size={20}
                color={Colors.vwgBadgeSevereAlertColor}
              />
              <Text style={baseStyles.textSectionRibbon}>
                {`  See the `}
                <Text
                  style={{
                    ...baseStyles.textSectionRibbon,

                    fontFamily: 'the-sans-bold',
                  }}
                >
                  {`new ODIS versions  `}
                </Text>
              </Text>
              <Ionicons name='open-outline' size={20} />
            </View>
          </TouchableOpacity>
        ) : null}

        {!isLoadingServiceMeasures ? (
          dataErrorServiceMeasures ? (
            <ErrorDetails
              errorSummary={'Error syncing Service Measures'}
              dataStatusCode={dataStatusCodeServiceMeasures}
              errorHtml={dataErrorServiceMeasures}
              dataErrorUrl={dataErrorUrlServiceMeasures}
            />
          ) : serviceMeasuresTotalCount !== 'undefined' &&
            serviceMeasuresRedCount !== 'undefined' &&
            serviceMeasuresAmberCount !== 'undefined' ? (
            <View>
              {serviceMeasuresTotalCount > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('RemindersTabs', {
                      screen: 'Service Measures',
                    })
                  }
                >
                  {serviceMeasuresRedCount > 0 ? (
                    <View style={baseStyles.viewSectionRibbon}>
                      <Ionicons
                        name='checkbox'
                        size={20}
                        color={Colors.vwgBadgeSevereAlertColor}
                      />

                      <Text style={baseStyles.textSectionRibbon}>
                        {`  See your`}
                        <Text
                          style={{
                            ...baseStyles.textSectionRibbon,
                            fontFamily: 'the-sans-bold',
                          }}
                        >
                          {` urgent `}

                          {serviceMeasuresRedCount > 1
                            ? `Service Measures  `
                            : `Service Measure  `}
                        </Text>
                      </Text>
                      <Ionicons name='open-outline' size={20} />
                    </View>
                  ) : serviceMeasuresAmberCount > 0 ? (
                    <View style={baseStyles.viewSectionRibbon}>
                      <Ionicons
                        name='checkbox'
                        size={20}
                        color={Colors.vwgBadgeAlertColor}
                      />
                      <Text style={baseStyles.textSectionRibbon}>
                        {`  See your`}
                        <Text
                          style={{
                            ...baseStyles.textSectionRibbon,
                            fontFamily: 'the-sans-bold',
                          }}
                        >
                          {` expiring `}

                          {serviceMeasuresAmberCount > 1
                            ? `Service Measures  `
                            : `Service Measure `}
                        </Text>
                      </Text>
                      <Ionicons name='open-outline' size={20} />
                    </View>
                  ) : (
                    <View style={baseStyles.viewSectionRibbon}>
                      <Ionicons
                        name='checkbox'
                        size={20}
                        color={Colors.vwgBadgeOKColor}
                      />
                      <Text style={baseStyles.textSectionRibbon}>
                        {serviceMeasuresTotalCount > 1
                          ? `  See your open Service Measures  `
                          : `  See your open Service Measure `}
                      </Text>
                      <Ionicons name='open-outline' size={20} />
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={baseStyles.viewSectionRibbon}>
                  <Ionicons name='checkbox' size={20} color={Colors.vwgBlack} />
                  <Text style={baseStyles.textSectionRibbon}>
                    {` No expiring Service Measures`}
                  </Text>
                </View>
              )}
            </View>
          ) : null
        ) : null}
        {!isLoadingLtpLoans ? (
          dataErrorLtpLoans ? (
            <ErrorDetails
              errorSummary={'Error syncing LTP Loans'}
              dataStatusCode={dataStatusCodeLtpLoans}
              errorHtml={dataErrorLtpLoans}
              dataErrorUrl={dataErrorUrlLtpLoans}
            />
          ) : ltpLoansTotalCount !== 'undefined' &&
            ltpLoansRedCount !== 'undefined' &&
            ltpLoansAmberCount !== 'undefined' ? (
            <View>
              {ltpLoansTotalCount > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('RemindersTabs', {
                      screen: 'LTP Loans',
                    })
                  }
                >
                  {ltpLoansRedCount > 0 ? (
                    <View style={baseStyles.viewSectionRibbon}>
                      <Ionicons
                        name='calendar'
                        size={20}
                        color={Colors.vwgBadgeSevereAlertColor}
                      />

                      <Text style={baseStyles.textSectionRibbon}>
                        {`  See your`}
                        <Text
                          style={{
                            ...baseStyles.textSectionRibbon,
                            fontFamily: 'the-sans-bold',
                          }}
                        >
                          {` urgent `}

                          {ltpLoansTotalCount > 1
                            ? `LTP Loan returns  `
                            : `LTP Loan return  `}
                        </Text>
                      </Text>
                      <Ionicons name='open-outline' size={20} />
                    </View>
                  ) : ltpLoansAmberCount > 0 ? (
                    <View style={baseStyles.viewSectionRibbon}>
                      <Ionicons
                        name='calendar'
                        size={20}
                        color={Colors.vwgBadgeAlertColor}
                      />
                      <Text style={baseStyles.textSectionRibbon}>
                        {`  See your`}
                        <Text
                          style={{
                            ...baseStyles.textSectionRibbon,
                            fontFamily: 'the-sans-bold',
                          }}
                        >
                          {` expiring `}

                          {ltpLoansAmberCount > 1 ? `LTP Loans  ` : `LTP Loan `}
                        </Text>
                      </Text>
                      <Ionicons name='open-outline' size={20} />
                    </View>
                  ) : (
                    <View style={baseStyles.viewSectionRibbon}>
                      <Ionicons
                        name='checkbox'
                        size={20}
                        color={Colors.vwgBadgeOKColor}
                      />
                      <Text style={baseStyles.textSectionRibbon}>
                        {ltpLoansTotalCount > 1
                          ? `  See your open LTP Loans  `
                          : `  See your open LTP Loan `}
                      </Text>
                      <Ionicons name='open-outline' size={20} />
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={baseStyles.viewSectionRibbon}>
                  <Ionicons name='checkbox' size={20} color={Colors.vwgBlack} />
                  <Text style={baseStyles.textSectionRibbon}>
                    {`   No LTP Loans`}
                  </Text>
                </View>
              )}
            </View>
          ) : null
        ) : null}
        {!isLoadingCalibrationExpiry
          ? ((dataErrorCalibrationExpiry ? (
              <ErrorDetails
                errorSummary={'Error syncing calibration expiry'}
                dataStatusCode={dataStatusCodeCalibrationExpiry}
                errorHtml={dataErrorCalibrationExpiry}
                dataErrorUrl={dataErrorUrlCalibrationExpiry}
              />
            ) : (
              <View>
                {calibrationExpiryTotalCount > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setIsOpenCalibrationExpiry(!isOpenCalibrationExpiry);
                    }}
                  >
                    <View style={baseStyles.viewSectionRibbon}>
                      <Ionicons
                        name='timer'
                        size={20}
                        color={
                          calibrationExpiryOverdueCount > 0 ||
                          calibrationExpiryRedCount > 0
                            ? Colors.vwgBadgeSevereAlertColor
                            : Colors.vwgBadgeAlertColor
                        }
                      />
                      <Text style={baseStyles.textSectionRibbon}>
                        {calibrationExpiryTotalCount > 1
                          ? `  You have ${calibrationExpiryTotalCount} Active Calibration Expiry Actions  `
                          : `  You have ${calibrationExpiryTotalCount} Active Calibration Expiry Action  `}
                      </Text>
                      <Ionicons
                        name={
                          isOpenCalibrationExpiry ? 'caret-up' : 'caret-down'
                        }
                        size={20}
                        color={Colors.vwgVeryDarkGray}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={baseStyles.viewSectionRibbon}>
                    <Ionicons name='timer' size={20} color={Colors.vwgBlack} />
                    <Text style={baseStyles.textSectionRibbon}>
                      {calibrationExpiryTotalCount > 1
                        ? ` ${calibrationExpiryTotalCount} Calibration Expiry Actions `
                        : calibrationExpiryTotalCount > 0
                        ? ` ${calibrationExpiryTotalCount} Calibration Expiry Action  `
                        : '  No pending Calibration Expiry Actions  '}
                    </Text>
                  </View>
                )}
                {isOpenCalibrationExpiry ? (
                  calibrationExpiryTotalCount > 0 ? (
                    <View style={{ backgroundColor: Colors.vwgWhite }}>
                      {calibrationExpiryOverdueCount > 0 ? (
                        <View
                          style={{
                            ...baseStyles.viewRowFlexCentreAligned,
                            marginHorizontal: 8,
                            marginTop: 10,
                          }}
                        >
                          <InlineIcon
                            itemType='font-awesome'
                            iconName={'thumbs-down'}
                            iconSize={RFPercentage(2.4)}
                            iconColor={Colors.vwgBadgeSevereAlertColor}
                          />
                          <Text style={baseStyles.textLeftAligned}>
                            {calibrationExpiryOverdueCount === 1
                              ? `  ${calibrationExpiryOverdueCount} item's calibration has expired.`
                              : `  ${calibrationExpiryOverdueCount} items' calibrations have expired.`}
                          </Text>
                        </View>
                      ) : null}
                      {calibrationExpiryRedCount > 0 ? (
                        <View
                          style={{
                            ...baseStyles.viewRowFlexCentreAligned,
                            marginHorizontal: 8,
                            marginTop: 10,
                          }}
                        >
                          <InlineIcon
                            itemType='font-awesome'
                            iconName={'thumbs-up'}
                            iconSize={RFPercentage(2.4)}
                            iconColor={Colors.vwgBadgeSevereAlertColor}
                          />
                          <Text style={baseStyles.textLeftAligned}>
                            {calibrationExpiryRedCount === 1
                              ? `  ${calibrationExpiryRedCount} item's calibration expires within 30 days.`
                              : `  ${calibrationExpiryRedCount} items' calibrations expire within 30 days.`}
                          </Text>
                        </View>
                      ) : null}
                      {calibrationExpiryAmberCount > 0 ? (
                        <View
                          style={{
                            ...baseStyles.viewRowFlexCentreAligned,
                            marginHorizontal: 8,
                            marginTop: 10,
                          }}
                        >
                          <InlineIcon
                            itemType='font-awesome'
                            iconName={'thumbs-up'}
                            iconSize={RFPercentage(2.4)}
                            iconColor={Colors.vwgBadgeAlertColor}
                          />
                          <Text style={baseStyles.textLeftAligned}>
                            {calibrationExpiryAmberCount === 1
                              ? `  ${calibrationExpiryAmberCount} item's calibration expires within 60 days.`
                              : `  ${calibrationExpiryAmberCount} items' calibrations expire within 60 days.`}
                          </Text>
                        </View>
                      ) : null}
                      <Text
                        style={{
                          ...baseStyles.textLeftAligned,
                          marginHorizontal: 8,
                          marginVertical: 10,
                        }}
                      >
                        See these calibration records at Tools Infoweb.
                      </Text>
                    </View>
                  ) : (
                    <View style={baseStyles.viewDataList}>
                      <View style={baseStyles.textDataListItem}>
                        <Text style={baseStyles.textLeftAligned}>
                          No calibration expirations in the next 60 days.
                        </Text>
                      </View>
                    </View>
                  )
                ) : null}
              </View>
            )): null)
          : null}
      </ScrollView>
    </ImageBackground>
  );
};
