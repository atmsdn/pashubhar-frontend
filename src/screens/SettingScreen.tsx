import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CYAN_BLUE, WHITE } from '../shared/constant/color'
import DropDownPickerSearchable from '../component/DropDownPickerSearchable'
import { ASYNC_STORAGE, LANGUAGES } from '../shared/constant/infoMsgStrings'
import { t } from 'i18next'
import AlertModal from '../shared/constant/AlertModal'
import { useAuthContext } from '../authContext/AuthContext'

function SettingScreen({ navigation }: any) {
    const { logout, updateState, state }: any = useAuthContext();
    const [modalVisible, setModalVisible] = useState(false);

    const onProceed = () => {
        setModalVisible(false);
        logout()
    };

    const onCancel = () => {
        setModalVisible(false);
    };

    const handleLogout = () => {
        setModalVisible(true)
    };

    const handleLanguageChange = async (language: any) => {
        try {
            updateState(ASYNC_STORAGE.SELECTEDLANGUAGE, language);
        } catch (error) {
            console.error('Error saving language to AsyncStorage:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Text style={styles.txtName}>{t('Profile')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileContainer} onPress={() => handleLogout()}>
                    <Text style={styles.txtName}>{t('Logout')}</Text>
                </TouchableOpacity>
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
            <View style={{ paddingBottom: 10 }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 12, fontWeight: 'bold' }}>App Version 0.0.1</Text>
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
            />
        </SafeAreaView>
    )
}

export default SettingScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    profileContainer: {
        backgroundColor: WHITE,
        borderColor: CYAN_BLUE,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 12,
        marginVertical: 10,
        zIndex: 1
    },
    txtName: {
        fontSize: 14,
        color: CYAN_BLUE,
        lineHeight: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    inputElement: {
        borderColor: CYAN_BLUE,
        color: WHITE,
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: 11,
        height: 45,
        justifyContent: 'center',
    },
})