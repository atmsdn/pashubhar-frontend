import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BLACK, DARKGRAY, WHITE } from '../shared/constant/color';
import { drawertype } from '../routes/AppRouter';
import Api from '../api/Api';
import { useTranslation } from 'react-i18next';

function CalculateWeight() {
  const navigation = useNavigation<NativeStackNavigationProp<drawertype>>();
  const { t } = useTranslation();
  const [result, setResult] = useState('')
  const [formValue, setFormValue] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  })

  useEffect(() => {
    handleGetConstant();
  }, [])

  const handleGetConstant = async () => {
    try {
      const response = await Api.getConstantValue();
      console.log(response?.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCalculate = async () => {
    const payload = {
      field1: formValue?.field1,
      field2: formValue?.field2,
      field3: formValue?.field3,
      field4: formValue?.field4,
      field5: formValue?.field5,
    }
    try {
      if (formValue?.field1 && formValue?.field2 && formValue?.field3 && formValue?.field4 && formValue?.field5) {
        const response = await Api.calculateWeight(payload);
        console.log(response?.data?.data)
        setResult(response?.data?.data)
      } else {
        setResult('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const textInputChange = (name: any, val: any) => {
    setFormValue({ ...formValue, [name]: val })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Enter')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('field1', val)}
            maxLength={50}
            keyboardType="numeric"
            placeholder={t("Enter")}
            textAlign={'center'}
            value={formValue.field1}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Enter')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('field2', val)}
            maxLength={100}
            keyboardType="numeric"
            placeholder={t("Enter")}
            textAlign={'center'}
            value={formValue.field2}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Enter')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('field3', val)}
            maxLength={10}
            keyboardType="numeric"
            placeholder={t("Enter")}
            textAlign={'center'}
            value={formValue.field3}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Enter')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('field4', val)}
            maxLength={10}
            keyboardType="numeric"
            placeholder={t("Enter")}
            textAlign={'center'}
            value={formValue.field4}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{t('Enter')}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => textInputChange('field5', val)}
            maxLength={10}
            keyboardType="numeric"
            placeholder={t("Enter")}
            textAlign={'center'}
            value={formValue.field5}
          />
        </View>
        <View style={{ flexDirection: 'column', borderColor: DARKGRAY, borderWidth: 1, borderRadius: 10, marginTop: 10 }}>
          <Text style={styles.resultText}>{t('Total weight in KG')}</Text>
          <Text style={styles.resultText}>{Number(result)?.toFixed(2)}</Text>
        </View>
      </ScrollView>

      <View>
        <TouchableOpacity style={styles.signIn} onPress={handleCalculate} >
          <Text style={[styles.textSign, { color: '#fff' }]}> {t('Calculate')} </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.signIn} onPress={() => navigation.goBack()}>
          <Text style={[styles.textSign, { color: '#fff' }]}> {t('Go Back')} </Text>
        </TouchableOpacity>
      </View>
    </ SafeAreaView>
  );
}

export default CalculateWeight

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
    borderColor: BLACK,
    color: WHITE,
    borderWidth: 0.5,
    borderRadius: 25,
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
    marginTop: 10
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
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
  resultText: {
    color: BLACK,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 10,
  },
});