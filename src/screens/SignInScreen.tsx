import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Api from '../api/Api';
import { ASYNC_STORAGE, LANGUAGES, MOBILE_NUMBER_REGX } from '../shared/constant/infoMsgStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLACK, BORDER_COLOR, CYANBLUE, CYAN_BLUE, WHITE } from '../shared/constant/color';
import DropDownPickerSearchable from '../component/DropDownPickerSearchable';
import { useAuthContext } from '../authContext/AuthContext';
import { useTranslation } from 'react-i18next';

function SignInScreen({ navigation }: any) {
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
      <View showsVerticalScrollIndicator={false}>
        <Text style={styles.projectName}>{t('Pashubhar')}</Text>
        <Text style={styles.subtitle}>{t('An accurate estimation of animal weight using selected body measurements can be done using the Pashubhar application in your mobile.')}</Text>
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
        <View >
          <TouchableOpacity style={styles.signIn} onPress={() => sendOTP()}>
            <Text style={[styles.textSign, { color: '#fff' }]}> {t('Request OTP')} </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.horizontalLine, { width: '47%' }]}></View>
          <Text style={{ marginHorizontal: 5 }}>or</Text>
          <View style={[styles.horizontalLine, { width: '47%' }]}></View>
        </View>
        <View style={{ marginBottom: 10 }}>
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
    paddingVertical: 20,
  },
  projectName: {
    fontSize: 32,
    marginBottom: 20,
    color: CYAN_BLUE,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  subtitle: {
    color: CYAN_BLUE,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subView: {
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  textInputContainer: {
    marginTop: 20,
    marginBottom: 5,
    height: 45,
    color: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: CYAN_BLUE,
    borderRadius: 10,
  },
  textInput: {
    color: CYAN_BLUE,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
    alignSelf: 'center'
  },
  signIn: {
    backgroundColor: CYAN_BLUE,
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
    height: 45,
    justifyContent: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: BORDER_COLOR,
    marginVertical: 10
  },
  label: {
    color: CYAN_BLUE,
    fontWeight: '600',
    fontSize: 12,
    position: 'absolute',
    top: -10,
    backgroundColor: WHITE,
    paddingHorizontal: 5,
    left: 15
  },
});