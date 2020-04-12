import React, {useState, useEffect} from 'react';
import api from './services/api'
import Header from './components/Header'

import './App.css'


export default function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  },[])
 
  async function handleAdd (){

    const response = await api.post('/projects',{
      nome: `Novo nome ${new Date()}`,
      profissao: `Nova profissao ${new Date()}`
    });
    
    const project = response.data;

    setProjects([...projects, project]);
    
  }

  return (
    <>
      <Header title="Teste">
        <ul>
          {projects.map(project => <li key={project.id}>{project.nome}</li>)}
        </ul>
        <button onClick={handleAdd}>Adicionar projeto</button>
      </Header>
    </>
  );
}
