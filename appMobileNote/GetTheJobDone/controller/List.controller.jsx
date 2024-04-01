import { useState, useEffect } from 'react';
import { useBoardOperations } from './Boards.controller.jsx';

// Api credentials
const apiKey = 'Enter api key there';
const token = 'Enter your token there';


export const useListOperations = (boardId) => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        getLists();
    }, [boardId]);


    const getLists = async () => {
        await fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const fetchedLists = data.map(list => ({
                    title: list.name,
                    id: list.id,
                }));
                setLists(fetchedLists);
            })
            .catch(error => console.error('Error cannot fetch List:', error));
    }

    const createLists = async (inputValue) => {
        if (inputValue.match(/^\s*$/)) return;

        const list = {
            name: inputValue,
            idOrganization: boardId
        };

        await fetch(`https://api.trello.com/1/lists?name=${list.name}&idBoard=${list.idOrganization}&key=${apiKey}&token=${token}`, {
            method: 'POST'
        })
            .then(response => {
                return response.text();
            })
            .then(() => {
                getLists();
            })
            .catch(err => console.error(err));
    }

    const deleteList = async (ListId) => {
        await fetch(`https://api.trello.com/1/lists/${ListId}/closed?key=${apiKey}&token=${token}&value=true`, {
            method: 'PUT'
        })
            .then(() => {
                getLists();
            })
            .catch(error => console.error('Error cannot archibre List:', error));
    };


    const updateList = async (ListId, newTitle) => {
        await fetch(`https://api.trello.com/1/lists/${ListId}?key=${apiKey}&token=${token}`, {//Changer la route api
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
                getLists();
            })
            .catch(error => console.error('Error cannot updated List:', error));
    };

    return { lists, getLists, createLists, deleteList, updateList };
};
