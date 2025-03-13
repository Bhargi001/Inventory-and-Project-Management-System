"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Download, Filter, Plus, Search, CheckCircle, X } from "lucide-react"
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
import { useToast } from "@/components/ui/use-toast"
import FinancialOverviewChart from "@/components/dashboard/financial-overview-chart"

export default function FinancialsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("overtime")

  // Overtime data
  const [overtimeRecords, setOvertimeRecords] = useState([
    {
      id: 1,
      employee: "John Smith",
      employeeId: "EMP001",
      department: "Maintenance",
      date: "2023-03-10",
      hours: 3.5,
      project: "Highway Extension Project",
      reason: "Emergency equipment repair",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Sarah Johnson",
      employeeId: "EMP002",
      department: "Operations",
      date: "2023-03-08",
      hours: 2.0,
      project: "Commercial Building Site",
      reason: "Extended concrete pouring",
      status: "Approved",
    },
    {
      id: 3,
      employee: "Michael Brown",
      employeeId: "EMP003",
      department: "Engineering",
      date: "2023-03-05",
      hours: 4.0,
      project: "Mining Site Alpha",
      reason: "Site survey completion",
      status: "Pending",
    },
    {
      id: 4,
      employee: "Jennifer Lee",
      employeeId: "EMP006",
      department: "Maintenance",
      date: "2023-03-01",
      hours: 2.5,
      project: "Land Development Project",
      reason: "Equipment troubleshooting",
      status: "Approved",
    },
    {
      id: 5,
      employee: "David Miller",
      employeeId: "EMP007",
      department: "Operations",
      date: "2023-02-28",
      hours: 3.0,
      project: "Residential Complex",
      reason: "Material delivery delay",
      status: "Rejected",
    },
  ])

  // Petty cash data
  const [pettyCashRecords, setPettyCashRecords] = useState([
    {
      id: 1,
      requestedBy: "John Smith",
      employeeId: "EMP001",
      department: "Maintenance",
      date: "2023-03-10",
      amount: 250.0,
      purpose: "Emergency parts purchase",
      project: "Highway Extension Project",
      status: "Approved",
    },
    {
      id: 2,
      requestedBy: "Sarah Johnson",
      employeeId: "EMP002",
      department: "Operations",
      date: "2023-03-08",
      amount: 120.5,
      purpose: "Fuel for generator",
      project: "Commercial Building Site",
      status: "Approved",
    },
    {
      id: 3,
      requestedBy: "Michael Brown",
      employeeId: "EMP003",
      department: "Engineering",
      date: "2023-03-05",
      amount: 350.0,
      purpose: "Survey equipment rental",
      project: "Mining Site Alpha",
      status: "Pending",
    },
    {
      id: 4,
      requestedBy: "Robert Wilson",
      employeeId: "EMP005",
      department: "Management",
      date: "2023-03-01",
      amount: 180.75,
      purpose: "Client meeting expenses",
      project: "Bridge Construction",
      status: "Approved",
    },
    {
      id: 5,
      requestedBy: "Jennifer Lee",
      employeeId: "EMP006",
      department: "Maintenance",
      date: "2023-02-28",
      amount: 95.2,
      purpose: "Tool replacements",
      project: "Land Development Project",
      status: "Rejected",
    },
  ])

  // Form state for new overtime record
  const [newOvertime, setNewOvertime] = useState({
    employee: "",
    employeeId: "",
    department: "",
    date: "",
    hours: "",
    project: "",
    reason: "",
  })

  // Form state for new petty cash request
  const [newPettyCash, setNewPettyCash] = useState({
    requestedBy: "",
    employeeId: "",
    department: "",
    date: "",
    amount: "",
    purpose: "",
    project: "",
  })

  // Dialog state
  const [overtimeDialogOpen, setOvertimeDialogOpen] = useState(false)
  const [pettyCashDialogOpen, setPettyCashDialogOpen] = useState(false)

  // Filter overtime records
  const filteredOvertimeRecords = overtimeRecords.filter((record) => {
    const matchesSearch =
      record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Filter petty cash records
  const filteredPettyCashRecords = pettyCashRecords.filter((record) => {
    const matchesSearch =
      record.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Check if user has permission to add/approve records
  const canAddRecord = user && ["admin", "manager", "hr"].includes(user.role)
  const canApprove = user && ["admin", "manager"].includes(user.role)

  // Handle overtime form input changes
  const handleOvertimeInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setNewOvertime((prev) => ({ ...prev, [name]: value }))
  }

  // Handle petty cash form input changes
  const handlePettyCashInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setNewPettyCash((prev) => ({ ...prev, [name]: value }))
  }

  // Handle overtime form submission
  const handleOvertimeSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new overtime record
    const record = {
      id: overtimeRecords.length + 1,
      ...newOvertime,
      hours: Number.parseFloat(newOvertime.hours),
      status: "Pending",
    }

    // Add to records
    setOvertimeRecords([record, ...overtimeRecords])

    // Reset form and close dialog
    setNewOvertime({
      employee: "",
      employeeId: "",
      department: "",
      date: "",
      hours: "",
      project: "",
      reason: "",
    })
    setOvertimeDialogOpen(false)

    // Show success toast
    toast({
      title: "Overtime Submitted",
      description: "The overtime record has been successfully submitted for approval.",
    })
  }

  // Handle petty cash form submission
  const handlePettyCashSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new petty cash record
    const record = {
      id: pettyCashRecords.length + 1,
      ...newPettyCash,
      amount: Number.parseFloat(newPettyCash.amount),
      status: "Pending",
    }

    // Add to records
    setPettyCashRecords([record, ...pettyCashRecords])

    // Reset form and close dialog
    setNewPettyCash({
      requestedBy: "",
      employeeId: "",
      department: "",
      date: "",
      amount: "",
      purpose: "",
      project: "",
    })
    setPettyCashDialogOpen(false)

    // Show success toast
    toast({
      title: "Petty Cash Request Submitted",
      description: "The petty cash request has been successfully submitted for approval.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financials</h2>
          <p className="text-muted-foreground">Manage overtime and petty cash transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Monthly expenses by category</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <FinancialOverviewChart />
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overtime">Overtime</TabsTrigger>
          <TabsTrigger value="petty-cash">Petty Cash</TabsTrigger>
        </TabsList>

        <TabsContent value="overtime" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search overtime records..."
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {canAddRecord && (
                <Dialog open={overtimeDialogOpen} onOpenChange={setOvertimeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Overtime
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <form onSubmit={handleOvertimeSubmit}>
                      <DialogHeader>
                        <DialogTitle>Submit Overtime</DialogTitle>
                        <DialogDescription>
                          Submit an overtime record for approval. Fill in all the details below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="employee" className="text-right">
                            Employee
                          </Label>
                          <Input
                            id="employee"
                            name="employee"
                            value={newOvertime.employee}
                            onChange={handleOvertimeInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="employeeId" className="text-right">
                            Employee ID
                          </Label>
                          <Input
                            id="employeeId"
                            name="employeeId"
                            value={newOvertime.employeeId}
                            onChange={handleOvertimeInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="department" className="text-right">
                            Department
                          </Label>
                          <Input
                            id="department"
                            name="department"
                            value={newOvertime.department}
                            onChange={handleOvertimeInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={newOvertime.date}
                            onChange={handleOvertimeInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="hours" className="text-right">
                            Hours
                          </Label>
                          <Input
                            id="hours"
                            name="hours"
                            type="number"
                            step="0.5"
                            min="0.5"
                            value={newOvertime.hours}
                            onChange={handleOvertimeInputChange}
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
                            value={newOvertime.project}
                            onChange={handleOvertimeInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="reason" className="text-right">
                            Reason
                          </Label>
                          <Input
                            id="reason"
                            name="reason"
                            value={newOvertime.reason}
                            onChange={handleOvertimeInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Submit</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Overtime Records</CardTitle>
              <CardDescription>Track and approve overtime hours</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOvertimeRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employee}</TableCell>
                      <TableCell>{record.employeeId}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.hours}</TableCell>
                      <TableCell>{record.project}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "Pending"
                              ? "default"
                              : record.status === "Approved"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {canApprove && record.status === "Pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 hover:bg-green-100 text-green-600"
                                onClick={() => {
                                  const updatedRecords = overtimeRecords.map((rec) => {
                                    if (rec.id === record.id) {
                                      return { ...rec, status: "Approved" }
                                    }
                                    return rec
                                  })
                                  setOvertimeRecords(updatedRecords)
                                  toast({
                                    title: "Overtime Approved",
                                    description: "The overtime record has been approved successfully.",
                                  })
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 hover:bg-red-100 text-red-600"
                                onClick={() => {
                                  const updatedRecords = overtimeRecords.map((rec) => {
                                    if (rec.id === record.id) {
                                      return { ...rec, status: "Rejected" }
                                    }
                                    return rec
                                  })
                                  setOvertimeRecords(updatedRecords)
                                  toast({
                                    title: "Overtime Rejected",
                                    description: "The overtime record has been rejected.",
                                  })
                                }}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
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
                Showing <strong>{filteredOvertimeRecords.length}</strong> of <strong>{overtimeRecords.length}</strong>{" "}
                records
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
        </TabsContent>

        <TabsContent value="petty-cash" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search petty cash records..."
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {canAddRecord && (
                <Dialog open={pettyCashDialogOpen} onOpenChange={setPettyCashDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Petty Cash
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <form onSubmit={handlePettyCashSubmit}>
                      <DialogHeader>
                        <DialogTitle>Submit Petty Cash Request</DialogTitle>
                        <DialogDescription>
                          Submit a petty cash request for approval. Fill in all the details below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="requestedBy" className="text-right">
                            Requested By
                          </Label>
                          <Input
                            id="requestedBy"
                            name="requestedBy"
                            value={newPettyCash.requestedBy}
                            onChange={handlePettyCashInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="employeeId" className="text-right">
                            Employee ID
                          </Label>
                          <Input
                            id="employeeId"
                            name="employeeId"
                            value={newPettyCash.employeeId}
                            onChange={handlePettyCashInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="department" className="text-right">
                            Department
                          </Label>
                          <Input
                            id="department"
                            name="department"
                            value={newPettyCash.department}
                            onChange={handlePettyCashInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={newPettyCash.date}
                            onChange={handlePettyCashInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={newPettyCash.amount}
                            onChange={handlePettyCashInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="purpose" className="text-right">
                            Purpose
                          </Label>
                          <Input
                            id="purpose"
                            name="purpose"
                            value={newPettyCash.purpose}
                            onChange={handlePettyCashInputChange}
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
                            value={newPettyCash.project}
                            onChange={handlePettyCashInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Submit</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Petty Cash Requests</CardTitle>
              <CardDescription>Track and approve petty cash transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPettyCashRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.requestedBy}</TableCell>
                      <TableCell>{record.employeeId}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>${record.amount.toFixed(2)}</TableCell>
                      <TableCell>{record.purpose}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "Pending"
                              ? "default"
                              : record.status === "Approved"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {canApprove && record.status === "Pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 hover:bg-green-100 text-green-600"
                                onClick={() => {
                                  const updatedRecords = pettyCashRecords.map((rec) => {
                                    if (rec.id === record.id) {
                                      return { ...rec, status: "Approved" }
                                    }
                                    return rec
                                  })
                                  setPettyCashRecords(updatedRecords)
                                  toast({
                                    title: "Request Approved",
                                    description: "The petty cash request has been approved successfully.",
                                  })
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 hover:bg-red-100 text-red-600"
                                onClick={() => {
                                  const updatedRecords = pettyCashRecords.map((rec) => {
                                    if (rec.id === record.id) {
                                      return { ...rec, status: "Rejected" }
                                    }
                                    return rec
                                  })
                                  setPettyCashRecords(updatedRecords)
                                  toast({
                                    title: "Request Rejected",
                                    description: "The petty cash request has been rejected.",
                                  })
                                }}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
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
                Showing <strong>{filteredPettyCashRecords.length}</strong> of <strong>{pettyCashRecords.length}</strong>{" "}
                records
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

