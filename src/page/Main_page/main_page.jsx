import { React } from "react";
import './main_page.css';
import white_logo from '../../assets/Logo_white.png';
import mail from './img/mail.png';
import phone from './img/phone.png';
import map from './img/map.png';
import { Link } from 'react-router-dom'
import { LuMapPin } from "react-icons/lu";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";


function Mainpage() {
    return(
        <body>
            <header>
                <div id="main_img">
                    <div id="main_page_back">
                        <div id="main_header">
                            <div id="main_header_header">
                                <img src={white_logo} id="main_page_logo" alt=""></img>

                                    <div id="Login_box">
                                        <Link to='/Loginpage' id="Login_button">
                                            <div>
                                                <p>
                                                    로그인
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                            </div>
                            <p id="main_text">
                                "반려동물,여러분들의 도움이 필요한 사람들"의 <br/>같이 겉는 친구가 되어주세요
                            </p>
                        </div>
                    </div>
                </div>           
            </header>
            <section>
                <div id="main_menubar">
                    <div id="main_menubar_box">
                        <div className="icon_box">
                            <div>
                                <LuMapPin className="icon"/>
                            </div>
                            <p>위치 보기</p>
                        </div>
                        <div className="icon_box">
                            <div>
                                <FaRegUserCircle className="icon"/>
                            </div>
                            <p>마이페이지</p>
                        </div>
                        <div className="icon_box">
                            <div>
                                <FaRegListAlt className="icon"/>
                            </div>
                            <p>게시글 보기</p>
                        </div>
                        <div className="icon_box">
                            <div>
                                <IoMdChatbubbles className="icon"/>
                            </div>
                            <p><Link to='/wait'>채팅하기</Link></p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="body">
                <div className="menu_box">
                    <div className="">
                        <h1>게시글을 올려보세요!</h1>
                        <p>반려동물의 친구를 만들어주세요</p>
                    </div>
                    <div id="mail_box">
                        <img src={mail} id="mail" alt=""></img>
                        <Link to='/postpage' className="go_box">
                            <div id="box_right">
                                <p>
                                    바로가기
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="menu_box">
                    <div id="mail_box_left">
                        <img src={map} id="mail_left" alt=""></img>
                        <Link to='/postpage' className="go_box">
                            <div id="box_left">
                                <p>
                                    바로가기
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="">
                        <h1>반려동물의 위치보기</h1>
                        <p className="p-left">반려동물이 안전한 위치에 <br/> 있는지 확인해 보세요</p>
                    </div>
                </div>
                <div className="menu_box">
                    <div className="">
                        <h1>채팅 하러가기</h1>
                        <p>펫시터와 대화해보세요</p>
                    </div>
                    <div id="mail_box" className="phone">
                        <img src={phone} id="mail" alt=""></img>
                        <Link to='/wait' className="go_box">
                            <div id="box_right">
                                <p>
                                    바로가기
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            <footer>
                <p>대표이사 : 유진승 <br/> 상호명 : same Load <br/> tel: 010 - 8897 - 3288 <br/> 이용약관 | 개인정보처리방침 | 회사소개</p>
            </footer>
        </body>
    );
}

export default Mainpage;