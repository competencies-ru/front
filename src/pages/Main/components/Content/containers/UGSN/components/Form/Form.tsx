import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';
import { useParams } from 'react-router';

import { Button, FormItem, Input, Select, Typography, TypographyType } from '@ui';

import { UGSNFormModel } from './model';

import styles from './Form.module.scss';

const Form = () => {
  const { id } = useParams<{ id?: string; levelId?: string }>();
  useGate(UGSNFormModel.gates.openGate, id ?? null);

  const { errorText, fields, eachValid, submit } = useForm(UGSNFormModel.form);

  const levelOptions = useStore(UGSNFormModel.levelOptions.stores.userOptions);
  const selectedLevel = useStore(UGSNFormModel.levelOptions.stores.selectedOption);
  const levelLoading = useStore(UGSNFormModel.levelOptions.stores.loading);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      submit();
    },
    [submit]
  );

  const disabled = React.useMemo(() => !eachValid, [eachValid]);

  return (
    <form onSubmit={handleSubmit}>
      <Typography type={TypographyType.H3} className={styles.title}>
        {id ? 'Редактирование УГСН' : 'Создание УГСН'}
      </Typography>
      <>
        <FormItem>
          <Select
            placeholder="Уровень"
            value={selectedLevel}
            options={levelOptions}
            onChange={UGSNFormModel.levelOptions.events.onSelect}
            onInputChange={UGSNFormModel.levelOptions.events.onInput}
            loading={levelLoading}
            onClear={UGSNFormModel.levelOptions.events.clear}
            errorText={errorText('level')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.ugsnCode.value}
            onChange={fields.ugsnCode.onChange}
            placeholder="Код УГСН"
            errorText={errorText('ugsnCode')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.ugsn.value}
            onChange={fields.ugsn.onChange}
            placeholder="Название УГСН"
            errorText={errorText('ugsn')}
          />
        </FormItem>
        <FormItem>
          <Button type="submit" className={styles.btn} disabled={disabled}>
            {id ? 'Изменить' : 'Создать'}
          </Button>
        </FormItem>
      </>
    </form>
  );
};

export default React.memo(Form);
