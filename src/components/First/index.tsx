import { VFC } from 'react';

import { getNumber } from 'utils';

import { Second } from './Second';
import s from './index.css';

export type FirstProps = {
  text: string
}

export const First: VFC<FirstProps> = ({
  text,
}) => (
  <div className={s.root}>
    <Second text={text} />
    {getNumber()}
  </div>
);
