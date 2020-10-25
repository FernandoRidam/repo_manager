import React from 'react';

import {
  Form,
  Input,
  Button,
} from 'antd';

import {
  FaPaste,
} from "react-icons/fa";

import {
  LabelCard,
} from '../../components';

import './styles.css';

export function Auth() {
  function handleSubmit( values ) {
    const {
      username,
      token,
    } = values;

    localStorage.setItem('PRManager@Login', username );
    localStorage.setItem('PRManager@Token', token );
  };

  function handleSubmitError( errorInfo  ) {
    console.log( errorInfo  );
  };

  const layout = {
    labelCol: { span: 22 },
    wrapperCol: { span: 34 },
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Form
          {...layout}
          name="basic"
          layout="vertical"
          initialValues={{ username: '', token: ''}}
          onFinish={ handleSubmit }
          onFinishFailed={ handleSubmitError }
        >
          <LabelCard
            text="Informe token de acesso"
          />

            <Form.Item
              className="input"
              label="Usuário GitHub"
              name="username"
              rules={[{ required: true, message: 'Informe nome de usuário!' }]}
            >
              <Input
                placeholder="Usuário GitHub"
                size="large"
              />

            </Form.Item>

            <Form.Item
              className="input"
              label="Token"
              name="token"
              rules={[{ required: true, message: 'Token é um campo obrigatório!' }]}
            >
              <Input
                placeholder="Token"
                size="large"
                type="password"
              />
            </Form.Item>

          <Button
            className="button"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Prosseguir
          </Button>
        </Form>
      </div>
    </div>
  );
};
