import { VFC } from 'react';

import s from './index.css';

export type SecondProps = {
  text: string
}

export const Second: VFC<SecondProps> = ({
  text,
}) => (
  <div className={s.root}>
    {text}
  </div>
);
