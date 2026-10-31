import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import EditCardScreen from '../screens/EditCardScreen';
import ReviewScreen from '../screens/ReviewScreen';
import { Flashcard } from '../models/Flashcard';

export type RootStackParamList = {
  Home: undefined;
  EditCard: { card?: Flashcard };
  Review: { cards: Flashcard[]; startIndex?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mes Flashcards' }} />
      <Stack.Screen name="EditCard" component={EditCardScreen} options={{ title: 'Éditer la carte' }} />
      <Stack.Screen name="Review" component={ReviewScreen} options={{ title: 'Révision' }} />
    </Stack.Navigator>
  );
}