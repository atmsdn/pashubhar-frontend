import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DropDownPickerSearchable from '../component/DropDownPickerSearchable';
import { SPECIES_TYPE, SPECIES_TYPE1, SPECIES_TYPE2 } from '../shared/constant/infoMsgStrings';
import { BLACK, CYANBLUE, CYAN_BLUE, WHITE } from '../shared/constant/color';
import { useAuthContext } from '../authContext/AuthContext';
import { useTranslation } from 'react-i18next';

function ProfileScreen() {
  const { t } = useTranslation();
  const { state }: any = useAuthContext();
  const userInfo = JSON.parse(state?.userInfo)
  const [formValue, setFormValue] = useState(userInfo)

  const textInputChange = (name: any, val: any) => {
    setFormValue({ ...formValue, [name]: val })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Your Name')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('name', val)}
            maxLength={50}
            placeholder={t("Enter Your Name")}
            textAlign={'center'}
            editable={false}
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
            editable={false}
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
            editable={false}
            value={formValue.address2}
          />
        </View>

        <View>
          <DropDownPickerSearchable
            name={t('Select Species')}
            title={t('Select Species')}
            data={state?.selectedLanguage == 'en' ? SPECIES_TYPE : state?.selectedLanguage == 'mr' ? SPECIES_TYPE1 : SPECIES_TYPE2}
            isDisable={true}
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
            editable={false}
            value={formValue.phoneNumber}
          />
        </View>
      </ScrollView>
    </ SafeAreaView>
  );
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20
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
    marginTop: 10,
    marginBottom: 5,
    height: 50,
    color: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
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
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 25,
    height: 50,
    marginTop: 40
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
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