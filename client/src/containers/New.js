import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../styles/new.css";
import { feed as query } from "../queries";
import Header from "./Header";
import { post } from "../mutations";
import { styles } from "../styles/material-ui/New";
import { resizeImage } from "../util";

class TextFields extends Component {
  state = {
    title: "",
    description: "",
    file: null,
    imageSrc: "",
    tags: "",
    isUploaded: false
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = async () => {
        const blob = await resizeImage(img, file);
        this.setState({
          file: blob,
          imageSrc: reader.result,
          isUploaded: true
        });
      };
    };

    // this.setState({
    //   file,
    //   imageSrc: URL.createObjectURL(file),
    //   isUploaded: true
    // });
  };

  render() {
    const { classes, history } = this.props;
    const { title, description, tags, imageSrc, isUploaded } = this.state;

    const uploadButtonContent = (
      <div>
        <input
          accept="image/*"
          className={classes.input}
          style={{ display: "none" }}
          id="outlined-button-file"
          multiple
          type="file"
          onChange={this.handleUpload}
        />
        <label htmlFor="outlined-button-file">
          <Button
            variant="outlined"
            component="span"
            className={classes.button}
          >
            Upload image
          </Button>
        </label>
      </div>
    );

    const imageContent = (
      <div>
        <img
          src={imageSrc}
          id="preview-image"
          alt="Preview"
          style={{ maxHeight: "350", maxWidth: "250px" }}
        />
      </div>
    );

    return (
      <div>
        <Header history={history} />
        <Mutation
          mutation={post}
          onCompleted={res => {
            this.setState(
              {
                title: "",
                description: "",
                file: null,
                tags: "",
                imageSrc: "",
                isUploaded: false
              },
              () => this.props.history.push("/main")
            );
          }}
          // refetchQueries={() => [{ query }]}
        >
          {mutation => (
            <form
              className={classes.container}
              autoComplete="off"
              onSubmit={e => {
                e.preventDefault();
                mutation({
                  variables: {
                    ...this.state
                  },
                  optimisticResponse: true,
                  update: (store, { data: { post } }) => {
                    try {
                      if (!post) return;
                      const data = store.readQuery({ query });
                      data.feed.links.push(post);
                      store.writeQuery({ query, data });
                    } catch (e) {
                      console.log("from readQuery", e);
                    }
                  }
                });
              }}
            >
              <TextField
                id="standard-with-placeholder"
                label="Title *"
                className={classes.textField}
                placeholder="Post Title"
                value={title}
                onChange={this.handleChange("title")}
                margin="normal"
              />

              <TextField
                required
                id="standard-multiline-flexible" //standard-error
                label="Description"
                multiline
                rowsMax="100"
                className={classes.textField}
                onChange={this.handleChange("description")}
                value={description}
                margin="normal"
              />

              <TextField
                id="standard-dense"
                label="Tag(s)"
                className={classes.textField}
                value={tags}
                onChange={this.handleChange("tags")}
                margin="normal"
              />
              {isUploaded ? imageContent : uploadButtonContent}
              <input type="submit" value="Submit" className="submit" />
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withStyles(styles)(TextFields);
