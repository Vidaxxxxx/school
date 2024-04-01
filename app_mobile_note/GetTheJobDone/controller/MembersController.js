import { useState, useEffect } from 'react';

// Api credentials
const apiKey = 'a20f8c5c49dfe9416c888c938ea8e137';
const token = 'ATTA9ca3c19477d882c23e2f1e84d470e04b4b006d0e8f9932feb0e7b3dbe1eb6b56E28A57CA';
// const boardId = '65e6ead78b97c193a2840ee2'

export const useMembersOperations = (cardId) => {
  const [members, setMembers] = useState([]);
  const [membersByBoard, setMembersByBoard] = useState([]);
  
  
  useEffect(() => {
    displayMembers();
    displayMembersByBoard();
  }, [cardId]);
  
  
  const displayMembers = async () => {
    await fetch(`https://api.trello.com/1/cards/${cardId}/members?key=${apiKey}&token=${token}`)
    .then(response => response.json())
    .then(data => {
      const displayedMembers = data.map(member => ({
        id: member.id,
        username: member.username,
      }));
      setMembers(displayedMembers);
    })
    .catch(error => console.error('Error cannot display members:', error));
  };
  
  const getBoardOfCard = async () => {
    return await fetch(`https://api.trello.com/1/cards/${cardId}/board?key=${apiKey}&token=${token}&fields=board.id`)
    .then(response => response.json())
    .then(boardId => {
      return boardId.id
    })
    .catch(err => console.error(err));
  };
  
  
  const displayMembersByBoard = async () => {
    const boardId = await getBoardOfCard(cardId);
    await fetch(`https://api.trello.com/1/boards/${boardId}/members?key=${apiKey}&token=${token}`)
      .then(response => response.json())
      .then(data => {
        const displayMembersByBoard = data.map(member => ({
          id: member.id,
          username: member.username,
        }));
        setMembersByBoard(displayMembersByBoard);
      })
      .catch(error => console.error('Error cannot display membersByBoards:', error));
  };

  const assignMemberToCard = async (cardId, memberId) => {
    const url = `https://api.trello.com/1/cards/${cardId}/idMembers?value=${memberId}&key=${apiKey}&token=${token}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        alert("This member is assigned yet!");
      }
      displayMembers();
    } catch (error) {
      console.error('Error assigning member to card:', error);
    }
  };

  return { members, membersByBoard, displayMembers, assignMemberToCard, displayMembersByBoard };
};