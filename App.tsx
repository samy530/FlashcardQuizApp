import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

function AppContent() {
  const { theme } = useTheme();
  
  // On utilise les thèmes par défaut de React Navigation mais on les adapte
  const navTheme = theme === 'dark' ? {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#111827',
      card: '#1f2937',
      text: '#f9fafb',
    }
  } : {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
      card: '#ffffff',
      text: '#111827',
    }
  };

  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}