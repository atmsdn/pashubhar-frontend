import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DeptInfoScreen from "../screens/DeptInfoScreen";
import AboutUs from "../screens/AboutUs";
import { useAuthContext } from "../authContext/AuthContext";
import AlertModal from "../shared/constant/AlertModal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalculateWeight from "../screens/CalculateWeight";
import { BLACK, DARKGRAY, WHITE } from "../shared/constant/color";
import DropDownPickerSearchable from "../component/DropDownPickerSearchable";
import { ASYNC_STORAGE, LANGUAGES } from "../shared/constant/infoMsgStrings";
import { useTranslation } from "react-i18next";

export type RootStackParamList = {
  HomeScreen: any;
  CalculateWeight: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='CalculateWeight' component={CalculateWeight} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};


export type drawertype = {
  HomeStack: any,
  ProfileScreen: any,
  DeptInfoScreen: any,
  AboutUs: any,
}
const Drawer = createDrawerNavigator<drawertype>();

const AppRouter = () => {
  const { t } = useTranslation();
  const { logout, updateState, state }: any = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);

  const onProceed = () => {
    setModalVisible(false);
    logout()
  };
  const onCancel = () => {
    setModalVisible(false);
  };
  const handleLanguageChange = async (language: any) => {
    try {
      updateState(ASYNC_STORAGE.SELECTEDLANGUAGE, language);
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  };
  const CustomDrawerContent = (props: any) => {
    const { t } = useTranslation();

    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <View>
          <DrawerItemList {...props} />
        </View>
        <View style={{ paddingBottom: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleLogout}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{t('Logout')}</Text>
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 12, fontWeight: 'bold' }}>App Version 0.0.1</Text>
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
        <AlertModal modalVisible={modalVisible} setModalVisible={setModalVisible}
          firstLineContent={t('Are you sure you want to logout?')}
          btn={t("Logout")}
          no={t("Cancel")}
          btnCancel="Cancel"
          onProceed={() => onProceed()}
          onCancel={() => onCancel()}
          closeIcon={true}
        >
        </AlertModal>
      </DrawerContentScrollView>
    );
  };

  const handleLogout = () => {
    setModalVisible(true)
  };

  return (
    <>
      <StatusBar backgroundColor='white' barStyle="dark-content" />
      <Drawer.Navigator
        initialRouteName="HomeStack"
        screenOptions={{ drawerActiveTintColor: DARKGRAY, drawerLabelStyle: { fontSize: 14, fontWeight: '600', lineHeight: 20 } }}
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{ drawerLabel: t('Animal Species'), headerShown: true, headerTitle: t('Animal Species') }} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ drawerLabel: t('Profile'), headerShown: true, headerTitle: t('Profile') }} />
        <Drawer.Screen name="DeptInfoScreen" component={DeptInfoScreen} options={{ drawerLabel: t('Dept. Info.'), headerShown: true, headerTitle: t('Dept. Info.') }} />
        <Drawer.Screen name="AboutUs" component={AboutUs} options={{ drawerLabel: t('About Us'), headerShown: true, headerTitle: t('About Us') }} />
      </Drawer.Navigator>
    </>
  )
}

export default AppRouter
const styles = StyleSheet.create({
  inputElement: {
    borderColor: BLACK,
    color: WHITE,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    height: 40,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
})