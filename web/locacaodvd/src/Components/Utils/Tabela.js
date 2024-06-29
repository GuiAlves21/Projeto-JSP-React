import React from 'react';
import './TabelaCss.css'; // Supondo que você tenha um arquivo CSS para estilos da tabela

const Tabela = ({ data, columns, columnMapping, actions, itemsPerPage, currentPage, paginate }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <table className="tabela">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            {actions && actions.length > 0 && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{item[columnMapping[col]]}</td>
              ))}
              {actions && actions.length > 0 && (
                <td>
                  {actions.map((action, actionIndex) => (
                    <button key={actionIndex} onClick={() => action.onClick(item)}>
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from(Array(Math.ceil(data.length / itemsPerPage)), (e, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabela;
