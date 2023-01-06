import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';
import { useParams } from 'react-router';

import { Button, FormItem, Input, Select, Typography, TypographyType } from '@ui';

import { programFormModel } from './model';

import styles from './Form.module.scss';

const Form = () => {
  const { id } = useParams<{ id?: string }>();
  useGate(programFormModel.gates.openGate, id ?? null);

  const { errorText, fields, eachValid, submit } = useForm(programFormModel.form);

  // level <Select />
  const levelOptions = useStore(programFormModel.levelOptions.stores.userOptions);
  const selectedLevel = useStore(programFormModel.levelOptions.stores.selectedOption);
  const levelLoading = useStore(programFormModel.levelOptions.stores.loading);

  // UGSN <Select />
  const UGSNOptions = useStore(programFormModel.UGSNOptions.stores.userOptions);
  const selectedUGSN = useStore(programFormModel.UGSNOptions.stores.selectedOption);
  const UGSNLoading = useStore(programFormModel.UGSNOptions.stores.loading);

  // speciality <Select />
  const specialityOptions = useStore(programFormModel.specialityOptions.stores.userOptions);
  const selectedSpeciality = useStore(programFormModel.specialityOptions.stores.selectedOption);
  const specialityLoading = useStore(programFormModel.specialityOptions.stores.loading);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      submit();
    },
    [submit]
  );

  const disabled = React.useMemo(() => !eachValid, [eachValid]);

  const type = React.useMemo(
    () => (selectedLevel === 'Специалитет' ? 'специализации' : 'образовательной программы'),
    [selectedLevel]
  );

  const title = React.useMemo(() => {
    return `${id ? 'Редактирование' : 'Создание'} ${type}`;
  }, [id, type]);

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
            onChange={programFormModel.levelOptions.events.onSelect}
            onInputChange={programFormModel.levelOptions.events.onInput}
            loading={levelLoading}
            onClear={programFormModel.levelOptions.events.clear}
            errorText={errorText('level')}
          />
        </FormItem>
        <FormItem>
          <Select
            placeholder="УГСН"
            value={selectedUGSN}
            options={UGSNOptions}
            onChange={programFormModel.UGSNOptions.events.onSelect}
            onInputChange={programFormModel.UGSNOptions.events.onInput}
            loading={UGSNLoading}
            onClear={programFormModel.UGSNOptions.events.clear}
            disabled={!selectedLevel}
            errorText={errorText('ugsn')}
          />
        </FormItem>
        <FormItem>
          <Select
            placeholder={
              selectedLevel === 'Специалитет' ? 'Специализация' : 'Образовательная программа'
            }
            value={selectedSpeciality}
            options={specialityOptions}
            onChange={programFormModel.specialityOptions.events.onSelect}
            onInputChange={programFormModel.specialityOptions.events.onInput}
            loading={specialityLoading}
            onClear={programFormModel.specialityOptions.events.clear}
            disabled={!selectedUGSN}
            errorText={errorText('speciality')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.programCode.value}
            onChange={fields.programCode.onChange}
            placeholder={`Код ${type}`}
            errorText={errorText('programCode')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.program.value}
            onChange={fields.program.onChange}
            placeholder={`Название ${type}`}
            errorText={errorText('program')}
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
