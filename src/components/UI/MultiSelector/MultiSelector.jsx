import { useEffect, useState } from 'react';
import Option from './Option';

function MultiSelector({ label, property, options, defaultOption = [], setFormData }) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, [property]: selectedOption.value }));
  }, [selectedOption]);

  return (
    <div className="flex w-full max-w-80 flex-col items-start gap-2">
      <span className="ml-4 uppercase text-neutral-400">{label}</span>
      <div className="flex w-full flex-col rounded-lg bg-[#1C1C1E] px-4 pr-0">
        {options.map((option, i) => (
          <div className="relative" key={i}>
            <Option
              option={option}
              setSelectedOption={setSelectedOption}
              isSelected={selectedOption.value === option.value ? true : false}
            />
            {i < options.length - 1 && <hr className=" border-[#333336] " />} {/* Divider */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiSelector;
