import { useEffect, useState } from 'react';
import langCodes from '../components/langCodes.json';
import Input from './UI/Input';
export default function AudioInputField({ audioType, defaultValue, setAudioLang, formData }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    const audioInputValue =
      audioType === 'Multi'
        ? `Hindi-Tamil-Telugu-${langCodes[formData.originalLang]}`
        : audioType === 'Dual'
          ? `Hindi-${langCodes[formData.originalLang]}`
          : defaultValue;
    setInputValue(audioInputValue);
  }, [audioType]);

  useEffect(() => {
    setAudioLang(inputValue);
  }, [inputValue]);

  return (
    <>
      <Input
        label={'Audio'}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type={'text'}
        placeholder={defaultValue}
      ></Input>
    </>
  );
}
