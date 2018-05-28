import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import moment, { Moment } from 'moment'

import Button from './Button'
import DialogPicker from './DialogPicker'

// @ts-ignore
const Wrapper = styled.View`
  flex: 1
`

const elements = [
  { id: 'none', name: 'None' },
  { id: 'today', name: 'Today' },
  { id: 'yesterday', name: 'Yesterday' },
  { id: 'thisWeek', name: 'This Week' },
  { id: 'thisMonth', name: 'This Month' },
  { id: 'lastWeek', name: 'Last Week' },
  { id: 'lastMonth', name: 'Last Month' },
  { id: 'last7days', name: 'Last 7 Days' },
]

export interface IDateFilter {
  id: string,
  start: Moment | null,
  end: Moment | null,
}

interface IProps {
  style?: any,
  isOpened: boolean,
  dateFilter?: IDateFilter,
  onFilterClick: () => void,
  onFilterSelected: (dateFilter: IDateFilter) => void,
  onRequestClose: () => void,
}

export default class DateFilter extends React.Component<IProps> {
  get buttonName() {
    const filter = this.props.dateFilter;
    if (!filter || filter.id === 'none') { return '-' }
    return elements.find(el => el.id === filter.id)!.name
  }

  handleItemClick = (id: string) => {
    let startDate = null
    let endDate = null

    if (id === 'today') {
      startDate = moment().startOf('day');
      endDate = moment().endOf('day');
    } else if (id === 'yesterday') {
      startDate = moment().subtract(1, 'days').startOf('day')
      endDate = moment().subtract(1, 'days').endOf('day')
    } else if (id === 'thisWeek') {
      startDate = moment().startOf('isoWeek')
      endDate = moment().endOf('isoWeek')
    } else if (id === 'thisMonth') {
      startDate = moment().startOf('month')
      endDate = moment().endOf('month')
    } else if (id === 'lastWeek') {
      startDate = moment().subtract(1, 'week').startOf('isoWeek')
      endDate = moment().subtract(1, 'week').endOf('isoWeek')
    } else if (id === 'lastMonth') {
      startDate = moment().subtract(1, 'month').startOf('month')
      endDate = moment().subtract(1, 'month').endOf('month')
    } else if (id === 'last7days') {
      startDate = moment().subtract(7, 'days').startOf('day')
      endDate = moment().endOf('day')
    }

    this.props.onFilterSelected({ id, start: startDate, end: endDate })
  }

  render() {
    return (
      <Wrapper style={this.props.style}>
        <Button
          id={'id'}
          name={this.buttonName}
          onClick={this.props.onFilterClick}
      />
        <DialogPicker
          isOpened={this.props.isOpened}
          elements={elements}
          onItemClick={this.handleItemClick}
          onRequestClose={this.props.onRequestClose}
        />
      </Wrapper>
    )
  }
}
