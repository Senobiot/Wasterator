const Input = ({ data }) => {
      const [invalid, setInvalid] = useState({});
  
      const vaidate = (id, value) => {
        if (!FORM_INPUTS[id]?.validationPattern) return;
        if (!value.trim()) return setInvalid({...invalid, [id]: ''})
    
        if (FORM_INPUTS[id].validationPattern.test(value)) {
          return setInvalid({...invalid, [id]: 'green'})
        }
        setInvalid({...invalid, [id]: 'red'})
      };

    return (
                  <div>
                    <input
                      style={{borderColor: invalid[FORM_INPUTS.name.id]}}
                      onChange={handleInput}
                      type={FORM_INPUTS.name.type}
                      id={FORM_INPUTS.name.id}
                      placeholder={FORM_INPUTS.name.placeholder}
                      required
                    />
                  </div>
    )
}

export default Input;