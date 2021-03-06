import * as React from 'react';
import { StyleSheet, Text, View, SectionList, StatusBar } from 'react-native';

import Calculator from './Calculator'
import DialogPicker from './DialogPicker'
import List from './List'
import Button from './Button'
import DateFilter, { IDateFilter } from './DateFilter'
import { convertToPriceFormat, convertToDateFormat } from '../_helpers/formatter'

import { ICategory, IExpense } from '../_models'

const dummyCategories: ICategory[] = [
  { id: 1, name: 'Taxi' },
  { id: 2, name: 'Uber' },
  { id: 3, name: 'Tips' },
  { id: 4, name: 'Food' },
  { id: 5, name: 'Snacks' },
  { id: 6, name: 'Duties' },
  { id: 7, name: 'Fun' },
  { id: 8, name: 'Drinks' },
  { id: 9, name: 'Grooming' },
  { id: 10, name: 'Health' },
  { id: 11, name: 'Beauty' },
  { id: 12, name: 'Home Appliances' },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'column',
  },

  filterArea: {
    padding: 5,
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#333'
  },

  calculator: {
    alignSelf: 'flex-end',
    width: '80%'
  },

  sectionList: {
    alignSelf: 'flex-start',
    width: '100%',
    flex: 10,
  }
});

interface IState {
  currentValue: number,
  isModalOpened: boolean,
  dateFilter?: IDateFilter,
  isFilterDateModalOpened: boolean,
  expenses: IExpense[],
}

export default class Home extends React.Component<{}, IState> {
  state: IState = {
    currentValue: 0,
    isModalOpened: false,
    isFilterDateModalOpened: false,
    expenses: [
      { id: 1, category: 1, price: 4000, isoDate: (new Date()).toISOString() },
      { id: 2, category: 2, price: 2300, isoDate: (new Date()).toISOString() },
      { id: 3, category: 3, price: 250000, isoDate: (new Date()).toISOString() },
      { id: 4, category: 3, price: 250000, isoDate: (new Date()).toISOString() },
      { id: 5, category: 3, price: 250000, isoDate: (new Date()).toISOString() },
      { id: 6, category: 3, price: 10, isoDate: (new Date()).toISOString() },
    ]
  }

  handleBtnClick = (key: string, value?: number) => {
    let newValue = this.state.currentValue
    if (!value) { newValue = 0 }
    else if (value < 9e8) { newValue = value }
    this.setState({ ...this.state, currentValue: newValue })
  }

  handleDoneClick = () => {
    if (this.state.currentValue > 0) {
      this.setState({ ...this.state, isModalOpened: true })
    }
  }

  handleCancelClick = () => {

  }

  closeModal = () => {
    this.setState({ ...this.state, isModalOpened: false, isFilterDateModalOpened: false })
  }

  handleCategorySelected = (id: number) => {
    if (this.state.currentValue > 0) {
      this.setState({
        ...this.state,
        isModalOpened: false,
        currentValue: 0,
        expenses: [
          ...this.state.expenses,
          {
            id: this.state.expenses.length + 3,
            price: this.state.currentValue,
            category: id,
            isoDate: (new Date()).toISOString()
          }
        ]
      })
    }
  }

  handleFilterSelected = (filter: IDateFilter) => {
    this.setState({ ...this.state, dateFilter: filter, isFilterDateModalOpened: false })

  }

  handleFilterClick = () => {
    this.setState({ ...this.state, isFilterDateModalOpened: true })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 30 }}/>
        <StatusBar
          barStyle="light-content"
          translucent={true}
        />

        <List
          items={this.state.expenses.map(el => ({
            id: el.id,
            text: convertToDateFormat(el.isoDate) + ' - ' +
            convertToPriceFormat(el.price) + ' - ' +
            dummyCategories.find(el2 => el2.id === el.category)!.name
          }))}
          style={{ flex: 10 }}
        />

        <View
          style={{
            height: 60,
            backgroundColor: '#333',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10
          }}
        >
          <Text style={{ color: '#fff', fontSize: 40 }}>
            {convertToPriceFormat(this.state.currentValue)}
          </Text>
        </View>

        <Calculator
          initialValue={this.state.currentValue}
          style={styles.calculator}
          onButtonClick={this.handleBtnClick}
          onDoneClick={this.handleDoneClick}
          onCancelClick={this.handleCancelClick}
        />

        <View style={styles.filterArea}>
          <Button
            style={{ width: 60, marginRight: 5, flex: 0 }}
            id='menu'
            name='☰'
            onClick={() => {}}
          />
          <DateFilter
            isOpened={this.state.isFilterDateModalOpened}
            dateFilter={this.state.dateFilter}
            onFilterClick={this.handleFilterClick}
            onFilterSelected={this.handleFilterSelected}
            onRequestClose={this.closeModal}
          />
        </View>

        <DialogPicker
          isOpened={this.state.isModalOpened}
          onItemClick={this.handleCategorySelected}
          onRequestClose={this.closeModal}
          elements={dummyCategories}
        />
      </View>
    );
  }
}
