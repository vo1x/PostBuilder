import { motion } from 'framer-motion';

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
        // onClick={{ scale: 0.9 }}
        htmlFor={`${tagName}box`}
        className={`block w-24 rounded-md text-center ${titleKeys[tagName] ? 'bg-[#0289F5]' : 'bg-[#3A393F]'} p-1`}
      >
        {tagName}
      </motion.label>
    </div>
  );
}

export default Tag;
