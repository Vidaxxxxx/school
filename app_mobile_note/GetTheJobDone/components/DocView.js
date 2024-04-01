import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DocView = () => (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>How to Use the App</Text>
        
        <Text style={styles.subtitle}>Welcome to GetTheJobDone!</Text>
        <Text style={styles.text}>
            This guide will help you get started quickly and make the most of all the features available.
        </Text>
        
        <Text style={styles.header}>Navigate</Text>
        <Text style={styles.listItem}>• Open the App: Launch the application on your device.</Text>
        <Text style={styles.listItem}>• Click on a worspace then from here you can select boards/lists/cards</Text>
        
        <Text style={styles.header}>Creating a New Workspace/Board/List/Card</Text>
        <Text style={styles.listItem}>• Add a Workspace/Board/List/card: Name it on the input, usually located at the top or center of your screen, and just click submit !</Text>
        <Text style={styles.listItem}>• Edit your Workspace/Board/List/Card name: Edit the name for your new element with edit button then click save.</Text>
        
        <Text style={styles.header}>Managing Your Workspace/Board/List/card</Text>
        <Text style={styles.listItem}>• View: Scroll through the list to see all your Workspace/Board/List/card.</Text>
        <Text style={styles.listItem}>• Edit: Tap on a workspace to edit its name or other settings.</Text>
        <Text style={styles.listItem}>• Delete: Swipe a workspace to the left to reveal the delete option.</Text>
        
        <Text style={styles.header}>Using the Navigation Tabs</Text>
        <Text style={styles.listItem}>• App: This tab takes you back to your main dashboard where your workspaces are listed.</Text>
        <Text style={styles.listItem}>• Need Help?: If you have questions or need assistance, select this tab to access help documents or contact support.</Text>
        
        <Text style={styles.text}>
            This guide provides a general overview of using the application. Feel free to explore on your own to discover all the features available. If you encounter any difficulties or have questions, the "Need Help?" tab is there to provide you with the necessary assistance.
        </Text>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },
    listItem: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 5,
    },
});

export default DocView;
