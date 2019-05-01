import React, { Component } from "react";

interface ITypeWriterProps {
  wait: number;
  words: string[];
}

interface ITypeWriterState {
  txt: string;
  wordIndex: number;
  isDeleting: boolean;
}

export default class TypeWriter extends Component<
  ITypeWriterProps,
  ITypeWriterState
> {
  constructor(props: ITypeWriterProps) {
    super(props);
    this.state = {
      txt: "",
      wordIndex: 0,
      isDeleting: false
    };

    this.type = this.type.bind(this);
  }

  static defaultProps = {
    wait: 3000
  };

  componentDidMount() {
    this.type();
  }

  type() {
    // Curent index of word
    const current = this.state.wordIndex % this.props.words.length;
    // Get full text of current word
    const fullTxt = this.props.words[current];

    // Check if deleting
    if (this.state.isDeleting) {
      // Remove char
      this.setState((prevState, props) => {
        return {
          txt: fullTxt.substring(0, prevState.txt.length - 1)
        };
      });
    } else {
      // Add char
      this.setState((prevState, props) => {
        return {
          txt: fullTxt.substring(0, prevState.txt.length + 1)
        };
      });
    }

    // Initial type speed
    let typeSpeed = 0;

    if (this.state.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.state.isDeleting && this.state.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.props.wait;
      this.setState({ isDeleting: true });
    } else if (this.state.isDeleting && this.state.txt === "") {
      // Move to next word
      this.setState(prevState => {
        return { isDeleting: false, wordIndex: prevState.wordIndex + 1 };
      });
      typeSpeed = 0;
    }

    // Keep calling type
    setTimeout(this.type, typeSpeed);
  }

  render() {
    return <p className="type-writer-text">{this.state.txt}</p>;
  }
}
