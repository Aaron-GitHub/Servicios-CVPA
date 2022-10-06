const Checkbox = ({ name, id, onChangeFN, checked, label }) => {
  return (
    <>
      <br />
      <input
        className="form-check-input"
        type="checkbox"
        id={id}
        name={name}
        onChange={onChangeFN}
        checked={checked}
      />
      <label>{label}</label>
    </>
  );
};

export default Checkbox;
