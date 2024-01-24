import React, { useRef, useState } from 'react'
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { BLACK, CYAN_BLUE, DARKGRAY, WHITE } from '../shared/constant/color';
import Api from '../api/Api';
import { useTranslation } from 'react-i18next';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { requestExternalStoragePermission } from '../component/Permission';
import AlertModal from '../shared/constant/AlertModal';

function CalculateWeight(props: any) {
  const name = props?.route?.params?.name;
  const image = props?.route?.params?.image;
  const { t } = useTranslation();
  const viewShotRef: any = useRef();
  const [result, setResult] = useState('')
  const [loader, setLoader] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [formValue, setFormValue] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
  })

  const onProceedViewImage = (image: any) => {
    setSelectedImage(image)
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const handleCalculate = async () => {
    const payload = {
      type: name || "",
      field1: formValue?.field2 || "0",
      field2: formValue?.field3 || "0",
      field3: formValue?.field4 || "0",
      field4: formValue?.field5 || "0",
      field5: formValue?.field6 || "0",
    }
    try {
      if (formValue?.field2 || formValue?.field3 || formValue?.field4 || formValue?.field5 || formValue?.field6) {
        setLoader(true)
        const response = await Api.calculateWeight(payload);
        setResult(response?.data?.data)
        setLoader(false)
      } else {
        ToastAndroid.show(t('Enter at least one value'), ToastAndroid.SHORT);
        setResult('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const textInputChange = (name: any, val: any) => {
    setFormValue({ ...formValue, [name]: val })
    setResult('')
  }

  const captureScreenshot = async () => {
    try {
      await requestExternalStoragePermission()
      const result = await viewShotRef.current.capture();
      const data = await RNFS.readFile(result, 'base64')
      const filePath = `${RNFS.DownloadDirectoryPath}/${new Date()?.getTime()}Screenshot.jpg`;
      await RNFS.writeFile(filePath, data, 'base64');
      ToastAndroid.show(t('Screenshot saved'), ToastAndroid.SHORT);
      props.navigation.goBack()
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
          <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Text style={styles.title}>{t(name)}</Text>
            <Text style={styles.date}>{`${new Date()?.getDate()}/${new Date()?.getMonth() + 1}/${new Date()?.getFullYear()}`}</Text>

            <View>
              <Text style={styles.label}>{t('Name/Identity')}</Text>
              <View style={styles.nameTextInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(val) => textInputChange('field1', val)}
                  maxLength={20}
                  placeholder={t('Name/Identity')}
                  textAlign={'center'}
                  value={formValue.field1}
                />
              </View>
            </View>
            <View style={styles.mainInputContainer}>
              <Text style={styles.label}>{t('Height')}</Text>
              <View style={styles.textInputContainer}>
                <Text style={styles.label1}>{t('Cm')}</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(val) => textInputChange('field2', val)}
                  maxLength={3}
                  keyboardType="numeric"
                  placeholder={t("Height")}
                  textAlign={'center'}
                  value={formValue.field2}
                />
              </View>
              <TouchableOpacity onPress={() => onProceedViewImage(image)}>
                <Image source={image} resizeMode='contain' style={styles.imgaeStyle} />
              </TouchableOpacity>
            </View>

            <View style={styles.mainInputContainer}>
              <Text style={styles.label}>{t('Height')}</Text>
              <View style={styles.textInputContainer}>
                <Text style={styles.label1}>{t('Cm')}</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(val) => textInputChange('field3', val)}
                  maxLength={3}
                  keyboardType="numeric"
                  placeholder={t("Height")}
                  textAlign={'center'}
                  value={formValue.field3}
                />
              </View>
              <TouchableOpacity onPress={() => onProceedViewImage(image)}>
                <Image source={image} resizeMode='contain' style={styles.imgaeStyle} />
              </TouchableOpacity>
            </View>

            <View style={styles.mainInputContainer}>
              <Text style={styles.label}>{t('Height')}</Text>
              <View style={styles.textInputContainer}>
                <Text style={styles.label1}>{t('Cm')}</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(val) => textInputChange('field4', val)}
                  maxLength={3}
                  keyboardType="numeric"
                  placeholder={t("Height")}
                  textAlign={'center'}
                  value={formValue.field4}
                />
              </View>
              <TouchableOpacity onPress={() => onProceedViewImage(image)}>
                <Image source={image} resizeMode='contain' style={styles.imgaeStyle} />
              </TouchableOpacity>
            </View>

            <View style={styles.mainInputContainer}>
              <Text style={styles.label}>{t('Height')}</Text>
              <View style={styles.textInputContainer}>
                <Text style={styles.label1}>{t('Cm')}</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(val) => textInputChange('field5', val)}
                  maxLength={3}
                  keyboardType="numeric"
                  placeholder={t("Height")}
                  textAlign={'center'}
                  value={formValue.field5}
                />
              </View>
              <TouchableOpacity onPress={() => onProceedViewImage(image)}>
                <Image source={image} resizeMode='contain' style={styles.imgaeStyle} />
              </TouchableOpacity>
            </View>
            <View style={styles.mainInputContainer}>
              <Text style={styles.label}>{t('Height')}</Text>
              <View style={styles.textInputContainer}>
                <Text style={styles.label1}>{t('Cm')}</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(val) => textInputChange('field6', val)}
                  maxLength={3}
                  keyboardType="numeric"
                  placeholder={t("Height")}
                  textAlign={'center'}
                  value={formValue.field6}
                />
              </View>
              <TouchableOpacity onPress={() => onProceedViewImage(image)}>
                <Image source={image} resizeMode='contain' style={styles.imgaeStyle} />
              </TouchableOpacity>
            </View>

            {result && <View style={{ flexDirection: 'column', borderColor: DARKGRAY, borderWidth: 1, borderRadius: 10, marginTop: 20 }}>
              <Text style={styles.resultText}>{t('Total weight in KG')}</Text>
              <Text style={styles.resultText}>{Number(result)?.toFixed(2)}</Text>
            </View>}
          </View>
        </ViewShot>
      </ScrollView>

      <View>
        <TouchableOpacity style={styles.signIn} onPress={handleCalculate} >
          {loader ? <ActivityIndicator /> :
            <Text style={[styles.textSign, { color: '#fff' }]}> {t('Calculate')} </Text>}
        </TouchableOpacity>
      </View>

      {result && <View>
        <TouchableOpacity style={styles.signIn} onPress={() => captureScreenshot()}>
          <Text style={[styles.textSign, { color: '#fff' }]}> {t('Take Screenshot and Save')} </Text>
        </TouchableOpacity>
      </View>}

      <AlertModal modalVisible={modalVisible} setModalVisible={setModalVisible}
        onCancel={() => onCancel()}
        image={selectedImage}
      />
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
  title: {
    fontSize: 22,
    marginTop: 10,
    paddingHorizontal: 10,
    color: CYAN_BLUE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 18,
    color: CYAN_BLUE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imgaeStyle: {
    width: 80,
    height: 45,
    borderRadius: 10,
    borderColor: CYAN_BLUE,
    borderWidth: 1
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
    height: 45,
    justifyContent: 'center',
  },
  mainInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  textInputContainer: {
    marginTop: 20,
    marginBottom: 5,
    height: 45,
    color: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    width: '70%'
  },
  nameTextInputContainer: {
    marginTop: 20,
    marginBottom: 5,
    height: 45,
    color: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    // width: '70%'
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
    marginTop: 10
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
    backgroundColor: WHITE,
    paddingHorizontal: 5,
  },
  label1: {
    color: CYAN_BLUE,
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    bottom: 15,
    backgroundColor: WHITE,
    paddingHorizontal: 5,
    right: 10
  },
  resultText: {
    color: CYAN_BLUE,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 10,
  },
});