import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { createFlashcard, isValidFlashcard } from '../models/Flashcard';
import { loadFlashcards, saveFlashcards } from '../storage/flashcardStorage';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'EditCard'>;

export default function EditCardScreen({ route, navigation }: Props) {
  const existing = route.params?.card;
  const [question, setQuestion] = useState(existing?.question ?? '');
  const [answer, setAnswer] = useState(existing?.answer ?? '');
  const { colors } = useTheme();

  const handleSave = async () => {
    if (!isValidFlashcard({ question, answer })) {
      Alert.alert('Champs requis', 'La question et la réponse ne peuvent pas être vides.');
      return;
    }
    const cards = await loadFlashcards();
    let next;
    if (existing) {
      next = cards.map((c) => (c.id === existing.id ? { ...c, question: question.trim(), answer: answer.trim() } : c));
    } else {
      next = [...cards, createFlashcard(question, answer)];
    }
    await saveFlashcards(next);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.text }]}>Question</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]} 
        value={question} 
        onChangeText={setQuestion} 
        multiline 
        placeholder="Ex : Qu'est-ce qu'un hook React ?" 
        placeholderTextColor={colors.subText}
      />
      
      <Text style={[styles.label, { color: colors.text }]}>Réponse</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]} 
        value={answer} 
        onChangeText={setAnswer} 
        multiline 
        placeholder="Ex : Une fonction qui permet d'utiliser l'état..." 
        placeholderTextColor={colors.subText}
      />
      
      <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSave}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, minHeight: 80, textAlignVertical: 'top' },
  button: { marginTop: 24, padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});