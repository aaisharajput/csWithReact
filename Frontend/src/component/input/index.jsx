// import styles from './style.module.css'

export default function Input(props){
    // const {placeholder="default"}=props //passing default value (1 way)
    const {placeholder,value,onChange}=props;
    return(
        <input placeholder={placeholder}
        value={value} onChange={onChange} className="container"
        />
    )
}

//passing default value (2 way)
Input.defaultProps={
    placeholder:"default"
}