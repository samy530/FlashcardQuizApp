import { useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Flashcard } from '../models/Flashcard';
import { loadFlashcards, saveFlashcards } from '../storage/flashcardStorage';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const { theme, toggleTheme, colors } = useTheme();

  const refresh = useCallback(async () => {
    setCards(await loadFlashcards());
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleDelete = async (id: string) => {
    const next = cards.filter((c) => c.id !== id);
    setCards(next);
    await saveFlashcards(next);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Bouton Mode Sombre */}
      <Pressable style={styles.themeToggle} onPress={toggleTheme}>
        <Text style={{ fontSize: 24 }}>
          {theme === 'light' ? '🌙' : '☀️'}
        </Text>
      </Pressable>

      <Pressable style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('EditCard', {})}>
        <Text style={styles.primaryButtonText}>+ Nouvelle carte</Text>
      </Pressable>

      <Pressable
        style={[styles.secondaryButton, { borderColor: colors.primary }, cards.length === 0 && styles.disabled]}
        disabled={cards.length === 0}
        onPress={() => navigation.navigate('Review', { cards, startIndex: 0 })}
      >
        <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Réviser ({cards.length})</Text>
      </Pressable>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.question, { color: colors.text }]} numberOfLines={2}>{item.question}</Text>
            <View style={styles.actions}>
              <Pressable onPress={() => navigation.navigate('EditCard', { card: item })}>
                <Text style={[styles.actionText, { color: colors.primary }]}>Éditer</Text>
              </Pressable>
              <Pressable onPress={() => handleDelete(item.id)}>
                <Text style={[styles.actionText, styles.deleteText]}>Supprimer</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={[styles.empty, { color: colors.subText }]}>Aucune carte pour l'instant.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  themeToggle: { alignSelf: 'flex-end', marginBottom: 10, padding: 8 },
  primaryButton: { padding: 14, borderRadius: 10, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  secondaryButton: { marginTop: 10, padding: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1 },
  secondaryButtonText: { fontWeight: '600', fontSize: 16 },
  disabled: { opacity: 0.4 },
  card: { padding: 14, borderRadius: 10, marginBottom: 10 },
  question: { fontSize: 16, fontWeight: '500', marginBottom: 8 },
  actions: { flexDirection: 'row', gap: 16 },
  actionText: { fontWeight: '500' },
  deleteText: { color: '#dc2626' },
  empty: { textAlign: 'center', marginTop: 40 },
});