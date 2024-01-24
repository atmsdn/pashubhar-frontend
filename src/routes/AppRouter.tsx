import React from "react";
import { StyleSheet, TouchableOpacity } from 'react-native'
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalculateWeight from "../screens/CalculateWeight";
import { BLACK, CYAN_BLUE, WHITE } from "../shared/constant/color";
import { useTranslation } from "react-i18next";
import SettingIcon from "../shared/svg/SettingIcon";
import BackButtonIcon from "../shared/svg/BackButtonIcon";
import SettingScreen from "../screens/SettingScreen";

export type RootStackParamList = {
  HomeScreen: any;
  CalculateWeight: any;
  ProfileScreen: any;
  SettingScreen: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRouter = ({ navigation }: any) => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: t('Pashubhar'),
          headerTitleStyle: { fontWeight: 'bold', color: CYAN_BLUE, fontSize: 18 },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
              <SettingIcon height={20} width={20} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='CalculateWeight'
        component={CalculateWeight}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: t('Calculate Weight'),
          headerTitleStyle: { fontWeight: 'bold', color: CYAN_BLUE, fontSize: 18 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconStyle}>
              <BackButtonIcon width={25} height={33} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: t('Profile'),
          headerTitleStyle: { fontWeight: 'bold', color: CYAN_BLUE, fontSize: 18 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconStyle}>
              <BackButtonIcon width={25} height={33} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='SettingScreen'
        component={SettingScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: t('Settings'),
          headerTitleStyle: { fontWeight: 'bold', color: CYAN_BLUE, fontSize: 18 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconStyle}>
              <BackButtonIcon width={25} height={33} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
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
  backIconStyle: {
    alignItems: 'center',
    marginRight: 10
  }
})