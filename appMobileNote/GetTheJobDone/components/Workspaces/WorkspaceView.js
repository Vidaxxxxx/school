import { View, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Input from '../Input';
import ElementList from "../ElementList";
import Workspace from './Workspace';
import TabBar from '../TabBar'
import DocView from '../DocView';
import { useWorkspaceOperations } from "../../controller/WorkspacesController";

const WorkspaceView = ({ navigation, route }) => {
    const { workspaces, submitWorkspace, deleteWorkspace, updateWorkspace } = useWorkspaceOperations(route.params.userId);
    const [activeView, setActiveView] = useState('App')

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#f5f5f5',
            flex: 1,
        },
        content: {
            flex: 1,
        },
    });

    return (
        <View style={styles.container}>
             {activeView === 'App' && (
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Input
                        placeholder="New Workspace name"
                        submitElement={submitWorkspace}
                    />
                    <ElementList
                        Element={Workspace}
                        navigation={navigation}
                        elements={workspaces}
                        deleteElement={deleteWorkspace}
                        updateElement={updateWorkspace}
                    />
                </ScrollView>
            )}
            {activeView === 'Need help ?' && <DocView />}
            <TabBar
                type={activeView}
                setType={setActiveView} />
        </View>

    );
};

export default WorkspaceView;