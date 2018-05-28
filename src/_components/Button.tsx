import React from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styled from 'styled-components'

// @ts-ignore
const ItemContent = styled.View`
  background-color: #b12626;
  box-shadow: 0 5px 0 #650606;
  border-radius: 10px;
  position: absolute;
  top: 0;
  bottom: 5px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`

// @ts-ignore
const ItemText = styled.Text`
  color: #fff;
  font-family: Arial;
  font-size: 30px;
`

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
  },
  buttonPressed: {
    top: 4,
    bottom: 1,
    shadowOffset: { width: 0, height: 1 }
  }
})

interface IProps {
  id: string,
  name: string,
  style?: any,
  onClick: (name: string) => void,
}

export default class Button extends React.Component<IProps> {
  state = {
    isPressed: false
  }

  handlePressIn = () => {
    this.setState({ ...this.state, isPressed: true })
  }

  handlePressOut = () => {
    this.setState({ ...this.state, isPressed: false })
  }

  handleBtnClick = () => {
    this.props.onClick(this.props.name)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={this.props.style}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={this.handleBtnClick}
      >
        <View style={[styles.wrapper, this.props.style]}>
          <ItemContent style={this.state.isPressed ? styles.buttonPressed : ''}>
            <ItemText>
              {this.props.name}
            </ItemText>
          </ItemContent>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
