import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'

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
}

export default class List extends React.Component<IProps> {
  render() {
    return (
      <ScrollView style={[styles.scrollView, this.props.style]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el, idx) =>
          <View style={styles.itemView} key={el}>
            <Text style={styles.itemText}>$9,000 Taxi - 2018-05-26 23:44:05</Text>
          </View>
        )}
      </ScrollView>
    )
  }
}
