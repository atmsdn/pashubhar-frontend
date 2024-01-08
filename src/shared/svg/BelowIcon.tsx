import React from 'react';
import { SvgXml } from 'react-native-svg';

const BelowIcon = ({ width = 100, height = 100 }) => {
    const svg = `<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.6836 1L5.99966 6L0.999664 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
    return <SvgXml width={width} height={height} xml={svg} />;
};

export default BelowIcon;