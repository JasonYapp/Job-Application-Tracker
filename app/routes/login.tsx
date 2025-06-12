import '../css/login.css';



const handleSubmit = async () => {

}

const Login = () => {
    return(
        
        <>
            <section>
                <div style={{ paddingTop: '8rem' }}>
                    <div className='container'>
                        <header>Login</header>


                        <p className="tagline">Please enter your details to login to your account</p>

                        {" "}

                        <div className="form">
                            <input
                                type="email"
                                name="email"
                                // value={formData.email}
                                // onChange={handleInputChange}
                                placeholder="Enter your email"
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                            />

                            <input
                                type="password"
                                name="password"
                                // value={formData.password}
                                // onChange={handleInputChange}
                                placeholder="Enter your password"
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                            />
                        </div>

                        <div className='submitButton'>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                // disabled={isLoading}
                            >
                                Log in
                            </button>
                        </div>
  
                    </div>
                </div>

            </section>
        </>
       
    );
}


export default Login;