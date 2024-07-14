import { motion } from 'framer-motion';

function ResultCard({
  title,
  description,
  type,
  releaseDate,
  thumbnail,
  isSelected,
  handleItemUnselect,
  ...rest
}) {
  return (
    <motion.div
      whileHover={!isSelected && { scale: 1.05 }}
      {...rest}
      className={`relative flex w-full max-w-96 gap-2 pr-4 lg:hover:cursor-pointer `}
    >
      <div className="min-w-12 max-w-12 text-sm">
        <img
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/w94_and_h141_face/${thumbnail}`}
          alt="Prev"
        />
      </div>
      <div className="flex max-w-96 flex-col truncate ">
        <span className="truncate font-semibold capitalize">{title}</span>
        <span className="truncate text-sm text-neutral-300">{description}</span>
        <div className="flex items-center gap-1 text-sm text-neutral-400">
          <span className="capitalize">{type}</span>
          <span>•</span>
          <span>{releaseDate}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default ResultCard;
