import { NextResponse } from "next/server"

// This would connect to your database in a real application
const maintenanceLogs = [
  {
    id: 1,
    equipmentId: 3,
    type: "Corrective",
    details: "Engine overheating issue",
    startDate: "2023-03-01",
    endDate: "2023-03-05",
    technicianId: 2,
    status: "Completed",
    cost: 1250.0,
  },
  {
    id: 2,
    equipmentId: 1,
    type: "Preventive",
    details: "Regular 1000-hour service",
    startDate: "2023-03-10",
    endDate: null,
    technicianId: 1,
    status: "In Progress",
    cost: 850.0,
  },
  {
    id: 3,
    equipmentId: 2,
    type: "Preventive",
    details: "Hydraulic system check",
    startDate: "2023-03-15",
    endDate: null,
    technicianId: 3,
    status: "Scheduled",
    cost: 500.0,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const equipmentId = searchParams.get("equipmentId")
  const status = searchParams.get("status")

  let filteredLogs = [...maintenanceLogs]

  if (equipmentId) {
    filteredLogs = filteredLogs.filter((log) => log.equipmentId === Number.parseInt(equipmentId))
  }

  if (status) {
    filteredLogs = filteredLogs.filter((log) => log.status === status)
  }

  return NextResponse.json(filteredLogs)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.equipmentId || !body.type || !body.details) {
      return NextResponse.json({ error: "Equipment ID, maintenance type, and details are required" }, { status: 400 })
    }

    // In a real app, you would save to database here
    const newLog = {
      id: maintenanceLogs.length + 1,
      equipmentId: body.equipmentId,
      type: body.type,
      details: body.details,
      startDate: body.startDate || new Date().toISOString().split("T")[0],
      endDate: body.endDate || null,
      technicianId: body.technicianId || null,
      status: body.status || "Scheduled",
      cost: body.cost || 0,
    }

    // Add to our mock database
    maintenanceLogs.push(newLog)

    return NextResponse.json(newLog, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create maintenance log" }, { status: 500 })
  }
}

