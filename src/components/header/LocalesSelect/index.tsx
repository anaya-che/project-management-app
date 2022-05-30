import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select, { ActionMeta, SingleValue } from 'react-select';
import './index.scss';

type onChange =
  | ((
      newValue: SingleValue<{
        value: string;
        label: string;
      }>,
      actionMeta: ActionMeta<{
        value: string;
        label: string;
      }>
    ) => void)
  | undefined;

const LocaleSelect = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('');
  const options = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' },
  ];

  const getValueStrFromLS = (name: string) => {
    const matches = localStorage.getItem(name);
    return matches ? matches : '';
  };

  useEffect(() => {
    setLang(getValueStrFromLS('i18nextLng'));
  }, []);

  const onChange: onChange = (newValue) => {
    const language = newValue?.value;
    i18n.changeLanguage(language);
    setLang(getValueStrFromLS('i18nextLng'));
  };

  return (
    <div className="local-select">
      <Select
        classNamePrefix="react-select"
        options={options}
        isSearchable={false}
        value={lang === 'en' ? options[0] : options[1]}
        onChange={onChange}
      />
    </div>
  );
};

export default LocaleSelect;
