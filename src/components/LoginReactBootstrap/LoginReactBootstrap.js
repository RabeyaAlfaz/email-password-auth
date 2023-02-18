import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import app from '../firebase/firebase.init';

const auth = getAuth(app);
const LoginReactBootstrap = () => {
    const [userEmail,setUserEmail] = useState(''); 
    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;
      
        signInWithEmailAndPassword(auth,email,password)
        .then(result => {
             const user = result.user;
             console.log(user);
             form.reset();
        }).catch(error =>{
            console.error(error);
        })

        console.log(form);
       
    }
    const sendEmail = (event) =>{
        const email = event.target.value;
        setUserEmail(email);
    }
    const handlePasswordReset = () =>{
        if(!userEmail){
            alert('please type your email first');
        }
        sendPasswordResetEmail(auth, userEmail)
         .then(() => {
          alert('password reset email send check your email')
         })
         .catch((error) => {
           console.error(error.message);
      
         });
 }
 

    return (
        <div>
            <h3 className='text-primary'>Please Login!!!</h3>
             <Form onSubmit={handleLogin} className='mx-auto w-50 mt-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control onChange={sendEmail} type="email" name='email' placeholder="Enter email" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" name='password' placeholder="Password" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
               </Form>
               <p>New To the website? <Link to='/register'>Please Register</Link></p>
               <p>Forgot Password? <Link onClick={handlePasswordReset()} >Please Reset</Link></p>
        </div>
    );
};

export default LoginReactBootstrap;