import Tag from './Tag';
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
        '4k': checked
      }));
    }
  };

  return (
    <div className="relative flex w-max max-w-5xl flex-col gap-2 overflow-hidden whitespace-normal break-all rounded-md  bg-[#1C1C1E] p-2">
      <div className="flex items-center gap-2">
        <div className="flex max-w-80 select-none flex-col justify-between gap-4 rounded-md p-2 lg:max-w-xl">
          <div className="flex items-center gap-2">
            <Tag tagName={'2160p'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
            <Tag tagName={'1080p'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
            <Tag tagName={'1080p 10bit'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
          </div>
          <hr className=" border-[#333336] " />
          <div className="flex items-center gap-2">
            <Tag tagName={'x264'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
            <Tag tagName={'HEVC'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
          </div>
          <hr className=" border-[#333336] " />
          <div className="flex items-center gap-2">
            <Tag tagName={'REMUX'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
            <Tag tagName={'HDR DoVi'} titleKeys={titleKeys} handleCheckbox={handleCheckbox} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleGen;
