import { create } from 'zustand';

const titleKeys = {
  '2160p': false,
  '4k': false,
  '1080p': false,
  '1080p 10bit': false,
  x264: false,
  HEVC: false,
  REMUX: false,
  'HDR DoVi': false
};

const useFormStore = create((set) => ({
  formData: {
    title: 'Movie',
    year: '2024',
    originaLang: 'en',
    seasonCount: 1,
    quality: '1080p',
    printType: 'Web-DL',
    audioType: 'Single',
    audioLanguages: 'English',
    posterURL: '',
    trailerURL: '',
    fields: [],
    contentType: 'movie',
    posters: [],
    itemSelected: false,
    ongoing: false,
    latestEpisode: 0,
    embedCode: ''
  },
  updateFormData: (update) => {
    set((state) => ({ formData: { ...state.formData, ...update } }));
  }
}));

export default useFormStore;
