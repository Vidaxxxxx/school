import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Heading = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>
      Get The Job Done
    </Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    marginTop: 60,
    marginBottom: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 50,
    color: 'black',
    fontWeight: 'bold'
  }
})

export default Heading
