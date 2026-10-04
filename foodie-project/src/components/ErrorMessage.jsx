function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert alert-danger text-center m-4">
      <p className="mb-2">⚠️ {message || 'Something went wrong.'}</p>
      {onRetry && (
        <button className="btn btn-sm btn-outline-danger" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
