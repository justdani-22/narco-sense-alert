
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'blue' | 'purple' | 'green';
type Language = 'it' | 'en' | 'fr' | 'es' | 'de';
type FontSize = 'small' | 'medium' | 'large';

type WidgetId = 'heartRate' | 'oxygenLevel' | 'bloodPressure' | 'brainActivity' | 'wearable' | 'quickActions';

interface Preferences {
  theme: Theme;
  language: Language;
  highContrast: boolean;
  screenReader: boolean;
  fontSize: FontSize;
  enabledWidgets: WidgetId[];
  animations: boolean;
}

interface PreferenceContextType {
  preferences: Preferences;
  updatePreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
  toggleWidget: (widgetId: WidgetId) => void;
  resetPreferences: () => void;
}

const defaultPreferences: Preferences = {
  theme: 'light',
  language: 'it',
  highContrast: false,
  screenReader: false,
  fontSize: 'medium',
  enabledWidgets: ['heartRate', 'oxygenLevel', 'bloodPressure', 'brainActivity', 'wearable', 'quickActions'],
  animations: true,
};

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Applica le classi al documento in base alle preferenze
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Imposta la classe per il contrasto alto
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Imposta la dimensione del font
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large');
    document.documentElement.classList.add(`text-${preferences.fontSize}`);
    
    // Imposta la classe per il tema colorato
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-blue', 'theme-purple', 'theme-green');
    document.documentElement.classList.add(`theme-${preferences.theme}`);
    
  }, [preferences]);

  const updatePreference = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const toggleWidget = (widgetId: WidgetId) => {
    setPreferences(prev => {
      const isEnabled = prev.enabledWidgets.includes(widgetId);
      return {
        ...prev,
        enabledWidgets: isEnabled
          ? prev.enabledWidgets.filter(id => id !== widgetId)
          : [...prev.enabledWidgets, widgetId]
      };
    });
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferenceContext.Provider value={{ preferences, updatePreference, toggleWidget, resetPreferences }}>
      {children}
    </PreferenceContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferenceContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferenceProvider');
  }
  return context;
};

// Utility per tradurre il testo in base alla lingua selezionata
const translations = {
  it: {
    save: 'Salva',
    cancel: 'Annulla',
    theme: 'Tema',
    language: 'Lingua',
    accessibility: 'Accessibilità',
    widgets: 'Widget',
    reset: 'Ripristina impostazioni predefinite',
    // ... altre traduzioni in italiano
  },
  en: {
    save: 'Save',
    cancel: 'Cancel',
    theme: 'Theme',
    language: 'Language',
    accessibility: 'Accessibility',
    widgets: 'Widgets',
    reset: 'Reset to defaults',
    // ... altre traduzioni in inglese
  },
  // ... altre lingue
};

// Utilità per ottenere le traduzioni nella lingua corrente
export const useTranslation = () => {
  const { preferences } = usePreferences();
  return {
    t: (key: keyof typeof translations.it) => 
      translations[preferences.language]?.[key] || translations.en[key] || key,
  };
};
