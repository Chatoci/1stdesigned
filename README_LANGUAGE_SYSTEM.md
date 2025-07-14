# 🌍 Language System Documentation

## Overview
This portfolio website now supports both English (EN) and Lao (ລາວ) languages with a complete internationalization system.

## 📁 File Structure

```
src/
├── contexts/
│   └── LanguageContext.tsx          # React context for language management
├── components/
│   └── LanguageSwitcher.tsx         # Language toggle component
├── translations/
│   ├── en.ts                        # English translations
│   └── lo.ts                        # Lao translations
└── pages/
    └── Home.tsx                     # Updated to use translations
```

## 🚀 Features

### ✅ Implemented
- **Language Context**: Centralized language state management
- **Translation Files**: Complete EN/LAO translations for all content
- **Language Switcher**: Easy toggle between languages in navbar
- **Dynamic Content**: All text content updates based on selected language
- **Responsive Design**: Language switcher works on mobile and desktop

### 📝 Translation Coverage
- Navigation menu
- Hero section
- Showcase section
- Customer reviews
- Blog section
- Contact page
- About page
- Services page
- Work page
- 404 page
- Footer

## 🛠️ Usage

### Using Translations in Components

```tsx
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { t, translations } = useLanguage();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
};
```

### Adding New Translations

1. **Add to English file** (`src/translations/en.ts`):
```tsx
export const en = {
  // ... existing translations
  newSection: {
    title: "New Section Title",
    description: "New section description"
  }
};
```

2. **Add to Lao file** (`src/translations/lo.ts`):
```tsx
export const lo = {
  // ... existing translations
  newSection: {
    title: "ຫົວຂໍ້ໃໝ່",
    description: "ຄຳອະທິບາຍໃໝ່"
  }
};
```

3. **Use in component**:
```tsx
<h2>{t('newSection.title')}</h2>
<p>{t('newSection.description')}</p>
```

## 🎨 Language Switcher

The language switcher is automatically included in the navbar and provides:
- **Visual feedback**: Active language is highlighted
- **Smooth transitions**: Instant language switching
- **Mobile responsive**: Works on all screen sizes
- **Accessibility**: Proper ARIA labels

## 🔧 Technical Details

### Language Context API
```tsx
interface LanguageContextType {
  language: 'en' | 'lo';           // Current language
  setLanguage: (lang: 'en' | 'lo') => void;  // Change language
  t: (key: string) => string;      // Get translation
  translations: typeof en;         // Full translation object
}
```

### Translation Key Structure
- Use dot notation for nested objects: `t('nav.home')`
- Supports arrays and complex objects
- Fallback to key name if translation missing

## 🌐 Adding New Languages

To add a new language (e.g., Thai):

1. **Create translation file** (`src/translations/th.ts`):
```tsx
export const th = {
  nav: {
    home: "หน้าแรก",
    work: "ผลงาน",
    // ... rest of translations
  }
};
```

2. **Update LanguageContext**:
```tsx
import { th } from '../translations/th';

type Language = 'en' | 'lo' | 'th';

const translations = {
  en,
  lo,
  th
}[language];
```

3. **Update LanguageSwitcher**:
```tsx
<LanguageButton onClick={() => handleLanguageChange('th')}>
  ไทย
</LanguageButton>
```

## 📱 Mobile Support

The language system is fully responsive:
- Language switcher adapts to mobile layout
- All translations work on mobile devices
- Touch-friendly language buttons

## 🎯 Best Practices

1. **Always use translation keys** instead of hardcoded text
2. **Keep translation keys descriptive** and organized
3. **Test both languages** when adding new content
4. **Use consistent naming** for similar content types
5. **Consider text length** - Lao text is often longer than English

## 🔄 Future Enhancements

- [ ] Language persistence (localStorage)
- [ ] Auto-detection of user's preferred language
- [ ] RTL language support
- [ ] Translation management system
- [ ] Dynamic content loading

---

**Note**: This system provides a solid foundation for multilingual support and can be easily extended for additional languages or features. 