import React, {
  useContext,
  useState,
  useEffect,
} from 'react';

import {
  notification,
  Table,
  Popconfirm,
  Tag,
  Button,
  Modal,
  Input,
  Space,
} from 'antd';

import {
  FaPlus,
} from "react-icons/fa";

import {
  useQuery,
} from '@apollo/client';

import AuthContext from '../../utils/authContext';

import {
  GET_REPO,
  GET_USER,
} from '../../services/querys';

import './styles.css';

export function Repos({ history, match }) {
  const {
    signOut,
  } = useContext(AuthContext);

  const {
    owner,
  } = match.params;

  const { loading, error, data } = useQuery( GET_USER, { variables: {
    login: owner,
  }});

  if( !loading && error ) {
    signOut();

    history.push('/');
  }

  const [ openModal, setOpenModal ] = useState( false );

  const [ repositories, setRepositories ] = useState([]);

  const [ repoName, setRepoName ] = useState('');

  function handleAddRepository() {
    setRepositories([{ name: repoName }, ...repositories ]);

    localStorage.setItem('PRManager@Repos', JSON.stringify([{ key: repositories.length || 0, name: repoName }, ...repositories ]));

    setOpenModal( false );
  };

  function handleRemoveRepository( deletedRepo ) {
    const repos = repositories.filter( repo => repo.name !== deletedRepo );

    localStorage.setItem('PRManager@Repos', JSON.stringify( repos ));

    setRepositories( repos );
  };

  const columns = [
    {
      title: 'Repositório',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    { title: 'Ação', dataIndex: 'name', key: 'name', render: ( value ) => (
        <Space size="middle">
          <Popconfirm
            title="Deseja copiar as urls deste item?"
            onConfirm={() => {}}
            onCancel={() => {}}
            okText="Sim"
            cancelText="Não"
          >
            <a>Copiar Urls</a>
          </Popconfirm>

          <Popconfirm
            title="Deseja remover este item da lista?"
            onConfirm={() => handleRemoveRepository( value )}
            onCancel={() => {}}
            okText="Sim"
            cancelText="Não"
          >
            <a>Remover</a>
          </Popconfirm>
        </Space>
      ),
      align: 'right'
    },
  ];

  useEffect(() => {
    const repos = JSON.parse( localStorage.getItem('PRManager@Repos'));

    setRepositories( repos || []);
  }, []);

  return (
    <>
      <div className="repos-container">
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandable={{
            defaultExpandAllRows: true,
            expandedRowRender: item => (
              <Repository
                owner={ owner }
                repo={ item }
                deleteRepo={ handleRemoveRepository }
              />
            )
          }}
          dataSource={repositories}
          size="large"
          tableLayout="fixed"
        />
      </div>

      <div className="button-add">
        <Button
          type="primary"
          shape="circle"
          className="button-add"
          icon={<FaPlus size={ 28 } />}
          size="large"
          onClick={() => setOpenModal( true )}
        />
      </div>

      <Modal
          title="Adicionar Repositório"
          visible={ openModal }
          onOk={ handleAddRepository }
          onCancel={() => setOpenModal( false )}
        >
          <Input
            placeholder="Nome do repositório"
            size="large"
            value={ repoName }
            onChange={ event => setRepoName( event.target.value )}
          />
        </Modal>
    </>
  );
};

function Repository({ owner, repo, deleteRepo }) {
  const { loading, error, data } = useQuery( GET_REPO, { variables: {
    owner,
    name: repo.name,
  }}, [ owner ]);

  function getColorStatesPull( value ) {
    switch( value ) {
      case 'MERGED':
        return '#6f42c1';
      case 'CLOSED':
        return '#cb2431';
      case 'OPEN':
        return '#28a745';
    }
  };

  if( !loading && error ) {
    notification.error({
      message: 'Falha ao adicionar!',
      description: 'Repositório não encontrado ou você não tem permissão para monitrá-lo!',
    });

    deleteRepo( repo.name );
  }

  let prs = [];

  if( !loading && data?.repository.pullRequests.nodes ) {
    prs = data.repository.pullRequests.nodes.map(( repo ) => {
      return {
        title: repo.title,
        author: repo.author.login,
        state: repo.state,
        url: repo.url,
      }
    });
  }

  const columns = [
    { title: 'Título', dataIndex: 'title', key: 'title', align: 'center'},
    { title: 'Autor', dataIndex: 'author', key: 'author', align: 'center'},
    { title: 'Status',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: ( value ) => (
        <Tag color={ getColorStatesPull( value )}>{ value }</Tag>
      )
    },
    {
      title: 'Ação',
      dataIndex: 'url',
      key: 'url',
      align: 'right',
      render: ( value ) => (<a href={ value }>Vizualizar</a>),
    },
  ];

  if( data ) return <Table loading={ loading } columns={columns} dataSource={ prs } pagination={false} />;

  return null;
};
