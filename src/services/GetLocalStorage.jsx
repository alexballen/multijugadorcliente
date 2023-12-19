const GetLocalStorage = (nameStorage, setState) => {
  const dataStorage = JSON.parse(localStorage.getItem(`${nameStorage}`));
  if (nameStorage) {
    setState(dataStorage);
  }
  return dataStorage;
};

export default GetLocalStorage;
