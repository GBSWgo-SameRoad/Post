import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import logo from "../Main_page/img/1x/Logo_white_light.png";
import './post_page.css';

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pay, setPay] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3030/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      alert("게시물이 성공적으로 삭제되었습니다!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("pay", pay);

    try {
      const res = await axios.post("http://localhost:3030/api/posts", formData);
      setPosts((prevPosts) => [...prevPosts, res.data]);
      alert("게시물이 성공적으로 생성되었습니다!");
      navigate(`/postpage/`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div id="postpage_header">
        <img src={logo} id="postpage_logo" alt=""></img>
        <Link to="/Mypage" id="postpage_go_mypage">
          <div>
            <FaRegUserCircle id="postpage_user_icon" />
          </div>
        </Link>
      </div>
      <div id="postpage_body">
        <div id="postpage_sidebar">
          <Link to="/postpage" id="postpage_Link">
            <div className="postpage_Link_box">
              <p>게시글 올리기</p>
            </div>
        </Link>
        <Link to="/wait" id="postpage_Link">
            <div className="postpage_Link_box">
            <p>채팅하기</p>
            </div>
        </Link>
        </div>
        <div>
        <form id="update" onSubmit={handleSubmit}>
            <div className="update_input">
            <p>제목 | </p>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </div>
            <div className="update_line"></div>
            <div className="update_input">
            <p>내용 | </p>
            <textarea
                name=""
                id="update_memo"
                cols="30"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            </div>
            <div className="update_line"></div>
            <div className="update_input">
              <p>알바비 | </p>
              <input
                type="text"
                value={pay}
                onChange={(e) => setPay(e.target.value)}
              />
              <p id="pay">원</p>
            </div>
            <div className="update_line"></div>
            <div id="update_submit">
              <FiPaperclip id="update_icon" />
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              <input type="submit" value="글작성" />
            </div>
          </form>
          {posts.map((post) => (
            <div className="post" key={post._id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <img src={post.imagePath} alt="post" className="post_image"/>
                <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
