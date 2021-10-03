import React from 'react';
import { init } from '@rematch/core';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Error from '../Error';

import { StoryWrapper } from '../../../../../ui__components';
import ixr from '../../../../../ui__themes/src/ixr/apps/sst';
import perek from '../../../../../ui__themes/src/perekrestok/apps/sst';


export const models = {};

const store = init({
    models,
});

const stories = storiesOf('Error', module).addDecorator(withKnobs);

stories.add('Perekrestok: initial state', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Error
            data={{
                type: '',
                text: 'Что-то пошло не так :(\n Попробуйте еще раз!',
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: initial state', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Error
            data={{
                type: '',
                text: 'Что-то пошло не так :(\n Попробуйте еще раз!',
            }}
        />
    </StoryWrapper>
));

stories.add('Perekrestok: error on server', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Error
            data={{
                type: 'server',
                text: 'Идут технические работы, сервис временно недоступен',
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: error on server', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Error
            data={{
                type: 'server',
                text: 'Идут технические работы, сервис временно недоступен',
            }}
        />
    </StoryWrapper>
));

stories.add('Perekrestok: error with comarch', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Error
            data={{
                type: 'comarch',
                text: 'Сервис ExpressSelfScanning\n временно недоступен',
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: error with comarch', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Error
            data={{
                type: 'comarch',
                text: 'Сервис ExpressSelfScanning\n временно недоступен',
            }}
        />
    </StoryWrapper>
));

stories.add('Perekrestok: card not found', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Error
            data={{
                type: 'notFound',
                text: 'Такой карты нет или она заблокирована.\n Для получения новой карты обратитесь к кассиру',
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: card not found', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Error
            data={{
                type: 'notFound',
                text: 'Такой карты нет или она заблокирована.\n Для получения новой карты обратитесь к кассиру',
            }}
        />
    </StoryWrapper>
));

stories.add('Perekrestok: basket was activated before', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Error
            data={{
                type: 'activatedBefore',
                text: 'В мобильном приложении уже есть активная корзина',
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: basket was activated before', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Error
            data={{
                type: 'activatedBefore',
                text: 'В мобильном приложении уже есть активная корзина',
            }}
        />
    </StoryWrapper>
));

stories.add('Perekrestok: dinamic adding of props', () => (
    <StoryWrapper store={store} theme={perek} initialEntries={['/']}>
        <Error
            data={{
                type: text('Type of action is - ', 'activatedBefore'),
                text: text('Error message is - ', 'В мобильном приложении уже есть активная корзина'),
            }}
        />
    </StoryWrapper>
));

stories.add('IXR: dinamic adding of props', () => (
    <StoryWrapper store={store} theme={ixr} initialEntries={['/']}>
        <Error
            data={{
                type: text('Type of action is - ', 'activatedBefore'),
                text: text('Error message is - ', 'В мобильном приложении уже есть активная корзина'),
            }}
        />
    </StoryWrapper>
));
