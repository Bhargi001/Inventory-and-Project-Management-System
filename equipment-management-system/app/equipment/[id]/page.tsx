"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Construction,
  Edit,
  FileText,
  HardHat,
  Info,
  Settings,
  SlidersHorizontal,
  Truck,
  Wrench,
} from "lucide-react"

export default function EquipmentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // In a real application, you would fetch this data from your API
  const equipment = {
    id: Number.parseInt(params.id),
    name: "Excavator CAT 320D",
    category: "Heavy Equipment",
    makeModel: "Caterpillar 320D",
    assetCode: "EX-CAT-001",
    year: 2018,
    project: "Highway Extension Project",
    status: "Operational",
    utilization: 78,
    description: "20-ton hydraulic excavator with 1.0 cubic meter bucket capacity",
    specifications: {
      weight: "20,000 kg",
      engine: "Cat C6.6 ACERT",
      power: "140 hp",
      bucketCapacity: "1.0 m³",
      maxDiggingDepth: "6.7 m",
      maxReach: "9.9 m",
    },
    maintenanceHistory: [
      {
        id: 1,
        type: "Preventive",
        details: "Regular 1000-hour service",
        date: "2023-01-15",
        technician: "John Smith",
        cost: 850.0,
      },
      {
        id: 2,
        type: "Corrective",
        details: "Hydraulic hose replacement",
        date: "2022-11-10",
        technician: "Mike Johnson",
        cost: 450.0,
      },
      {
        id: 3,
        type: "Preventive",
        details: "Regular 500-hour service",
        date: "2022-08-22",
        technician: "John Smith",
        cost: 650.0,
      },
    ],
    utilizationHistory: [
      { month: "Jan", hours: 180, target: 200 },
      { month: "Feb", hours: 165, target: 200 },
      { month: "Mar", hours: 190, target: 200 },
      { month: "Apr", hours: 210, target: 200 },
      { month: "May", hours: 195, target: 200 },
      { month: "Jun", hours: 175, target: 200 },
    ],
    incidents: [
      {
        id: 1,
        type: "Breakdown",
        details: "Hydraulic system pressure loss",
        date: "2022-12-05",
        status: "Resolved",
      },
    ],
    assignedTechnicians: [
      {
        id: 1,
        name: "John Smith",
        designation: "Senior Mechanic",
        joiningDate: "2020-03-15",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6" />
            <h1 className="text-xl font-bold">Equipment Details</h1>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/equipment" className="text-sm font-medium hover:underline">
              Equipment
            </Link>
            <Link href="/maintenance" className="text-sm font-medium hover:underline">
              Maintenance
            </Link>
            <Link href="/inventory" className="text-sm font-medium hover:underline">
              Inventory
            </Link>
            <Link href="/reports" className="text-sm font-medium hover:underline">
              Reports
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/equipment">
                  <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h2 className="text-3xl font-bold tracking-tight">{equipment.name}</h2>
                <Badge
                  variant={
                    equipment.status === "Operational"
                      ? "outline"
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
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Equipment
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Asset Code</CardTitle>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{equipment.assetCode}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Category</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{equipment.category}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Year</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{equipment.year}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Project</CardTitle>
                  <Construction className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold truncate">{equipment.project}</div>
                </CardContent>
              </Card>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="utilization">Utilization</TabsTrigger>
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
                <TabsTrigger value="technicians">Technicians</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Information</CardTitle>
                    <CardDescription>Detailed information about {equipment.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-medium">Details</h3>
                        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Make/Model</dt>
                            <dd className="mt-1 text-sm">{equipment.makeModel}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Asset Code</dt>
                            <dd className="mt-1 text-sm">{equipment.assetCode}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                            <dd className="mt-1 text-sm">{equipment.category}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Year</dt>
                            <dd className="mt-1 text-sm">{equipment.year}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Project</dt>
                            <dd className="mt-1 text-sm">{equipment.project}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                            <dd className="mt-1 text-sm">{equipment.status}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Description</h3>
                        <p className="mt-4 text-sm">{equipment.description}</p>
                        <h3 className="mt-6 text-lg font-medium">Recent Activity</h3>
                        <ul className="mt-4 space-y-3">
                          {equipment.maintenanceHistory.slice(0, 2).map((maintenance) => (
                            <li key={maintenance.id} className="flex items-start gap-2 text-sm">
                              <Wrench className="h-4 w-4 mt-0.5 text-muted-foreground" />
                              <div>
                                <span className="font-medium">{maintenance.type} Maintenance</span>:{" "}
                                {maintenance.details} on {maintenance.date}
                              </div>
                            </li>
                          ))}
                          {equipment.incidents.slice(0, 1).map((incident) => (
                            <li key={incident.id} className="flex items-start gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 mt-0.5 text-muted-foreground" />
                              <div>
                                <span className="font-medium">{incident.type}</span>: {incident.details} on{" "}
                                {incident.date}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="specifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                    <CardDescription>Detailed specifications for {equipment.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-medium">General Specifications</h3>
                        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Weight</dt>
                            <dd className="mt-1 text-sm">{equipment.specifications.weight}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Engine</dt>
                            <dd className="mt-1 text-sm">{equipment.specifications.engine}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Power</dt>
                            <dd className="mt-1 text-sm">{equipment.specifications.power}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Bucket Capacity</dt>
                            <dd className="mt-1 text-sm">{equipment.specifications.bucketCapacity}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Max Digging Depth</dt>
                            <dd className="mt-1 text-sm">{equipment.specifications.maxDiggingDepth}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Max Reach</dt>
                            <dd className="mt-1 text-sm">{equipment.specifications.maxReach}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Maintenance Requirements</h3>
                        <ul className="mt-4 space-y-3">
                          <li className="flex items-start gap-2 text-sm">
                            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <span className="font-medium">Daily Checks</span>: Engine oil, hydraulic oil, coolant
                              levels, and visual inspection
                            </div>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <span className="font-medium">250 Hours</span>: Engine oil and filter change, fuel filter
                              check
                            </div>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <span className="font-medium">500 Hours</span>: Hydraulic oil filter change, swing gear
                              oil check
                            </div>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <span className="font-medium">1000 Hours</span>: Full service including hydraulic system
                              check
                            </div>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <span className="font-medium">2000 Hours</span>: Major overhaul including hydraulic oil
                              change
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="maintenance" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Maintenance History</CardTitle>
                      <CardDescription>Maintenance records for {equipment.name}</CardDescription>
                    </div>
                    <Button>
                      <Wrench className="mr-2 h-4 w-4" />
                      Schedule Maintenance
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {equipment.maintenanceHistory.map((maintenance) => (
                        <div key={maintenance.id} className="flex items-start gap-4 rounded-lg border p-4">
                          <div
                            className={`rounded-full p-2 ${
                              maintenance.type === "Preventive"
                                ? "bg-blue-100 text-blue-500"
                                : "bg-amber-100 text-amber-500"
                            }`}
                          >
                            {maintenance.type === "Preventive" ? (
                              <Settings className="h-4 w-4" />
                            ) : (
                              <Wrench className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{maintenance.type} Maintenance</p>
                              <Badge variant="outline">{maintenance.date}</Badge>
                            </div>
                            <p className="text-sm">{maintenance.details}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>Technician: {maintenance.technician}</span>
                              <span>Cost: ${maintenance.cost.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="utilization" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Utilization</CardTitle>
                    <CardDescription>Monthly utilization data for {equipment.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="h-[300px] w-full">
                        {/* In a real app, you would use a chart library here */}
                        <div className="h-full w-full rounded-lg border p-4">
                          <div className="flex h-full flex-col justify-between">
                            <div className="grid grid-cols-6 gap-2 h-[220px]">
                              {equipment.utilizationHistory.map((data) => (
                                <div key={data.month} className="flex flex-col items-center justify-end h-full">
                                  <div className="relative w-full">
                                    <div
                                      className="absolute bottom-0 left-0 right-0 border-t border-dashed border-muted-foreground"
                                      style={{ bottom: `${(data.target / 250) * 100}%` }}
                                    />
                                    <div
                                      className={`w-full rounded-t-sm ${
                                        data.hours >= data.target ? "bg-green-500" : "bg-amber-500"
                                      }`}
                                      style={{ height: `${(data.hours / 250) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-6 gap-2 pt-2 border-t">
                              {equipment.utilizationHistory.map((data) => (
                                <div key={data.month} className="text-center text-xs">
                                  <div>{data.month}</div>
                                  <div className="text-muted-foreground">{data.hours}h</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-sm">Average Monthly Hours</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold">
                              {Math.round(
                                equipment.utilizationHistory.reduce((sum, data) => sum + data.hours, 0) /
                                  equipment.utilizationHistory.length,
                              )}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-sm">Target Achievement</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold">
                              {Math.round(
                                (equipment.utilizationHistory.reduce((sum, data) => sum + data.hours, 0) /
                                  equipment.utilizationHistory.reduce((sum, data) => sum + data.target, 0)) *
                                  100,
                              )}
                              %
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-sm">Best Month</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold">
                              {
                                equipment.utilizationHistory.reduce((best, data) =>
                                  data.hours > best.hours ? data : best,
                                ).month
                              }
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="incidents" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Incident Reports</CardTitle>
                      <CardDescription>Breakdown and duress incidents for {equipment.name}</CardDescription>
                    </div>
                    <Button>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Report Incident
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {equipment.incidents.length > 0 ? (
                      <div className="space-y-4">
                        {equipment.incidents.map((incident) => (
                          <div key={incident.id} className="flex items-start gap-4 rounded-lg border p-4">
                            <div
                              className={`rounded-full p-2 ${
                                incident.type === "Breakdown"
                                  ? "bg-red-100 text-red-500"
                                  : "bg-amber-100 text-amber-500"
                              }`}
                            >
                              <AlertCircle className="h-4 w-4" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{incident.type}</p>
                                <Badge variant={incident.status === "Resolved" ? "outline" : "destructive"}>
                                  {incident.status}
                                </Badge>
                              </div>
                              <p className="text-sm">{incident.details}</p>
                              <div className="text-sm text-muted-foreground">
                                <span>Date: {incident.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-medium">No Incidents Reported</h3>
                        <p className="text-sm text-muted-foreground mt-1">This equipment has no reported incidents.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="technicians" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Assigned Technicians</CardTitle>
                      <CardDescription>Technicians responsible for {equipment.name}</CardDescription>
                    </div>
                    <Button>
                      <HardHat className="mr-2 h-4 w-4" />
                      Assign Technician
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {equipment.assignedTechnicians.map((technician) => (
                        <div key={technician.id} className="flex items-start gap-4 rounded-lg border p-4">
                          <div className="rounded-full p-2 bg-blue-100 text-blue-500">
                            <HardHat className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">{technician.name}</p>
                            <p className="text-sm">{technician.designation}</p>
                            <div className="text-sm text-muted-foreground">
                              <span>Joined: {technician.joiningDate}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Equipment Management System. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

