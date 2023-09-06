// import styles from './style.module.css'

export default function Button(props){
    const {children,onClick}=props;
    return(
        <button onClick={onClick} className="container">{children}</button>
    )
}
