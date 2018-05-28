import React from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styled from 'styled-components';

import Button from './Button'

const styles = StyleSheet.create({
  button: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
  }
})

// @ts-ignore
const Wrapper = styled.View`
  padding: 4px 4px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
`

// @ts-ignore
const Item = styled.View`
  width: 24%;
  margin-bottom: 4px;
  position: relative;
`

// @ts-ignore
const ItemHelper = styled.View`
  padding-bottom: 100%;
`

const specialButtomItems = [
  { name: '←' },
  { name: 'C' },
  { name: '✕' },
  { name: '✔' },
]

const buttonItems = [
  { name: '1' },
  { name: '2' },
  { name: '3' },
  specialButtomItems[0],
  { name: '4' },
  { name: '5' },
  { name: '6' },
  specialButtomItems[1],
  { name: '7' },
  { name: '8' },
  { name: '9' },
  specialButtomItems[2],
  { name: '00' },
  { name: '0' },
  { name: '000' },
  specialButtomItems[3],
]

interface Props {
  style?: any;
  initialValue?: number,
  onCancelClick: (value?: number) => void;
  onDoneClick: (value?: number) => void;
  onButtonClick: (key: string, value?: number) => void;
}

interface State {
  value?: string;
}

export default class Calculator extends React.Component<Props, State> {
  state = this.calculateInitialState(this.props)

  calculateInitialState(props: Props) {
    return { value: String(props.initialValue || '') }
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState(this.calculateInitialState(newProps))
  }

  handleButtonClick = (key: string) => {
    let newValue = this.state.value;

    if (key === specialButtomItems[2].name) {
      this.props.onCancelClick(Number(this.state.value));
      return;
    } else if (key === specialButtomItems[3].name) {
      this.props.onDoneClick(Number(this.state.value));
      return;
    }

    if (key === specialButtomItems[0].name) {
      newValue = this.state.value.slice(0, -1)
    } else if (key === specialButtomItems[1].name) {
      newValue = ''
    } else {
      newValue = this.state.value.concat(key);
    }

    this.props.onButtonClick(key, newValue === '' ? undefined : Number(newValue));

    this.setState({
      ...this.state,
      value: newValue
    })
  }

  render() {
    return (
      <Wrapper style={this.props.style}>
        {buttonItems.map(el =>
          <Item key={el.name}>
            <ItemHelper />
            <Button
              style={styles.button}
              id={el.name}
              name={el.name}
              onClick={this.handleButtonClick}
            />
          </Item>
        )}
      </Wrapper>
    )
  }
}
