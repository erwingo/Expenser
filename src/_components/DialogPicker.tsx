import React from 'react'
import { Modal, Text, FlatList, TouchableWithoutFeedback, View } from 'react-native'
import styled from 'styled-components'

import DialogList from './DialogList'

interface IProps<T> {
  isOpened: boolean,
  elements: { id: T, name: string }[],
  onItemClick: (id: T, name: string) => void,
  onRequestClose: () => void,
}

export default class DialogPicker <T>extends React.Component<IProps<T>> {
  render() {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.isOpened}
        onRequestClose={this.props.onRequestClose}
      >
        <TouchableWithoutFeedback
          onPress={this.props.onRequestClose}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <DialogList
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%' }}
              elements={this.props.elements}
              onItemClick={this.props.onItemClick}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}
