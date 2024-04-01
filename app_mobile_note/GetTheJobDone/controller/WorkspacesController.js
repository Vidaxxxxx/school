import { useState, useEffect } from 'react';

// Api credentials
const apiKey = 'a20f8c5c49dfe9416c888c938ea8e137';
const token = 'ATTA9ca3c19477d882c23e2f1e84d470e04b4b006d0e8f9932feb0e7b3dbe1eb6b56E28A57CA';
// const userId = '65dce6cc1f2f0dcab00210db';

export const useWorkspaceOperations = (userId) => {
  const [workspaces, setWorkspaces] = useState([]);

  // load at launch workspaces
  useEffect(() => {
    displayWorkspaces();
  }, [userId]);


  const displayWorkspaces = async () => {
    await fetch(`https://api.trello.com/1/members/${userId}/organizations?key=${apiKey}&token=${token}`)
    .then(response => response.json())
    .then(data => {
      const fetchedWorkspaces = data.map(workspace => ({
        id: workspace.id,
        title: workspace.displayName,
        workspaceMembers: workspace.memberships,
      }))
      setWorkspaces(fetchedWorkspaces)
    })
    .catch(error => console.error('Error cannot fetch workspaces:', error));
  };

  const submitWorkspace = async (inputValue) => {
    if (inputValue.match(/^\s*$/)) return;

    const workspace = {
      displayName: inputValue
    };

    await fetch('https://api.trello.com/1/organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...workspace, key: apiKey, token: token })
    })
    .then(response => response.json())
    .then(() => {
      displayWorkspaces();
    })
    .catch(error => console.error('Error cannot created workspace:', error));
  };

  const deleteWorkspace = async (workspaceId) => {
    await fetch(`https://api.trello.com/1/organizations/${workspaceId}?key=${apiKey}&token=${token}`, {
      method: 'DELETE',
    })
    .then((response) => {
      displayWorkspaces();
    })
    .catch(error => console.error('Error cannot delete workspace:', error));
  };

  const updateWorkspace = async (workspaceId, newTitle) => {
    await fetch(`https://api.trello.com/1/organizations/${workspaceId}?key=${apiKey}&token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        displayName: newTitle,
      })
    })
    .then(response => response.json())
    .then(data => {
      displayWorkspaces();
    })
    .catch(error => console.error('Error cannot updated workspace:', error));
  };

  return { workspaces, displayWorkspaces, submitWorkspace, deleteWorkspace, updateWorkspace };
};
