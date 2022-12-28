import './Modal.css';

export default function Modal({active, setActive, children}){
    return(
        <div>
            <div className={active ? 'modal active' : 'modal'} onClick={()=> setActive(false)}>
                <div className={active ? 'modal_content active' : 'modal_content'} onClick={e=> e.stopPropagation()}>
                    <h3>Sign in</h3>
                    <p>Enter your email address below and we will email you your login page</p>
                    {children}
                </div>
            </div>

        </div>
    )
}