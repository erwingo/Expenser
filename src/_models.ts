export interface ICategory {
  id: number,
  description?: string,
  name: string,
}

export interface IExpense {
  id: number,
  price: number,
  category: ICategory['id'],
  isoDate: string,
  details?: string,
}
