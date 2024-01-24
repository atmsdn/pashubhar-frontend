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
        {t('In commercial animal husbandry, the weight of not only dairy cows but also all other meat producing animals, for balanced diet management of animals, conversion of feed intake into weight, to determine the price of animals to be removed from the herd and to be sold, to determine the productivity of the calves as well as their physical and reproductive maturity etc.Livestock management is essential. Cattle weight has a great influence on their early milk production, gestation period, first calving in life and age at conception. The body weight of animals also indicates their agricultural capacity. Weight is also the primary factor in giving the right amount of medicine while treating various diseases of animals Aadhaar is considered. Knowing the regular weight of animals makes it easier to manage them according to their physical condition. The use of forks for regular weighing is not economically viable because the scales are cumbersome and expensive, the weighing process is time-consuming, stress is placed on the animals during weighing, transportation of the scales is challenging and periodic technical maintenance of the scales is not cost-effective for livestock owners. Keeping in mind the above aspects, accurate estimation of animal weight using selected body measurements can be done using Pushabhar application in your mobile.')}
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
