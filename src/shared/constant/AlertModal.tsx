import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { modelCommonStyle } from '../Styles/modelCommonStyle';
import CrossIcon from '../svg/CrossIcon';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

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
                {props?.image ?
                    <View>
                        <Image source={props?.image} resizeMode='contain' style={{ width: widthPercentageToDP(90), height: heightPercentageToDP(50) }} />
                        <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0 }} onPress={() => props.onCancel()}>
                            <CrossIcon width={30} height={30} />
                        </TouchableOpacity>
                    </View> :
                    <View style={modelCommonStyle.modalView}>
                        <View>
                            <Text style={modelCommonStyle.modalText}>{props.header}</Text>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={modelCommonStyle.modalTextView}>{props.firstLineContent}</Text>
                            </View>
                        </View>
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
                    </View>
                }
            </View >
        </Modal >
    )

}
export default AlertModal;