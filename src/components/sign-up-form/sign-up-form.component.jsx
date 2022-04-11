import {useState} from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-up-form.styles.scss'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpform = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            console.log('doesnt match')
            return
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()
        } catch(err) {
            if(err.code === 'auth/email-already-in-use'){
                console.log('already signed up')
            }
            console.log(err)
        }
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target

        setFormFields({...formFields, [name]:value})
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an email or password?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required name="displayName" onChange={handleChange} value={displayName}/>
                
                <FormInput label="Email"  type="email" required name="email" onChange={handleChange} value={email}/>
                
                <FormInput label="Password"  type="password" required name="password" onChange={handleChange} value={password}/>
                
                <FormInput label="Confirm Password"  type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword}/>
                
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpform