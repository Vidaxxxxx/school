import { View, ScrollView, StyleSheet } from 'react-native';
import Input from '../Input';
import ElementList from '../ElementList';
import Card from './Card';
import { useCardOperations } from "../../controller/CardsController";

const CardView = ({navigation, route}) => {
    const { cards, submitCard, deleteCard, updateCard } = useCardOperations(route.params.listId);

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
                    placeholder="New Card name"
                    submitElement={submitCard}
                />
                <ElementList
                    Element={Card}
                    navigation={navigation}
                    elements={cards}
                    deleteElement={deleteCard}
                    updateElement={updateCard}
                />
            </ScrollView>
        </View>
    );
};

export default CardView;
