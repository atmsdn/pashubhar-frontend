import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { modelCommonStyle } from '../Styles/modelCommonStyle';

const AlertModal = (props: any) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.onCancel();
            }}
            statusBarTranslucent
        >
            <View style={modelCommonStyle.centeredView}>
                <View style={modelCommonStyle.modalView}>
                    <View>
                        <Text style={modelCommonStyle.modalText}>{props.header}</Text>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={modelCommonStyle.modalTextView}>{props.firstLineContent}</Text>
                        </View>
                    </View>
                    {
                        props.header === "Confirmation" ?
                            <View style={modelCommonStyle.parentBtnView}>
                                <View style={modelCommonStyle.buttonView}>
                                    <TouchableOpacity
                                        style={[modelCommonStyle.button, modelCommonStyle.buttonYesNo]}
                                        onPress={() => { props.setModalVisible(false); props.onCancel() }}
                                    >
                                        <Text style={modelCommonStyle.textStyle}>{props.no}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={modelCommonStyle.buttonView}>
                                    <TouchableOpacity
                                        style={[modelCommonStyle.button, modelCommonStyle.buttonYesNo]}
                                        onPress={() => { props.setModalVisible(false), props.onProceed() }}
                                    >
                                        <Text style={modelCommonStyle.textStyle}>{props.yes}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> :
                            <View style={modelCommonStyle.formbutton}>
                                <TouchableOpacity
                                    style={modelCommonStyle.buttonYesStyle}
                                    onPress={() => { props.setModalVisible(false), props.onProceed() }}
                                >
                                    <Text style={modelCommonStyle.formYesTxt}>{props.btn}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={modelCommonStyle.buttonNoStyle}
                                    onPress={() => props.onCancel()}>
                                    <Text style={modelCommonStyle.formNoTxt}>{props.no}</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </View>
        </Modal >
    )

}
export default AlertModal;