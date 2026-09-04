import { useContext } from 'react';
import { ThemeContext, type ThemeValue } from '../context/ThemeProvider';

export function useTheme(): ThemeValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return context;
}
