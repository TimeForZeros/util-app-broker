type InputProps = {
  name: string,
  componentType: 'basic' | 'advanced'
}

type CheckboxProps = InputProps & {
  value: boolean
}
export const CheckboxComponent = ({ name, value, componentType }) => {
  const handleChange = (e) => console.log(e.target.checked)
  };
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input id={name} type="checkbox" onChange={handleChange} checked={value} />
    </div>
  );
};