import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../guards/AuthNavigator';
import Api from '../api/Api';
import { ASYNC_STORAGE, LANGUAGES, MOBILE_NUMBER_REGX } from '../shared/constant/infoMsgStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLACK, BORDER_COLOR, WHITE } from '../shared/constant/color';
import DropDownPickerSearchable from '../component/DropDownPickerSearchable';
import { useAuthContext } from '../authContext/AuthContext';
import { useTranslation } from 'react-i18next';

function SignInScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { updateState, state }: any = useAuthContext();
  const [formValue, setFormValue] = useState({
    mobileNo: ''
  })

  const textInputChange = (val: any) => {
    setFormValue({ ...formValue, mobileNo: val })
  }

  const handleLanguageChange = async (language: any) => {
    try {
      updateState(ASYNC_STORAGE.SELECTEDLANGUAGE, language);
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  };

  const sendOTP = async () => {
    if (formValue?.mobileNo?.length === 0) {
      ToastAndroid.show(t('Mobile No field cannot be empty'), ToastAndroid.SHORT);
      return;
    }
    if (formValue?.mobileNo?.length <= 9) {
      ToastAndroid.show(t('Please enter a valid number'), ToastAndroid.SHORT);
      return;
    }
    if (!MOBILE_NUMBER_REGX.test(formValue?.mobileNo)) {
      ToastAndroid.show(t('Please enter a valid number'), ToastAndroid.SHORT);
      return;
    }
    if (formValue?.mobileNo) {
      const token: any = await AsyncStorage.getItem('token')
      const requestBody = {
        phoneNumber: formValue?.mobileNo,
        token: token
      };
      try {
        const response = await Api.SignIn(requestBody)
        if (response?.data?.data) {
          navigation.navigate('OtpScreen', {
            ...response.data, mobileNumber: formValue.mobileNo, token: token
          });
          ToastAndroid.show(t('Otp sent sucsessfully'), ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(t('Incorrect Input'), ToastAndroid.SHORT);
        }
      } catch (e) {
        ToastAndroid.show(t('User does not exist'), ToastAndroid.SHORT);
        return false;
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Mobile Number')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange(val)}
            maxLength={10}
            keyboardType="numeric"
            placeholder={t("Enter Your Number")}
            textAlign={'center'}
            value={formValue.mobileNo}
          />
        </View>
      </View>
      <View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.signIn} onPress={() => sendOTP()}>
            <Text style={[styles.textSign, { color: '#fff' }]}> {t('Request OTP')} </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.horizontalLine, { width: '47%' }]}></View>
          <Text style={{ marginHorizontal: 5 }}>or</Text>
          <View style={[styles.horizontalLine, { width: '47%' }]}></View>
        </View>
        <View>
          <TouchableOpacity style={styles.signIn} onPress={() => { navigation.navigate('SignUpScreen'), setFormValue({ ...formValue, mobileNo: '' }) }}>
            <Text style={[styles.textSign, { color: '#fff' }]}> {t('Sign Up')} </Text>
          </TouchableOpacity>
        </View>
        <View>
          <DropDownPickerSearchable
            name={t('Select Language')}
            title={t('Select Language')}
            data={LANGUAGES}
            isDisable={false}
            isRemove={false}
            setValue={(value: any) => handleLanguageChange(value)}
            value={state?.selectedLanguage}
            isSearchable={false}
            style={styles.inputElement}
          />
        </View>
      </View>
    </ SafeAreaView>
  );
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 40
  },
  subView: {
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  textInputContainer: {
    marginTop: 10,
    marginBottom: 5,
    height: 50,
    color: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  textInput: {
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
    alignSelf: 'center'
  },
  signIn: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 50,
    marginBottom: 2
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputElement: {
    marginTop: 10,
    borderColor: BLACK,
    color: WHITE,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: BORDER_COLOR,
    marginVertical: 10
  },
  label: {
    color: BLACK,
    // textAlign:'center',
    fontWeight: '600',
    fontSize: 14,
    // marginTop: 5,
    position: 'absolute',
    top: -11,
    backgroundColor: WHITE,
    paddingHorizontal: 5,
    left: 20
  },
});