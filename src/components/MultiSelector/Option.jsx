import { Bold, Check } from 'lucide-react';
function Option({ option, setSelectedOption, isSelected }) {
  return (
    <button
      className="flex w-full items-center justify-between py-2 text-left outline-none"
      onClick={() => setSelectedOption(option)}
    >
      <span>{option.name}</span>
      {isSelected && (
        <span className="mr-6">
          <Check className="text-blue-500 " fontWeight={Bold}></Check>
        </span>
      )}
    </button>
  );
}

export default Option;