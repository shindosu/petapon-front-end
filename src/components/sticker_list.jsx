import React, { Component } from 'react';
import axios from "axios";

class StickerList extends Component {
  constructor(props){
    super(props);
    this.state = {
      stickers: []
    }
  }

  componentDidMount(){
    axios.get(
      localStorage.url + `/api/v1/stickers`
    )
      .then((response) => {
        console.log(response);
        this.setState({
          stickers: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className = "sticker_list">
        <ul className="list-inline">
        {this.state.stickers.map(sticker =>
            <li key={sticker.name}>
              <p>{sticker.name}</p>
              <img src={sticker.image} alt={sticker.name}/>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default StickerList;
