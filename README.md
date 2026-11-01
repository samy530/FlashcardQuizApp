# 📱 Flashcard Quiz App

An interactive study mobile application (similar to Anki/Quizlet) built with **React Native**, **Expo**, and **TypeScript**. This project was developed as part of the **CodeAlpha Internship program**.

## 📥 Download the Android App (APK)

You can test the app directly on your Android device. The compiled installation file (`.apk`) is available in the repository:
👉 **[Download the APK here](https://github.com/samy530/FlashcardQuizApp/tree/main/apk)** 
*(Note: Make sure to enable "Install from unknown sources" on your Android device).*

## ✨ Features

- **Interactive Quiz Mode**: Type your answer and the app verifies if it is correct (case-insensitive).
- **Scoring System**: A final screen displays your score and percentage.
- **Full CRUD**: Add, edit, or delete your own flashcards.
- **Local Persistence**: Cards are saved locally on the device using `AsyncStorage`.
- **Dark / Light Mode**: Dynamic theming managed with React Context.
- **Seed Data**: 10 questions are preloaded on the first launch.

## 🛠️ Tech Stack

- **Framework**: React Native (via Expo SDK 58)
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack)
- **Storage**: `@react-native-async-storage/async-storage`

---

## 🏗️ Project Architecture

The project follows a modular architecture (Separation of Concerns) to ensure clean, maintainable, and testable code:
- **`src/models/`** : Data structures and business rules.
- **`src/storage/`** : Local data persistence logic.
- **`src/context/`** : Global state management (for the Dark Mode).
- **`src/screens/`** : UI pages (Home, Edit, Review).
- **`src/navigation/`** : App routing (GPS of the app).

## 🧠 Code Explanation

### A. The Model: `src/models/Flashcard.ts`
The core of the application.
- **`interface Flashcard`**: A TypeScript contract ensuring every card has an `id`, `question`, `answer`, and `createdAt` date.
- **`createFlashcard`**: Generates a unique ID using `Date.now()` and a random string.
- **`isValidFlashcard`**: Validates that the question and answer are not empty (using `.trim()`).

### B. Storage: `src/storage/flashcardStorage.ts`
Handles the phone's memory using `AsyncStorage`.
- **`DEFAULT_CARDS`**: 10 preloaded questions so the app is never empty on first launch.
- **`loadFlashcards`**: Fetches data. If the storage is empty (`!raw` or `raw === '[]'`), it automatically injects the default cards.
- **`saveFlashcards`**: Converts the array of cards to a string (`JSON.stringify`) and saves it locally.

### C. Global Theme: `src/context/ThemeContext.tsx`
Manages the Dark/Light mode globally across all screens.
- **`ThemeContext`**: Provides the colors and the toggle function to the entire app without prop drilling.
- **`useTheme`**: A custom hook allowing any screen to access `colors` and `toggleTheme`.
- **`colors`**: An object containing color codes for both light and dark modes.

### D. Home Screen: `src/screens/HomeScreen.tsx`
The dashboard of the app.
- **`useFocusEffect`**: Reloads data from storage every time the user returns to this screen (e.g., after adding a card).
- **`FlatList`**: Optimized list rendering for the flashcards.
- **Theme Toggle**: Calls `toggleTheme` to switch between 🌙 and ☀️.

### E. Edit Screen: `src/screens/EditCardScreen.tsx`
The form to create or update a card.
- **`route.params?.card`**: Checks if the user clicked "Edit" (pre-fills the fields) or "+ New Card" (leaves fields empty).
- **`handleSave`**: Validates the inputs, fetches existing cards, adds/updates the current one, and saves.

### F. Quiz Screen: `src/screens/ReviewScreen.tsx`
The most complex and interactive part.
- **`useState`**: Tracks the current card index, user input, answer status (correct/incorrect), and the global score.
- **`handleCheckAnswer`**: Converts both answers to lowercase (`.toLowerCase()`) for case-insensitive comparison. If correct, increments the score.
- **End Screen (`if (isFinished)`)**: Displays a final screen with a circular score and a calculated percentage.

### G. Navigation: `src/navigation/RootNavigator.tsx`
Uses **React Navigation**. Declares 3 screens (`Home`, `EditCard`, `Review`) and allows navigation via `navigation.navigate('ScreenName')`.

---

## 🚀 How to Run Locally

1. Clone the repository:
git clone https://github.com/samy530/FlashcardQuizApp.git

2. Install dependencies: 
npm install

3. Start the Expo server:
npx expo start

