import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchOwners, addOwner } from "../../actions";

class AddOwner extends Component {
  componentDidMount() {
    this.props.fetchOwners();
  }
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      about: "",
      image: "",
      imageName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageUpload(e) {
    const image = e.target.files[0];
    this.setState({ image });

    const imageName = e.target.files[0].name;
    this.setState({ imageName });
  }

  async submitForm() {
    try {
      // Initialize the form data
      let formData = new FormData();

      // Add the form data we need to submit

      formData.append("name", this.state.name);
      formData.append("about", this.state.about);
      formData.append("image", this.state.image, this.state.imageName);

      await this.props.addOwner(formData);

      // Redirect to admin page
      this.props.history.push("/admin");

      // return this.owners.push(this.name);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { owners } = this.props;
    const { name, about, imageName } = this.state;
    return (
      <main>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
              <div class="a-section">
                <div class="a-spacing-top-medium"></div>
                <h2 style={{ textAlign: "center" }}>Add a new owner</h2>
                <form>
                  {/* Name Input  */}
                  <div class="a-spacing-top-medium">
                    <label style={{ marginBottom: "0px" }}>Name</label>
                    <input
                      type="text"
                      class="a-input-text"
                      style={{ width: "100%" }}
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                    />
                  </div>
                  {/* About Input */}
                  <div class="a-spacing-top-medium">
                    <label style={{ marginBottom: "0px" }}>About</label>
                    <input
                      type="text"
                      class="a-input-text"
                      style={{ width: "100%" }}
                      name="about"
                      value={about}
                      onChange={this.handleChange}
                    />
                  </div>
                  {/* Photo Input */}
                  <div class="a-spacing-top-medium">
                    <label style={{ marginBottom: "0px" }}>Add Image</label>
                    <div class="a-row a-spacing-top-medium">
                      <label for class="choosefile-button">
                        <i class="fal fa-plus"></i>
                        <input
                          type="file"
                          ref="file"
                          onChange={this.handleImageUpload}
                        />
                        <p style={{ marginTop: "-70px" }}>{imageName}</p>
                      </label>
                    </div>
                  </div>
                  {/* Button  */}
                  <div class="a-spacing-top-large">
                    <span class="a-button-register">
                      <span class="a-button-inner">
                        <span class="a-button-text" onClick={this.submitForm}>
                          Add Owner
                        </span>
                      </span>
                    </span>
                  </div>
                </form>
                <br />
                {owners.map(owner => (
                  <ul key={owner._id} class="list-group-item">
                    <li>{owner.name}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    owners: state.owners.owners,
    owner: state.owner.owner
  };
};

export default connect(mapStateToProps, { fetchOwners, addOwner })(AddOwner);
