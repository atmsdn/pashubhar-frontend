import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import DropDownPickerSearchable from '../component/DropDownPickerSearchable';
import { MOBILE_NUMBER_REGX, SPECIES_TYPE, SPECIES_TYPE1, SPECIES_TYPE2 } from '../shared/constant/infoMsgStrings';
import { BLACK, BORDER_COLOR, CYAN_BLUE, WHITE } from '../shared/constant/color';
import Api from '../api/Api';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../authContext/AuthContext';

function SignUpScreen({ navigation }: any) {
  const { state }: any = useAuthContext();
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState({
    mobileNo: '',
    name: '',
    species: '',
    address1: '',
    address2: ''
  })

  const textInputChange = (name: any, val: any) => {
    setFormValue({ ...formValue, [name]: val })
  }

  const sendOTP = async () => {
    if (formValue?.name?.length === 0) {
      ToastAndroid.show(t('Enter valid name'), ToastAndroid.SHORT);
      return;
    }
    if (formValue?.address1?.length === 0) {
      ToastAndroid.show(t('Enter valid address line 1'), ToastAndroid.SHORT);
      return;
    }
    if (formValue?.address2?.length === 0) {
      ToastAndroid.show(t('Enter valid address line 2'), ToastAndroid.SHORT);
      return;
    }
    if (formValue?.species?.length === 0) {
      ToastAndroid.show(t('Enter valid species'), ToastAndroid.SHORT);
      return;
    }
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
      const requestBody = {
        name: formValue.name,
        species: formValue.species,
        address1: formValue.address1,
        address2: formValue.address2,
        phoneNumber: formValue.mobileNo
      }
      try {
        await Api.createUser(requestBody)
        navigation.navigate('SignInScreen')
        ToastAndroid.show(t('Registered sucsessfully'), ToastAndroid.SHORT);
      } catch (e: any) {
        console.log(e?.response?.data)
        const Error = e?.response?.data?.error?.message || t('Invalid Input')
        ToastAndroid.show(Error, ToastAndroid.SHORT);
        return false;
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* <Text style={styles.projectName}>{t('Registration')}</Text> */}
        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Your Name')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('name', val)}
            maxLength={50}
            placeholder={t("Enter Your Name")}
            textAlign={'center'}
            value={formValue.name}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Address Line 1')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('address1', val)}
            maxLength={100}
            placeholder={t("Enter Your Address Line 1")}
            textAlign={'center'}
            value={formValue.address1}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Address Line 2')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('address2', val)}
            maxLength={100}
            placeholder={t("Enter Your Address Line 2")}
            textAlign={'center'}
            value={formValue.address2}
          />
        </View>

        <View>
          <DropDownPickerSearchable
            name={t('Select Species')}
            title={t('Select Species')}
            data={state?.selectedLanguage == 'en' ? SPECIES_TYPE : state?.selectedLanguage == 'mr' ? SPECIES_TYPE1 : SPECIES_TYPE2}
            isDisable={false}
            isRemove={false}
            setValue={(value: any) => textInputChange('species', value)}
            value={formValue.species}
            isSearchable={false}
            style={styles.inputElement}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Mobile Number')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('mobileNo', val)}
            maxLength={10}
            keyboardType="numeric"
            placeholder={t("Enter Your Number")}
            textAlign={'center'}
            value={formValue.mobileNo}
          />
        </View>
      </ScrollView>
      <View>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity style={styles.signIn} onPress={() => sendOTP()}>
            <Text style={[styles.textSign, { color: '#fff' }]}> {t('Register')} </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.horizontalLine, { width: '47%' }]}></View>
          <Text style={{ marginHorizontal: 5 }}>or</Text>
          <View style={[styles.horizontalLine, { width: '47%' }]}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={[styles.textSign, { color: '#fff' }]}> {t('Sign In')} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ SafeAreaView>
  );
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  subView: {
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  inputElement: {
    marginTop: 10,
    marginBottom: 5,
    borderColor: BLACK,
    color: WHITE,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
  },
  textInputContainer: {
    marginTop: 20,
    marginBottom: 5,
    height: 45,
    color: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: CYAN_BLUE
  },
  projectName: {
    fontSize: 32,
    marginBottom: 20,
    color: CYAN_BLUE,
    fontWeight: 'bold',
    alignSelf: 'center'
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
    height: 50
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
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