import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux'

class Legend extends React.Component {

  renderItem = (item, index) => {
    const colors = this.props.data.colors;

    return(
      <div key={index} className="row my-1">
        <div className="legend-color-sq" style={{backgroundColor:colors[index]}}></div>
        <div className="pl-2 col-6">{item}</div>
      </div>
    );
  }


  render() {
    const colnames = this.props.data.colnames;

    return (
      <div id="legend" className="container pt-5">
        <div className="container">
          {colnames.map(this.renderItem)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.present
})

export default connect(mapStateToProps, null)(Legend);
