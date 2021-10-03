/**
 * imports & exports of namespaces, interfaces & types
 */
import { TSize } from '../../../../ui__components/src/definitions/IPropTypes';

export type TActionName = 'getConfig' | 'setConfig' | 'getState' | 'setState';

export type TWSEventMessType = 'SLEEP' | 'MESSAGE' | 'ERROR' | null;

export type TBusinessStatus = 'IDLE' | 'SLEEP' | 'SLEEP_ERROR' | 'WORK' | 'ERROR' | 'TAKE';


export type TSRCStatus = any;//'running' | 'dead' | 'unavailable' | 'ready';

export interface IWSEventMessage {
    // TODO: remove string type 4 'type' after stable version release
    type: TWSEventMessType | TWSEventMessType | string | null;
    text: string | null;
    code: string | null;
}

export interface IWSEventState {
    businessStatus: TBusinessStatus;
    resourceStatus: TSRCStatus;
}

export interface IWSEvent {
    action: TActionName;
    eventId: string;
    message: IWSEventMessage;
    state: IWSEventState;
}

export interface IProps {
    langId?: 'ru' | null;
    theme?: any;
}

export interface IState {
    config: any;
    appStatus: TBusinessStatus;
    resourceStatus: TSRCStatus;
    error: IWSEventMessage | null;
    message: IWSEventMessage | null;
    curLang: string;
    curTranslateObj: any;
    sizeId: TSize;
}

/**
 * imports of packages
 */
import React from 'react';
import { withTheme } from '@emotion/react';

/**
 * imports of components
 */
import { Message } from '../../features/Message';
import { Error } from '../../features/Error';
/**
 * imports styles
 */
import GlobalStyles from '../../assets/styles';
import { CWrap, Logo, Title, Text } from './App.styles';
/**
 * import of lang localizations
 */
import langObj from './lang';
/**
 * imports 4 utils
 */
// import createUUID from '../../utils';

/**
 * StoryWrapper Component
 * @param {Object} props implements IProps
 * @type {Function}
 * @returns {JSX.Element}
 */
export class App extends React.Component<IProps, IState> {
    /**
     * is App state
     */
    readonly state: IState = {
        config: null,
        appStatus: 'SLEEP',
        resourceStatus: 'running',
        message: null,
        error: null,
        curLang: 'ru',
        curTranslateObj: null,
        sizeId: 'xl',
    };

    /**
     * Web Socket Connection Object
     */
    public ws: WebSocket | null = null;

    /**
     * is reconnect timeout by Web Socket
     */
    public reconnectTimeout = 1000;

    /**
     * App Component Constructor
     * @param {IProps} props
     */
    constructor(props: IProps) {
        super(props);
        this.state.curTranslateObj = langObj[props.langId ? props.langId : 'ru'];
    }

    public componentDidMount(): void {
        this.connect2Server();
    }

    public connect2Server() {
        this.ws = new WebSocket('ws://localhost:8003/sst');

        this.ws.onopen = () => {
            console.log('Connection is opened!');
        };

        this.ws.onmessage = (event): boolean => {
            const innerData: IWSEvent = JSON.parse(event.data);

            console.log('INFO: Input WS Data is - ', innerData);

            if (!innerData) return false;

            let outputMessData = {
                action: 'getState',
                eventId: innerData.eventId,
                message: null,
                state: null,
            };

            switch (innerData.action) {
                case 'setConfig':
                    outputMessData = {
                        ...outputMessData,
                        action: 'getState',
                        eventId: innerData.eventId,
                    };
                    this.setState({
                        ...this.state,
                        config: { ...innerData.message },
                    });
                    console.log(`INFO: outputMessData 4 ${innerData.action} is - `, outputMessData);
                    if (this.ws !== null) this.ws.send(JSON.stringify(outputMessData));

                    return true;
                case 'setState':
                    if (innerData.state.businessStatus === 'WORK' || innerData.state.businessStatus === 'TAKE' || innerData.state.businessStatus === 'SLEEP') {
                        this.setState(
                            {
                                appStatus: innerData.state.businessStatus,
                                message: { ...innerData.message },
                                error: null,
                            },
                            () => {
                                outputMessData = {
                                    ...outputMessData,
                                    action: 'getState',
                                    eventId: innerData.eventId,
                                };
                                console.log(`INFO: outputMessData 4 ${innerData.action} is - `, outputMessData);
                                if (this.ws !== null) this.ws.send(JSON.stringify(outputMessData));
                            },
                        );
                    } else {
                        this.setState(
                            {
                                appStatus: innerData.state.businessStatus,
                                message: null,
                                resourceStatus: innerData.state.resourceStatus.status,
                                error: innerData.state.businessStatus === 'ERROR' ? { ...innerData.message } : null,
                            },
                            () => {
                                outputMessData = {
                                    ...outputMessData,
                                    action: 'getState',
                                    eventId: innerData.eventId,
                                };
                                console.log(`INFO: outputMessData 4 ${innerData.action} is - `, outputMessData);
                                if (this.ws !== null) this.ws.send(JSON.stringify(outputMessData));
                            },
                        );
                    }

                    return true;
                default:
                    return false;
            }
        };

        this.ws.onerror = () => {
            setTimeout(() => {
                this.reconnectTimeout = this.reconnectTimeout + this.reconnectTimeout;
                this.connect2Server();
            }, this.reconnectTimeout);
        };
    }

    public render(): JSX.Element {
        const { sleepViewTitle, sleepViewText } = this.state.curTranslateObj;
        const images = this.props.theme.images;
        const theme = this.props.theme.containers.App || {};
        return (
            <>
                {this.state.appStatus === 'SLEEP' || this.state.appStatus === 'IDLE' ? (
                    <CWrap
                        sizeId={this.state.sizeId}
                        theme={theme.container}
                    >
                        <Logo 
                            sizeId={this.state.sizeId}
                            theme={theme.logo}
                            style={{
                                backgroundImage: `url('${images.logoWhite}')`,
                            }}
                        />
                        <Title
                            sizeId={this.state.sizeId}
                            theme={theme.title}
                        >{sleepViewTitle}</Title>
                        <Text
                            sizeId={this.state.sizeId}
                            theme={theme.text}
                        >{sleepViewText}</Text>
                    </CWrap>
                ) : this.state.appStatus === 'ERROR' ? (
                    <Error
                        sizeId={this.state.sizeId}
                        data={{
                            text: this.state.error && this.state.error.text,
                            type: this.state.appStatus && this.state.appStatus,
                        }}
                    />
                ) : (
                    <Message
                        sizeId={this.state.sizeId}
                        data={{
                            text: this.state.message && this.state.message.text,
                            type: this.state.appStatus && this.state.appStatus,
                        }}
                    />
                )}
                <GlobalStyles />
            </>
        );
    }
}

export default withTheme(App);
