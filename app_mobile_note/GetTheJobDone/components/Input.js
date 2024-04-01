import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import SubmitButton from './SubmitButton';

const Input = ({ placeholder, submitElement }) => {
  const [ inputValue, onChangeInputValue ] = useState('');
  
  const handleSubmit = () => {
    submitElement(inputValue);
    onChangeInputValue('');
  };

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 25,
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowColor: '#000000',
      shadowOffset: { width: 2, height: 2 }
    },
    input: {
      height: 60,
      width: 250,
      backgroundColor: '#ffffff',
      paddingHorizontal: 10,
    }
  })

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeInputValue}
        value={inputValue}
        placeholder={placeholder}
        placeholderTextColor='#CACACA'
        selectionColor='#666666'
      />
      <SubmitButton submitButton={handleSubmit} />
    </View>
  );

}

export default Input
