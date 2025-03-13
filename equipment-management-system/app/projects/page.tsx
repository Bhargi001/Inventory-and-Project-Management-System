"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, Plus, Search } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function ProjectsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  const projectsData = [
    {
      id: 1,
      name: "Highway Extension Project",
      location: "North Region",
      equipmentCount: 12,
      employeeCount: 45,
      startDate: "2022-06-15",
      endDate: "2023-12-30",
      status: "Active",
      progress: 65,
    },
    {
      id: 2,
      name: "Commercial Building Site",
      location: "Central City",
      equipmentCount: 8,
      employeeCount: 32,
      startDate: "2022-08-10",
      endDate: "2023-10-15",
      status: "Active",
      progress: 42,
    },
    {
      id: 3,
      name: "Mining Site Alpha",
      location: "Eastern Mountains",
      equipmentCount: 15,
      employeeCount: 60,
      startDate: "2021-11-05",
      endDate: "2024-05-20",
      status: "Active",
      progress: 78,
    },
    {
      id: 4,
      name: "Bridge Construction",
      location: "River Delta",
      equipmentCount: 10,
      employeeCount: 38,
      startDate: "2022-03-22",
      endDate: "2023-09-10",
      status: "Active",
      progress: 35,
    },
    {
      id: 5,
      name: "Land Development Project",
      location: "Western Region",
      equipmentCount: 7,
      employeeCount: 25,
      startDate: "2022-09-01",
      endDate: "2023-08-30",
      status: "Active",
      progress: 50,
    },
    {
      id: 6,
      name: "Residential Complex",
      location: "Suburban Area",
      equipmentCount: 6,
      employeeCount: 28,
      startDate: "2022-07-12",
      endDate: "2023-11-15",
      status: "Active",
      progress: 60,
    },
    {
      id: 7,
      name: "Airport Expansion",
      location: "Metropolitan Area",
      equipmentCount: 14,
      employeeCount: 52,
      startDate: "2021-10-18",
      endDate: "2024-02-28",
      status: "Active",
      progress: 70,
    },
    {
      id: 8,
      name: "Railway Maintenance",
      location: "Southern Corridor",
      equipmentCount: 9,
      employeeCount: 30,
      startDate: "2022-05-05",
      endDate: "2023-07-15",
      status: "Completed",
      progress: 100,
    },
  ]

  const filteredProjects = projectsData.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Check if user has permission to add projects
  const canAddProject = user && ["admin"].includes(user.role)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage and monitor all projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {canAddProject && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search projects..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
          <CardDescription>Manage and monitor all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <Link href={`/projects/${project.id}`} className="hover:underline">
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>{project.equipmentCount}</TableCell>
                  <TableCell>{project.employeeCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-gray-200">
                        <div
                          className={`h-full rounded-full ${
                            project.progress > 70
                              ? "bg-green-500"
                              : project.progress > 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell>
                    <Badge variant={project.status === "Active" ? "default" : "outline"}>{project.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{filteredProjects.length}</strong> of <strong>{projectsData.length}</strong> projects
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

