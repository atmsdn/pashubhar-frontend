
import React from 'react';
import { SvgXml } from 'react-native-svg';

const RightIcon = ({ width = 100, height = 100 }) => {
    const svg = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.3418 1L6.3418 5.68393L1.3418 10.6839" stroke="#153158" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
    return <SvgXml width={width} height={height} xml={svg} />;
};

export default RightIcon;