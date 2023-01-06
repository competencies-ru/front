const uuidRegExp = new RegExp(
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
);

const validateUUID = (id: string, onError: () => void) => {
  if (id && uuidRegExp.test(id)) {
    return id;
  }

  setTimeout(onError);

  return '';
};

export default validateUUID;
