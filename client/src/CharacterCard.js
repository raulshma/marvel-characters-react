import React from 'react';
import Image from './Image';
import { PORTRAIT_SIZES } from './helpers';
import './CharacterCard.css';

function CharacterCard({ data }) {
  if (!data) return null;
  return (
    <div className="character-card">
      <Image
        thumb={`${data.thumbnail.path}/${PORTRAIT_SIZES.portrait_uncanny}.${data.thumbnail.extension}`}
        full={`${data.thumbnail.path}.${data.thumbnail.extension}`}
        name={data.name}
      />
      <div className="character_details">
        <h1 className="character__name">{data.name}</h1>
        <p className="character__description">
          {data.description.length > 100
            ? `${data.description.substring(0, 100)}...`
            : data.description}
        </p>
      </div>
    </div>
  );
}

export default CharacterCard;
