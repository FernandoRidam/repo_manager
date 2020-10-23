import React from 'react';

import './styles.css';

export function LabelCard({ text }) {
  return (
    <span className="label-card">{ text }</span>
  );
};
