import { motion } from 'framer-motion';
import useClipboard from '../../hooks/useClipboard';
import Label from '../UI/Label';
import useFormStore from '../../stores/formStore';

export default function Title({ titleKeys }) {
  const formData = useFormStore((state) => state.formData);
  const [copied, handleItemCopy] = useClipboard();
  const titleString = `Download ${formData.title} (${formData.year})${
    formData.contentType === 'series'
      ? formData.seasonCount > 1
        ? ` (Season 1 - ${formData.seasonCount}) `
        : ' (Season 1) '
      : ''
  }${formData.contentType === 'series' && formData.ongoing ? `[S${formData.seasonCount.toString().padStart(2, 0)}E${formData.latestEpisode ? formData.latestEpisode.toString().padStart(2, 0) : 'x'} Added]` : ''} ${
    formData.audioType === 'Dual' || formData.audioType === 'Multi'
      ? `${formData.audioType} Audio {${formData.audioLanguages}} `
      : `{${formData.audioLanguages} Audio} `
  }${Object.keys(titleKeys)
    .filter((key) => titleKeys[key])
    .map((key) => `${key} `)
    .join('|| ')}${formData.printType} Esubs`;

  return (
    <div
      className={`col-span-2 flex max-w-96 flex-col items-start gap-2 pr-4 lg:w-full lg:max-w-5xl`}
      onClick={() => handleItemCopy('Title', titleString, false, true)}
    >
      <Label>Title</Label>
      <motion.span
        initial={{ color: '#fff' }}
        animate={copied ? { color: '#22c55e' } : ''}
        transition={{ duration: 0.2 }}
        className={`text-md max-w-96 cursor-pointer rounded-md bg-[#1c1c1e] p-2 px-4 font-bold lg:w-full lg:max-w-full lg:text-lg`}
      >
        {titleString}
      </motion.span>
    </div>
  );
}
