import { useState, useEffect } from 'react';

// Api credentials
const apiKey = 'a20f8c5c49dfe9416c888c938ea8e137';
const token = 'ATTA9ca3c19477d882c23e2f1e84d470e04b4b006d0e8f9932feb0e7b3dbe1eb6b56E28A57CA';

export const useCardOperations = (listId) => {
  const [cards, setCards] = useState([]);

  // load at launch cards
  useEffect(() => {
    displayCards();
  }, [listId]);

  // Test Postman :
  // https://api.trello.com/1/lists/65e6ead78b97c193a2840eea/cards?key=a20f8c5c49dfe9416c888c938ea8e137&token=ATTA9ca3c19477d882c23e2f1e84d470e04b4b006d0e8f9932feb0e7b3dbe1eb6b56E28A57CA

  const displayCards = async () => {
    await fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${token}`)
      .then(response => response.json())
      .then(data => {
        const fetchedCards = data.map(card => ({
          title: card.name,
          id: card.id,
          idMembers: card.idMembers,
          members: card.members,
        }));
        setCards(fetchedCards);
      })
      .catch(error => console.error('Error cannot fetch cards:', error));
  };

  const submitCard = async (inputValue) => {
    if (inputValue.match(/^\s*$/)) return;

    const card = {
      name: inputValue,
      idList: listId,
    };

    await fetch('https://api.trello.com/1/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...card, key: apiKey, token: token })
    })
      .then(response => response.json())
      .then(() => {
        displayCards();
      })
      .catch(error => console.error('Error cannot created card:', error));
  };

  const deleteCard = async (cardId) => {
    await fetch(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`, {
      method: 'DELETE',
    })
      .then(() => {
        displayCards();
      })
      .catch(error => console.error('Error cannot delete card:', error));
  };

  const updateCard = async (cardId, newTitle) => {
    await fetch(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`, {
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
        displayCards();
      })
      .catch(error => console.error('Error cannot updated card:', error));
  };
  return { cards, displayCards, submitCard, deleteCard, updateCard };
};
