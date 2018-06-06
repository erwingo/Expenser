import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { IExpense } from '../_models'
import { IpcNetConnectOpts } from 'net';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000',
  },
  itemView: {
    padding: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
  }
})

interface IProps {
  style?: any,
  items: { id: number, text: string }[],
}

export default class List extends React.PureComponent<IProps> {
  sc: any = undefined

  handleScrollSizeChange = () => {
    this.sc.scrollToEnd({ animated: false })
  }

  render() {
    return (
      <ScrollView
        style={[styles.scrollView, this.props.style]}
        ref={sc => this.sc = sc }
        onContentSizeChange={this.handleScrollSizeChange}
      >
        {this.props.items.map((el, idx) =>
          <View style={styles.itemView} key={el.id}>
            <Text style={styles.itemText}>{el.text}</Text>
          </View>
        )}
      </ScrollView>
    )
  }
}
