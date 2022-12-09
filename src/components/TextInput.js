import { useController } from "react-hook-form";

const TextInput = (props) => {
    const { field } = useController(props);
    return (
      <div 
        className="form-group-edit" 
        style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            margin: '10px 0'
        }}
        >
        <input className="edit" type={"text"} {...field} />
        <label className="name-input" htmlFor={"text"}>
          {props.label}
        </label>
      </div>
    );
  }

  export default TextInput