import { Link } from 'react-router-dom';
function Header() {
  return (
    <div className="flex w-full max-w-96 items-center justify-between p-3">
      <div className="text-2xl font-bold">Post Builder</div>
      <div className="flex items-center gap-3">
        <a href="https://cloudfiler.vercel.app" target="_blank">
          <button className="">Indexer</button>
        </a>
      </div>
    </div>
  );
}

export default Header;
