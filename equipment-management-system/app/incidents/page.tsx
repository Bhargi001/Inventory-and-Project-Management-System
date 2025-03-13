"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  Plus,
  Search,
  CheckCircle,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function IncidentsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      equipment: "Excavator CAT 320D",
      equipmentId: "EX-CAT-001",
      project: "Highway Extension Project",
      type: "Breakdown",
      details: "Hydraulic system failure",
      date: "2023-03-10",
      reportedBy: "John Smith",
      status: "Open",
    },
    {
      id: 2,
      equipment: "Loader Komatsu WA380",
      equipmentId: "LD-KOM-003",
      project: "Commercial Building Site",
      type: "Breakdown",
      details: "Engine overheating",
      date: "2023-03-08",
      reportedBy: "Sarah Johnson",
      status: "In Progress",
    },
    {
      id: 3,
      equipment: "Dump Truck Volvo A40G",
      equipmentId: "DT-VOL-007",
      project: "Mining Site Alpha",
      type: "Duress",
      details: "Transmission issues",
      date: "2023-03-05",
      reportedBy: "David Miller",
      status: "Resolved",
    },
    {
      id: 4,
      equipment: "Crane Liebherr LTM 1100",
      equipmentId: "CR-LIE-002",
      project: "Bridge Construction",
      type: "Breakdown",
      details: "Electrical system failure",
      date: "2023-03-01",
      reportedBy: "Robert Wilson",
      status: "Resolved",
    },
    {
      id: 5,
      equipment: "Bulldozer CAT D8T",
      equipmentId: "BD-CAT-004",
      project: "Land Development Project",
      type: "Duress",
      details: "Cooling system leakage",
      date: "2023-02-28",
      reportedBy: "Jennifer Lee",
      status: "Open",
    },
    {
      id: 6,
      equipment: "Concrete Mixer Truck",
      equipmentId: "CM-MER-012",
      project: "Residential Complex",
      type: "Breakdown",
      details: "Mixer drum not rotating",
      date: "2023-02-25",
      reportedBy: "Michael Brown",
      status: "In Progress",
    },
  ])

  // Form state for new incident
  const [newIncident, setNewIncident] = useState({
    equipment: "",
    equipmentId: "",
    project: "",
    type: "Breakdown",
    details: "",
  })

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.equipmentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || incident.type === typeFilter
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Check if user has permission to add incidents
  const canAddIncident = user && ["admin", "manager", "technician", "operator", "engineer"].includes(user.role)

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewIncident((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new incident
    const incident = {
      id: incidents.length + 1,
      ...newIncident,
      date: new Date().toISOString().split("T")[0],
      reportedBy: user?.name || "Unknown",
      status: "Open",
    }

    // Add to incidents
    setIncidents([incident, ...incidents])

    // Reset form and close dialog
    setNewIncident({
      equipment: "",
      equipmentId: "",
      project: "",
      type: "Breakdown",
      details: "",
    })
    setDialogOpen(false)

    // Show success toast
    toast({
      title: "Incident Reported",
      description: "The incident has been successfully reported.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Incidents</h2>
          <p className="text-muted-foreground">Track and manage equipment breakdowns and issues</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {canAddIncident && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Report Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Report New Incident</DialogTitle>
                    <DialogDescription>
                      Report an equipment breakdown or issue. Fill in all the details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="equipment" className="text-right">
                        Equipment
                      </Label>
                      <Input
                        id="equipment"
                        name="equipment"
                        value={newIncident.equipment}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="equipmentId" className="text-right">
                        Equipment ID
                      </Label>
                      <Input
                        id="equipmentId"
                        name="equipmentId"
                        value={newIncident.equipmentId}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="project" className="text-right">
                        Project
                      </Label>
                      <Input
                        id="project"
                        name="project"
                        value={newIncident.project}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select
                        name="type"
                        value={newIncident.type}
                        onValueChange={(value) => setNewIncident((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Breakdown">Breakdown</SelectItem>
                          <SelectItem value="Duress">Duress</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="details" className="text-right">
                        Details
                      </Label>
                      <Textarea
                        id="details"
                        name="details"
                        value={newIncident.details}
                        onChange={handleInputChange}
                        className="col-span-3"
                        rows={4}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit Report</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search incidents..."
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Breakdown">Breakdown</SelectItem>
                <SelectItem value="Duress">Duress</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Incident Reports</CardTitle>
          <CardDescription>Track and manage equipment breakdowns and issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Equipment ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={
                            incident.status === "Open"
                              ? "bg-red-100 text-red-500"
                              : incident.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-500"
                                : "bg-green-100 text-green-500"
                          }
                        >
                          {incident.status === "Open" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : incident.status === "In Progress" ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <Badge
                        variant={
                          incident.status === "Open"
                            ? "destructive"
                            : incident.status === "In Progress"
                              ? "default"
                              : "outline"
                        }
                      >
                        {incident.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/incidents/${incident.id}`} className="hover:underline">
                      {incident.equipment}
                    </Link>
                  </TableCell>
                  <TableCell>{incident.equipmentId}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{incident.type}</Badge>
                  </TableCell>
                  <TableCell>{incident.project}</TableCell>
                  <TableCell>{incident.date}</TableCell>
                  <TableCell>{incident.reportedBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {(user?.role === "admin" || user?.role === "manager" || user?.role === "technician") && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedIncidents = incidents.map((inc) => {
                              if (inc.id === incident.id) {
                                if (inc.status === "Open") {
                                  return { ...inc, status: "In Progress" }
                                } else if (inc.status === "In Progress") {
                                  return { ...inc, status: "Resolved" }
                                }
                              }
                              return inc
                            })
                            setIncidents(updatedIncidents)
                            toast({
                              title: "Status Updated",
                              description: "The incident status has been updated successfully.",
                            })
                          }}
                          disabled={incident.status === "Resolved"}
                        >
                          {incident.status === "Open"
                            ? "Start"
                            : incident.status === "In Progress"
                              ? "Resolve"
                              : "Resolved"}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{filteredIncidents.length}</strong> of <strong>{incidents.length}</strong> incidents
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

