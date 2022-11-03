import { combine, createDomain } from 'effector';

const uxDomain = createDomain('ux domain');

const changeFullWidthContainer = uxDomain.createEvent();

const $fullWidthContent = uxDomain
  .createStore(false)
  .on(changeFullWidthContainer, (state) => !state);

export const uxModel = {
  $store: combine({
    fullWidthContent: $fullWidthContent,
  }),
  changeFullWidthContainer,
};
