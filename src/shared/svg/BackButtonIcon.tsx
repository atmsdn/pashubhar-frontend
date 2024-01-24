import React from 'react';
import { SvgXml } from 'react-native-svg';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


const BackButtonIcon = ({ width = widthPercentageToDP(60), height = heightPercentageToDP(60)}) => {
    const svg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.08345 14.0667L0.466781 8.46665C0.400114 8.39999 0.353003 8.32776 0.325447 8.24999C0.297447 8.17221 0.283447 8.08888 0.283447 7.99999C0.283447 7.9111 0.297447 7.82776 0.325447 7.74999C0.353003 7.67221 0.400114 7.59999 0.466781 7.53332L6.08345 1.91665C6.239 1.7611 6.43345 1.68332 6.66678 1.68332C6.90011 1.68332 7.10011 1.76665 7.26678 1.93332C7.43345 2.09999 7.51678 2.29443 7.51678 2.51665C7.51678 2.73887 7.43345 2.93332 7.26678 3.09999L2.36678 7.99999L7.26678 12.9C7.42234 13.0555 7.50011 13.2471 7.50011 13.4747C7.50011 13.7027 7.41678 13.9 7.25011 14.0667C7.08345 14.2333 6.889 14.3167 6.66678 14.3167C6.44456 14.3167 6.25011 14.2333 6.08345 14.0667Z" fill="#153158"/>
    </svg>
    `;
    return <SvgXml width={width} height={height} xml={svg} />;
};

export default BackButtonIcon;