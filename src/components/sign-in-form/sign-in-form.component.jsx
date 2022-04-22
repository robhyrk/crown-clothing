import {useState} from 'react'
import FormInput from '../form-input/form-input.component'
import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component'
import './sign-in-form.styles.scss'
import { useDispatch } from 'react-redux'
import { signInUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInform = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields   

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields()
        } catch(err) {
            switch(err.code) {
                case "auth/wrong-password":
                    alert("incorrect password")
                    break
                case "auth/user-not-found":
                    alert("no user associated with this email")
                    break
                default:
                    console.log(err)
            }
        }
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target

        setFormFields({...formFields, [name]:value})
    }

    const signInWithGoogle = async () => {
         dispatch(googleSignInStart())
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email"  type="email" required name="email" onChange={handleChange} value={email}/>
                
                <FormInput label="Password"  type="password" required name="password" onChange={handleChange} value={password}/>
                <div className='buttons-container'>
                    <Button onClick={(event)=>handleSubmit(event)} type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle} type="submit">Google Sign In</Button>
                </div>        
            </form>
        </div>
    )
}

export default SignInform