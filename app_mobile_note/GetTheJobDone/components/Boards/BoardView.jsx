import { View, ScrollView, StyleSheet} from 'react-native';
import Input from '../Input';
import ElementList from '../ElementList';
import Board from './Board'
import { useBoardOperations } from '../../controller/Boards.controller';

const BoardView = ({navigation, route}) => {
    const { boards, createBoards, deleteBoard, updateBoard } = useBoardOperations(route.params.workspaceId);

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
                    placeholder="New Board name"
                    submitElement={createBoards}
                />
                <ElementList
                    Element={Board}
                    navigation={navigation}
                    elements={boards}
                    deleteElement={deleteBoard}
                    updateElement={updateBoard}
                />
            </ScrollView>
        </View>
    );
};

export default BoardView;
