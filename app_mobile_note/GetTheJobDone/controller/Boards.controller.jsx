import { useState, useEffect } from 'react';

// Api credentials
const apiKey = 'Enter api key there';
const token = 'Enter token there';

export const useBoardOperations = (workspaceId) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, [workspaceId]);

  /* ------------------------------ Get not done ------------------------------ */
  const getBoards = async () => {
    await fetch(`https://api.trello.com/1/organizations/${workspaceId}/boards?key=${apiKey}&token=${token}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const fetchedBoards = data.map(board => ({
          title: board.name,
          id: board.id,
        }));
        setBoards(fetchedBoards);
      })
      .catch(error => console.error('Error cannot fetch cards:', error));
  }

  const createBoards = async (inputValue) => {
    if (inputValue.match(/^\s*$/)) return;

    const board = {
      name: inputValue,
      idOrganization: workspaceId
    };

    await fetch(`https://api.trello.com/1/boards/?idOrganization=${board.idOrganization}&name=${board.name}&key=${apiKey}&token=${token}`, {//Changer la route api
      method: 'POST'
    })
      .then(response => {
        return response.text();
      })
      .then(() => {
        getBoards();
      })
      .catch(err => console.error(err));
  }

  const deleteBoard = async (boardId) => {
    await fetch(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${token}`, {//Changer la route api
      method: 'DELETE',
    })
      .then(() => {
        getBoards();
      })
      .catch(error => console.error('Error cannot delete board:', error));
  };


  const updateBoard = async (boardId, newTitle) => {
    await fetch(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${token}`, {//Changer la route api
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newTitle,
      })
    })
      .then(response => response.json())
      .then(data => {
        getBoards();
      })
      .catch(error => console.error('Error cannot updated board:', error));
  };

  return { boards, getBoards, createBoards, deleteBoard, updateBoard };
};
