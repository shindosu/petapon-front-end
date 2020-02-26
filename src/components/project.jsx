import React, { Component } from 'react';
import axios from "axios";
import jwtDecode from "jwt-decode";
import {Link} from "react-router-dom";
import StickerList from "./sticker_list";
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      project: {}
    };
  }

  componentDidMount(){
    

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    var width = 100;
    var height = 100;
    var intensity = 1.4;
    var rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight.position.set( 1, 1, 10 );
    rectLight.lookAt( 1, 1, 3 );
    scene.add( rectLight )
    
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementsByClassName("three-canvas")[0].appendChild( renderer.domElement );


    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    };

    let loader = new GLTFLoader();
    loader.load(
      "../../public/iphone_glb.glb",
      ( gltf ) => {
          // called when the resource is loaded
        console.log(gltf.scene)
      },
      ( xhr ) => {
        console.log(xhr);
        // called while loading is progressing
        // console.log("The xhr warning isL ",xhr.srcElement.responseText);
    }
      );

    animate();

    const id = this.props.match.params.id
    let jwt = window.localStorage.getItem('jwt');
    let result = jwtDecode(jwt);
    console.log(id)
    axios.get(
      localStorage.url + `/api/v1/projects/${id}`,
    )
      .then((response) => {
        this.setState({
          title: response.data.title,
          project: response.data
        })
        console.log(this.state.project)
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  }

  handleSubmit = (event) => {
    const id = this.props.match.params.id
    let jwt = window.localStorage.getItem('jwt');
    let result = jwtDecode(jwt);
    console.log(result.id)

    axios.patch(
      localStorage.url + `/api/v1/projects/${id}`,
      {
        user_id: result.id,
        title: this.state.title
      }
    )
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
      <StickerList />
      <div className="form-group">
        <h1>Update</h1>
        <form onSubmit={this.handleSubmit} id="sign-up-form">
          <label htmlFor="title">title</label>
          <input className="form-control" type="title" id="title" name="title" value={this.state.title} onChange={this.handleChange} />
          <input type="submit" value="save" className="btn btn-primary" />
        </form>
      </div>

      <div className="three-canvas">

      </div>
      <Link to="/dashboard">Back</Link>
      </React.Fragment>
    );
  }
}

export default Project;
