import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [post, setPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});

  async function getPost() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/post/get-me"
      );

      console.log(res.data);
      setPost(res.data.post || []);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  // Like
  const handleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Save
  const handleSave = (postId) => {
    setSavedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Comment
  const handleComment = (postId) => {
    console.log("Comment clicked:", postId);
  };

  // Share
  const handleShare = async (item) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          text: item.caption,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Post link copied!");
      }
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  return (
    <div className="home">
      <div className="posts-container">

        {post.length === 0 ? (
          <p className="no-posts">No posts found</p>
        ) : (
          post.map((item) => (
            <div className="post-card" key={item._id}>

              {/* Header */}
              <div className="post-header">
                <div className="profile-placeholder">
                  {(item.username || item.Username || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h3 className="username">
                  {item.username || item.Username}
                </h3>
              </div>

              {/* Image */}
              <img
                className="post-image"
                src={item.imgUrl}
                alt={item.title}
              />

              {/* Actions */}
              <div className="post-actions">

                <div className="left-actions">

                  {/* LIKE */}
                  <button
                    className={`action-btn ${
                      likedPosts[item._id] ? "liked" : ""
                    }`}
                    onClick={() => handleLike(item._id)}
                    aria-label="Like"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="action-icon"
                      fill={
                        likedPosts[item._id]
                          ? "currentColor"
                          : "none"
                      }
                    >
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67
                        l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23
                        l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* COMMENT */}
                  <button
                    className="action-btn"
                    onClick={() => handleComment(item._id)}
                    aria-label="Comment"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="action-icon"
                      fill="none"
                    >
                      <path
                        d="M20 11.5a8.38 8.38 0 0 1-.9 3.8
                        8.5 8.5 0 0 1-7.6 4.7
                        8.38 8.38 0 0 1-3.8-.9L3 20l.9-4.7
                        A8.38 8.38 0 0 1 3 11.5
                        a8.5 8.5 0 0 1 4.7-7.6
                        8.38 8.38 0 0 1 3.8-.9h.5
                        a8.5 8.5 0 0 1 8 8v.5z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* SHARE */}
                  <button
                    className="action-btn"
                    onClick={() => handleShare(item)}
                    aria-label="Share"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="action-icon"
                      fill="none"
                    >
                      <path
                        d="M22 2L11 13"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M22 2L15 22L11 13L2 9L22 2Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                </div>

                {/* SAVE */}
                <button
                  className={`action-btn ${
                    savedPosts[item._id] ? "saved" : ""
                  }`}
                  onClick={() => handleSave(item._id)}
                  aria-label="Save"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="action-icon"
                    fill={
                      savedPosts[item._id]
                        ? "currentColor"
                        : "none"
                    }
                  >
                    <path
                      d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

              </div>

              {/* Content */}
              <div className="post-content">

                {likedPosts[item._id] && (
                  <p className="likes-count">
                    Liked by you
                  </p>
                )}

                <h2 className="post-title">
                  {item.title}
                </h2>

                <p className="post-caption">
                  {item.caption}
                </p>

                <button
                  className="comment-text"
                  onClick={() => handleComment(item._id)}
                >
                  View all comments
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Home;