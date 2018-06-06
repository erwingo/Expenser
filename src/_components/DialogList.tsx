import React from 'react'
import { FlatList, TouchableWithoutFeedback, View } from 'react-native'
import styled from 'styled-components'

// @ts-ignore
const ItemView = styled.View`
  background-color: #333;
  height: 70px;
  border-bottom-color: #666;
  border-bottom-width: 1px;
  align-items: center;
  justify-content: center;
`

// @ts-ignore
  const TextItem = styled.Text`
  color: #fff;
  font-size: 30px;
`

interface IItemProps<T> {
  id: T,
  name: string,
  onClick: (id: T, name: string) => void,
}

class DialogListItem <T>extends React.Component<IItemProps<T>> {
  handlePressIn = () => {
    this.setState({ ...this.state, isPressed: true })
  }

  handlePressOut = () => {
    this.setState({ ...this.state, isPressed: false })
  }

  handleBtnClick = () => {
    this.props.onClick(this.props.id, this.props.name)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={this.handleBtnClick}
      >
        <ItemView>
          <TextItem>{this.props.name}</TextItem>
        </ItemView>
      </TouchableWithoutFeedback>
    )
  }
}

interface IProps<T> {
  style?: any,
  elements: { id: T, name: string }[],
  onItemClick: (id: T, name: string) => void,
}

export default class DialogList <T>extends React.Component<IProps<T>> {
  handleItemClick = (id: T, name: string) => {
    this.props.onItemClick(id, name)
  }

  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.props.elements}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) =>
          <DialogListItem {...item} onClick={this.handleItemClick} />
        }
      />
    )
  }
}
