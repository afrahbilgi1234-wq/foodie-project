function SkeletonCard() {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="skeleton skeleton-img" />
        <div className="card-body">
          <div className="skeleton skeleton-line" style={{ width: '80%' }} />
          <div className="skeleton skeleton-line" style={{ width: '50%' }} />
          <div className="skeleton skeleton-line" style={{ width: '100%', height: '36px', marginTop: '12px' }} />
        </div>
      </div>
    </div>
  );
}

// Renders a grid of skeleton cards while data is loading
export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="row">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default SkeletonCard;
