import { useEffect, useState } from 'react';
import CopyButton from '../UI/CopyButton';
function Title({ formData, titleKeys }) {
  const [titleString, setTitleString] = useState('');

  useEffect(() => {
    const finalString = `Download ${formData.title} (${formData.year}) ${
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
    <div className="col-span-2 flex max-w-96 flex-col items-start gap-4 pr-4 lg:w-full lg:max-w-5xl lg:flex-row lg:items-center">
      <span className="text-md max-w-96 rounded-md border border-neutral-600 bg-neutral-900 p-2 font-bold lg:w-full lg:max-w-full lg:text-lg">
        {titleString}
      </span>
      <CopyButton contentToCopy={titleString} />
    </div>
  );
}

export default Title;
