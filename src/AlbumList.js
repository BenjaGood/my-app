import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AlbumList() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = () => {
    axios
      .get('http://localhost:3001/api/albums')
      .then((res) => {
        setAlbums(res.data);
      })
      .catch((error) => {
        console.error('Error fetching albums data:', error);
      });
  };

  const fetchComments = (albumId) => {
    axios
      .get(`http://localhost:3001/api/comments/${albumId}`)
      .then((res) => {
        // Asignar los comentarios al álbum correspondiente
        const updatedAlbums = albums.map((album) => {
          if (album.id === albumId) {
            return { ...album, comments: res.data };
          }
          return album;
        });
        setAlbums(updatedAlbums);
      })
      .catch((error) => {
        console.error('Error fetching comments data:', error);
      });
  };

  const addComment = (albumId, commentText) => {
    axios
      .post('http://localhost:3001/api/comments', { albumId, commentText })
      .then(() => {
        fetchComments(albumId); // Actualizar los comentarios después de agregar uno nuevo
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  const deleteComment = (commentId, albumId) => {
    axios
      .delete(`http://localhost:3001/api/comments/${commentId}`)
      .then(() => {
        fetchComments(albumId); // Actualizar los comentarios después de eliminar uno
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  return (
    <div>
      <h1>Albumes</h1>
      {albums.map((album) => (
        <div key={album.id} className="AlbumContainer">
          <h2>{album.name}</h2>
          <h3>{album.artist}</h3>
          {album.image_url && <img src={album.image_url} alt={album.name} />}
          <div>
            <h3>Comentarios:</h3>
            {album.comments &&
              album.comments.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.comment_text}</p>
                  <button onClick={() => deleteComment(comment.id, album.id)}>Eliminar</button>
                </div>
              ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const commentText = e.target.commentText.value;
                addComment(album.id, commentText);
                e.target.commentText.value = '';
              }}
            >
              <input type="text" name="commentText" placeholder="Agregar comentario" />
              <button type="submit">Agregar</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlbumList;
