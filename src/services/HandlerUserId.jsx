const HandlerUserId = (event, setUserNameId) => {
  const lowercaseValue = event.target.value.toLowerCase();
  setUserNameId(lowercaseValue);
};

export default HandlerUserId;
