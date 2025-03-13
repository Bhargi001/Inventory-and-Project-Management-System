"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function MaterialConsumptionChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = [
    {
      name: "Jan",
      Concrete: 4000,
      Steel: 2400,
      Timber: 1800,
    },
    {
      name: "Feb",
      Concrete: 3500,
      Steel: 2100,
      Timber: 1500,
    },
    {
      name: "Mar",
      Concrete: 5000,
      Steel: 2800,
      Timber: 2200,
    },
    {
      name: "Apr",
      Concrete: 4800,
      Steel: 3000,
      Timber: 2100,
    },
    {
      name: "May",
      Concrete: 5500,
      Steel: 3200,
      Timber: 2400,
    },
    {
      name: "Jun",
      Concrete: 6000,
      Steel: 3500,
      Timber: 2600,
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Concrete" stackId="1" stroke="#6366f1" fill="#6366f1" />
        <Area type="monotone" dataKey="Steel" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="Timber" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

