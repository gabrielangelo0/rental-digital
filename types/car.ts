export interface Car {
  id: string
  name: string
  category: string
  image: string
  price: number
  rating: number
  reviews: number
  features: string[]
  seats: number
  transmission: string
  fuel: string
  description?: string
  available: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateCarData {
  name: string
  category: string
  image: string
  price: number
  features: string[]
  seats: number
  transmission: string
  fuel: string
  description?: string
}

export interface UpdateCarData extends Partial<CreateCarData> {
  id: string
}
