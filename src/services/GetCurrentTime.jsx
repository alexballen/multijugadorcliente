const GetCurrentTime = () => {
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/Bogota",
  };
  const formattedTime = new Intl.DateTimeFormat("es-CO", options).format(now);
  return formattedTime;
};

export default GetCurrentTime;
