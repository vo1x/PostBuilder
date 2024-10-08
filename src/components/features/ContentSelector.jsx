import { useEffect, useState } from 'react';

import useFormStore from '../../stores/formStore';

function ContentSelector() {
  // const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const formData = useFormStore((state) => state.formData);
  const updateFormData = useFormStore((state) => state.updateFormData);
  const handleTabChange = (index) => {
    if (index === 0) {
      updateFormData({ contentType: 'movie' });
    } else {
      updateFormData({ contentType: 'series' });
    }
  };

  const selectedTabIndex = formData.contentType === 'movie' ? 0 : 1;

  // useEffect(() => {
  //   if (formData.contentType === 'movie') setSelectedTabIndex(0);
  //   else setSelectedTabIndex(1);
  // }, [formData.contentType]);

  return (
    <div className="flex w-max rounded-[10px] bg-[#3A393F] p-0.5">
      <button
        onClick={() => handleTabChange(0)}
        className={`${selectedTabIndex === 0 ? 'bg-[#706F74] font-semibold' : ''} w-24 rounded-lg px-2 py-1`}
      >
        Movies
      </button>
      <button
        onClick={() => handleTabChange(1)}
        className={`${selectedTabIndex === 1 ? 'bg-[#706F74] font-semibold' : ''} w-24 rounded-lg px-2 py-1`}
      >
        Series
      </button>
    </div>
  );
}

export default ContentSelector;
