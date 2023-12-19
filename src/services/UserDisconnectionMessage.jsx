const UserDisconnectionMessage = (disconnectedUsers) => {
  const userDisconnection = `El usuario ${disconnectedUsers} se desconecto¡`;
  if (disconnectedUsers) {
    return userDisconnection;
  }
};

export default UserDisconnectionMessage;
