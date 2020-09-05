import React from 'react';
import './Image.css';

function Image({ thumb, full, name }) {
  if (!thumb) {
    return <div>Loading image...</div>;
  }
  if (thumb.search('image_not_available') !== -1) {
    return <div className="placeholer__image"></div>;
  }
  return (
    <a href={full} data-attribute="SRL">
      <img className="image" src={thumb} alt={name} />
    </a>
  );
}

export default Image;
