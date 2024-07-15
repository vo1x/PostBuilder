function Button({ btnText, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-lg  bg-[#032140] p-0.5 text-[#0A84FF]`}
    >
      <div>{btnText}</div>
    </button>
  );
}

export default Button;
