import styled from '@emotion/styled';
import { ICWrapProps } from '../../../../ui__components/src/definitions/IPropTypes';
import { getResultStyles } from '../../../../ui__components/src/utils';

export interface IWrapperProps extends ICWrapProps {
}

export const CWrap = styled.div<IWrapperProps>`
    ${getResultStyles}
`;

export interface ITitleProps extends ICWrapProps {
}

export const Title = styled.h1<ITitleProps>`
    ${getResultStyles}
`;

export interface ITextProps extends ICWrapProps {
}

export const Text = styled.p<ITextProps>`
    ${getResultStyles}
`;

export interface ILogoProps extends ICWrapProps {
}

export const Logo = styled.div<ILogoProps>`
    ${getResultStyles}
`;
