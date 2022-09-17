import React, {useState, useEffect} from "react"
import QrReader from "react-qr-reader";

class QRCodeScanner extends React.Component {
  constructor() {
    this.state = {
      delay : 300,
    }
  }

  stopRecording = () =>{
    this.setState({ delay: false })
  }

  handleError = (error) => {
    if (error) {
      this.props.onError(error)
    }
  }

  handleScan = (data) => {
    if (data) {
      const { result, error } = this.props.onValidate(data);
      if (result) {
        this.stopRecording();
        this.props.onScan(result);
      } else {
        this.handleError(error);
      }
    }
  }

  onClose = () => {
    try {
      this.stopRecording();
      this.props.onClose();
    } catch (error) {
      this.handleError(error);
    }
  }

  render () {
    return (
      <>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}/>
      </>
    )
  }
}

export default QRCodeScanner