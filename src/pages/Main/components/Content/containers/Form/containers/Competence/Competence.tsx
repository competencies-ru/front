import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';
import { useParams } from 'react-router';

import { Button, FormItem, Input, Select, Typography, TypographyType } from '@ui';
import { CompetenceType, CompetenceTypeTitle } from 'types/competence';
import { Option } from 'types/select';

import { programFormModel } from './model';

import styles from './Competence.module.scss';

const Competence = () => {
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

  // program <Select />
  const programOptions = useStore(programFormModel.programsOptions.stores.userOptions);
  const selectedProgram = useStore(programFormModel.programsOptions.stores.selectedOption);
  const programLoading = useStore(programFormModel.programsOptions.stores.loading);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      submit();
    },
    [submit]
  );

  const disabled = React.useMemo(() => !eachValid, [eachValid]);

  const title = React.useMemo(() => {
    return `${id ? 'Редактирование' : 'Создание'} компетенции`;
  }, [id]);

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
            placeholder={selectedLevel === 'Специалитет' ? 'Специальность' : 'Направление'}
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
          <Select
            placeholder={
              selectedLevel === 'Специалитет' ? 'Специализация' : 'Образовательная программа'
            }
            value={selectedProgram}
            options={programOptions}
            onChange={programFormModel.programsOptions.events.onSelect}
            onInputChange={programFormModel.programsOptions.events.onInput}
            loading={programLoading}
            onClear={programFormModel.programsOptions.events.clear}
            disabled={!selectedSpeciality}
            errorText={errorText('program')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.type.value ? CompetenceTypeTitle[fields.type.value] : ''}
            placeholder="Тип"
            errorText={errorText('type')}
            disabled
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.code.value}
            onChange={fields.code.onChange}
            placeholder="Код"
            errorText={errorText('code')}
            disabled={!fields.type.value}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.title.value}
            onChange={fields.title.onChange}
            placeholder="Название"
            errorText={errorText('title')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.category.value}
            onChange={fields.category.onChange}
            placeholder="Категория"
            errorText={errorText('category')}
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

export default React.memo(Competence);
