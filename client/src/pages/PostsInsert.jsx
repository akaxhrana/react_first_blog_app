import React, { Component } from "react";
import api from "../api";
import AuthService from "../services/auth.service";
class PostsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      content: "",
      username: "",
    };
  }
  componentDidMount() {
    document.title = "Create Post";
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        username: user.data.username,
      });
    }
  }

  handleChangeInputTitle = async (event) => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleChangeInputDescription = async (event) => {
    const description = event.target.value;
    this.setState({ description });
  };

  handleChangeInputContent = async (event) => {
    const content = event.target.value;
    this.setState({ content });
  };

  handleIncludePost = async () => {
    const { title, description, content, username } = this.state;
    const payload = { title, description, content, username };

    await api.insertPost(payload).then((res) => {
      window.alert(`Post inserted successfully`);
      this.setState({
        title: "",
        description: "",
        content: "",
      });
    });
  };

  render() {
    const { title, description, content, username } = this.state;
    return (
      <div className="no-gutters">
        <div className="row justify-content-center">
          <div className="col col-md-6">
            <div className="text-center">
              <h1>Create Post as {username}</h1>
            </div>
            <div className="mb-3">
              <label className="w-100 m-2">Title: </label>
              <input
                type="text"
                className="form-control w-50 m-1"
                value={title}
                onChange={this.handleChangeInputTitle}
              />

              <label className="w-100 m-2">Description: </label>
              <input
                type="text"
                className="form-control w-75 m-1"
                value={description}
                onChange={this.handleChangeInputDescription}
              />

              <label className="w-100 m-2">Content: </label>
              <textarea
                type="text"
                rows="3"
                className="form-control ml-1"
                value={content}
                onChange={this.handleChangeInputContent}
              />
            </div>
            <button
              className="btn btn-primary m-1"
              onClick={this.handleIncludePost}
            >
              Add Post
            </button>
            <button className="btn btn-danger m-1" href={"/posts/list"}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PostsInsert;
