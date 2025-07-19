import type { Car, CreateCarData, UpdateCarData } from "@/types/car"

// Simulação de banco de dados em memória
const cars: Car[] = [
  {
    id: "1",
    name: "Tesla Model S",
    category: "Luxury",
    image: "/placeholder.svg?height=200&width=300&text=Tesla+Model+S",
    price: 120,
    rating: 4.8,
    reviews: 234,
    features: ["Electric", "Autopilot", "Premium Interior"],
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    description: "Carro elétrico de luxo com tecnologia avançada",
    available: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "BMW X5",
    category: "SUV",
    image: "/placeholder.svg?height=200&width=300&text=BMW+X5",
    price: 95,
    rating: 4.6,
    reviews: 189,
    features: ["AWD", "Leather Seats", "Navigation"],
    seats: 7,
    transmission: "Automatic",
    fuel: "Gasoline",
    description: "SUV premium com tração nas quatro rodas",
    available: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "Audi A4",
    category: "Sedan",
    image: "/placeholder.svg?height=200&width=300&text=Audi+A4",
    price: 75,
    rating: 4.5,
    reviews: 156,
    features: ["Quattro", "Premium Sound", "Sunroof"],
    seats: 5,
    transmission: "Automatic",
    fuel: "Gasoline",
    description: "Sedan executivo com design elegante",
    available: true,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
]

export const carService = {
  // Listar todos os carros
  async getAllCars(): Promise<Car[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...cars]), 100)
    })
  },

  // Buscar carro por ID
  async getCarById(id: string): Promise<Car | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const car = cars.find((c) => c.id === id) || null
        resolve(car)
      }, 100)
    })
  },

  // Criar novo carro
  async createCar(data: CreateCarData): Promise<Car> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCar: Car = {
          ...data,
          id: Date.now().toString(),
          rating: 0,
          reviews: 0,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        cars.push(newCar)
        resolve(newCar)
      }, 100)
    })
  },

  // Atualizar carro
  async updateCar(data: UpdateCarData): Promise<Car | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = cars.findIndex((c) => c.id === data.id)
        if (index === -1) {
          resolve(null)
          return
        }

        cars[index] = {
          ...cars[index],
          ...data,
          updatedAt: new Date(),
        }
        resolve(cars[index])
      }, 100)
    })
  },

  // Deletar carro
  async deleteCar(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = cars.findIndex((c) => c.id === id)
        if (index === -1) {
          resolve(false)
          return
        }

        cars.splice(index, 1)
        resolve(true)
      }, 100)
    })
  },

  // Alternar disponibilidade
  async toggleAvailability(id: string): Promise<Car | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = cars.findIndex((c) => c.id === id)
        if (index === -1) {
          resolve(null)
          return
        }

        cars[index].available = !cars[index].available
        cars[index].updatedAt = new Date()
        resolve(cars[index])
      }, 100)
    })
  },
}
