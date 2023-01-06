import { createDomain } from 'effector';
import { toast } from 'react-toastify';

const toastDomain = createDomain('toast domain');

const toastEvent = {
  success: toastDomain.createEvent<string>(),
  error: toastDomain.createEvent<string>(),
};

toastEvent.success.watch(toast.success);
toastEvent.error.watch(toast.error);

export default toastEvent;
