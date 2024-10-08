import { motion } from 'framer-motion';
import { Divider } from '../../common';

const TitleGen = ({ titleKeys, setTitleKeys }) => {
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    setTitleKeys((prevStates) => ({
      ...prevStates,
      [value]: checked
    }));

    if (value === '2160p') {
      setTitleKeys((prevStates) => ({
        ...prevStates,
        '4k': checked,
        HEVC: checked
      }));
    }
  };

  return (
    <div className="relative flex w-full flex-col gap-2 overflow-hidden whitespace-normal break-all rounded-xl bg-[#1C1C1E]  lg:max-w-5xl   ">
      <div className="flex items-center gap-2">
        <div className="flex max-w-80 select-none flex-col justify-between gap-4 rounded-md pl-4 lg:max-w-xl">
          <div className="flex items-center gap-2 p-4 pb-0 pl-0 ">
            <Tag tagName={'2160p'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
            <Tag tagName={'1080p'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
            <Tag tagName={'1080p 10bit'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
          </div>
          <Divider />
          <div className="flex items-center gap-2 px-4 pl-0">
            <Tag tagName={'x264'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
            <Tag tagName={'HEVC'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
          </div>
          <Divider />
          <div className="flex items-center gap-2 p-4 pl-0 pt-0">
            <Tag tagName={'REMUX'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
            <Tag tagName={'HDR DoVi'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
          </div>
        </div>
      </div>
    </div>
  );
};

function Tag({ tagName, titleKeys, handleCheckbox }) {
  return (
    <div>
      <input
        type="checkbox"
        id={`${tagName}box`}
        value={tagName}
        checked={titleKeys[tagName]}
        onChange={(e) => handleCheckbox(e)}
        className="hidden"
      />
      <motion.label
        whileTap={{ scale: 0.9 }}
        htmlFor={`${tagName}box`}
        className={`block w-24 rounded-md text-center ${titleKeys[tagName] ? 'bg-[#0289F5]' : 'bg-[#3A393F]'} p-1`}
      >
        {tagName}
      </motion.label>
    </div>
  );
}

export default TitleGen;
