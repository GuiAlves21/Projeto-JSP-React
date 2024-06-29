import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Tabela from '../Utils/Tabela';
import './GeneroCss.css';

Modal.setAppElement('#root');  // Esta linha é importante para acessibilidade

const Genero = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [genId, setGenId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [generos, setGeneros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Define o número de itens por página
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar a exibição da mensagem de sucesso

  const openModal = () => {
    setModalIsOpen(true);
    clearMessages();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDescricao('');
    clearMessages();
  };

  const openUpdateModal = (id, descricao) => {
    setGenId(id);
    setDescricao(descricao);
    setUpdateModalIsOpen(true);
    clearMessages();
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
    setGenId(null);
    setDescricao('');
    clearMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/generos/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ descricao }),
      });

      if (response.status === 201) {
        setDescricao('');
        closeModal();
        setMessage('Gênero cadastrado com sucesso');
        setMessageType('success');
        setShowSuccessMessage(true); // Mostra a mensagem de sucesso
        fetchGeneros(); // Atualiza a lista de gêneros após cadastrar um novo
        clearMessagesAfterTimeout(); // Define o timeout para limpar a mensagem de sucesso
      } else if (response.status === 400 || response.status === 500) {
        const error = await response.json();
        setMessage(error.error); // Exibe a mensagem de erro retornada pela API
        setMessageType('error');
      } else {
        throw new Error('Erro interno ao cadastrar o gênero');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o gênero:', error);
      setMessage('Erro ao cadastrar o gênero.');
      setMessageType('error');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/generos/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ gen_id: genId, gen_descricao: descricao }),
      });

      if (response.ok) {
        setDescricao('');
        closeUpdateModal();
        setMessage('Gênero atualizado com sucesso');
        setMessageType('success');
        setShowSuccessMessage(true); // Mostra a mensagem de sucesso
        fetchGeneros(); // Atualiza a lista de gêneros após a atualização
        clearMessagesAfterTimeout(); // Define o timeout para limpar a mensagem de sucesso
      } else {
        const error = await response.json();
        setMessage(error.error); // Exibe a mensagem de erro retornada pela API
        setMessageType('error');
      }
    } catch (error) {
      console.error('Erro ao atualizar o gênero:', error);
      setMessage('Erro ao atualizar o gênero.');
      setMessageType('error');
    }
  };

  const fetchGeneros = async () => {
    try {
      const response = await fetch('http://localhost:3333/generos/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar gêneros: ${response.status}`);
      }

      const data = await response.json();
      console.log('Gêneros obtidos:', data.items);
      setGeneros(data.items);
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
    }
  };

  useEffect(() => {
    fetchGeneros();
  }, []);

  const handleExcluirGenero = async (gen_id) => {
    try {
      const response = await fetch('http://localhost:3333/generos/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ gen_id }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir gênero: ${response.status}`);
      }

      setMessage('Gênero excluído com sucesso');
      setMessageType('success');
      setShowSuccessMessage(true); // Mostra a mensagem de sucesso
      fetchGeneros(); // Atualiza a lista de gêneros após a exclusão
      clearMessagesAfterTimeout(); // Define o timeout para limpar a mensagem de sucesso

    } catch (error) {
      console.error('Erro ao excluir o gênero:', error);
      setMessage('Erro ao excluir o gênero.');
      setMessageType('error');
    }
  };

  const handleEditarGenero = (id, descricao) => {
    openUpdateModal(id, descricao);
  };

  const columns = ['Descrição']; // Colunas que deseja exibir na tabela (nomes amigáveis ao usuário)
  const columnMapping = {
    'Descrição': 'descricao', // Mapeamento das colunas amigáveis para os nomes das propriedades dos dados
  };

  const actions = [
    {
      label: 'Editar',
      onClick: (row) => handleEditarGenero(row.id, row.descricao),
    },
    {
      label: 'Excluir',
      onClick: (row) => handleExcluirGenero(row.id),
    },
    
  ];

  const clearMessages = () => {
    setMessage('');
    setMessageType('');
    setShowSuccessMessage(false);
  };

  const clearMessagesAfterTimeout = () => {
    setTimeout(() => {
      clearMessages();
    }, 5000); // Limpa a mensagem após 5 segundos
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='caixaPrincipalGen'>
      <div className='caixaSecundaria'>
        <h1>Gênero</h1>
        <p>Conteúdo da página de Gênero.</p>
        <button onClick={openModal}>Cadastre um Novo Gênero</button>

        {showSuccessMessage && (
          <div style={{ color: 'green', marginTop: '10px' }}>
            {message}
          </div>
        )}

        <Tabela
          data={generos}
          columns={columns}
          columnMapping={columnMapping}
          actions={actions}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="Cadastrar Novo Gênero"
        >
          <div className="ModalContent">
            <h2>Cadastrar Novo Gênero</h2>
            {messageType === 'error' && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <label>
                Descrição:
                <input
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Cadastrar</button>
              <button type="button" onClick={closeModal}>Cancelar</button>
            </form>
          </div>
        </Modal>
        <Modal
          isOpen={updateModalIsOpen}
          onRequestClose={closeUpdateModal}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="Atualizar Gênero"
        >
          <div className="ModalContent">
            <h2>Atualizar Gênero</h2>
            {messageType === 'error' && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                {message}
              </div>
            )}
            <form onSubmit={handleUpdate}>
              <label>
                Descrição:
                <input
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Atualizar</button>
              <button type="button" onClick={closeUpdateModal}>Cancelar</button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Genero;
