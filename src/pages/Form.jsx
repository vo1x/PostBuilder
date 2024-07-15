import EmbedCode from '../components/EmbedCode';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Field from '../components/Field';
import Header from '../components/Header';
import TitleGen from '../components/TitleGen/TitleGen';
import AudioInputField from '../components/AudioInputField';
import Input from '../components/UI/Input';
import Title from '../components/TitleGen/Title';
import SearchBar from '../components/Search/SearchBar';
import PosterSelector from '../components/Posters/PosterSelector';
import useFields from '../hooks/useFields';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import MultiSelector from '../components/UI/MultiSelector/MultiSelector';
import ContentSelector from '../components/ContentSelector';
import Label from '../components/UI/Label';
import Divider from '../components/UI/Divider';
function FormBuilder() {
  const { fetchFieldInfo } = useFields();
  const [fields, setFields] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [prevFolderID, setPrevFolderID] = useState([]);

  const removeField = (indexToRemove) => {
    setInputValue('');
    setPrevFolderID((prevFolderID) => prevFolderID.filter((_, index) => index !== indexToRemove));
    setFields((prevFields) => prevFields.filter((_, index) => index !== indexToRemove));
  };

  const [audioLang, setAudioLang] = useState('English');

  const [formData, setFormData] = useState({
    title: 'Movie',
    year: '2024',
    originaLang: 'en',
    seasonCount: 1,
    quality: '1080p',
    printType: 'Web-DL',
    audioType: 'Single',
    audioLanguages: audioLang,
    posterURL: '',
    trailerURL: '',
    fields: fields,
    contentType: 'movie',
    posters: [],
    itemSelected: false,
    ongoing: false,
    latestEpisode: 0,
    embedCode: ''
  });

  const handleAudioLangChange = (lang) => {
    setAudioLang(lang);
    setFormData((prev) => ({ ...prev, audioLanguages: lang }));
  };

  const addField = (data, i) => {
    setInputValue('');
    const { name: fieldTitle } = data[0];
    setFields([...fields, { title: fieldTitle, value: data }]);
  };

  const moveFieldUp = (oldIndex) => {
    if (oldIndex > 0 && oldIndex < fields.length) {
      const currFields = [...fields];

      const temp = currFields[oldIndex];
      currFields[oldIndex] = currFields[oldIndex - 1];
      currFields[oldIndex - 1] = temp;

      setFields(currFields);
    }
  };
  const moveFieldDown = (oldIndex) => {
    if (oldIndex >= 0 && oldIndex < fields.length - 1) {
      const currFields = [...fields];

      const temp = currFields[oldIndex];
      currFields[oldIndex] = currFields[oldIndex + 1];
      currFields[oldIndex + 1] = temp;

      setFields(currFields);
    }
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fields: fields
    }));
  }, [fields]);

  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [titleKeys, setTitleKeys] = useState({
    '2160p': false,
    '4k': false,
    '1080p': false,
    '1080p 10bit': false,
    x264: false,
    HEVC: false,
    REMUX: false,
    'HDR DoVi': false
  });

  useEffect(() => {
    setTitleKeys((prevKeys) => ({
      ...prevKeys,
      '2160p': formData.quality === '2160p' ? true : false,
      '4k': formData.quality === '2160p' ? true : false,
      '1080p': formData.quality === '1080p' || formData.quality === '2160p' ? true : false,
      '1080p 10bit': false,
      x264: formData.quality === '1080p' || formData.quality === '2160p' ? true : false,
      HEVC: formData.quality === '2160p' ? true : false
    }));
  }, [formData]);

  const handleAddFieldBtn = () => {
    fetchFieldInfo(inputValue).then((data) => addField(data));
  };

  const qualityOptions = [
    { name: '1080p', value: '1080p' },
    { name: '2160p', value: '2160p' }
  ];

  const printTypeOptions = [
    { name: 'WEB-DL', value: 'WEB-DL' },
    { name: 'Blu-ray', value: 'Blu-ray' }
  ];
  const audioTypeOptions = [
    { name: 'Single', value: 'Single' },
    { name: 'Dual', value: 'Dual' },
    { name: 'Multi', value: 'Multi' }
  ];

  return (
    <>
      <div className="grid place-items-center overflow-hidden lg:max-h-svh lg:p-4">
        <div className="max-w-screen lg:w-100vw flex flex-col lg:grid lg:grid-cols-2">
          <div className="lg:scrollbar-hidden flex flex-col gap-8 overflow-auto overflow-x-hidden p-5 lg:max-h-svh">
            <div className="flex flex-col gap-2">
              <Header></Header>
              <SearchBar setFormData={setFormData}></SearchBar>
            </div>

            <div className="flex flex-col gap-2">
              <Label>MEDIA INFO</Label>
              <div className="flex w-full max-w-[350px] flex-col items-center justify-center gap-4 rounded-lg bg-[#1C1C1E] p-4 lg:max-w-max">
                <ContentSelector formData={formData} setFormData={setFormData}></ContentSelector>
                <div className=" flex flex-col  gap-4  px-4 lg:px-0 ">
                  <Input
                    label={'Title'}
                    value={formData.title}
                    name={'title'}
                    onChange={handleInputFieldChange}
                    type={'text'}
                  />
                  <div className="flex w-full gap-4">
                    <Input
                      label={'Year'}
                      value={formData.year}
                      name={'year'}
                      onChange={handleInputFieldChange}
                      type={'number'}
                    />
                    <AnimatePresence>
                      {formData.contentType === 'series' && (
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                        >
                          <Input
                            label={`Season`}
                            value={formData.seasonCount}
                            name={`seasonCount`}
                            onChange={handleInputFieldChange}
                            type={'number'}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex max-w-80 flex-col gap-8 rounded-lg lg:max-w-none lg:flex-row">
              <MultiSelector
                label={'Quality'}
                property={'quality'}
                options={qualityOptions}
                setFormData={setFormData}
                defaultOption={qualityOptions[0]}
              />

              <MultiSelector
                label={'Print Type'}
                property={'printType'}
                options={printTypeOptions}
                setFormData={setFormData}
                defaultOption={printTypeOptions[0]}
              />
            </div>
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex flex-col items-start gap-2">
                <MultiSelector
                  label={'Audio Type'}
                  property={'audioType'}
                  options={audioTypeOptions}
                  setFormData={setFormData}
                  defaultOption={audioTypeOptions[0]}
                />
                <AudioInputField
                  audioType={formData.audioType}
                  defaultValue={'English'}
                  setAudioLang={handleAudioLangChange}
                  formData={formData}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label>Title Generator</Label>
                <TitleGen titleKeys={titleKeys} setTitleKeys={setTitleKeys}></TitleGen>
              </div>
            </div>
            <Input
              label={'Trailer'}
              value={formData.trailerURL}
              name={'trailerURL'}
              onChange={handleInputFieldChange}
              placeholder={'Embed URL'}
              type={'text'}
            />

            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-20">
              <div className=" flex flex-col gap-2">
                <Label>Poster</Label>
                <PosterSelector
                  posters={formData.posters}
                  setFormData={setFormData}
                  itemSelected={formData.itemSelected}
                  contentTitle={formData?.title}
                ></PosterSelector>
              </div>
            </div>

            <div className="flex max-w-96 flex-col gap-2 lg:max-w-xl">
              <Label>Fields: {fields.length}</Label>

              <div className="flex flex-col gap-2 ">
                <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                  <Input
                    label={'URL'}
                    type={'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={'File or Folder URL'}
                  ></Input>
                  <button
                    onClick={handleAddFieldBtn}
                    className="flex items-center gap-1 rounded-md bg-blue-600 p-2 py-1 text-sm font-semibold transition-all duration-300 hover:bg-blue-700"
                  >
                    Add Field
                  </button>
                </div>
                <div className={`rounded-xl ${fields.length >= 1 ? 'bg-[#1C1C1E]' : ''} p-4 pr-0`}>
                  {fields.map((field, i) => (
                    <div className="relative flex max-w-xl flex-col">
                      <Field key={i} fieldIndex={i + 1} data={field}></Field>
                      {i < fields.length - 1 && (
                        <div className="py-4">
                          <Divider />
                        </div>
                      )}
                      <div className="absolute right-0 top-0 flex gap-4 pr-4 ">
                        {fields.length > 1 && i === 0 ? (
                          <button
                            onClick={() => moveFieldDown(i)}
                            className=" text-lg text-neutral-400 transition-all duration-200 "
                          >
                            <ChevronDown size={30} />
                          </button>
                        ) : fields.length > 1 && i === fields.length - 1 ? (
                          <button
                            onClick={() => moveFieldUp(i)}
                            className=" text-lg text-neutral-400 transition-all duration-200 "
                          >
                            <ChevronUp size={30} />
                          </button>
                        ) : fields.length>1 && (
                          <div className="flex items-center">
                            <button
                              onClick={() => moveFieldUp(i)}
                              className=" text-lg text-neutral-400 transition-all duration-200 "
                            >
                              <ChevronUp size={30} />
                            </button>
                            <button
                              onClick={() => moveFieldDown(i)}
                              className=" text-lg text-neutral-400 transition-all duration-200 "
                            >
                              <ChevronDown size={30} />
                            </button>
                          </div>
                        )}

                        <button
                          onClick={() => removeField(i)}
                          className="  text-lg text-neutral-400 transition-all duration-200 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 lg:h-screen lg:overflow-y-auto lg:p-0">
            <Title formData={formData} titleKeys={titleKeys} />
            <EmbedCode formData={formData}></EmbedCode>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormBuilder;
