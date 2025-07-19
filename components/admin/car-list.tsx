"use client"

import { useState } from "react"
import type { Car } from "@/types/car"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

interface CarListProps {
  cars: Car[]
  onEdit: (car: Car) => void
  onDelete: (id: string) => Promise<void>
  onToggleAvailability: (id: string) => Promise<void>
  isLoading?: boolean
}

export function CarList({ cars, onEdit, onDelete, onToggleAvailability, isLoading }: CarListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = async () => {
    if (deleteId) {
      await onDelete(deleteId)
      setDeleteId(null)
    }
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Nenhum carro cadastrado</p>
        <p className="text-gray-500 text-sm mt-2">Clique em "Adicionar Carro" para começar</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="bg-gray-900/50 border-gray-800 overflow-hidden">
            <CardHeader className="p-0 relative">
              <div className="relative">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <Badge
                  className={`absolute top-4 left-4 ${
                    car.available ? "bg-green-600/80 backdrop-blur-sm" : "bg-red-600/80 backdrop-blur-sm"
                  }`}
                >
                  {car.available ? "Disponível" : "Indisponível"}
                </Badge>
                <Badge className="absolute top-4 right-4 bg-blue-600/80 backdrop-blur-sm">{car.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{car.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{car.seats} lugares</span>
                    <span>•</span>
                    <span>{car.transmission}</span>
                    <span>•</span>
                    <span>{car.fuel}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-400">${car.price}</div>
                  <div className="text-xs text-gray-400">por dia</div>
                </div>
              </div>

              {car.description && <p className="text-sm text-gray-400 mb-3 line-clamp-2">{car.description}</p>}

              <div className="flex flex-wrap gap-1 mb-4">
                {car.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                    {feature}
                  </Badge>
                ))}
                {car.features.length > 3 && (
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                    +{car.features.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(car)}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                  disabled={isLoading}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleAvailability(car.id)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  disabled={isLoading}
                >
                  {car.available ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteId(car.id)}
                  className="border-red-700 text-red-400 hover:bg-red-900/20"
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs text-gray-500 mt-2">Criado em: {car.createdAt.toLocaleDateString("pt-BR")}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Tem certeza que deseja excluir este carro? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-800">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
