import { View } from 'react-native';

// we can implement type logic here
const ElementList = ({ Element, navigation, elements, deleteElement, updateElement }) => {

  const allElements = elements.map((element) => (
    <Element
      key={element.id}
      navigation={navigation}
      element={element}
      deleteElement={() => deleteElement(element.id)}
      updateElement={updateElement}
    />
  ));

  return (
    <View>
      {allElements}
    </View>
  );
};

export default ElementList;