"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Download, Filter, HardHat, Plus, Search } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function EmployeesPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const employeesData = [
    {
      id: 1,
      empId: "EMP001",
      name: "John Smith",
      role: "Technician",
      designation: "Senior Mechanic",
      department: "Maintenance",
      joiningDate: "2020-03-15",
      project: "Highway Extension Project",
      status: "Active",
    },
    {
      id: 2,
      empId: "EMP002",
      name: "Sarah Johnson",
      role: "Operator",
      designation: "Heavy Equipment Operator",
      department: "Operations",
      joiningDate: "2019-06-22",
      project: "Commercial Building Site",
      status: "Active",
    },
    {
      id: 3,
      empId: "EMP003",
      name: "Michael Brown",
      role: "Engineer",
      designation: "Site Engineer",
      department: "Engineering",
      joiningDate: "2018-11-10",
      project: "Mining Site Alpha",
      status: "Active",
    },
    {
      id: 4,
      empId: "EMP004",
      name: "Emily Davis",
      role: "HR",
      designation: "HR Manager",
      department: "Human Resources",
      joiningDate: "2017-08-05",
      project: null,
      status: "Active",
    },
    {
      id: 5,
      empId: "EMP005",
      name: "Robert Wilson",
      role: "Manager",
      designation: "Project Manager",
      department: "Management",
      joiningDate: "2016-04-18",
      project: "Bridge Construction",
      status: "Active",
    },
    {
      id: 6,
      empId: "EMP006",
      name: "Jennifer Lee",
      role: "Technician",
      designation: "Junior Mechanic",
      department: "Maintenance",
      joiningDate: "2021-02-10",
      project: "Land Development Project",
      status: "Active",
    },
    {
      id: 7,
      empId: "EMP007",
      name: "David Miller",
      role: "Operator",
      designation: "Crane Operator",
      department: "Operations",
      joiningDate: "2020-09-15",
      project: "Residential Complex",
      status: "Active",
    },
    {
      id: 8,
      empId: "EMP008",
      name: "Lisa Anderson",
      role: "Admin",
      designation: "System Administrator",
      department: "IT",
      joiningDate: "2019-11-20",
      project: null,
      status: "Active",
    },
  ]

  const filteredEmployees = employeesData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.empId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || employee.role === roleFilter

    return matchesSearch && matchesRole
  })

  // Get unique roles for filter
  const roles = [...new Set(employeesData.map((employee) => employee.role))]

  // Check if user has permission to add employees
  const canAddEmployee = user && ["admin", "hr"].includes(user.role)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">Manage employees and their assignments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {canAddEmployee && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search employees..."
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
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Manage employees and their assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link href={`/employees/${employee.id}`} className="font-medium hover:underline">
                          {employee.name}
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.empId}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {employee.role === "Technician" && <HardHat className="mr-1 h-3 w-3" />}
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.joiningDate}</TableCell>
                  <TableCell>{employee.project || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === "Active" ? "outline" : "destructive"}>{employee.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{filteredEmployees.length}</strong> of <strong>{employeesData.length}</strong> employees
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

