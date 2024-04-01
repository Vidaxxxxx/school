import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ElementButton from '../ElementButton'

const List = ({ navigation, element, updateElement, deleteElement }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(element.title);

  const handleUpdate = () => {
    updateElement(element.id, newTitle);
    setIsEditing(false);
  };
  return (
    <TouchableOpacity style={styles.listContainer} onPress={() => {
      navigation.navigate('Card', { listId: element.id })
    }}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          onChangeText={setNewTitle}
          value={newTitle}
          placeholder="List Name"
        />
      ) : (
        <Text style={styles.listTitle}>{element.title}</Text>
      )}
      
      <View style={styles.buttons}>
        {isEditing ? (
          <ElementButton
            name="Save"
            onPress={handleUpdate}
          />
        ) : (
          <>
            <ElementButton
              name="Edit"
              onPress={() => setIsEditing(true)}
            />
            <ElementButton
              name="Archive"
              onPress={() => deleteElement(element.id)}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ededed',
    padding: 14,
    marginBottom: 7,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    flexDirection: 'column',
  },
  input: {
    fontSize: 17,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
  },
  listTitle: {
    fontSize: 17,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'left',
  }
});

export default List;