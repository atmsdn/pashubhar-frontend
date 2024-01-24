import React from 'react';
import { SvgXml } from 'react-native-svg';

const DownIcon = ({ width = 100, height = 100 }) => {
    const svg = `<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.342 1.3418L6.65811 6.3418L1.65811 1.3418" stroke="#153158" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
    return <SvgXml width={width} height={height} xml={svg} />;
};

export default DownIcon;