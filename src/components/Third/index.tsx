import { VFC } from 'react';

import { First } from 'components/First';

import { getString } from 'utils';

import s from './index.css';

export type ThirdProps = {
  text: string
}

export const Third: VFC<ThirdProps> = ({
  text,
}) => (
  <div className={s.root}>
    <First text={text} />
    {getString()}
  </div>
);
