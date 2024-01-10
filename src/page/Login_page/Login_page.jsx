import React, { useState } from "react";
import './Login_page.css';
import Logo from '../../assets/Logo_white.png';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function Loginpage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3030/api/sign/in", {
                name,
                password
            });


            if(response.data.status === 200 && response.data.accessToken) {
                alert('로그인에 성공하였습니다.');
                navigate('/');
            } else {
                console.log('로그인 실패: ' + response.data.message);
                alert('로그인 요청 실패. 확인 후 다시 시도하세요.');
            }

        } catch (error) {
            console.error(error);
        }
    };

    return(
        <body id="Login_body">
            <div id="img">
                <div id="Login_shawdow">
                    <Link to='/Mainpage'>
                        <FaArrowLeft className="Login_backarrow" />
                    </Link>
                    <h1 id="Login_h1">
                        환영합니다
                    </h1>
                    <p id="Login_p">
                        Login page
                    </p>
                </div>
            </div>
            <div id="Login_box_body">
                <img src={Logo} id="Login_Logo" alt="logo"></img>
                <div id="Login_container">
                    <form onSubmit={handleSubmit}>
                        <div className="Login_input">
                            <FaRegUserCircle className="Login_icon"/>
                            <p>|</p>
                            <input type="text" placeholder="아이디" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="Login_input">
                            <RiLockPasswordFill className="Login_icon" />
                            <p>|</p>
                            <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <input type="submit" className="login_submit" value="로그인" />
                    </form>
                    <p className="Login_signup_text">아직 계정이 없으신가요?</p>
                    <Link to='/Signuppage' id="Login_go_signuppage">
                        <p>
                            회원가입
                        </p>
                    </Link>
                </div>
            </div>
        </body>
    );
}

export default Loginpage;
