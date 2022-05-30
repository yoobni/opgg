import TOP from '../assets/icons/top-position-icon.svg';
import JNG from '../assets/icons/jng-position-icon.svg';
import MID from '../assets/icons/mid-position-icon.svg';
import ADC from '../assets/icons/adc-position-icon.svg';
import SUP from '../assets/icons/sup-position-icon.svg';

export const SIDE_CONTENT_WIDTH = 300;
export const MAIN_CONTENT_WIDTH = 690;

export enum POSITIONS {
    TOP = 'TOP',
    JNG = 'JNG',
    MID = 'MID',
    ADC = 'ADC',
    SUP = 'SUP',
}
export const LINE_POSITION = {
    ["TOP"]: {
        icon: TOP,
        name: '탑',
    },
    ["JNG"]: {
        icon: JNG,
        name: '정글',
    },
    ["MID"]: {
        icon: MID,
        name: '미드',
    },
    ["ADC"]: {
        icon: ADC,
        name: '원딜',
    },
    ["SUP"]: {
        icon: SUP,
        name: '서폿',
    },
}