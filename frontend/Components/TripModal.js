import React from "react";

export default class TripModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tripModal" className="modal">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Start trip</a>
        </div>
      </div>
    );
  }
}
