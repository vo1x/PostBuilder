import { useEffect, useState } from 'react';
import Option from './Option';
import { Divider, Label } from '../../common';

import useFormStore from '../../../stores/formStore';

function MultiSelector({ label, property, options, defaultOption = [] }) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const updateFormData = useFormStore((state) => state.updateFormData);

  useEffect(() => {
    updateFormData({ [property]: selectedOption.value });
  }, [selectedOption, property]);

  return (
    <div className="flex w-full max-w-80 flex-col items-start gap-2">
      <Label>{label}</Label>
      <div className="flex w-full flex-col rounded-lg bg-[#1C1C1E] px-4 pr-0">
        {options.map((option, i) => (
          <div className="relative" key={i}>
            <Option
              option={option}
              setSelectedOption={setSelectedOption}
              isSelected={selectedOption.value === option.value ? true : false}
            />
            {i < options.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiSelector;
