import React from 'react';
import { init } from '@rematch/core';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { StoryWrapper } from '../../../../../ui__components';
import ixr from '../../../../../ui__themes/src/ixr/apps/sst';
import perek from '../../../../../ui__themes/src/perekrestok/apps/sst';


export const models = {};

const store = init({
    models,
});

import Message from '../Message';

const stories = storiesOf('Message', module).addDecorator(withKnobs);

stories.add('Perekrestok: initial state', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Message
            data={{
                type: 'WORK',
                text: 'Добрый день!\n Отсканируйте вашу карту',
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: initial state', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Message
            data={{
                type: 'WORK',
                text: 'Добрый день!\n Отсканируйте вашу карту',
            }}
        />
    </StoryWrapper>
));

stories.add('Perekrestok: start of scanning', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Message
            data={{
                type: 'WORK',
                text: 'Добрый день!\n Отсканируйте вашу карту',
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: start of scanning', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Message
            data={{
                type: 'WORK',
                text: 'Добрый день!\n Отсканируйте вашу карту',
            }}
        />
    </StoryWrapper>
));

stories.add('Perekrestok: end of scanning', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Message
            data={{
                type: 'TAKE',
                text: 'Возьмите ваш сканер :)\n Он подсвечен зеленым светом.\n Приятных покупок!',
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: end of scanning', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Message
            data={{
                type: 'TAKE',
                text: 'Возьмите ваш сканер :)\n Он подсвечен зеленым светом.\n Приятных покупок!',
            }}
        />
    </StoryWrapper>
));

stories.add('Perekrestok: Scanners are not available', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Message
            data={{
                type: 'unavailable',
                text: 'Все сканеры на данный момент недоступны :(\n Скачайте приложение ExpressSelfScanning на смартфон,\n чтобы ваш персональный сканер всегда был под рукой!\n Сканируйте QR-код смартфоном для загрузки приложения',
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: Scanners are not available', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Message
            data={{
                type: 'unavailable',
                text: 'Все сканеры на данный момент недоступны :(\n Скачайте приложение ExpressSelfScanning на смартфон,\n чтобы ваш персональный сканер всегда был под рукой!\n Сканируйте QR-код смартфоном для загрузки приложения',
            }}
        />
    </StoryWrapper>
));

stories.add('Perekrestok: dinamic props', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Message
            data={{
                type: text('Type of action is - ', 'unavailable'),
                text: text('Message text is - ', 'Все сканеры на данный момент недоступны :(\n Скачайте приложение ExpressSelfScanning на смартфон,\n чтобы ваш персональный сканер всегда был под рукой!\n Сканируйте QR-код смартфоном для загрузки приложения'),
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: dinamic props', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Message
            data={{
                type: text('Type of action is - ', 'unavailable'),
                text: text('Message text is - ', 'Все сканеры на данный момент недоступны :(\n Скачайте приложение ExpressSelfScanning на смартфон,\n чтобы ваш персональный сканер всегда был под рукой!\n Сканируйте QR-код смартфоном для загрузки приложения'),
            }}
        />
    </StoryWrapper>
));
