import React, { useState } from "react";
import './Signup_page.css';
import Logo from '../Main_page/img/1x/Logo_white_light.png';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signuppage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3030/api/sign/up", {
                name,
                password
            });

            console.log(response.data)

            if(response.data.status === 200) {
                alert('회원가입에 성공하였습니다.')
                navigate('/Loginpage');
            } else {
                alert('동일한 아이디의 사용자가 이미 존재합니다.');
            }

        } catch (error) {
            console.error(error);
        }
    };

    return(
        <body id="sign_body">
            <div id="img">
                <div id="sign_shawdow">
                    <Link to='/Mainpage'>
                        <FaArrowLeft className="sign_backarrow" />
                    </Link>
                    <h1 id="sign_h1">
                        환영합니다
                    </h1>
                    <p id="sign_p">
                        Sign up page
                    </p>
                </div>
            </div>
            <div id="sign_box_body">
                <img src={Logo} id="sign_Logo" alt=""></img>
                <div id="sign_container">
                    <form onSubmit={handleSubmit}>
                        <div className="sign_input">
                            <FaRegUserCircle className="sign_icon"/>
                            <p>|</p>
                            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="sign_input">
                            <RiLockPasswordFill className="sign_icon" />
                            <p>|</p>
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="sign_input">
                            <RiLockPasswordFill className="sign_icon" />
                            <p>|</p>
                            <input type="password" placeholder="Re-enter Password" onChange={(e) => setPasswordConfirm(e.target.value)} />
                        </div>
                        <input type="submit" className="sign_submit" value={'회원가입'}/>
                    </form>
                    <p className="sign_signup_text">이미 계정이 있으신가요?</p>
                    <Link to='/Loginpage' id="sign_go_signuppage">
                        <p>
                            로그인
                        </p>
                    </Link>
                </div>
            </div>
        </body>
    );
}

export default Signuppage;
