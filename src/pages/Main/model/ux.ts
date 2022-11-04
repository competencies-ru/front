import { combine, createDomain } from 'effector';

const uxDomain = createDomain('ux domain');

const changeFullWidthContainer = uxDomain.createEvent();

const $fullWidthContent = uxDomain
  .createStore(!!localStorage.getItem('fullScreenContent'))
  .on(changeFullWidthContainer, (state) => !state);

$fullWidthContent.updates.watch((value) => {
  localStorage.setItem('fullScreenContent', value ? 'true' : '');
});

export const uxModel = {
  $store: combine({
    fullWidthContent: $fullWidthContent,
  }),
  changeFullWidthContainer,
};
