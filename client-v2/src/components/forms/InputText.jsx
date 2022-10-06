const InputText = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChangeFN,
  required,
  label,
}) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        id={id}
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeFN}
        required={required}
      />
    </>
  );
};
export default InputText;
