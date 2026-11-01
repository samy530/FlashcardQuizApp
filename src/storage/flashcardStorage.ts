import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flashcard } from '../models/Flashcard';

const STORAGE_KEY = '@flashcards';

const DEFAULT_CARDS: Flashcard[] = [
  {
    id: 'default-1',
    question: "Quelle est la capitale de la France ?",
    answer: "Paris",
    createdAt: Date.now(),
  },
  {
    id: 'default-2',
    question: "Que signifie l'acronyme HTML ?",
    answer: "HyperText Markup Language",
    createdAt: Date.now(),
  },
  {
    id: 'default-3',
    question: "Combien de côtés a un hexagone ?",
    answer: "6",
    createdAt: Date.now(),
  },
  {
    id: 'default-4',
    question: "Quel langage est principalement utilisé pour styliser des pages web ?",
    answer: "CSS",
    createdAt: Date.now(),
  },
  {
    id: 'default-5',
    question: "Quelle planète est la plus proche du Soleil ?",
    answer: "Mercure",
    createdAt: Date.now(),
  },
  {
    id: 'default-6',
    question: "En JavaScript, quel mot-clé déclare une constante ?",
    answer: "const",
    createdAt: Date.now(),
  },
  {
    id: 'default-7',
    question: "Qui a peint la Joconde ?",
    answer: "Léonard de Vinci",
    createdAt: Date.now(),
  },
  {
    id: 'default-8',
    question: "Que signifie l'acronyme SQL ?",
    answer: "Structured Query Language",
    createdAt: Date.now(),
  },
  {
    id: 'default-9',
    question: "Quel est le plus grand océan du monde ?",
    answer: "Pacifique",
    createdAt: Date.now(),
  },
  {
    id: 'default-10',
    question: "Combien d'octets y a-t-il dans un kilooctet (Ko) ?",
    answer: "1024",
    createdAt: Date.now(),
  }
];

export async function loadFlashcards(): Promise<Flashcard[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    
    if (!raw || raw === '[]') {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CARDS));
      return DEFAULT_CARDS;
    }
    
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CARDS;
  } catch (error) {
    console.warn('Failed to load flashcards', error);
    return DEFAULT_CARDS;
  }
}

export async function saveFlashcards(cards: Flashcard[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (error) {
    console.warn('Failed to save flashcards', error);
  }
}