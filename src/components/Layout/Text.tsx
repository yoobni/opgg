import styled, { css } from 'styled-components';

interface ITextProps {
    display?: string;
    align?: string;
    justify?: string;
    position?: string;
    width?: number | string;
    height?: number | string;
    maxHeight?: number | string;
    margin?: number | string;
    padding?: number | string;
    overflow?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: number | string;
    fontStyle?: string;
    fontFamily?: string;
    lineHeight?: number | string;
    textAlign?: string;
    textOverflow?: string;
    whiteSpace?: string;
    zIndex?: string | number;
    letterSpacing?: string;
    displayOneLine?: boolean;
}

export const Text = styled.span<ITextProps>`
    display: ${({ display }) => display || 'inline-block'};
    ${({ align }) => align && `align-items: ${align};`}
    ${({ justify }) => justify && `justify-content: ${justify};`}
    ${({ position }) => position && `position: ${position};`}
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
    margin: ${({ margin }) => margin || 0};
    padding: ${({ padding }) => padding || 0};
    overflow: ${({ overflow }) => overflow || 'initial'};
    color: ${({ color }) => color || 'inherit'};
    ${({ fontFamily }) => fontFamily && `font-family: ${fontFamily}`};
    font-size: ${({ fontSize }) => fontSize || '12px'};
    font-weight: ${({ fontWeight }) =>
        fontWeight === 'bold'
            ? '700'
            : fontWeight === 'medium'
                ? '500'
                : fontWeight === 'regular'
                    ? '400'
                    : fontWeight || 'inherit'
    };
    font-style: ${({ fontStyle }) => fontStyle || 'normal'};
    line-height: ${({ lineHeight }) => lineHeight || 'inherit'};
    text-align: ${({ textAlign }) => textAlign || 'inherit'};
    white-space: ${({ whiteSpace }) => whiteSpace || 'initial'};
    letter-spacing: ${({ letterSpacing }) => letterSpacing || 'initial'};
    ${({ textOverflow }) => textOverflow && `text-overflow: ${textOverflow};`}
    ${({ zIndex }) => zIndex && `z-index: ${zIndex}`};
    ${({ displayOneLine }) => displayOneLine &&
        css`
            word-wrap: normal;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            text-aline: left;
            word-break: break-all;
        `
    }
`;

// TODO: Text값 자주 쓰는거 미리 옮겨두기