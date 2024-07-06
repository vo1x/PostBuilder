import { Link } from 'react-router-dom';
function Header() {
  return (
    <div className="flex w-full max-w-96 items-center justify-between p-3">
      <div className="text-2xl font-bold">Cloudfiler</div>
      <div className="flex items-center gap-3">
        <a href="https://cloudfiler.vercel.app" target="_blank">
          <button className="">Indexer</button>
        </a>

        <Link to={`/builder`}>
          <button className="">Post Builder</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
