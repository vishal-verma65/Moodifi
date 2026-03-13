import "../style/authStyle.scss"

const FormGroup = ({label, placeholder, value, onChange}) => {
  return (
    <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input 
          value={value}
          onChange={onChange} 
          type={label} 
          name={label} 
          id={label} 
          required 
          placeholder={placeholder} />
    </div>
  )
}

export default FormGroup