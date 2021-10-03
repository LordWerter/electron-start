import 'loki/configure-react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

export const VIEWPORTS = {
  mobile2: {
    name: 'Large mobile',
    styles: {
      width: '414px',
      height: '896px',
    },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1080px',
    },
    type: 'tablet',
  },
  fullHD: {
    name: 'FullHD',
    styles: {
      width: '1080px',
      height: '1980px',
    },
    type: 'desktop',
  },
};

export const parameters = {
    actions: { argTypesRegex: '^on.*' },
    dependencies: {
        withStoriesOnly: true,
        hideEmpty: true,
    },
    docs: {
        container: DocsContainer,
        page: DocsPage,
        controls: { expanded: true }
    },
    a11y: {
        element: '#root',
        manual: false,
    },
    viewport: {
        viewports: VIEWPORTS,
    },
};
