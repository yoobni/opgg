import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import COLOR from '../../lib/styles/colors';

interface IButtonProps extends React.CSSProperties {
    focusBackground?: string;
    className?: string;
    children?: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const StyledButton = styled.button<IButtonProps>`
    position: ${({ position }) => position || 'static'};
    display: ${({ display }) => display || 'inline-flex'};
    align-items: ${({ alignItems }) => alignItems || 'center'};
    justify-content: ${({ justifyContent }) => justifyContent|| 'center'};
    width: ${({ width }) => (width ? width : 'auto')};
    ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
    height: ${({ height }) => (height ? height : 'auto')};
    padding: ${({ padding }) => (padding ? padding : '0')};
    margin: ${({ margin }) => (margin ? margin : '0')};
    border: ${({ border }) => (border ? border : 'none')};
    border-radius: ${({ borderRadius }) => borderRadius ?? '5px'};
    background: ${({ background }) => (background ? background : `${COLOR.WHITE}`)};
    box-sizing: border-box;
    cursor: ${({ cursor }) => (cursor ? cursor : 'pointer')};
    outline: none;

    &:focus,
    &:active {
        ${({ focusBackground }) => focusBackground && `background: ${focusBackground};`}
    }
`;

export default function Button({
    children,
    position,
    display,
    alignItems,
    justifyContent,
    width,
    height,
    minWidth,
    background,
    focusBackground,
    margin,
    padding,
    border,
    borderRadius,
    cursor,
    className,
    onClick,
}: IButtonProps) {
    return (
        <StyledButton
            position={position}
            display={display}
            alignItems={alignItems}
            justifyContent={justifyContent}
            width={width}
            height={height}
            minWidth={minWidth}
            background={background}
            margin={margin}
            padding={padding}
            border={border}
            borderRadius={borderRadius}
            cursor={cursor}
            focusBackground={focusBackground}
            className={className}
            onClick={(e) => {
                const currentTarget = e.currentTarget;
                if (onClick && focusBackground) {
                    setTimeout(() => {
                        currentTarget?.blur();
                        onClick(e);
                    }, 100);
                } else {
                    onClick && onClick(e);
                    setTimeout(() => {
                        currentTarget?.blur();
                    }, 100);
                }
            }}
        >
            {children}
        </StyledButton>
    );
}
