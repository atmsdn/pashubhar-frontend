import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DARKGREY } from '../shared/constant/color';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('About Pashubhar')}</Text>
      <Text style={styles.description}>
        {t('Pashubhar is a project aimed at assisting in animal weight estimation based on their height and weight. The app provides information about various animal species and helps calculate their approximate weight. This information can be valuable for farmers, veterinarians, and animal enthusiasts.')}
      </Text>
      <Text style={styles.info}>
        {t('For any inquiries or more information, please contact us at:')}
      </Text>
      <Text style={styles.contact}>
        {t('Email')}: pashubhar@gmail.com{'\n'}
        {t('Phone')}: +1234567890
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    color: DARKGREY,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: DARKGREY,
    marginBottom: 20,
    lineHeight: 22,
  },
  info: {
    fontSize: 18,
    color: DARKGREY,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contact: {
    color: DARKGREY,
    fontSize: 16,
    lineHeight: 22,
  },
});

export default AboutUs;
