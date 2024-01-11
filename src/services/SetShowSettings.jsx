import { useEffect } from "react";

const SetShowSettings = (connectionMessages, setShowSettings) => {
  useEffect(() => {
    if (connectionMessages.connected) {
      setShowSettings(true);
    } else {
      setShowSettings(false);
    }
  }, [setShowSettings, connectionMessages.connected]);
};

export default SetShowSettings;
