"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function EquipmentPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const equipmentData = [
    {
      id: 1,
      name: "Excavator CAT 320D",
      category: "Heavy Equipment",
      makeModel: "Caterpillar 320D",
      assetCode: "EX-CAT-001",
      year: 2018,
      project: "Highway Extension Project",
      status: "Operational",
      utilization: 78,
    },
    {
      id: 2,
      name: "Loader Komatsu WA380",
      category: "Heavy Equipment",
      makeModel: "Komatsu WA380",
      assetCode: "LD-KOM-003",
      year: 2019,
      project: "Commercial Building Site",
      status: "Operational",
      utilization: 65,
    },
    {
      id: 3,
      name: "Dump Truck Volvo A40G",
      category: "Heavy Equipment",
      makeModel: "Volvo A40G",
      assetCode: "DT-VOL-007",
      year: 2017,
      project: "Mining Site Alpha",
      status: "Under Maintenance",
      utilization: 0,
    },
    {
      id: 4,
      name: "Crane Liebherr LTM 1100",
      category: "Heavy Equipment",
      makeModel: "Liebherr LTM 1100",
      assetCode: "CR-LIE-002",
      year: 2020,
      project: "Bridge Construction",
      status: "Operational",
      utilization: 82,
    },
    {
      id: 5,
      name: "Bulldozer CAT D8T",
      category: "Heavy Equipment",
      makeModel: "Caterpillar D8T",
      assetCode: "BD-CAT-004",
      year: 2016,
      project: "Land Development Project",
      status: "Operational",
      utilization: 70,
    },
    {
      id: 6,
      name: "Concrete Mixer Truck",
      category: "Vehicles",
      makeModel: "Mercedes-Benz Arocs",
      assetCode: "CM-MER-012",
      year: 2021,
      project: "Residential Complex",
      status: "Operational",
      utilization: 55,
    },
    {
      id: 7,
      name: "Pickup Truck",
      category: "Vehicles",
      makeModel: "Toyota Hilux",
      assetCode: "PT-TOY-023",
      year: 2022,
      project: "Multiple Projects",
      status: "Operational",
      utilization: 90,
    },
    {
      id: 8,
      name: "Portable Generator",
      category: "Light Equipment",
      makeModel: "Honda EU7000is",
      assetCode: "PG-HON-015",
      year: 2020,
      project: "Multiple Projects",
      status: "Non-operational",
      utilization: 0,
    },
  ]

  const filteredEquipment = equipmentData.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.assetCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || equipment.category === categoryFilter
    const matchesStatus = statusFilter === "all" || equipment.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Check if user has permission to add equipment
  const canAddEquipment = user && ["admin", "manager"].includes(user.role)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Equipment</h2>
          <p className="text-muted-foreground">Manage and monitor all equipment across projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {canAddEquipment && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search equipment..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Heavy Equipment">Heavy Equipment</SelectItem>
                <SelectItem value="Light Equipment">Light Equipment</SelectItem>
                <SelectItem value="Vehicles">Vehicles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
                <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                <SelectItem value="Non-operational">Non-operational</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Equipment List</CardTitle>
          <CardDescription>Manage and monitor all equipment across projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Asset Code</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="font-medium">
                    <Link href={`/equipment/${equipment.id}`} className="hover:underline">
                      {equipment.name}
                    </Link>
                  </TableCell>
                  <TableCell>{equipment.category}</TableCell>
                  <TableCell>{equipment.assetCode}</TableCell>
                  <TableCell>{equipment.year}</TableCell>
                  <TableCell>{equipment.project}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        equipment.status === "Operational"
                          ? "outline"
                          : equipment.status === "Under Maintenance"
                            ? "default"
                            : equipment.status === "Under Maintenance"
                              ? "default"
                              : "destructive"
                      }
                    >
                      <span className="flex items-center gap-1">
                        {equipment.status === "Operational" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : equipment.status === "Under Maintenance" ? (
                          <SlidersHorizontal className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {equipment.status}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-gray-200">
                        <div
                          className={`h-full rounded-full ${
                            equipment.utilization > 70
                              ? "bg-green-500"
                              : equipment.utilization > 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${equipment.utilization}%` }}
                        />
                      </div>
                      <span className="text-xs">{equipment.utilization}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{filteredEquipment.length}</strong> of <strong>{equipmentData.length}</strong> equipment
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

