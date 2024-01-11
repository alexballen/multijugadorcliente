import { useEffect } from "react";

const SetErrorAlias = (setErrorAlias, aliasValidator, userNameId) => {
  useEffect(() => {
    setErrorAlias(aliasValidator(userNameId));
  }, [userNameId, setErrorAlias, aliasValidator]);
};

export default SetErrorAlias;
