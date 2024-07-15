import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Poster({ path }) {
  return (
    <div className="min-h-[264px] min-w-44 max-w-44 ">
      {path && (
        <img
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${path}`}
          alt=""
          className="rounded-lg"
        />
      )}
      {!path && (
        <Skeleton
          height={264}
          width={176}
          borderRadius={'8px'}
          baseColor="#1c1c1e"
          enableAnimation={false}
        />
      )}
    </div>
  );
}

export default Poster;
