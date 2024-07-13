import { useEffect, useState } from 'react';
import langCodes from '../components/langCodes.json';

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
    <input
      type="text"
      className={`w-64 rounded-lg bg-[#2C2C2E] p-2 outline-none transition-all duration-300 placeholder:text-white/50 lg:w-80  `}
      placeholder={defaultValue}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
