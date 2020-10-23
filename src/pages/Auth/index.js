import React from 'react';

import {
  Input,
} from 'antd';

import {
  FaPaste,
} from "react-icons/fa";

import {
  LabelCard,
} from '../../components';

import './styles.css';

export function Auth() {
  function PasteButton() {
    return (
      <button className="paste-button">
        <FaPaste
          color="#FFF"
          size={ 20 }
        />
      </button>
    );
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <LabelCard
          text="Informe token de acesso"
        />

        <div className="input-view">
          <Input
            placeholder="Token"
            suffix={<PasteButton />}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};
