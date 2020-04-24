import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then(response => {
      const repositories = response.data;
      setRepositories([...repositories]);
 
    });    
    
  }, [repositories])

  async function handleAddRepository() {
    await api.post('/repositories', {
      title:"ReactJS",
	    url:"https://github.com/facebook/react",
	    techs:["Java Script", "Node.js"]	
    });
    
  }


  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}
         
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
