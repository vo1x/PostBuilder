import EmbedCode from '../components/EmbedCode';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Field from '../components/Field';
import Header from '../components/Header';
import TitleGen from '../components/TitleGen/TitleGen';
import AudioInputField from '../components/AudioInputField';
import Input from '../components/Input';
import Title from '../components/TitleGen/Title';
import SearchBar from '../components/Search/SearchBar';
import PosterSelector from '../components/Posters/PosterSelector';
import useFields from '../hooks/useFields';
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
    latestEpisode: 0
  });

  const handleAudioLangChange = (lang) => {
    setAudioLang(lang);
    setFormData((prev) => ({ ...prev, audioLanguages: lang }));
  };

  const [embedString, setEmbedString] = useState([]);

  const addField = (data, i) => {
    setInputValue('');
    const { name: fieldTitle } = data[0];
    setFields([...fields, { title: fieldTitle, value: data }]);
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fields: fields
    }));
  }, [fields]);

  const [loading, setLoading] = useState(false);

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

  const handleAddFieldBtn = () => {
    fetchFieldInfo(inputValue).then((data) => addField(data));
  };

  return (
    <>
      <div className="grid place-items-center overflow-hidden lg:max-h-svh lg:p-4">
        <div className="max-w-screen lg:w-100vw flex flex-col lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-4 overflow-auto overflow-x-hidden p-5 lg:max-h-svh">
            <Header></Header>
            <SearchBar setFormData={setFormData}></SearchBar>
            <div className=" flex flex-col gap-4 lg:flex-row lg:items-center">
              <Input
                label={'Title'}
                value={formData.title}
                name={'title'}
                onChange={handleInputFieldChange}
                type={'text'}
              />
              <div className="flex gap-4">
                <Input
                  label={'Year'}
                  value={formData.year}
                  name={'year'}
                  onChange={handleInputFieldChange}
                  type={'number'}
                />
                {formData.contentType === 'series' && (
                  <Input
                    label={`Season Count`}
                    value={formData.seasonCount}
                    name={`seasonCount`}
                    onChange={handleInputFieldChange}
                    type={'number'}
                  />
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="">Quality</label>
                <select
                  name=""
                  id=""
                  className="rounded-md bg-neutral-700 p-1 text-sm outline-none"
                  value={formData.quality}
                  onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                >
                  <option value="1080p">1080p</option>
                  <option value="2160p">2160p</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="">Print Type</label>
                <select
                  name=""
                  id=""
                  className="rounded-md bg-neutral-700 p-1 text-sm outline-none"
                  value={formData.printType}
                  onChange={(e) => setFormData({ ...formData, printType: e.target.value })}
                >
                  <option value="Web-DL">Web-DL</option>
                  <option value="Bluray">Bluray</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
              <div className="flex items-center gap-2">
                <label htmlFor="">Audio Type</label>
                <select
                  name=""
                  id=""
                  className="rounded-md bg-neutral-700 p-1 text-sm outline-none"
                  value={formData.audioType}
                  onChange={(e) => setFormData({ ...formData, audioType: e.target.value })}
                >
                  <option value="Single">Single</option>
                  <option value="Dual">Dual</option>
                  <option value="Multi">Multi</option>
                </select>
              </div>
              <AudioInputField
                audioType={formData.audioType}
                defaultValue={'English'}
                setAudioLang={handleAudioLangChange}
              />
            </div>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-20">
              <div className=" flex flex-col gap-4">
                <span className="text-base font-semibold">Poster</span>

                {formData.posters !== 0 && (
                  <PosterSelector
                    posters={formData.posters}
                    setFormData={setFormData}
                    itemSelected={formData.itemSelected}
                    contentTitle={formData?.title}
                  ></PosterSelector>
                )}
              </div>
              <div className=" flex flex-col items-start gap-2">
                <span className="text-base font-semibold">Title Generator</span>
                <TitleGen titleKeys={titleKeys} setTitleKeys={setTitleKeys}></TitleGen>
              </div>
            </div>
            <div className="">
              <Input
                label={'Trailer'}
                value={formData.trailerURL}
                name={'trailerURL'}
                onChange={handleInputFieldChange}
                placeholder={'Embed URL'}
                type={'text'}
              />
            </div>

            <div className=" flex max-w-5xl flex-col gap-3 rounded-md border border-neutral-700 bg-neutral-900 p-4">
              Fields: {fields.length}
              {/* Render existing fields */}
              {/* {fields.map((field, i) => (
                <div className="relative">
                  <Field
                    key={i}
                    fieldIndex={i + 1}
                    data={field.fieldData}
                    setEmbedString={setEmbedString}
                    contentType={formData.contentType}
                  ></Field>
                  <button
                    onClick={() => removeField(i)}
                    className="absolute right-0 top-0 m-3 text-lg text-neutral-400 transition-all duration-200 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))} */}
              {/* Button to add a new field */}
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                <input
                  type="text"
                  placeholder="File or Folder URL"
                  className="w-3/5 rounded-md border border-white/20 bg-white/5 p-2 text-sm outline-none transition-all duration-300 placeholder:text-white/50 focus:border-white/70 lg:ml-2"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
                <button
                  onClick={handleAddFieldBtn}
                  className="flex items-center gap-1 rounded-md bg-blue-600 p-2 py-1 text-sm font-semibold transition-all duration-300 hover:bg-blue-700"
                >
                  Add Field
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 lg:h-screen lg:overflow-y-auto lg:p-0">
            <Title formData={formData} titleKeys={titleKeys} />
            <EmbedCode formData={formData} fieldsCount={fields.length}></EmbedCode>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormBuilder;
