import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../styles/new.css";
import { FEED_QUERY } from "../components/Feed";

const POST_MUTATION = gql`
  mutation PostMutation(
    $title: String!
    $description: String!
    $tags: String
    $file: Upload!
  ) {
    post(description: $description, title: $title, file: $file, tags: $tags) {
      title
      description
      fileUrl
      postedBy {
        name
      }
      tags
      createdAt
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
    margin: "0 auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  fab: {
    width: "15%",
    margin: "0 auto",
    fontSize: "0.8em",
    backgroundColor: "#669999"
  },
  button: {
    width: "25%",
    margin: "0 auto",
    color: "red"
  }
});

class TextFields extends React.Component {
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
    reader.onloadend = e => {
      this.setState({ file, imageSrc: reader.result, isUploaded: true });
    };
    // this.setState({
    //   file,
    //   imageSrc: URL.createObjectURL(file),
    //   isUploaded: true
    // });
  };

  render() {
    const { classes } = this.props;
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
          alt="Preview image"
          style={{ maxHeight: "350", maxWidth: "250px" }}
        />
      </div>
    );

    return (
      <Mutation
        mutation={POST_MUTATION}
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
      >
        {mutation => (
          <form
            className={classes.container}
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
              console.log("state", this.state.file);
              mutation({
                variables: {
                  ...this.state
                },
                optimisticResponse: true,
                update: (store, { data: { post } }) => {
                  try {
                    const data = store.readQuery({ query: FEED_QUERY });
                    data.feed.push(post);
                    store.writeQuery({ FEED_QUERY, data });
                  } catch (e) {
                    console.log(e);
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
    );
  }
}

export default withStyles(styles)(TextFields);
