const UpdatePlayers = (prevPlayers, backendPlayers) => {
  const updatedPlayers = { ...prevPlayers };

  for (const id in backendPlayers) {
    const backendPlayer = backendPlayers[id];
    updatedPlayers[id] = backendPlayer;
  }

  for (const id in prevPlayers) {
    if (!backendPlayers[id]) {
      delete updatedPlayers[id];
    }
  }

  return updatedPlayers;
};

export default UpdatePlayers;
