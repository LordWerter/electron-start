/**
 * imports & exports of namespaces, interfaces & types
 */
 import { TSize } from '../../../../ui__components/src/definitions/IPropTypes';
 export interface IProps {
    sizeId?: TSize;
    customize?: any;
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
import ReactPlayer from 'react-player';

/**
 * imports of styles
 */
import { CWrap, Logo, Text } from './Message.styles';
/**
 * imports of constants
 */

/**
 * imports of utils
 */
 import { mergeThemeObjects } from '../../../../ui__components/src/utils';
 
 /**
 * Video Component
 * @param {Object} props implements IProps
 * @type {Function}
 * @returns {JSX.Element}
 */
export const Message: React.FC<IProps> = (props): JSX.Element => {
    const {
        sizeId = 'xl',
        customize = {},
    } = props;
    const { type, text } = props.data;

    const videoMap: {[key: string]: string} = {
        TAKE: '/opt/udmf/client/resources/app/assets/sst/media/take_skanner.mp4',
        WORK: '/opt/udmf/client/resources/app/assets/sst/media/skaning.mp4',
    };

    const requiredThemeKeys = [
        'container', 'logo', 'text'
    ];

    //@ts-ignore
    const theme: any = useTheme() || {};

    const ctheme = theme.containers.Message || {};
    for (let key of requiredThemeKeys) {
        //@ts-ignore
        const curKey = requiredThemeKeys[key];
        ctheme[curKey] = mergeThemeObjects(ctheme[curKey], customize[curKey]);
    }

    return (
        <CWrap
            sizeId={sizeId}
            theme={ctheme.container}
            style={{
                backgroundImage: `url('${theme.images[type ? type : '']}')`,
            }}
    >
            <Logo
                sizeId={sizeId}
                theme={ctheme.logo}
                style={{
                    backgroundImage: `url('${theme.images.logoColored}')`,
                }}
            />
            <Text
                sizeId={sizeId}
                theme={ctheme.text}
            >
                {text}
            </Text>
            {
                // videoMap[type] && <Image source={imagesMap[type]} />
                theme.withVideo && type && videoMap[type] 
                    ? <div className={'video'}>
                        <ReactPlayer width={'100vw'} height={'auto'} playing={true} loop={true} url={videoMap[type]} />
                    </div> 
                    : <></>
            }
        </CWrap>
    );
};

export default Message;
