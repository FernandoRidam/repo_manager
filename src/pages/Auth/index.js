import React, {
  useContext,
} from 'react';

import {
  Form,
  Input,
  Button,
} from 'antd';

import {
  LabelCard,
} from '../../components';

import AuthContext from '../../utils/authContext';

import './styles.css';

export function Auth({ history }) {
  const {
    signIn,
  } = useContext(AuthContext);

  function handleSubmit( values ) {
    const {
      username,
      token,
    } = values;

    signIn( token, username );

    history.push(`/repos/${ username }`);
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
