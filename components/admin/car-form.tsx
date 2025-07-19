"use client"

import type React from "react"

import { useState } from "react"
import type { Car, CreateCarData, UpdateCarData } from "@/types/car"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface CarFormProps {
  car?: Car
  onSubmit: (data: CreateCarData | UpdateCarData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function CarForm({ car, onSubmit, onCancel, isLoading }: CarFormProps) {
  const [formData, setFormData] = useState({
    name: car?.name || "",
    category: car?.category || "",
    image: car?.image || "",
    price: car?.price || 0,
    seats: car?.seats || 5,
    transmission: car?.transmission || "",
    fuel: car?.fuel || "",
    description: car?.description || "",
    features: car?.features || [],
  })

  const [newFeature, setNewFeature] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const submitData = car ? ({ ...formData, id: car.id } as UpdateCarData) : (formData as CreateCarData)

    await onSubmit(submitData)
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Carro</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Ex: Tesla Model S"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Luxury">Luxo</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Sedan">Sedan</SelectItem>
              <SelectItem value="Sports">Esportivo</SelectItem>
              <SelectItem value="Compact">Compacto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Preço por Dia ($)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))}
            placeholder="120.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seats">Número de Assentos</Label>
          <Select
            value={formData.seats.toString()}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, seats: Number.parseInt(value) }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 lugares</SelectItem>
              <SelectItem value="4">4 lugares</SelectItem>
              <SelectItem value="5">5 lugares</SelectItem>
              <SelectItem value="7">7 lugares</SelectItem>
              <SelectItem value="8">8 lugares</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transmission">Transmissão</Label>
          <Select
            value={formData.transmission}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, transmission: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a transmissão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Automatic">Automático</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="CVT">CVT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuel">Combustível</Label>
          <Select value={formData.fuel} onValueChange={(value) => setFormData((prev) => ({ ...prev, fuel: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o combustível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gasoline">Gasolina</SelectItem>
              <SelectItem value="Electric">Elétrico</SelectItem>
              <SelectItem value="Hybrid">Híbrido</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL da Imagem</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
          placeholder="/placeholder.svg?height=200&width=300&text=Car+Name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Descrição detalhada do veículo..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Características</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Ex: GPS, Ar Condicionado..."
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature} variant="outline">
            Adicionar
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {feature}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(feature)} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Salvando..." : car ? "Atualizar Carro" : "Criar Carro"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Cancelar
        </Button>
      </div>
    </form>
  )
}
