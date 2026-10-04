import { useState } from 'react';
import PropTypes from 'prop-types';

function StarRating({ value = 0, interactive = false, onChange }) {
  const [hovered, setHovered] = useState(0);

  const stars = [1, 2, 3, 4, 5];

  return (
    <span>
      {stars.map((star) => {
        const filled = interactive ? star <= (hovered || value) : star <= Math.round(value);
        return (
          <span
            key={star}
            onClick={interactive ? () => onChange(star) : undefined}
            onMouseEnter={interactive ? () => setHovered(star) : undefined}
            onMouseLeave={interactive ? () => setHovered(0) : undefined}
            style={{
              cursor: interactive ? 'pointer' : 'default',
              color: filled ? '#f5a623' : '#d1d5db',
              fontSize: '20px',
            }}
          >
            ★
          </span>
        );
      })}
    </span>
  );
}

StarRating.propTypes = {
  value: PropTypes.number,
  interactive: PropTypes.bool,
  onChange: PropTypes.func,
};

export default StarRating;
