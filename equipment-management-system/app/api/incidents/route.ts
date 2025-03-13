import { NextResponse } from "next/server"

// This would connect to your database in a real application
const incidents = [
  {
    id: 1,
    equipmentId: 3,
    projectId: 3,
    type: "Breakdown",
    details: "Hydraulic system failure",
    date: "2023-03-10",
    actionTaken: "Replaced hydraulic pump and hoses",
    estimatedCompletionDate: "2023-03-15",
    closedDate: null,
    statusId: 2,
  },
  {
    id: 2,
    equipmentId: 2,
    projectId: 2,
    type: "Breakdown",
    details: "Engine overheating",
    date: "2023-03-08",
    actionTaken: "Replaced radiator and coolant",
    estimatedCompletionDate: "2023-03-12",
    closedDate: null,
    statusId: 2,
  },
  {
    id: 3,
    equipmentId: 4,
    projectId: 4,
    type: "Duress",
    details: "Transmission issues",
    date: "2023-03-05",
    actionTaken: "Replaced transmission fluid and filter",
    estimatedCompletionDate: "2023-03-07",
    closedDate: "2023-03-07",
    statusId: 3,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const equipmentId = searchParams.get("equipmentId")
  const projectId = searchParams.get("projectId")
  const statusId = searchParams.get("statusId")

  let filteredIncidents = [...incidents]

  if (equipmentId) {
    filteredIncidents = filteredIncidents.filter((incident) => incident.equipmentId === Number.parseInt(equipmentId))
  }

  if (projectId) {
    filteredIncidents = filteredIncidents.filter((incident) => incident.projectId === Number.parseInt(projectId))
  }

  if (statusId) {
    filteredIncidents = filteredIncidents.filter((incident) => incident.statusId === Number.parseInt(statusId))
  }

  return NextResponse.json(filteredIncidents)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.equipmentId || !body.projectId || !body.type || !body.details) {
      return NextResponse.json(
        { error: "Equipment ID, project ID, incident type, and details are required" },
        { status: 400 },
      )
    }

    // In a real app, you would save to database here
    const newIncident = {
      id: incidents.length + 1,
      equipmentId: body.equipmentId,
      projectId: body.projectId,
      type: body.type,
      details: body.details,
      date: body.date || new Date().toISOString().split("T")[0],
      actionTaken: body.actionTaken || "",
      estimatedCompletionDate: body.estimatedCompletionDate || null,
      closedDate: null,
      statusId: body.statusId || 1, // Default to "Open" status
    }

    // Add to our mock database
    incidents.push(newIncident)

    return NextResponse.json(newIncident, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create incident report" }, { status: 500 })
  }
}

