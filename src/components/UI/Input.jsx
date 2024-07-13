function Input({ label, value, name, onChange, type, placeholder, ...rest }) {
  return (
    <div className=" flex items-center justify-center ">
      <label
        htmlFor=""
        className=" rounded-l-lg bg-[#2C2C2E] p-2 px-4 font-semibold text-neutral-400"
      >
        {label}
      </label>
      <input
        {...rest}
        value={value}
        min={type === 'number' ? 1 : ''}
        name={name}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`rounded-r-lg  ${type === 'text' ? ' w-80' : 'w-16'}  bg-[#2C2C2E] p-2 outline-none transition-all duration-300 placeholder:text-white/50  `}
      />
    </div>
  );
}

export default Input;
