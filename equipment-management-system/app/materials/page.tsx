"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, ChevronLeft, ChevronRight, Download, Filter, Plus, Search } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Progress } from "@/components/ui/progress"

export default function MaterialsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const materialsData = [
    {
      id: 1,
      code: "CONC-001",
      name: "Concrete Mix",
      description: "Standard concrete mix for general construction",
      category: "Construction Materials",
      uom: "Bags",
      currentStock: 1200,
      minStock: 500,
      status: "In Stock",
    },
    {
      id: 2,
      code: "STL-001",
      name: "Steel Rebar",
      description: "Reinforcement steel bars for concrete structures",
      category: "Construction Materials",
      uom: "Tons",
      currentStock: 50,
      minStock: 20,
      status: "In Stock",
    },
    {
      id: 3,
      code: "FUEL-001",
      name: "Diesel Fuel",
      description: "Diesel fuel for heavy equipment",
      category: "Fuels",
      uom: "Liters",
      currentStock: 5000,
      minStock: 2000,
      status: "In Stock",
    },
    {
      id: 4,
      code: "OIL-001",
      name: "Engine Oil",
      description: "Engine oil for heavy equipment",
      category: "Lubricants",
      uom: "Liters",
      currentStock: 200,
      minStock: 100,
      status: "In Stock",
    },
    {
      id: 5,
      code: "OIL-002",
      name: "Hydraulic Oil",
      description: "Hydraulic oil for equipment systems",
      category: "Lubricants",
      uom: "Liters",
      currentStock: 150,
      minStock: 200,
      status: "Low Stock",
    },
    {
      id: 6,
      code: "TIMBER-001",
      name: "Timber Planks",
      description: "Wooden planks for construction",
      category: "Construction Materials",
      uom: "Pieces",
      currentStock: 300,
      minStock: 100,
      status: "In Stock",
    },
    {
      id: 7,
      code: "PAINT-001",
      name: "Industrial Paint",
      description: "Weather-resistant paint for exterior surfaces",
      category: "Finishing Materials",
      uom: "Gallons",
      currentStock: 50,
      minStock: 30,
      status: "In Stock",
    },
    {
      id: 8,
      code: "FILTER-001",
      name: "Air Filters",
      description: "Air filters for heavy equipment",
      category: "Spare Parts",
      uom: "Pieces",
      currentStock: 20,
      minStock: 50,
      status: "Low Stock",
    },
  ]

  const filteredMaterials = materialsData.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || material.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = [...new Set(materialsData.map((material) => material.category))]

  // Check if user has permission to add materials
  const canAddMaterial = user && ["admin", "manager"].includes(user.role)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Materials & Stock</h2>
          <p className="text-muted-foreground">Manage inventory and track material consumption</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {canAddMaterial && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search materials..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Materials Inventory</CardTitle>
          <CardDescription>Current stock levels and material information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">
                    <Link href={`/materials/${material.id}`} className="hover:underline">
                      {material.code}
                    </Link>
                  </TableCell>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.category}</TableCell>
                  <TableCell>{material.uom}</TableCell>
                  <TableCell>{material.currentStock}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(material.currentStock / material.minStock) * 100}
                        max={200}
                        className={`h-2 ${material.currentStock < material.minStock ? "bg-red-100" : "bg-gray-100"}`}
                      />
                      <span className="text-xs">{Math.round((material.currentStock / material.minStock) * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={material.status === "In Stock" ? "outline" : "destructive"}>
                      {material.status === "Low Stock" && <AlertTriangle className="mr-1 h-3 w-3" />}
                      {material.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{filteredMaterials.length}</strong> of <strong>{materialsData.length}</strong> materials
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

