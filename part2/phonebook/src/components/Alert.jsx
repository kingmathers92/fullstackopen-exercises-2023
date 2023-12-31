export const Alert = (message, error = false) => {
  if (message) {
    if (error) {
      return <div className="error">{message}</div>;
    } else {
      return <div className="message">{message}</div>;
    }
  }
  return null;
};
