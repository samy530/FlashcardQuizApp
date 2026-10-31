# 📱 Flashcard Quiz App

An interactive study mobile application (similar to Anki/Quizlet) built with **React Native**, **Expo**, and **TypeScript**. This project was developed as part of the **CodeAlpha Internship program**.

## 📥 Download the Android App (APK)

You can test the app directly on your Android device. The compiled installation file (`.apk`) is available in the repository:
👉 **[Download the APK here](./apk/FlashcardQuizApp.apk)** 
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

## 🚀 How to Run Locally

1. Clone the repository:
git clone https://github.com/samy530/FlashcardQuizApp.git

2. Install dependencies: 
npm install

3. Start the Expo server:
npx expo start

