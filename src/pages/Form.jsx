import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Input, Label, Divider } from '../components/common';

import {
  TitleGen,
  AudioInputField,
  Title,
  SearchBar,
  PosterSelector,
  MultiSelector,
  ContentSelector,
  Field
} from '../components/features';

import { Header, EmbedCode } from '../components/layout';

import useFields from '../hooks/useFields';
import useWordPress from '../hooks/useWordpress';

import useFormStore from '../stores/formStore';

function FormBuilder() {
  const { fetchFieldInfo } = useFields();
  const [inputValue, setInputValue] = useState('');

  const formData = useFormStore((state) => state.formData);
  const updateFormData = useFormStore((state) => state.updateFormData);

  const removeField = (indexToRemove) => {
    setInputValue('');
    updateFormData({ fields: formData.fields.filter((_, index) => index !== indexToRemove) });
  };

  const addField = (data) => {
    setInputValue('');
    const { name: fieldTitle } = data[0];
    updateFormData({ fields: [...formData.fields, { title: fieldTitle, value: data }] });
  };

  const moveFieldUp = (oldIndex) => {
    if (oldIndex > 0 && oldIndex < formData.fields.length) {
      const currFields = [...formData.fields];

      const temp = currFields[oldIndex];
      currFields[oldIndex] = currFields[oldIndex - 1];
      currFields[oldIndex - 1] = temp;

      updateFormData({ fields: currFields });
    }
  };

  const moveFieldDown = (oldIndex) => {
    if (oldIndex >= 0 && oldIndex < formData.fields.length - 1) {
      const currFields = [...formData.fields];

      const temp = currFields[oldIndex];
      currFields[oldIndex] = currFields[oldIndex + 1];
      currFields[oldIndex + 1] = temp;

      updateFormData({ fields: currFields });
    }
  };

  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
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
  }, [formData.quality]);

  const handleAddFieldBtn = () => {
    if (inputValue === '') {
      return toast.error('URL is required', {
        theme: 'colored',
        autoClose: 2000,
        position: 'top-right'
      });
    }

    if (
      !inputValue.startsWith('https://drive.google.com/') &&
      !inputValue.startsWith('https://drive.usercontent.google.com/')
    ) {
      return toast.error('Invalid URL format', {
        theme: 'colored',
        autoClose: 2000,
        position: 'top-right'
      });
    }

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

  const { createDraft } = useWordPress();
  const handleCreateDraft = () => {
    createDraft(formData.wpTitle, formData.embedCode, formData.posterURL, formData.posterFileName);
  };

  return (
    <>
      <div className="grid place-items-center overflow-hidden lg:max-h-svh lg:p-4">
        <div className="max-w-screen lg:w-100vw flex flex-col lg:grid lg:grid-cols-2">
          <div className="lg:scrollbar-hidden flex flex-col gap-8 overflow-auto overflow-x-hidden p-5 lg:max-h-svh">
            <div className="flex flex-col gap-2">
              <Header></Header>
              <div className="flex items-center space-x-6">
                <SearchBar />
                {/* <button
                  onClick={handleCreateDraft}
                  className="self-start rounded-lg bg-[#0A84FF] p-2 font-semibold"
                >
                  Create Draft
                </button> */}
              </div>
            </div>
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex flex-col gap-2">
                <Label>MEDIA INFO</Label>
                <div className="flex w-full max-w-[350px] flex-col items-center justify-center gap-4 rounded-lg bg-[#1C1C1E] p-4 lg:max-w-max">
                  <ContentSelector formData={formData}></ContentSelector>
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
                            <Input
                              label={`Episode`}
                              value={formData.episodeNum}
                              name={`episodeNum`}
                              onChange={handleInputFieldChange}
                              type={'number'}
                            ></Input>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4">
                <MultiSelector
                  label={'Audio Type'}
                  property={'audioType'}
                  options={audioTypeOptions}
                  defaultOption={audioTypeOptions[0]}
                />
                <AudioInputField audioType={formData.audioType} defaultValue={'English'} />
              </div>
            </div>
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex min-w-80 max-w-80 flex-col gap-8">
                <MultiSelector
                  label={'Quality'}
                  property={'quality'}
                  options={qualityOptions}
                  defaultOption={qualityOptions[0]}
                />

                <MultiSelector
                  label={'Print Type'}
                  property={'printType'}
                  options={printTypeOptions}
                  defaultOption={printTypeOptions[0]}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label>Title Generator</Label>
                <TitleGen titleKeys={titleKeys} setTitleKeys={setTitleKeys}></TitleGen>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <Label>Poster</Label>
              <PosterSelector
                posters={formData.posters}
                itemSelected={formData.itemSelected}
              ></PosterSelector>
            </div>
            <Input
              label={'Trailer'}
              value={formData.trailerURL}
              name={'trailerURL'}
              onChange={handleInputFieldChange}
              placeholder={'Embed URL'}
              type={'text'}
            />

            <div className="flex max-w-96 flex-col gap-2 lg:max-w-xl">
              <Label>Fields: {formData.fields.length}</Label>

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
                    className="flex items-center gap-1 rounded-md bg-[#0A84FF] px-4 py-2 transition-all duration-300 hover:bg-blue-700"
                  >
                    Add Field
                  </button>
                </div>
                <div
                  className={`rounded-xl ${formData.fields.length >= 1 ? 'bg-[#1C1C1E]' : ''} p-4 pr-0`}
                >
                  {formData.fields.map((field, i) => (
                    <div key={i} className="relative flex max-w-xl flex-col">
                      <Field key={i} fieldIndex={i + 1} data={field}></Field>
                      {i < formData.fields.length - 1 && (
                        <div className="py-4">
                          <Divider />
                        </div>
                      )}
                      <div className="absolute right-0 top-0 flex gap-4 pr-4 ">
                        {formData.fields.length > 1 && i === 0 ? (
                          <button
                            onClick={() => moveFieldDown(i)}
                            className=" text-lg text-neutral-400 transition-all duration-200 "
                          >
                            <ChevronDown size={30} />
                          </button>
                        ) : formData.fields.length > 1 && i === formData.fields.length - 1 ? (
                          <button
                            onClick={() => moveFieldUp(i)}
                            className=" text-lg text-neutral-400 transition-all duration-200 "
                          >
                            <ChevronUp size={30} />
                          </button>
                        ) : (
                          formData.fields.length > 1 && (
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
                          )
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
