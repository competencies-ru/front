import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';
import { useParams } from 'react-router';

import { Button, FormItem, Input, Select, Typography, TypographyType } from '@ui';

import { specialityFormModel } from './model';

import styles from './Form.module.scss';

const Form = () => {
  const { id } = useParams<{ id?: string }>();
  useGate(specialityFormModel.gates.openGate, id ?? null);

  const { errorText, fields, eachValid, submit } = useForm(specialityFormModel.form);

  // level <Select />
  const levelOptions = useStore(specialityFormModel.levelOptions.stores.userOptions);
  const selectedLevel = useStore(specialityFormModel.levelOptions.stores.selectedOption);
  const levelLoading = useStore(specialityFormModel.levelOptions.stores.loading);

  // UGSN <Select />
  const UGSNOptions = useStore(specialityFormModel.UGSNOptions.stores.userOptions);
  const selectedUGSN = useStore(specialityFormModel.UGSNOptions.stores.selectedOption);
  const UGSNLoading = useStore(specialityFormModel.UGSNOptions.stores.loading);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      submit();
    },
    [submit]
  );

  const disabled = React.useMemo(() => !eachValid, [eachValid]);

  const title = React.useMemo(() => {
    return `${id ? 'Редактирование' : 'Создание'} ${
      selectedLevel === 'Специалитет' ? 'специальности' : 'направления'
    }`;
  }, [id, selectedLevel]);

  return (
    <form onSubmit={handleSubmit}>
      <Typography type={TypographyType.H3} className={styles.title}>
        {title}
      </Typography>
      <>
        <FormItem>
          <Select
            placeholder="Уровень"
            value={selectedLevel}
            options={levelOptions}
            onChange={specialityFormModel.levelOptions.events.onSelect}
            onInputChange={specialityFormModel.levelOptions.events.onInput}
            loading={levelLoading}
            onClear={specialityFormModel.levelOptions.events.clear}
            errorText={errorText('level')}
          />
        </FormItem>
        <FormItem>
          <Select
            placeholder="УГСН"
            value={selectedUGSN}
            options={UGSNOptions}
            onChange={specialityFormModel.UGSNOptions.events.onSelect}
            onInputChange={specialityFormModel.UGSNOptions.events.onInput}
            loading={UGSNLoading}
            onClear={specialityFormModel.UGSNOptions.events.clear}
            disabled={!selectedLevel}
            errorText={errorText('ugsn')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.specialityCode.value}
            onChange={fields.specialityCode.onChange}
            placeholder={`Код ${selectedLevel === 'Специалитет' ? 'специальности' : 'направления'}`}
            errorText={errorText('specialityCode')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.speciality.value}
            onChange={fields.speciality.onChange}
            placeholder={`Название ${
              selectedLevel === 'Специалитет' ? 'специальности' : 'направления'
            }`}
            errorText={errorText('speciality')}
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
