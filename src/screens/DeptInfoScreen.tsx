import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import { BLACK, DARKGRAY, DARKGREY, GRAY_BORDER, GREEN, WHITE } from "../shared/constant/color";

const DeptInfoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/universityLogo.png')} style={styles.logo} />
        <View style={styles.logoSpace} />
        <Image source={require('../assets/collageLogo.png')} style={styles.logo1} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Maharashtra Animal and Fishery sciences University Nagpur</Text>
        <Text style={styles.subtitle}>Krantisinh Nana Patil College of Veterinary Science Shirwal Tal- Khandala District- Satara 412801</Text>
        <Text style={styles.department}>Department of Animal Genetics and Breeding</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  logo: {
    width: 98,
    height: 150,
    resizeMode: 'contain',
  },
  logo1: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  logoSpace: {
    width: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: DARKGREY,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: DARKGREY,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  department: {
    color: DARKGREY,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DeptInfoScreen;
