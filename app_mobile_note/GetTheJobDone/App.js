import Heading from './components/Heading';
import WorkspaceView from './components/Workspaces/WorkspaceView';
import BoardView from './components/Boards/BoardView';
import ListView from './components/Lists/ListView';
import CardView from './components/Cards/CardView';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Heading />
      <Stack.Navigator>
        <Stack.Screen name="Workspace" component={WorkspaceView} initialParams={{ userId: 'Enter userID there' }}/>
        <Stack.Screen name="Board" component={BoardView}/>
        <Stack.Screen name="List" component={ListView}/> 
        <Stack.Screen name="Card" component={CardView}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;