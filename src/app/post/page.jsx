import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import serviceObj from "@/appwrite/config";
import { Button } from "@/components/ui/button";
import { Container } from "@/components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import adminOptions from "@/appwrite/adminOptions";

export default function Post() {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState("")
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);

  // console.log(userData)
  //IF CURRENT LOGGED IN USER IS THE SAME PERSON WHO AUTHORED THE ARTICLE
  // THEN HE CAN EDIT OR DELETE OR ELSE NOT
  const isAuthor = post && userData ? post.userId === userData.$id : false;


  useEffect(() => {
    if (slug) {
      serviceObj.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        //   console.log(post)
          adminOptions.getUserfromUserID(post.userId)
          .then((data) => data)
          .then((username) => setAuthor(username.name))
          .catch((error) => console.error("Error fetching user:", error));

        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    serviceObj.deletePost(post.$id).then((status) => {
      if (status) {
        serviceObj.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  /*
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={serviceObj.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="mr-3">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          {author}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
   */

  return post ? (
    <div className="py-12 bg-gray-100 min-h-screen">
      <Container>
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h1 className="text-3xl font-extrabold mb-4">{post.title}</h1>
          <div className="text-gray-500 ">Written By {author}</div>
          <div className="text-gray-500 mb-4">{new Date(post.$createdAt).toDateString()}</div>
          <div className="w-full flex justify-center mb-6">
            <img
              src={serviceObj.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="prose prose-lg text-gray-800">{parse(post.content)}</div>
          {isAuthor && (
            <div className="mt-6 flex justify-end gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-blue-600 text-white">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
