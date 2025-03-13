import { NextResponse } from "next/server"

// This would connect to your database in a real application
const projects = [
  {
    id: 1,
    name: "Highway Extension Project",
    location: "North Region",
    equipmentCount: 12,
    employeeCount: 45,
    startDate: "2022-06-15",
    endDate: "2023-12-30",
    status: "Active",
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
  },
]

export async function GET() {
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 })
    }

    // In a real app, you would save to database here
    const newProject = {
      id: projects.length + 1,
      name: body.name,
      location: body.location || "Unknown",
      equipmentCount: 0,
      employeeCount: 0,
      startDate: body.startDate || new Date().toISOString().split("T")[0],
      endDate: body.endDate || "",
      status: "Active",
    }

    // Add to our mock database
    projects.push(newProject)

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

