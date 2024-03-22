import { IoClose } from "react-icons/io5";
import style from '../../styles/User.module.css';
import React, { ChangeEvent, FC, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { createUser } from "../../redux/userSlice";

interface SignUpFormProps {
    closeForm: () => void
    toggleCurrentFormType: (type: string) => void
}

const SignUpForm: FC<SignUpFormProps> = ({closeForm, toggleCurrentFormType}) => {
    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        avatar: ''
    })
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values, 
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).every(val => val);
        if(!isNotEmpty) return;

        dispatch(createUser(values))
        closeForm()
    }

    return(
        <div className={style.wrapper}>
            <div className={style.close} onClick={closeForm}>
                <IoClose/>
            </div>
            <div className={style.title}>
                Sign Up
            </div>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.group}>
                    <input 
                        type="email" 
                        placeholder="Your email" 
                        name="email" 
                        value={values.email} 
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={style.group}>
                    <input 
                        type="name" 
                        placeholder="Your name" 
                        name="name" 
                        value={values.name}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={style.group}>
                    <input 
                        type="password" 
                        placeholder="Your password" 
                        name="password" 
                        value={values.password}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={style.group}>
                    <input 
                        type="avatar" 
                        placeholder="Your avatar" 
                        name="avatar" 
                        value={values.avatar} 
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={style.link} onClick={() => toggleCurrentFormType('login')}>I already have an account</div>
                <button type="submit" className={style.submit}>
                    Create an account
                </button>
            </form>
        </div>
    )
}

export default SignUpForm;