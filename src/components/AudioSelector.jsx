import { useEffect, useState } from 'react';

import useFormStore from '../stores/formStore';

import langCodes from './langCodes.json';

const AudioSelector = () => {
  const formData = useFormStore((state) => state.formData);
  const updateFormData = useFormStore((state) => state.updateFormData);

  const [inputValue, setInputValue] = useState('');

  const { audioType, originalLang } = formData;

  useEffect(
    () =>
      setInputValue(
        audioType === 'Single'
          ? 'English'
          : audioType === 'Dual'
            ? `Hindi-${langCodes[originalLang]}`
            : `Hindi-English-${langCodes[originalLang]}`
      ),
    [originalLang, audioType]
  );

  useEffect(() => {
    if (inputValue !== '') updateFormData({ audioLanguages: inputValue });
  }, [inputValue]);

  return (
    <div className="flex h-max items-center rounded-lg bg-[#2c2c2e]">
      <select
        name="audioSelector"
        id="audioSelector"
        className="rounded-l-lg bg-inherit p-2 outline-none"
        onChange={(e) => updateFormData({ audioType: e.target.value })}
      >
        <option value="Single">Single</option>
        <option value="Dual">Dual</option>
        <option value="Multi">Multi</option>
      </select>
      <div className="border-r border-white"></div>
      <input
        className={`w-64 rounded-r-lg bg-inherit p-2 outline-none transition-all duration-300 placeholder:text-white/50 lg:w-80`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default AudioSelector;
