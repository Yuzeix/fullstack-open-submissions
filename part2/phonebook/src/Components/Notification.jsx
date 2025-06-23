Notification = ({ message, type }) => {

  if (message === null) {
    return null;
  }

  const notificationClassName = `notification ${type}`

  return <div className={notificationClassName}>{message}</div>;
};

export default Notification;
