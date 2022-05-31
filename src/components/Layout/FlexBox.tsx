import styled from 'styled-components';

interface FlexBoxProps {
    display?: string;
    position?: string;
    width?: number | string;
    height?: number | string;
    maxWidth?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    margin?: number | string;
    padding?: number | string;
    border?: string;
    borderRadius?: string;
    direction?: string;
    flex?: number | string;
    wrap?: string;
    justify?: string;
    align?: string;
    alignSelf?: string;
    grow?: number | string;
    textAlign?: string;
    cursor?: string;
    background?: string;
    overflow?: string;
}

export const FlexBox = styled.div<FlexBoxProps>`
    display: ${({ display }) => display || `flex`};
    ${({ position }) => position && `position: ${position};`}
    ${({ width }) => width && `width: ${width};`}
    ${({ height }) => height && `height: ${height};`}
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
    ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
    ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
    ${({ margin }) => margin && `margin: ${margin};`}
    ${({ padding }) => padding && `padding: ${padding};`}
    ${({ border }) => border && `border: ${border};`}
    ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
    ${({ flex }) => flex && `flex: ${flex};`}
    ${({ direction }) => direction && `flex-direction: ${direction};`}
    ${({ wrap }) => wrap && `flex-wrap: ${wrap};`}
    ${({ justify }) => justify && `justify-content: ${justify};`}
    ${({ align }) => align && `align-items: ${align};`}
    ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
    ${({ grow }) => grow && `flex-grow: ${grow};`}
    ${({ cursor }) => cursor && `cursor: ${cursor};`}
    ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
    ${({ background }) => background && `background: ${background};`}
    ${({ overflow }) => overflow && `overflow: ${overflow};`}
`;

export const Row = styled(FlexBox)`
    flex-direction: row;
`;

export const Col = styled(FlexBox)`
    flex-direction: column;
`;
