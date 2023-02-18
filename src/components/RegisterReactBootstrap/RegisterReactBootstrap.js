import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
    const [passwordError,setPasswordError] = useState('');
    const [success,setSuccess] = useState('');

    const handleRegister = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
            if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
                setPasswordError('Please Enter at least two uppercase letter');
                 return; 
            }
            if (password.length<6) {
                setPasswordError('please enter at least 6 character');
                return;
            }
            // if (!/(?=.[@%*&]/.test(password)) {
            //     setPasswordError('please enter at least 1 special character');
            //     return;
            // }

        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            form.reset();
            verifyEmail();
            setSuccess('User Created Successfully');
            
        }).catch(error =>{
            console.error(error);
            setPasswordError(error.message);
        })

        const verifyEmail = () =>{
            sendEmailVerification(auth.currentUser)
            .then(() =>{
                alert('verify your email');
            })
        }
      }
    return (
        <div>
            <h3 className='text-primary'>Please Register!!!</h3>
             <Form onSubmit={handleRegister} className='mx-auto w-50 mt-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" name='email' placeholder="Enter email" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" name='password' placeholder="Password" required />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    <p className='text-danger'>{passwordError}</p>
                    {
                        success && <p className='text-success'>{success}</p>
                    }
                    <p>Already Have Account <Link to='/login'>Please login</Link></p>
               </Form>
        </div>
    );
};

export default RegisterReactBootstrap;