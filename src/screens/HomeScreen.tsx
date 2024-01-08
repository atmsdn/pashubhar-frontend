import React from 'react'

import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { DARKGRAY, WHITE } from '../shared/constant/color'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/AppRouter';

function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight')}>
                    <Image source={require('../assets/Cow.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight')}>
                    <Image source={require('../assets/Buffalo.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight')}>
                    <Image source={require('../assets/Goat.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CalculateWeight')}>
                    <Image source={require('../assets/Sheep.jpg')} resizeMode='contain' style={styles.imgaeStyle} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    imgaeStyle: {
        width: '95%',
        height: 300,
        margin: 10,
        borderRadius: 10,
        borderColor: DARKGRAY,
        borderWidth: 2
    }
})