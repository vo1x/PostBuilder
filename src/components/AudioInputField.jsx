import { useEffect, useState } from 'react';
import langCodes from './langCodes.json';
import Input from './UI/Input';
import useFormStore from '../stores/formStore';

export default function AudioInputField({ audioType, defaultValue }) {
  const formData = useFormStore((state) => state.formData);
  const updateFormData = useFormStore((state) => state.updateFormData);

  const [inputValue, setInputValue] = useState(defaultValue);

  const { originalLang } = formData;

  useEffect(() => {
    const audioInputValue =
      audioType === 'Multi'
        ? `Hindi-Tamil-Telugu-${langCodes[originalLang]}`
        : audioType === 'Dual'
          ? `Hindi-${langCodes[originalLang]}`
          : defaultValue;
    setInputValue(audioInputValue);
  }, [audioType, originalLang]);

  useEffect(() => {
    updateFormData({ audioLanguages: inputValue });
  }, [inputValue]);

  return (
    <>
      <Input
        label={'Audio'}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type={'text'}
        placeholder={defaultValue}
      />
    </>
  );
}
