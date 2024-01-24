import React, { useState } from 'react'

import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CYAN_BLUE, WHITE } from '../shared/constant/color'
import { t } from 'i18next';
import Collapsible from 'react-native-collapsible';
import RightIcon from '../shared/svg/RightIcon';
import DownIcon from '../shared/svg/DownIcon';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

function HomeScreen({ navigation }: any) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapsible = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/universityLogo.png')} style={styles.logo} />
                    <Text style={styles.projectName}>{t('Pashubhar')}</Text>
                    <Image source={require('../assets/collageLogo.png')} style={styles.logo1} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Maharashtra Animal and Fishery sciences University Nagpur</Text>
                        <Text style={styles.department}>Department of Animal Genetics and Breeding</Text>
                        <Text style={styles.subtitle}>Krantisinh Nana Patil College of Veterinary Science Shirwal Tal- Khandala District- Satara 412801</Text>
                    </View>
                    <View style={styles.aboutUsView}>
                        <TouchableOpacity onPress={toggleCollapsible} >
                            <View style={styles.aboutIcons}>
                                {!isCollapsed ? <DownIcon width={15} height={15} /> : <RightIcon width={15} height={15} />}
                                <Text style={styles.aboutUsText}>{t('About Us Information')}</Text>
                            </View>
                        </TouchableOpacity>
                        <Collapsible collapsed={isCollapsed}>
                            <View>
                                <Text style={styles.aboutUsSubText}>{t('In commercial animal husbandry, the weight of not only dairy cows but also all other meat producing animals, for balanced diet management of animals, conversion of feed intake into weight, to determine the price of animals to be removed from the herd and to be sold, to determine the productivity of the calves as well as their physical and reproductive maturity etc.Livestock management is essential. Cattle weight has a great influence on their early milk production, gestation period, first calving in life and age at conception. The body weight of animals also indicates their agricultural capacity. Weight is also the primary factor in giving the right amount of medicine while treating various diseases of animals Aadhaar is considered. Knowing the regular weight of animals makes it easier to manage them according to their physical condition. The use of forks for regular weighing is not economically viable because the scales are cumbersome and expensive, the weighing process is time-consuming, stress is placed on the animals during weighing, transportation of the scales is challenging and periodic technical maintenance of the scales is not cost-effective for livestock owners. Keeping in mind the above aspects, accurate estimation of animal weight using selected body measurements can be done using Pushabhar application in your mobile.')}</Text>
                            </View>
                        </Collapsible>
                    </View>
                    <View style={styles.imagesView}>
                        <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Cow' })}>
                            <Image source={require('../assets/Cow.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Buffalo' })}>
                            <Image source={require('../assets/Buffalo.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Goat' })}>
                            <Image source={require('../assets/Goat.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Sheep' })}>
                            <Image source={require('../assets/Sheep.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Dog' })}>
                            <Image source={require('../assets/dog.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingTop: 5
    },
    imgaeStyle: {
        width: widthPercentageToDP(30),
        height: heightPercentageToDP(10),
        borderRadius: 10,
        borderColor: CYAN_BLUE,
        borderWidth: 1
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    logo: {
        width: 102,
        height: 100,
        resizeMode: 'contain',
    },
    logo1: {
        width: 98,
        height: 100,
        resizeMode: 'contain',
    },
    logoSpace: {
        width: 20,
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    projectName: {
        fontSize: 32,
        color: CYAN_BLUE,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    title: {
        fontSize: 22,
        paddingHorizontal: 10,
        color: CYAN_BLUE,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    subtitle: {
        color: CYAN_BLUE,
        paddingHorizontal: 10,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    department: {
        textAlign: 'center',
        paddingHorizontal: 10,
        color: CYAN_BLUE,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    aboutUsView: {
        marginHorizontal: 10,
        borderColor: CYAN_BLUE,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    aboutUsText: {
        color: CYAN_BLUE,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    aboutUsSubText: {
        color: CYAN_BLUE,
        fontSize: 14,
        fontWeight: 'bold',
    },
    aboutIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    imagesView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 10,
        columnGap: 8,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 20
    },
})