import { ImageOff, Plus } from 'lucide-react';

import {
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  Link,
  ClipboardCheck,
  LucideLoader,
  ChevronsRight,
  ChevronsLeft,
  Edit,
  Trash,
  UploadCloudIcon
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import useClipboard from '../../hooks/useClipboard';
import useImageDownloader from '../../hooks/useImageDownloader';
import useFormStore from '../../stores/formStore';
import useWordPress from '../../hooks/useWordpress';

function PosterSelector({ posters }) {
  const { uploadImage, isUploading, isUploaded, isError } = useWordPress();

  const updateFormData = useFormStore((state) => state.updateFormData);
  const formData = useFormStore((state) => state.formData);

  const [modalVisible, setModalVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const [selectedPosterUrl, setSelectedPosterUrl] = useState('');
  const [filteredPosters, setFilteredPosters] = useState(posters);

  const [copied, handleItemCopy] = useClipboard();
  const { downloadImage, isDownloading } = useImageDownloader();

  useEffect(() => {
    if (posters && posters.length > 0) {
      const englishPosters = posters.filter((poster) => poster.iso_639_1 === 'en');
      const postersToDisplay = englishPosters.length > 0 ? englishPosters : posters;

      setCurrentPage(0);
      setFilteredPosters(postersToDisplay);

      if (postersToDisplay.length > 0) {
        setSelectedPosterUrl(
          `https://image.tmdb.org/t/p/original${postersToDisplay[0]?.file_path}` || ''
        );
      }
    }
  }, [posters]);

  useEffect(() => {
    updateFormData({
      posterURL: selectedPosterUrl,
      posterFileName: `Download ${formData.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-')}.${selectedPosterUrl.split('.').pop()}`
    });
  }, [selectedPosterUrl]);

  const handlePosterSelect = (posterPath) => {
    if (posterPath.startsWith('https://image.tmdb.org'))
      setSelectedPosterUrl(`https://image.tmdb.org/t/p/original/${posterPath.split('/').pop()}`);

    if (!posterPath.startsWith('https://image.tmdb.org') && !posterPath.startsWith('/')) {
      setSelectedPosterUrl(posterPath);
    } else {
      setSelectedPosterUrl(`https://image.tmdb.org/t/p/original${posterPath}`);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);

  const [scrollOffset, setScrollOffset] = useState(0);

  const maxScrollOffset = Math.max(0, (filteredPosters.length - 3) * 144);

  const handleRightScroll = () => {
    setScrollOffset((prev) => Math.min(prev + 96, maxScrollOffset));
  };

  const handleLeftScroll = () => {
    setScrollOffset((prev) => Math.max(0, prev - 96));
  };

  const handleScrollToStart = () => {
    setScrollOffset(0);
  };

  const handleScrollToEnd = () => {
    setScrollOffset(maxScrollOffset);
  };

  const [showCustomHoverOptions, setShowCustomHoverOptions] = useState(false);

  return (
    <div className="flex items-end  gap-12">
      {previewUrl !== '' ? (
        <div
          onMouseEnter={() => setShowCustomHoverOptions(true)}
          onMouseLeave={() => setShowCustomHoverOptions(false)}
          className="relative"
        >
          <AnimatePresence>
            {showCustomHoverOptions && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: -10, opacity: 100 }}
                exit={{ y: 10, opacity: 0 }}
                className="flex items-center space-x-2 rounded-lg"
              >
                <button
                  onClick={() => setModalVisible(true)}
                  className="rounded-lg bg-[#0a84ff] p-2"
                >
                  <Edit size={20} className=""></Edit>
                </button>
                <button
                  onClick={() => {
                    setPreviewUrl('');
                    setSelectedPosterUrl('');
                  }}
                  className="rounded-lg bg-[#0a84ff] p-2"
                >
                  <Trash size={20} className="" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            src={previewUrl}
            onClick={() => setSelectedPosterUrl(previewUrl)}
            alt=""
            className={`aspect-[2/3] w-36 rounded-lg ${selectedPosterUrl === previewUrl ? 'border-2 border-[#0a84ff]' : ''} `}
          />
        </div>
      ) : (
        <div
          onClick={() => setModalVisible(true)}
          className="flex aspect-[2/3] w-36 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#2c2c2e] text-[#2c2c2e] hover:border-[#0A84FF] hover:text-[#0A84FF]"
        >
          <Plus size={40} className="" />
        </div>
      )}

      {modalVisible && (
        <div className="absolute inset-0  z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col gap-4 rounded-lg bg-[#1c1c1e] p-4">
            <div className="text-2xl" onClick={() => setModalVisible(false)}>
              X
            </div>
            <div className="text-2xl font-semibold">Add custom Poster URL</div>
            <div className="flex gap-6">
              <div className="flex flex-col items-start gap-2">
                <input
                  value={previewUrl}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                  type="text"
                  placeholder="Enter poster URL"
                  className="w-72 rounded-lg bg-[#2c2c2e] p-2 outline-none"
                />
                <button
                  className="rounded-lg bg-[#0A84FF] p-2"
                  onClick={() => {
                    if (previewUrl !== '') {
                      setSelectedPosterUrl(previewUrl);
                      setModalVisible(false);
                    }
                  }}
                >
                  Add Poster
                </button>
              </div>
              <div>
                {previewUrl !== '' ? (
                  <img src={previewUrl} alt="" className="w-44 rounded-lg" />
                ) : (
                  <div className="flex aspect-[2/3] w-44 items-center justify-center rounded-lg bg-[#2c2c2e]">
                    <ImageOff size={40} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" flex flex-col items-end gap-2">
        <div className="mx-auto flex w-full flex-row-reverse items-center justify-between">
          {filteredPosters?.length > 0 && (
            <div className="z-20 flex items-center space-x-2">
              <button
                onClick={handleScrollToStart}
                className="z-20 rounded-lg bg-[#222] p-2 disabled:bg-[#111] disabled:text-white/50"
                disabled={scrollOffset <= 0}
              >
                <ChevronsLeft />
              </button>
              <button
                onClick={handleLeftScroll}
                className="z-20 rounded-lg bg-[#222] p-2 disabled:bg-[#111] disabled:text-white/50"
                disabled={scrollOffset <= 0}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleRightScroll}
                className="z-20 rounded-lg bg-[#222] p-2 disabled:bg-[#111] disabled:text-white/50"
                disabled={scrollOffset >= Math.max(0, (filteredPosters.length - 3) * 144)}
              >
                <ChevronRight />
              </button>
              <button
                onClick={handleScrollToEnd}
                className="z-20 rounded-lg bg-[#222] p-2 disabled:bg-[#111] disabled:text-white/50"
                disabled={scrollOffset >= maxScrollOffset}
              >
                <ChevronsRight />
              </button>
            </div>
          )}

          {filteredPosters.length > 0 && selectedPosterUrl !== '' && (
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-md bg-[#0A84FF] p-2 font-semibold"
                onClick={() => {
                  downloadImage(
                    selectedPosterUrl,
                    `Download ${formData.title.replace(/[^a-zA-Z0-9\s]/g, '')}`,
                    selectedPosterUrl.startsWith('https://image.tmdb.org/')
                  );
                }}
              >
                {isDownloading ? <LucideLoader className="animate-spin" /> : <DownloadIcon />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-md  p-2 font-semibold ${isUploaded ? 'bg-[#16a34a]' : isError ? 'bg-red-600' : 'bg-[#0A84FF]'}`}
                onClick={() => {
                  uploadImage(
                    `Download ${formData.title.replace(/[^a-zA-Z0-9\s]/g, '')}.${selectedPosterUrl.split('.').pop().replace('/', '')}`,
                    selectedPosterUrl
                  );
                }}
              >
                {isUploading ? <LucideLoader className="animate-spin" /> : <UploadCloudIcon />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ backgroundColor: '#0A84FF' }}
                animate={copied ? { backgroundColor: '#16a34a' } : ''}
                onClick={() => handleItemCopy('Poster URL', selectedPosterUrl, false, true)}
                className={`rounded-md  p-2 font-semibold`}
              >
                {copied ? <ClipboardCheck /> : <Link />}
              </motion.button>
            </div>
          )}
        </div>
        <div className="relative flex max-w-max items-center justify-between gap-4 ">
          {scrollOffset > 0 && (
            <div className="absolute z-10 h-full w-24 bg-gradient-to-r from-black  to-transparent" />
          )}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2 overflow-hidden">
              <div
                className={`flex max-w-[600px] gap-6 place-self-start transition-transform duration-200 ease-in-out`}
                style={{ transform: `translateX(-${scrollOffset}px)` }}
              >
                {filteredPosters &&
                  filteredPosters.map((poster) => (
                    <div onClick={() => handlePosterSelect(poster?.file_path)}>
                      <Poster
                        key={poster?.file_path}
                        path={poster?.file_path}
                        isSelected={
                          selectedPosterUrl ===
                          `https://image.tmdb.org/t/p/original${poster?.file_path}`
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {scrollOffset < Math.max(0, (filteredPosters.length - 3) * 144) && (
            <div className="absolute right-0 z-10 h-full w-24 bg-gradient-to-l from-black  to-transparent" />
          )}
        </div>
      </div>
    </div>
  );
}

function Poster({ path, isSelected }) {
  return (
    <div className={`w-36 cursor-pointer`}>
      {path && (
        <img
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${path}`}
          alt=""
          className={`w-44 rounded-lg object-cover ${isSelected ? 'border-2 border-[#0a84ff]' : 'border-2 border-black'} hover:border-[#0a84ff]`}
        />
      )}
    </div>
  );
}

export default PosterSelector;
