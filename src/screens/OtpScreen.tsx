
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../authContext/AuthContext";
import CountDown from "../auth/CountDown";
import { BGRED, BLACK, BORDER_COLOR, CYAN_BLUE, DARK_GREEN, GREEN, GREY_SHADE, JPURPLE, LIGHTGREY, LIGHT_BLUE, MDBLUE, NAVYBULE, SPANISH_GRAY, WHITE } from "../shared/constant/color";
import { ASYNC_STORAGE } from "../shared/constant/infoMsgStrings";
import Api from "../api/Api";
import { useTranslation } from "react-i18next";

const OtpScreen = ({ route: { params }, route }: any) => {
  const [errorMsg, setErrorMsg] = useState("");
  const { updateState }: any = useAuthContext();
  const { t } = useTranslation();
  const [mobileNumber, setMobileNumber] = useState(route.params?.mobileNumber);
  const [key, setKey] = useState(route?.params?.data);
  const [token, setToken] = useState(route?.params?.token);
  const [otpId, setOtpId]: any = useState(1)
  const [running, setRunning] = useState(true);
  const [sessionTimeOut, setSessionTimeOut]: any = useState(false);
  const [value, setValue] = useState('');
  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const onCountFinish = () => {
    setSessionTimeOut(true);
    setRunning(false);
  }

  const onVerifyOTP = async () => {
    setErrorMsg("");
    try {
      if (!value) {
        ToastAndroid.show(t('Please enter valid otp'), ToastAndroid.SHORT);
        return;
      }
      if (value.length <= 5) {
        ToastAndroid.show(t('Please enter 6 digit otp'), ToastAndroid.SHORT);
        return;
      }
      const requestBody = {
        phoneNumber: mobileNumber,
        verificationKey: key,
        otp: value
      };
      const response = await Api.verifyOTP(requestBody)
      await AsyncStorage.setItem(ASYNC_STORAGE.ACCESSTOKEN, response?.data?.data?.accessToken);
      if (response?.data?.data) {
        const currentUserResponse = await Api.getCurrentUser()
        updateState(ASYNC_STORAGE.USERINFO, JSON.stringify(currentUserResponse?.data?.data));
      }
    } catch (error) {
      ToastAndroid.show(t('Please enter valid otp'), ToastAndroid.SHORT);
      console.log(error)
    }
  }
  const onResendOTP = async () => {
    const requestBody = {
      phoneNumber: mobileNumber,
      token: token
    };
    try {
      const response = await Api.SignIn(requestBody);
      if (response && response.data) {
        ToastAndroid.show(t('Otp sent sucsessfully'), ToastAndroid.SHORT);
        setKey(response?.data?.data)
        setSessionTimeOut(false);
        setRunning(true);
        setOtpId(parseInt(otpId) + 1)
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={otpstyles.dashboardContainer}>
      <View style={otpstyles.contentHeaderWrapper}>
        <Text style={otpstyles.textHeader}>{t('Enter the OTP sent to your mobile number')}</Text>
        <View style={otpstyles.verifyInput}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }: any) => (
              <View style={otpstyles.otpBox} key={index}>
                <Text
                  style={otpstyles.inputStyle}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <View style={otpstyles.otpFormTxt}>
            <Text style={otpstyles.otpErroFormTxt}>{errorMsg}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <CountDown
            sessionTimeOut={sessionTimeOut}
            labelText={t("Resend code in")}
            until={59}
            onFinish={onCountFinish}
            key={otpId}
            size={15}
            timeToShow={['S']}
            showSeparator={true}
            running={running}
          />
          {!sessionTimeOut && <Text style={otpstyles.secondsText}> {t('Seconds again')} </Text>}
        </View>

        {sessionTimeOut && <View style={otpstyles.resOtp}>
          <Text style={otpstyles.resendOTPTxt}>{t('Didnt receive OTP?')}</Text>
          <Pressable onPress={() => onResendOTP()}>
            <Text style={otpstyles.resendOTP}>{t('Resend')}</Text>
          </Pressable>
        </View>
        }
      </View>
      <TouchableOpacity style={otpstyles.signIn} onPress={() => onVerifyOTP()} >
        <Text style={[otpstyles.textSign, { color: '#fff' }]}> {t('Continue')} </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default OtpScreen

export const otpstyles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between'
  },
  signIn: {
    backgroundColor: CYAN_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 50
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentHeaderWrapper: {
    marginVertical: 25,
    backgroundColor: WHITE,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 20,
    color: NAVYBULE,
  },
  textHeader: {
    fontSize: 14,
    color: CYAN_BLUE,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold'
  },
  textHeaderSelect: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: DARK_GREEN,
  },
  loginInformation: {
    marginTop: 5,
  },
  otpInformation: {
    fontSize: 11,
    lineHeight: 17,
    color: LIGHTGREY,
    marginHorizontal: 30,
    fontWeight: 600
  },
  phoneNumber: {
    fontSize: 13,
    lineHeight: 20,
    color: CYAN_BLUE,
    fontWeight: "bold",
    marginTop: 5,
    marginHorizontal: 20
  },
  textInformation: {
    fontSize: 14,
    marginHorizontal: 2,
    lineHeight: 20,
    color: BLACK,
  },
  mobileText: {
    fontSize: 14,
    fontWeight: "bold",
    color: WHITE,
    paddingLeft: 10,
    height: 38
  },
  profileContent: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 10,
    borderColor: GREEN,
    backgroundColor: GREEN
  },
  resOtp: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  resendOTPTxt: {
    color: CYAN_BLUE,
    marginRight: 10
  },
  resendOTP: {
    color: CYAN_BLUE,
    fontWeight: 'bold',
    paddingLeft: 0
  },
  otpFormTxt: {
    textAlign: "center",
    marginTop: 5,
    marginHorizontal: 10
  },
  otpErroFormTxt: {
    fontFamily: "bold",
    color: BGRED
  },
  inputStyle: {
    color: CYAN_BLUE,
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'bold',
  },
  verifyInput: {
    marginTop: 20,
    marginHorizontal: 10
  },
  otpBox: {
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: CYAN_BLUE,
    color: WHITE,
    width: 43,
    height: 45,
    padding: 7
  },

  txtCurrentRide: {
    fontSize: 20,
    lineHeight: 50,
    color: JPURPLE,
    marginHorizontal: 15
  },
  resendOtp: {
    marginHorizontal: 15
  },
  btnOr: {
    alignSelf: 'center',
    width: 60,
    height: 30,
    marginBottom: 25
  },
  txtDistributorView: {
    borderColor: DARK_GREEN,
    borderWidth: 1,
    marginVertical: 10,
    width: '87%',
    alignSelf: 'center',
    padding: 15,
    backgroundColor: WHITE,
    borderRadius: 8,
  },
  txtFarmerView: {
    borderColor: MDBLUE,
    borderWidth: 1, width: 230,
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: MDBLUE,
    borderRadius: 8
  },
  farmerView: {
    borderColor: SPANISH_GRAY,
    borderWidth: 1,
    width: 200,
    alignSelf: 'center',
    padding: 7,
    marginBottom: 10
  },
  contentHeader: {
    marginHorizontal: 5,
    backgroundColor: WHITE,
    borderRadius: 5
  },
  txtOr: {
    fontSize: 17,
    lineHeight: 25,
    marginTop: 10,
    color: BLACK,
    textAlign: 'center'
  },
  imageContainer: {
    borderWidth: 0.2,
    flex: 1.5,
    alignSelf: 'flex-end',
    borderRadius: 4,
    paddingVertical: 10,
    width: 100,
  },
  mainContainerView: {
    flex: 1, justifyContent: 'center'
  },
  topHeaderText: {
    fontSize: 25,
    lineHeight: 32,
    color: DARK_GREEN,
    textAlign: "center",
    marginHorizontal: 50,
    paddingVertical: 20
  },
  distributorIcon: {
    alignSelf: "center",
    marginTop: 40
  },
  cropIcon: {
    alignSelf: "center",
    marginTop: 50
  },
  secondsText: {
    marginRight: 5,
    color: CYAN_BLUE,
    fontSize: 14,
    lineHeight: 20,
  },
}
);