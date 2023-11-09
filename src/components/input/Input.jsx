const Input = ({
  type,
  placeholder,
  value,
  onChange,
  label,
  error,
  errorMessege,
  reqired,
}) => {
  return (
    <div className="w-full">
      {label && <p className=" ">{label}</p>}
      <input
        className="w-full outline-none bg-transparent border-b border-zinc-500 text-white mb-2 focus:border-b-2 focus:border-zinc-400"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={reqired}
      />
      {error && <span className="text-red-500 text-xs">{errorMessege}</span>}
    </div>
  );
};

export default Input;
