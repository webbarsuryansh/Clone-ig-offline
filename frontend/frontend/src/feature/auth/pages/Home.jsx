import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [post, setPost] = useState([]);

  async function getPost() {
    try {
      const res = await axios.get("http://localhost:3000/api/post/get-me");
      console.log("Posts fetched successfully:", res.data);

      console.log(res.data);

      setPost(res.data.post);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {post.map((item) => {
        return (
          <div key={item._id}>
            <h1>{item.Username}</h1>

            <h2>{item.title}</h2>

            <p>{item.caption}</p>

            <img
              src={item.imgUrl}
              alt={item.title}
              width="300"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home;