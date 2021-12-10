import { Meta } from '@storybook/react';

import { Third, ThirdProps } from '.';

const componentMeta: Meta<ThirdProps> = {
  component: Third,
  title:     'Components / Third',
};

export default componentMeta;

export const Default = () => <Third text="sdcsdc" />;
