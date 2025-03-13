"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function FinancialOverviewChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = [
    {
      name: "Jan",
      "Equipment Maintenance": 12000,
      "Material Purchases": 18000,
      Fuel: 8000,
      Labor: 25000,
    },
    {
      name: "Feb",
      "Equipment Maintenance": 10000,
      "Material Purchases": 15000,
      Fuel: 7500,
      Labor: 24000,
    },
    {
      name: "Mar",
      "Equipment Maintenance": 15000,
      "Material Purchases": 20000,
      Fuel: 9000,
      Labor: 26000,
    },
    {
      name: "Apr",
      "Equipment Maintenance": 13000,
      "Material Purchases": 22000,
      Fuel: 8500,
      Labor: 27000,
    },
    {
      name: "May",
      "Equipment Maintenance": 14000,
      "Material Purchases": 19000,
      Fuel: 9500,
      Labor: 28000,
    },
    {
      name: "Jun",
      "Equipment Maintenance": 16000,
      "Material Purchases": 21000,
      Fuel: 10000,
      Labor: 29000,
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
        <Bar dataKey="Equipment Maintenance" stackId="a" fill="#6366f1" />
        <Bar dataKey="Material Purchases" stackId="a" fill="#8884d8" />
        <Bar dataKey="Fuel" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Labor" stackId="a" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}

