import React, { useState } from 'react'

import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CYAN_BLUE, WHITE } from '../shared/constant/color'
import { t } from 'i18next';
import Collapsible from 'react-native-collapsible';
import RightIcon from '../shared/svg/RightIcon';
import DownIcon from '../shared/svg/DownIcon';

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
                        <View style={{ backgroundColor: WHITE, elevation: 8, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={styles.name}>{t('University')}</Text>
                            <Text style={styles.title}>{t('Maharashtra Animal and Fishery sciences University Nagpur')}</Text>
                        </View>
                        <View style={{ backgroundColor: WHITE, elevation: 8, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={styles.name}>{t('Department')}</Text>
                            <Text style={styles.title}>{t('Department of Animal Genetics and Breeding')}</Text>
                        </View>
                        <View style={{ backgroundColor: WHITE, elevation: 8, borderRadius: 10 }}>
                            <Text style={styles.name}>{t('Collage')}</Text>
                            <Text style={styles.title}>{t('Krantisinh Nana Patil College of Veterinary Science Shirwal Tal- Khandala District- Satara 412801')}</Text>
                        </View>
                    </View>
                    <View style={styles.aboutUsView}>
                        <TouchableOpacity onPress={toggleCollapsible} >
                            <View style={styles.aboutIcons}>
                                {!isCollapsed ? <DownIcon width={15} height={15} /> : <RightIcon width={15} height={15} />}
                                <Text style={styles.aboutUsText}>{t('animals weight / pashubhar app importance')}</Text>
                            </View>
                        </TouchableOpacity>
                        <Collapsible collapsed={isCollapsed}>
                            <View>
                                <Text style={styles.aboutUsSubText}>{t('In commercial animal husbandry, the weight of not only dairy cows but also all other meat producing animals, for balanced diet management of animals, conversion of feed intake into weight, to determine the price of animals to be removed from the herd and to be sold, to determine the productivity of the calves as well as their physical and reproductive maturity etc.Livestock management is essential. Cattle weight has a great influence on their early milk production, gestation period, first calving in life and age at conception. The body weight of animals also indicates their agricultural capacity. Weight is also the primary factor in giving the right amount of medicine while treating various diseases of animals Aadhaar is considered. Knowing the regular weight of animals makes it easier to manage them according to their physical condition. The use of forks for regular weighing is not economically viable because the scales are cumbersome and expensive, the weighing process is time-consuming, stress is placed on the animals during weighing, transportation of the scales is challenging and periodic technical maintenance of the scales is not cost-effective for livestock owners. Keeping in mind the above aspects, accurate estimation of animal weight using selected body measurements can be done using Pushabhar application in your mobile.')}</Text>
                            </View>
                        </Collapsible>
                    </View>
                    <Text style={styles.title}>{t('Calculate Weight')}</Text>
                    <View style={styles.imagesView}>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Cow', image: require('../assets/Cow.jpg') })}>
                                <Image source={require('../assets/Cow.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{t('Cow')}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Buffalo', image: require('../assets/Buffalo.jpg') })}>
                                <Image source={require('../assets/Buffalo.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{t('Buffalo')}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Goat', image: require('../assets/Goat.jpg') })}>
                                <Image source={require('../assets/Goat.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{t('Goat')}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Sheep', image: require('../assets/Sheep.jpg') })}>
                                <Image source={require('../assets/Sheep.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{t('Sheep')}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight', { name: 'Dog', image: require('../assets/Dog.jpg') })}>
                                <Image source={require('../assets/Dog.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{t('Dog')}</Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <View style={styles.emptyImgaeStyle} />
                            </TouchableOpacity>
                            <Text style={styles.name}></Text>
                        </View>
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
        paddingTop: 5,
        paddingHorizontal: 3,
    },
    imgaeStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: CYAN_BLUE,
        borderWidth: 1
    },
    emptyImgaeStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,

    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        paddingVertical: 10,
        // backgroundColor: WHITE,
        // elevation: 8,
        // borderRadius: 10,
        // marginBottom: 10
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
        // alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10
    },
    projectName: {
        fontSize: 32,
        color: CYAN_BLUE,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    title: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: CYAN_BLUE,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    name: {
        fontSize: 14,
        color: CYAN_BLUE,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    subtitle: {
        color: CYAN_BLUE,
        paddingHorizontal: 10,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
    },
    department: {
        textAlign: 'center',
        paddingHorizontal: 10,
        color: CYAN_BLUE,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    aboutUsView: {
        marginHorizontal: 10,
        borderColor: CYAN_BLUE,
        borderWidth: 0.5,
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    aboutUsText: {
        color: CYAN_BLUE,
        fontSize: 16,
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
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 10
    },
})