export const Alert = ({ message, error = false }) => {
  const alertClass = error ? "error" : "message";

  if (message) {
    return <div className={alertClass}>{message}</div>;
  }

  return null;
};
