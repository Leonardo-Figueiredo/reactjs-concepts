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
    
  }, [])

  async function handleAddRepository() {
    const { data }= await api.post('/repositories', {
      title:"Leléo",
	    url:"https://github.com/facebook/react",
	    techs:["Java Script", "Node.js"]	
    });

    const newRepository = data;
    setRepositories([...repositories, newRepository]);    
  }


  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository => repository.id !== id)));
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
