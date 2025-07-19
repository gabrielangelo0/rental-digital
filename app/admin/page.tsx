"use client"

import { AdminPanel } from "@/components/admin/admin-panel"
import { Toaster } from "@/components/ui/toaster"

export default function AdminPage() {
  return (
    <>
      <AdminPanel />
      <Toaster />
    </>
  )
}
