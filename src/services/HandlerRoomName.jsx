const HandlerRoomName = (event, setPlayersRoom) => {
  const lowercaseValue = event.target.value.toLowerCase();
  setPlayersRoom(lowercaseValue);
};

export default HandlerRoomName;
