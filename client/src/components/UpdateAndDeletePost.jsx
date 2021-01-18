import React, { Component } from "react";
import api from "../api";

class UpdatePost extends Component {
  updatePost = (event) => {
    event.preventDefault();

    window.location.href = `/posts/update/${this.props.id}`;
  };

  render() {
    return (
      <button className="btn btn-primary mb-1" onClick={this.updatePost}>
        Update
      </button>
    );
  }
}

class DeletePost extends Component {
  deletePost = (event) => {
    event.preventDefault();

    if (
      window.confirm(`Do you want to delete the post '${this.props.name}'?`)
    ) {
      api.deletePostById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return (
      <button className="btn btn-danger mb-1 ml-1" onClick={this.deletePost}>
        Delete
      </button>
    );
  }
}

export { UpdatePost, DeletePost };
