
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { UserType, updateUser, userSelector } from '../../redux/userSlice';
import style from '../../styles/Profile.module.css';

const Profile = () => {
    const { currentUser } = useAppSelector(userSelector)
    const dispatch = useAppDispatch();

    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        avatar: ''
    }) 

    useEffect(() => {
        if(!currentUser) return;
        
        setValues(currentUser)
    },[currentUser])

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

        dispatch(updateUser(values as UserType))
    }

    return(
        <section className={style.profile}>
            {!currentUser ? (
                <span>You need to log In</span>
            ) : (
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
                    <button type="submit" className={style.submit}>
                       Update
                    </button>
                </form>    
            )}
        </section>
    )
}

export default Profile;