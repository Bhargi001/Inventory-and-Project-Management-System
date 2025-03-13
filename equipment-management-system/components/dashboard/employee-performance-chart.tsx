"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function EmployeePerformanceChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = [
    {
      name: "Technicians",
      Performance: 85,
      Target: 80,
    },
    {
      name: "Operators",
      Performance: 78,
      Target: 80,
    },
    {
      name: "Engineers",
      Performance: 92,
      Target: 85,
    },
    {
      name: "Admin",
      Performance: 88,
      Target: 80,
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Performance" fill="#6366f1" />
        <Bar dataKey="Target" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}

