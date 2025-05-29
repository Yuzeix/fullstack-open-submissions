Notification = ({ successMessage }) => {
  if (successMessage === null) {
    return null;
  }

  return <div className="success">{successMessage}</div>;
};

export default Notification;
