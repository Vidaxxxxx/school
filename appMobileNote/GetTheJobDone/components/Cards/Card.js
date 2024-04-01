import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ElementButton from '../ElementButton'
import { useMembersOperations } from "../../controller/MembersController";

const Card = ({ element, updateElement, deleteElement }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(element.title);
  const [isSelectingMember, setIsSelectingMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const { members, membersByBoard, assignMemberToCard } = useMembersOperations(element.id);
  
  // allow to take only the username from members
  const usernames = members.map(member => member.username);

  const handleUpdate = () => {
    updateElement(element.id, newTitle);
    setIsEditing(false);
  };

  const handleMemberChange = (memberId) => {
    setSelectedMember(memberId);
    if (memberId) {
      assignMemberToCard(element.id, memberId)
      setIsSelectingMember(false);
      setSelectedMember(null);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          onChangeText={setNewTitle}
          value={newTitle}
          placeholder="Card name"
        />
      ) : (
        <Text style={styles.cardTitle}>{element.title}</Text>
      )}
      <Text>Assigned: {usernames.join(", ")}</Text>
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
              name="Delete"
              onPress={() => deleteElement(element.id)}
            />
            <ElementButton
              name="Assign"
              onPress={() => setIsSelectingMember(!isSelectingMember)}
            />
          </>
        )}
      </View>
        {isSelectingMember && (
          <Picker
          selectedValue={selectedMember}
          onValueChange={handleMemberChange}
          style={styles.pickerStyle}>
          <Picker.Item label="Select Member" value={null} />
          {membersByBoard.map((member) => (
            <Picker.Item key={member.id} label={member.username} value={member.id} />
          ))}
        </Picker>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
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
  cardTitle: {
    fontSize: 17,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  assignSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  pickerStyle: {
    width: '100%',
    height: 50,
  },
});

export default Card;