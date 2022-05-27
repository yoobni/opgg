import styled from 'styled-components';

interface InputProps {
    width?: string;
    height?: string;
    minWidth?: string;
    margin?: number | string;
    padding?: number | string;
    border?: string;
    borderRadius?: string;
    color?: string;
    fontSize?: string | number;
    lineHeight?: string | number;
    textAlign?: string;
    background?: string;
    noAnimation?: boolean;
    placeholderColor?: string;
}

export const Input = styled.input<InputProps>`
    width: ${({ width }) => (width ? `${width}` : 'auto')};
    ${({ minWidth }) => (minWidth ? `min-width: ${minWidth}` : '')};
    height: ${({ height }) => (height ? `${height}` : '46px')};
    margin: ${({ margin }) => (margin ? `${margin}` : '0')};
    padding: ${({ padding }) => (padding ? `${padding}` : '0 8px')};
    border: ${({ border }) => (border ? `${border}` : 'none')};
    border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}` : '4px')};
    background: white;
    color: ${({ color }) => (color ? `${color}` : '#40464c')};
    box-sizing: border-box;
    appearance: none;
    text-align: ${({ textAlign }) => (textAlign ? `${textAlign}` : 'left')};
    font-size: ${({ fontSize }) => fontSize || '14px'};
    font-weight: 400;
    line-height: ${({ lineHeight }) => lineHeight || '20px'};
    cursor: text;

    &::placeholder {
        color: ${({ placeholderColor }) => placeholderColor || '#727272'};
    }
`;
