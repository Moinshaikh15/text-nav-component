import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import { useRenderData } from "streamlit-component-lib-react-hooks"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { ReactDOM } from "react"
import { spawn } from "child_process"

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class TextNav extends StreamlitComponentBase {
  state = { numClicks: 0, isFocused: false }
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
    this.startRef = React.createRef()
    this.parentRef = React.createRef()
  }
  componentDidMount() {
  
    Streamlit.setFrameHeight()
    setTimeout(() => {
      this.startRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      })
    }, 1000)
  }

  componentDidUpdate() {
    Streamlit.setFrameHeight()
 
    setTimeout(() => {
      this.startRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      })
    }, 1000)
  }

  render = () => {
    let data = this.props.args["text"]
    console.log(data)
    let start_char = this.props.args["start_char"]
    let end_char = this.props.args["end_char"]
    data = data.split(" ")
    let text = []
    let beforeHighlightEl = data.slice(0, start_char).join(" ")
    let highlightEl = data.slice(start_char, end_char).join(" ")
    let afterHighlightEl = data.slice(end_char).join(" ")
    text = [beforeHighlightEl, highlightEl, afterHighlightEl]

    return (
      <div className="text-wall scrollbar" id="style" ref={this.parentRef}>
        <p>
          {text.map((el, indx) => {
            return indx === 1 ? (
              <span ref={this.startRef} className="highlighted-section">
                {`${el}`}
              </span>
            ) : indx === 2 ? (
              " " + el
            ) : (
              el + " "
            )
          })}
        </p>
      </div>
    )
  }

  executeScroll = () => {
    this.startRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    // this.startRef.current.scrollTop=50
    //this.startRef.current.scrollTo(0, 0)
    // console.log( this.startRef.current.scrollTop,this.parentRef.current.offsetTop)
  }

  /** Focus handler for our "Click Me!" button. */
  _onFocus = () => {
    this.setState({ isFocused: true })
  }
}

export default withStreamlitConnection(TextNav)
