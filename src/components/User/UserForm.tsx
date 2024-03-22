import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleForm, toggleFormType, userSelector } from "../../redux/userSlice";
import SignUpForm from "./SignUpForm";

import style from '../../styles/User.module.css'
import LogInForm from "./LogInForm";


const UserForm = () => {
    const dispatch = useAppDispatch()
    const { showForm, formType } = useAppSelector(userSelector)

    const closeForm = () => dispatch(toggleForm(false))
    const toggleCurrentFormType = (type: string) => dispatch(toggleFormType(type))
    return(
        showForm ?
        (<>
            <div className={style.overlay} onClick={closeForm}/>
           {formType === 'signup' ? (
                <SignUpForm 
                    closeForm={closeForm}
                    toggleCurrentFormType={toggleCurrentFormType}
                />
            ) : (
                <LogInForm 
                    closeForm={closeForm}
                    toggleCurrentFormType={toggleCurrentFormType}
                />
            )}
        </>)
        :
       ( <></> )
    )
}

export default UserForm;