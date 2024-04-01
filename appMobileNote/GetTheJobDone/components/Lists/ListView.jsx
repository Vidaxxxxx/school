import { View, ScrollView, StyleSheet } from 'react-native';
import Input from '../Input';
import ElementList from '../ElementList'
import List from './List';
import { useListOperations } from '../../controller/List.controller';

const ListView = ({navigation, route}) => {
    const { lists, createLists, deleteList, updateList } = useListOperations(route.params.boardId);

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
            <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                <Input
                    placeholder="New List name"
                    submitElement={createLists}
                />
                <ElementList
                    Element={List}
                    navigation={navigation}
                    elements={lists}
                    deleteElement={deleteList}
                    updateElement={updateList}
                />
            </ScrollView>
        </View>
    );
};

export default ListView;
