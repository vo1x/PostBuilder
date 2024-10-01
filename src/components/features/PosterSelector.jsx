import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  Link,
  ClipboardCheck,
  LucideLoader
} from 'lucide-react';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useClipboard from '../../hooks/useClipboard';
import useImageDownloader from '../../hooks/useImageDownloader';
import useFormStore from '../../stores/formStore';

function PosterSelector({ posters, contentTitle }) {
  const updateFormData = useFormStore((state) => state.updateFormData);
  const formData = useFormStore((state) => state.formData);
  const [posterPathInView, setPosterPathInView] = useState(0);
  const [filteredPosters, setFilteredPosters] = useState(posters);
  const handleNextButton = () => {
    if (posterPathInView >= filteredPosters.slice(0, 5).length - 1) {
      setPosterPathInView(0);
    } else {
      setPosterPathInView((prev) => prev + 1);
    }
  };
  const [copied, handleItemCopy] = useClipboard();

  const handlePrevButton = () => {
    if (posterPathInView <= 0) {
      setPosterPathInView(filteredPosters.slice(0, 5).length - 1);
    } else {
      setPosterPathInView((prev) => prev - 1);
    }
  };

  const { downloadImage, isDownloading } = useImageDownloader();

  useEffect(() => {
    if (posters) {
      const englishPosters = posters.filter((poster) => poster.iso_639_1 === 'en');

      if (englishPosters.length === 0) {
        setFilteredPosters(posters.slice(0, 5));
      } else {
        setFilteredPosters(englishPosters.slice(0, 5));
      }
      setPosterPathInView(0);
    }
  }, [posters]);

  useEffect(() => {
    updateFormData({
      posterURL: `https://image.tmdb.org/t/p/original${filteredPosters[posterPathInView]?.file_path}`,
      posterFileName: `Download ${formData.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-')}.${filteredPosters[posterPathInView]?.file_path.split('.').pop()}`
    });
  }, [posterPathInView]);

  return (
    <div className="flex w-full max-w-80 flex-col gap-4">
      <div className="flex max-w-max items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex min-w-44 max-w-44 flex-col items-center gap-2 overflow-hidden">
            <Poster
              key={filteredPosters[posterPathInView]?.file_path}
              path={filteredPosters[posterPathInView]?.file_path}
            />
            {filteredPosters.length > 0 && (
              <div className="flex w-full items-center justify-between text-gray-400">
                <Button btnText={<ChevronLeft size={35} onClick={handlePrevButton} />} />
                <div className="text-lg font-semibold">
                  {`${filteredPosters.length <= 0 ? 0 : posterPathInView + 1}/${filteredPosters.length}`}
                </div>
                <Button btnText={<ChevronRight size={35} onClick={handleNextButton} />} />
              </div>
            )}
          </div>
          {filteredPosters.length > 0 && (
            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-md bg-[#0A84FF] p-2 font-semibold"
                onClick={() =>
                  downloadImage(
                    filteredPosters[posterPathInView]?.file_path,
                    `Download ${contentTitle.replace(/[^a-zA-Z0-9\s]/g, '')}`
                  )
                }
              >
                {isDownloading ? <LucideLoader className="animate-spin" /> : <DownloadIcon />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ backgroundColor: '#0A84FF' }}
                animate={copied ? { backgroundColor: '#16a34a' } : ''}
                onClick={() =>
                  handleItemCopy(
                    'Poster URL',
                    `https://image.tmdb.org/t/p/original${filteredPosters[posterPathInView]?.file_path}`,
                    false,
                    true
                  )
                }
                className={`rounded-md  p-2 font-semibold`}
              >
                {copied ? <ClipboardCheck /> : <Link />}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Poster({ path }) {
  return (
    <div className="min-h-[264px] min-w-44 max-w-44 ">
      {path && (
        <img
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${path}`}
          alt=""
          className="rounded-lg"
        />
      )}
      {!path && (
        <Skeleton
          height={264}
          width={176}
          borderRadius={'8px'}
          baseColor="#1c1c1e"
          enableAnimation={false}
        />
      )}
    </div>
  );
}

function Button({ btnText, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-lg  bg-[#032140] p-0.5 text-[#0A84FF]`}
    >
      <div>{btnText}</div>
    </button>
  );
}

export default PosterSelector;
