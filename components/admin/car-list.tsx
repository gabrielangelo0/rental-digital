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
      <div className="text-center py-16">
        <div className="bg-slate-800/40 border-slate-600/50 rounded-2xl p-12 backdrop-blur-sm">
          <p className="text-slate-300 text-xl mb-2">Nenhum carro cadastrado</p>
          <p className="text-slate-400 text-sm">Clique em "Adicionar Carro" para começar</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card
            key={car.id}
            className="bg-slate-800/40 border-slate-600/50 overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:border-cyan-400/50"
          >
            <CardHeader className="p-0 relative">
              <div className="relative">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <Badge
                  className={`absolute top-4 left-4 ${
                    car.available
                      ? "bg-gradient-to-r from-green-600/90 to-emerald-600/90 backdrop-blur-sm border-0"
                      : "bg-gradient-to-r from-red-600/90 to-rose-600/90 backdrop-blur-sm border-0"
                  }`}
                >
                  {car.available ? "Disponível" : "Indisponível"}
                </Badge>
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm border-0">
                  {car.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{car.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <span>{car.seats} lugares</span>
                    <span className="text-slate-500">•</span>
                    <span>{car.transmission}</span>
                    <span className="text-slate-500">•</span>
                    <span>{car.fuel}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    ${car.price}
                  </div>
                  <div className="text-xs text-slate-400">por dia</div>
                </div>
              </div>

              {car.description && (
                <p className="text-sm text-slate-300 mb-3 line-clamp-2 leading-relaxed">{car.description}</p>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
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
                    +{car.features.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(car)}
                  className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700/50 bg-slate-800/30"
                  disabled={isLoading}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleAvailability(car.id)}
                  className="border-slate-600 text-slate-200 hover:bg-slate-700/50 bg-slate-800/30"
                  disabled={isLoading}
                >
                  {car.available ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteId(car.id)}
                  className="border-red-600/50 text-red-400 hover:bg-red-900/20 bg-red-900/10"
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700/50">
                Criado em: {car.createdAt.toLocaleDateString("pt-BR")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Tem certeza que deseja excluir este carro? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-600 text-slate-200 hover:bg-slate-700/50 bg-slate-800/30">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
