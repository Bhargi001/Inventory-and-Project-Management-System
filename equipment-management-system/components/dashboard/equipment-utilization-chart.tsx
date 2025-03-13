"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function EquipmentUtilizationChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = [
    {
      name: "Jan",
      "Heavy Equipment": 65,
      "Light Equipment": 78,
      Vehicles: 82,
    },
    {
      name: "Feb",
      "Heavy Equipment": 59,
      "Light Equipment": 75,
      Vehicles: 79,
    },
    {
      name: "Mar",
      "Heavy Equipment": 80,
      "Light Equipment": 85,
      Vehicles: 88,
    },
    {
      name: "Apr",
      "Heavy Equipment": 81,
      "Light Equipment": 84,
      Vehicles: 90,
    },
    {
      name: "May",
      "Heavy Equipment": 56,
      "Light Equipment": 68,
      Vehicles: 74,
    },
    {
      name: "Jun",
      "Heavy Equipment": 55,
      "Light Equipment": 65,
      Vehicles: 70,
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Heavy Equipment" fill="#6366f1" />
        <Bar dataKey="Light Equipment" fill="#8884d8" />
        <Bar dataKey="Vehicles" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

