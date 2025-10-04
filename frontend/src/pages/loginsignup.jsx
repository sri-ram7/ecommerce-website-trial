
import React, { useState } from 'react';
import './css/loginsignup.css'; 
const Loginsignup = () => {

    const [state,setstate] = useState("Login");
    const [formData,setformData] = useState({
        username: "",
        password: "",
        email:""
    })

    const changehandler = (e) => {
        setformData({...formData,[e.target.name]: e.target.value})
        //The input calls changehandler.
        // e.target.name is "username", and e.target.value is "john".
    }

    const login = async() => {
         
         console.log("login function executed", formData);
        try {
            const response = await fetch('https://ecommerce-website-trial-backend.onrender.com/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // If response is not JSON, this will throw!
            const responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                // Show some error (like alert or error state)
                alert(responseData.error || 'Login failed');
            }
        } catch (error) {
            alert("Network/server error: " + error.message);
        }

    }

    // const signup = async() => {
    //     console.log("signup function executed", formData);
    //     let responseData;
    //     await fetch('http://localhost:4000/signup',{
    //         method: 'POST',
    //         headers:{
    //             Accept:'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body:JSON.stringify(formData),
    //     }).then((response) => response.json()).then((data) => {responseData = data});
    //     if(responseData.success){
    //         localStorage.setItem('auth-token', responseData.token);
    //         window.location.replace("/");
    //     }
    // }

    const signup = async () => {
        console.log("signup function executed", formData);
        try {
            const response = await fetch('https://ecommerce-website-trial-backend.onrender.com/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // If response is not JSON, this will throw!
            const responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                // Show some error (like alert or error state)
                alert(responseData.error || 'Signup failed');
            }
        } catch (error) {
            alert("Network/server error: " + error.message);
        }
    };


    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Signup" ? <input name='username' value={formData.username} onChange={changehandler} type="text" placeholder='Your Name'  />: <></>}
                    <input name='email' value={formData.email} onChange={changehandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changehandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => {state==="Login"?login():signup()}}>Continue</button>
                {state==="Signup" ? <p className="loginsignup-login">Already have an account? <span onClick={() => {setstate("Login")}}> Login </span></p> : <p className="loginsignup-login">Create an account <span onClick={() => {setstate("Signup")}}> Click Here ! </span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name = '' id = ''/>
                    <p>By Continuing , i agree to the terms of use and privacy policy.</p>
                </div>
            </div>
        </div>
    );
}

export default Loginsignup;
