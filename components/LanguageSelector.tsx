'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderGlobalAction, Dropdown, Theme } from '@carbon/react';
import { Language, Checkmark } from '@carbon/icons-react';
import { useTheme } from '../app/ThemeContext';
import styles from './LanguageSelector.module.scss';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const languages = useMemo(() => [
    { id: 'en', text: 'English' },
    { id: 'es', text: 'Español' },
    { id: 'fr', text: 'Français' }
  ], []);

  const selectedLanguage = languages.find(lang => lang.id === i18n.language);

  const handleLanguageChange = (selectedItem: { id: string }) => {
    if (selectedItem.id !== i18n.language) {
      i18n.changeLanguage(selectedItem.id);
      document.documentElement.lang = selectedItem.id;
    }
    setIsOpen(false);
  };

  return (
    <Theme theme={theme}>
      <div className={styles.languageSelector}>        
        <HeaderGlobalAction>
          <Dropdown
            id="language-selector"
            titleText={t('switchLanguage')}
            label={
              <div >
                <Language size={20} />
                <span>{selectedLanguage?.text}</span>
              </div>
            }
            items={languages}
            onClick={() => setIsOpen(!isOpen)}
            onChange={({ selectedItem }) => handleLanguageChange(selectedItem!)}
            selectedItem={selectedLanguage}
            itemToElement={(item) => (
              <div className={styles.languageItem}>
                <span>{`${item.text} (${item.id.toUpperCase()})`}</span>
                {item.id === i18n.language && <Checkmark size={16} />}
              </div>
            )}
          />
        </HeaderGlobalAction>

      </div>
    </Theme>
  );
};

export default LanguageSelector;
