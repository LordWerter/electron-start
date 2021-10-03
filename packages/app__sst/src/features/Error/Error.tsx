/**
 * imports & exports of namespaces, interfaces & types
 */
export interface IProps {
    data: {
        type: string | null;
        text: string | null;
    }
}
/**
 * imports of packages
 */
import React from 'react';
import {useTheme} from '@emotion/react';

/**
 * imports of packages
 */
// import { Logo } from '../../../features/Logo';
/**
 * imports of styles
 */
import { CWrap, Logo, Title, Image } from './Error.styles';
/**
 * imports of constants
 */

/**
 * Video Component
 * @param {Object} props implements IProps
 * @type {Function}
 * @returns {JSX.Element}
 */
export const Error: React.FC<any> = (props): JSX.Element => {
    const { type, text } = props.data;

    //@ts-ignore
    const images: any = useTheme().images || {};

    const imagesMap: any = {
        server: images.WORK,
        comarch: images.WORK,
        notFound: images.WORK,
        activatedBefore: images.WORK,
    };

    return (
        <CWrap>
            <Logo
                height="110px"
                source= {images.ERROR}
            />
            <Title>
                {text}
            </Title>
            { imagesMap[type] && <Image source={imagesMap[type]} /> }
        </CWrap>
    );
};

export default Error;
