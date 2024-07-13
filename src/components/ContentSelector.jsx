import { useState } from 'react';

function ContentSelector({ setFormData }) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const handleTabChange = (index) => {
    if (index === 0) {
      setSelectedTabIndex(0);
      setFormData((prev) => ({ ...prev, contentType: 'movie' }));
    } else {
      setSelectedTabIndex(1);
      setFormData((prev) => ({ ...prev, contentType: 'series' }));
    }
  };

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
