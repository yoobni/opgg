import styled from 'styled-components';

interface WrapperProps {
    height?: string;
    padding?: string;
    margin?: string;
    background?: string;
    borderBottom?: string;
}

export const Wrapper = styled.div<WrapperProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1050px;
    height: ${({ height }) => height ? `${height}` : 'auto'};
    ${({ padding }) => padding && `padding: ${padding}`};
    ${({ margin }) => margin && `margin: ${margin}`};
    border-bottom: ${({ borderBottom }) => borderBottom ? `${borderBottom}` : 'none'};
    background: ${({ background }) => background ? `${background}` : '#ffffff'};
`;

export const GridWrapper = styled.div<WrapperProps>`
    width: 1000px;
    height: ${({ height }) => height ? `${height}` : 'auto'};
    ${({ padding }) => padding ? `padding: ${padding};` : ''}
    background: ${({ background }) => background ? `${background}` : 'none'};
`;
