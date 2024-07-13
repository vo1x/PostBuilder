import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useClipboard from '../../hooks/useClipboard';
function Title({ formData, titleKeys }) {
  const [titleString, setTitleString] = useState('');
  const [copied, handleItemCopy] = useClipboard();
  useEffect(() => {
    const finalString = `Download ${formData.title} (${formData.year})${
      formData.contentType === 'series'
        ? formData.seasonCount > 1
          ? `(Season 1 - ${formData.seasonCount}) `
          : '(Season 1) '
        : ''
    }${formData.contentType === 'series' && formData.ongoing ? `[S${formData.seasonCount.toString().padStart(2, 0)}E${formData.latestEpisode ? formData.latestEpisode.toString().padStart(2, 0) : 'x'} Added]` : ''} ${
      formData.audioType === 'Dual' || formData.audioType === 'Multi'
        ? `${formData.audioType} Audio {${formData.audioLanguages}} `
        : `{${formData.audioLanguages} Audio} `
    }${Object.keys(titleKeys)
      .filter((key) => titleKeys[key])
      .map((key) => `${key} `)
      .join('|| ')}${formData.printType} Esubs`;

    setTitleString(finalString);
  }, [formData, titleKeys]);

  return (
    <div
      className={`col-span-2 flex max-w-96 flex-col items-start gap-4 pr-4 lg:w-full lg:max-w-5xl lg:flex-row lg:items-center `}
      onClick={() => handleItemCopy('Title', titleString, false, true)}
    >
      <motion.span
        initial={{ borderColor: '#525252', color: '#fff' }}
        animate={copied ? { borderColor: '#22c55e', color: '#22c55e' } : ''}
        className={`text-md max-w-96 rounded-md  border bg-neutral-900 p-2 font-bold lg:w-full lg:max-w-full lg:text-lg`}
      >
        {titleString}
      </motion.span>
    </div>
  );
}

export default Title;
