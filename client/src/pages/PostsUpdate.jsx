import React, { Component } from "react";
import api from "../api";

import styled from "styled-components";

const Title = styled.h1.attrs({
  classTitle: "h1",
})``;

const Wrapper = styled.div.attrs({
  classTitle: "form-group",
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  classTitle: "form-control",
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  classTitle: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  classTitle: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

class PostsUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      title: "",
      description: "",
      content: "",
    };
  }

  componentDidMount() {
    document.title = "Update Post";
  }

  handleChangeInputTitle = async (event) => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleChangeInputDescription = async (event) => {
    const description = event.target.validity.valid
      ? event.target.value
      : this.state.description;

    this.setState({ description });
  };

  handleChangeInputContent = async (event) => {
    const content = event.target.validity.valid
      ? event.target.value
      : this.state.content;
    this.setState({ content });
  };

  handleUpdatePost = async () => {
    const { id, title, description, content } = this.state;
    const payload = { title, description, content };

    await api.updatePostById(id, payload).then((res) => {
      window.alert(`Post updated successfully`);
      this.setState({
        title: "",
        description: "",
        content: "",
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const post = await api.getPostById(id);

    this.setState({
      title: post.data.data.title,
      description: post.data.data.description,
      content: post.data.data.content,
    });
  };

  render() {
    const { title, description, content } = this.state;
    return (
      <Wrapper>
        <Title>Update Post</Title>

        <Label>Title: </Label>
        <InputText
          type="text"
          value={title}
          onChange={this.handleChangeInputTitle}
        />

        <Label>Description: </Label>
        <InputText
          type="text"
          value={description}
          onChange={this.handleChangeInputDescription}
        />

        <Label>Content: </Label>
        <InputText
          type="text"
          value={content}
          onChange={this.handleChangeInputContent}
        />

        <Button onClick={this.handleUpdatePost}>Update Post</Button>
        <CancelButton href={"/posts/list"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default PostsUpdate;
