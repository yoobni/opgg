import styled from 'styled-components';

interface WrapperProps {
    height?: string,
    padding?: string,
    margin?: string,
    background?: string,
}

export const Wrapper = styled.div<WrapperProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${({ height }) => height ? `${height}` : 'auto'};
    ${({ padding }) => padding && `padding: ${padding}`};
    ${({ margin }) => margin && `margin: ${margin}`};
    background: ${({ background }) => background ? `${background}` : '#ffffff'};
`;

export const GridWrapper = styled.div<WrapperProps>`
    width: 1000px;
    height: ${({ height }) => height ? `${height}` : 'auto'};
    ${({ padding }) => padding ? `padding: ${padding};` : ''}
    background: ${({ background }) => background ? `${background}` : 'none'};
`;
