import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import { useRenderData } from "streamlit-component-lib-react-hooks"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { spawn } from "child_process"

let selectedEvent = null
/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class EventSelectionInterface extends StreamlitComponentBase {
  state = { numClicks: 0, isFocused: false }
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
    this.startRef = React.createRef()
    this.events = this.props.args["event"].events
  }

  render = () => {
    const { theme } = this.props
    const style = {}

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {
      // Use the theme object to style our button border. Alternatively, the
      // theme style is defined in CSS vars.
      const borderStyling = `1px solid ${
        this.state.isFocused ? theme.primaryColor : "gray"
      }`
      style.border = borderStyling
      style.outline = borderStyling
    }

    // Show a button and some text.
    // When the button is clicked, we'll increment our "numClicks" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    return (
      <div className="event-section" id="style">
        <div>
          <div className="header-container  scrollbar" id="style">
            {this.events.map((el, indx) => (
              <div
                className={
                  selectedEvent === indx ? "selected header" : "header"
                }
                onClick={(e) => {
                  e.preventDefault()
                  this.onSelected(indx)
                }}
              >
                <p>{el.header}</p>
                {selectedEvent === indx ? (
                  <div className="sub-headers-div">
                    <p>{this.events[selectedEvent].subheader}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <div className="sub-header-container"></div>
        </div>
      </div>
    )
  }

  /** Focus handler for our "Click Me!" button. */
  onSelected = (indx) => {
    selectedEvent = indx
    this.setState({ selectedEvent: indx })
    this.setState(() =>
      Streamlit.setComponentValue({
        start_char: this.events[selectedEvent].start_char,
        end_char: this.events[selectedEvent].end_char,
      })
    )
  }

  /** Blur handler for our "Click Me!" button. */
  _onBlur = () => {
    this.setState({ isFocused: false })
  }
}

export default withStreamlitConnection(EventSelectionInterface)
