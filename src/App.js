import React from 'react';
import AlbumList from './AlbumList';
import './styles.css'; // Importa el archivo CSS donde se encuentra el estilo

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Album Rankings</h1>
      </header>
      <div className="AlbumListContainer">
        <AlbumList />
      </div>
    </div>
  );
}

export default App;
