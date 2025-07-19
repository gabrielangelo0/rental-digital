"use client"

import { useState, useEffect } from "react"
import type { Car, CreateCarData, UpdateCarData } from "@/types/car"
import { carService } from "@/lib/car-service"
import { CarForm } from "./car-form"
import { CarList } from "./car-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, CarIcon, DollarSign, Users, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ViewMode = "list" | "create" | "edit"

export function AdminPanel() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    loadCars()
  }, [])

  useEffect(() => {
    filterCars()
  }, [cars, searchTerm, categoryFilter, availabilityFilter])

  const loadCars = async () => {
    try {
      const data = await carService.getAllCars()
      setCars(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os carros",
        variant: "destructive",
      })
    }
  }

  const filterCars = () => {
    let filtered = cars

    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((car) => car.category === categoryFilter)
    }

    if (availabilityFilter !== "all") {
      filtered = filtered.filter((car) => (availabilityFilter === "available" ? car.available : !car.available))
    }

    setFilteredCars(filtered)
  }

  const handleCreateCar = async (data: CreateCarData) => {
    setIsLoading(true)
    try {
      await carService.createCar(data)
      await loadCars()
      setViewMode("list")
      toast({
        title: "Sucesso",
        description: "Carro criado com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o carro",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateCar = async (data: UpdateCarData) => {
    setIsLoading(true)
    try {
      await carService.updateCar(data)
      await loadCars()
      setViewMode("list")
      setEditingCar(null)
      toast({
        title: "Sucesso",
        description: "Carro atualizado com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o carro",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCar = async (id: string) => {
    setIsLoading(true)
    try {
      await carService.deleteCar(id)
      await loadCars()
      toast({
        title: "Sucesso",
        description: "Carro excluído com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o carro",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleAvailability = async (id: string) => {
    setIsLoading(true)
    try {
      await carService.toggleAvailability(id)
      await loadCars()
      toast({
        title: "Sucesso",
        description: "Disponibilidade alterada com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível alterar a disponibilidade",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditCar = (car: Car) => {
    setEditingCar(car)
    setViewMode("edit")
  }

  const handleCancel = () => {
    setViewMode("list")
    setEditingCar(null)
  }

  const stats = {
    total: cars.length,
    available: cars.filter((c) => c.available).length,
    avgPrice: cars.length > 0 ? Math.round(cars.reduce((sum, c) => sum + c.price, 0) / cars.length) : 0,
    categories: [...new Set(cars.map((c) => c.category))].length,
  }

  if (viewMode === "create") {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Adicionar Novo Carro</h1>
            <p className="text-gray-400">Preencha os dados do novo veículo</p>
          </div>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <CarForm onSubmit={handleCreateCar} onCancel={handleCancel} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (viewMode === "edit" && editingCar) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Editar Carro</h1>
            <p className="text-gray-400">Atualize os dados do veículo</p>
          </div>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <CarForm car={editingCar} onSubmit={handleUpdateCar} onCancel={handleCancel} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-gray-400">Gerencie a frota de veículos</p>
          </div>
          <Button
            onClick={() => setViewMode("create")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Carro
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total de Carros</CardTitle>
              <CarIcon className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Disponíveis</CardTitle>
              <Eye className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.available}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Preço Médio</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.avgPrice}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Categorias</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.categories}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="Luxury">Luxo</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="Sports">Esportivo</SelectItem>
                  <SelectItem value="Compact">Compacto</SelectItem>
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Disponibilidade" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="available">Disponíveis</SelectItem>
                  <SelectItem value="unavailable">Indisponíveis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Car List */}
        <CarList
          cars={filteredCars}
          onEdit={handleEditCar}
          onDelete={handleDeleteCar}
          onToggleAvailability={handleToggleAvailability}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
