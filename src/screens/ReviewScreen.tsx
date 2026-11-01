import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

export default function ReviewScreen({ route, navigation }: Props) {
  const { cards, startIndex = 0 } = route.params;
  const [index, setIndex] = useState(startIndex);
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  
 
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const { colors } = useTheme();

  const card = cards[index];
  const isFirst = index === 0;
  const isLast = index === cards.length - 1;

  const handleCheckAnswer = () => {
    if (!userAnswer.trim()) return;
    const cleanUserAnswer = userAnswer.trim().toLowerCase();
    const cleanCorrectAnswer = card.answer.trim().toLowerCase();
    
    if (cleanUserAnswer === cleanCorrectAnswer) {
      setStatus('correct');
      setScore((prev) => prev + 1);
    } else {
      setStatus('incorrect');
    }
  };

  const goToNext = () => {
    if (isLast) {

      setIsFinished(true);
    } else {
      setIndex(index + 1);
      setUserAnswer('');
      setStatus('idle');
    }
  };

  const goToPrevious = () => {
    setIndex(index - 1);
    setUserAnswer('');
    setStatus('idle');
  };

  const restartQuiz = () => {
    setIndex(0);
    setUserAnswer('');
    setStatus('idle');
    setScore(0);
    setIsFinished(false);
  };

  
  if (isFinished) {
    const percentage = Math.round((score / cards.length) * 100);
    
    return (
      <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.finishTitle, { color: colors.text }]}>Quiz terminé !</Text>
        
        <View style={[styles.scoreCircle, { borderColor: colors.primary }]}>
          <Text style={[styles.scoreText, { color: colors.primary }]}>
            {score} / {cards.length}
          </Text>
          <Text style={[styles.percentageText, { color: colors.subText }]}>
            {percentage}%
          </Text>
        </View>

        <Text style={[styles.finishMessage, { color: colors.text }]}>
          {percentage === 100 ? "Parfait, sans faute !" : 
           percentage >= 50 ? "Bien joué, continue comme ça !" : 
           "Tu peux faire mieux, entraîne-toi !"}
        </Text>

        <Pressable style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={restartQuiz}>
          <Text style={styles.buttonText}>Recommencer</Text>
        </Pressable>

        <Pressable style={[styles.secondaryButton, { borderColor: colors.primary }]} onPress={() => navigation.goBack()}>
          <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Retour à l'accueil</Text>
        </Pressable>
      </View>
    );
  }

  if (!card) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Aucune carte à réviser.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.counter, { color: colors.subText }]}>{index + 1} / {cards.length}</Text>
        <Text style={[styles.scoreBadge, { color: colors.primary }]}>Score: {score}</Text>
      </View>
      
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.question, { color: colors.text }]}>{card.question}</Text>
      </View>

      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
        placeholder="Tapez votre réponse ici..."
        placeholderTextColor={colors.subText}
        value={userAnswer}
        onChangeText={(text) => {
          setUserAnswer(text);
          if (status !== 'idle') setStatus('idle');
        }}
        editable={status !== 'correct'}
      />

      {status === 'correct' && (
        <View style={styles.correctContainer}>
          <Text style={styles.correctText}>Correct !</Text>
        </View>
      )}
      
      {status === 'incorrect' && (
        <View style={styles.incorrectContainer}>
          <Text style={styles.incorrectText}>Incorrect</Text>
          <Text style={styles.correctAnswerText}>La bonne réponse était : {card.answer}</Text>
        </View>
      )}

      {status !== 'correct' && (
        <Pressable 
          style={[styles.checkButton, !userAnswer.trim() && styles.disabled]} 
          disabled={!userAnswer.trim()} 
          onPress={handleCheckAnswer}
        >
          <Text style={styles.checkButtonText}>Valider la réponse</Text>
        </Pressable>
      )}

      {status === 'idle' && (
        <Pressable style={styles.showButton} onPress={() => setStatus('incorrect')}>
          <Text style={[styles.showButtonText, { color: colors.subText }]}>Je ne sais pas (Voir la réponse)</Text>
        </Pressable>
      )}

      <View style={styles.navRow}>
        <Pressable style={[styles.navButton, { borderColor: colors.primary }, isFirst && styles.disabled]} disabled={isFirst} onPress={goToPrevious}>
          <Text style={[styles.navText, { color: colors.primary }]}>Précédent</Text>
        </Pressable>
        <Pressable style={[styles.navButton, { borderColor: colors.primary, backgroundColor: isLast ? colors.primary : 'transparent' }]} onPress={goToNext}>
          <Text style={[styles.navText, { color: isLast ? '#fff' : colors.primary }]}>
            {isLast ? 'Terminer' : 'Suivant'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingHorizontal: 4 },
  counter: { fontSize: 16 },
  scoreBadge: { fontSize: 16, fontWeight: 'bold' },
  card: { justifyContent: 'center', alignItems: 'center', borderRadius: 16, padding: 32, marginBottom: 20 },
  question: { fontSize: 22, fontWeight: '600', textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 10, padding: 16, fontSize: 16, marginBottom: 12 },
  correctContainer: { backgroundColor: '#dcfce7', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#16a34a' },
  correctText: { color: '#16a34a', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  incorrectContainer: { backgroundColor: '#fee2e2', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#dc2626' },
  incorrectText: { color: '#dc2626', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  correctAnswerText: { color: '#dc2626', fontSize: 16, textAlign: 'center', marginTop: 8, fontWeight: '500' },
  checkButton: { backgroundColor: '#16a34a', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  checkButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  showButton: { padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  showButtonText: { fontWeight: '500', textDecorationLine: 'underline' },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 'auto', paddingBottom: 20 },
  navButton: { flex: 1, padding: 14, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  navText: { fontWeight: '600' },
  disabled: { opacity: 0.4 },
  
  finishTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  scoreCircle: { width: 150, height: 150, borderRadius: 75, borderWidth: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  scoreText: { fontSize: 36, fontWeight: 'bold' },
  percentageText: { fontSize: 18, fontWeight: '600' },
  finishMessage: { fontSize: 18, textAlign: 'center', marginBottom: 40, paddingHorizontal: 20 },
  primaryButton: { width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  secondaryButton: { width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 2 },
  secondaryButtonText: { fontWeight: 'bold', fontSize: 18 },
});