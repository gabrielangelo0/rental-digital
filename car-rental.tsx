"use client"

import { Calendar, Car, Clock, Filter, Heart, MapPin, Search, Star, Users } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { carService } from "@/lib/car-service"
import type { Car as CarType } from "@/types/car"

export default function Component() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [cars, setCars] = useState<CarType[]>([])

  useEffect(() => {
    const loadCars = async () => {
      const data = await carService.getAllCars()
      setCars(data.filter((car) => car.available)) // Only show available cars
    }
    loadCars()
  }, [])

  const toggleFavorite = (carId: string) => {
    setFavorites((prev) => (prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                LuxRent
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">
                Carros
              </a>
              <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">
                Sobre
              </a>
              <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">
                Contato
              </a>
              <a href="/admin" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">
                Admin
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                Entrar
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent leading-tight">
            Alugue o Carro
            <br />
            dos Seus Sonhos
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Descubra nossa frota premium de veículos de luxo e esportivos. Experiência única, preços competitivos.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 pb-12">
        <div className="container mx-auto">
          <Card className="bg-slate-800/50 border-slate-600/50 backdrop-blur-md shadow-2xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-200">Local de Retirada</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-cyan-400" />
                    <Input
                      placeholder="São Paulo, SP"
                      className="pl-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-200">Data de Retirada</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-cyan-400" />
                    <Input
                      type="date"
                      className="pl-11 bg-slate-700/50 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-200">Data de Devolução</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-cyan-400" />
                    <Input
                      type="date"
                      className="pl-11 bg-slate-700/50 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-200">Horário</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-cyan-400" />
                    <Input
                      type="time"
                      className="pl-11 bg-slate-700/50 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all h-12">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Carros
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-200 hover:bg-slate-700/50 bg-slate-800/30 h-12"
                >
                  <Filter className="mr-2 h-5 w-5" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-slate-300 font-medium">Filtrar por:</span>
            <Select>
              <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="luxury">Luxo</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="sports">Esportivo</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="0-50">$0 - $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-150">$100 - $150</SelectItem>
                <SelectItem value="150+">$150+</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Combustível" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="gasoline">Gasolina</SelectItem>
                <SelectItem value="electric">Elétrico</SelectItem>
                <SelectItem value="hybrid">Híbrido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              Carros Disponíveis
            </h2>
            <span className="text-slate-300 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-600/50">
              {cars.length} carros encontrados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Card
                key={car.id}
                className="bg-slate-800/40 border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 group overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-slate-900/70 backdrop-blur-sm hover:bg-slate-800/80 border border-slate-600/50"
                      onClick={() => toggleFavorite(car.id)}
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          favorites.includes(car.id) ? "fill-red-500 text-red-500" : "text-slate-300 hover:text-red-400"
                        }`}
                      />
                    </Button>
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm border-0 text-white font-medium">
                      {car.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">{car.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{car.rating}</span>
                        </div>
                        <span className="text-slate-500">•</span>
                        <span>{car.reviews} avaliações</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        ${car.price}
                      </div>
                      <div className="text-sm text-slate-400">por dia</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2 bg-slate-700/30 px-3 py-1 rounded-full">
                      <Users className="h-4 w-4 text-cyan-400" />
                      <span>{car.seats} lugares</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-700/30 px-3 py-1 rounded-full">
                      <Car className="h-4 w-4 text-cyan-400" />
                      <span>{car.transmission}</span>
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-slate-300 bg-slate-700/20">
                      {car.fuel}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-slate-700/50 text-slate-200 text-xs border border-slate-600/30"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {car.features.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-cyan-300 text-xs border border-cyan-500/30"
                        >
                          +{car.features.length - 3} mais
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Separator className="mb-4 bg-slate-600/50" />

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700/50 bg-slate-800/30"
                    >
                      Ver Detalhes
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                      Reservar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  LuxRent
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Sua experiência premium em aluguel de carros de luxo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Empresa</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Imprensa
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Suporte</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-slate-700/50" />
          <div className="text-center text-sm text-slate-400">© 2024 LuxRent. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
