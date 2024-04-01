import React from 'react'
import { Text, StyleSheet, TouchableHighlight } from 'react-native'

const SubmitButton = ({ submitButton }) => (
  <TouchableHighlight style={styles.button} underlayColor='#efefef' onPress={submitButton}>
    <Text style={styles.submit}>
      Submit
    </Text>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  button: {
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submit: {
    color: '#666666',
    fontWeight: '600'
  }
})

export default SubmitButton
