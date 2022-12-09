import React from 'react';

import { Checkbox } from '@ui/Checkbox';
import { Input } from '@ui/Input';
import { Typography, TypographyType } from '@ui/Typography';
import { OneVariantAnswer } from 'types/bank';

import styles from './OneVariant.module.scss';

type Props = OneVariantAnswer & {
  onAddAnswer: () => void;
  onChange: (v: number) => void;
  onChangeDescription: (number: number, description: string) => void;
};

const OneVariant: React.FC<Props> = (props) => {
  const { value, descriptions, onAddAnswer, onChange, onChangeDescription } = props;

  const handleChange = React.useCallback(
    (v: number) => () => {
      onChange(v);
    },
    [onChange]
  );

  const handleChangeDescription = React.useCallback(
    (number: number) => (v: string) => {
      onChangeDescription(number, v);
    },
    [onChangeDescription]
  );

  return (
    <div>
      <div className={styles.variants}>
        {descriptions.map((d, index) => (
          <React.Fragment key={d.id}>
            <Checkbox
              checked={value ? index === value - 1 : false}
              onChange={handleChange(index + 1)}
            />
            <Input value={d.text} onChange={handleChangeDescription(index + 1)} />
          </React.Fragment>
        ))}
      </div>
      <button
        type="button"
        onClick={onAddAnswer}
        className={styles.addAnswer}
        placeholder="Вариант ответа"
      >
        <Typography type={TypographyType.Div}>Добавить вариант ответа</Typography>
      </button>
    </div>
  );
};

export default React.memo(OneVariant);
