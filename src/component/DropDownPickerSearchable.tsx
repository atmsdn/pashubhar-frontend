import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BGRED, BLACK, CYAN_BLUE, GRAY_SHADE, LIGHTGREY, WHITE, WHITE_BACKGROUND } from '../shared/constant/color';
import BelowIcon from "../shared/svg/BelowIcon";

const DropDownPickerSearchable = ({ onChangeTextDropdown, onEndReached, title, errorMsg, labelField, isRemove, valueField, itemStyle, name, data, isDisable, setValue, value, isSearchable, style, iconDisplay, placeholderStyle, selectedText, iconColor }: any) => {
    return (
        <View style={errorMsg && styles.errorViewStyle}>
            <View style={style}>
                <Dropdown
                    style={{ ...styles.inputText, ...itemStyle }}
                    placeholderStyle={{ ...styles.placeholderStyle, ...placeholderStyle }}
                    selectedTextStyle={{ ...styles.selectedTextStyle, ...selectedText }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={styles.itemStyle}
                    data={data}
                    search={isSearchable}
                    disable={isDisable}
                    labelField={"label"}
                    valueField={"value"}
                    placeholder={`${name}`}
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={(item: any) => {
                        setValue(item?.value)
                    }}
                    renderItem={(item: any) => {
                        return (
                            <>
                                <View style={{ marginVertical: 15, marginRight: 10 }}>
                                    <Text style={{ color: BLACK, textAlign: 'center', paddingLeft: 10, fontWeight: 'bold', fontSize: 14 }}>
                                        {item?.label}
                                    </Text>
                                </View>
                            </>
                        )
                    }}
                    onChangeText={(text: any) => onChangeTextDropdown ? onChangeTextDropdown(text) : ''}
                    renderRightIcon={() => (<View style={{ paddingRight: 20 }}>
                        {
                            !iconDisplay && (value || value == undefined ? <Pressable onPress={() => { !isDisable && isRemove && setValue('') }}>
                                <BelowIcon width={15} height={15} />
                            </Pressable> :
                                <BelowIcon width={15} height={15} />)
                        }
                    </View>)}
                />
                {errorMsg && (
                    <Text style={styles.erroFormTxt}>{errorMsg}</Text>
                )}
            </View>
            {title && <Text style={styles.titleStyle}>{title}</Text>}
        </View>
    )
}

export default DropDownPickerSearchable
const styles = StyleSheet.create({
    errorViewStyle: {
        paddingBottom: 10,
    },
    titleStyle: {
        color: CYAN_BLUE,
        marginHorizontal: 15,
        paddingHorizontal: 5,
        position: 'absolute',
        backgroundColor: WHITE,
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2
    },
    formTxt: {
        marginBottom: 7
    },
    erroFormTxt: {
        color: BGRED,
        fontSize: 8,
        lineHeight: 13
    },
    icon: {
        marginHorizontal: 15,
    },
    placeholderStyle: {
        fontSize: 14,
        color: LIGHTGREY,
        lineHeight: 20,
        marginLeft: 30,
        textAlign: 'center',
        fontWeight: '700'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: CYAN_BLUE,
        lineHeight: 20,
        marginLeft: 30,
        fontSize: 14,
        textAlign: 'center'
    },
    iconStyle: {
        width: 25,
        height: 25,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
        color: GRAY_SHADE,
        lineHeight: 20,
    },
    inputText: {
        height: 50,
        fontWeight: 'bold',
        lineHeight: 20,
        color: BLACK
    },
    itemStyle: {
        fontWeight: 'bold',
        color: BLACK
    },
});