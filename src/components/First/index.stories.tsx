import { Meta } from '@storybook/react';

import { First, FirstProps } from '.';

const componentMeta: Meta<FirstProps> = {
  component: First,
  title:     'Components / First',
};

export default componentMeta;

export const Default = () => <First text="sdcsdc" />;
