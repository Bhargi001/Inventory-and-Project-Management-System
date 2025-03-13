import { NextResponse } from "next/server"

// This would connect to your database in a real application
const equipment = [
  {
    id: 1,
    name: "Excavator CAT 320D",
    category: "Heavy Equipment",
    makeModel: "Caterpillar 320D",
    assetCode: "EX-CAT-001",
    year: 2018,
    projectId: 1,
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
    projectId: 2,
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
    projectId: 3,
    status: "Under Maintenance",
    utilization: 0,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get("projectId")
  const category = searchParams.get("category")

  let filteredEquipment = [...equipment]

  if (projectId) {
    filteredEquipment = filteredEquipment.filter((item) => item.projectId === Number.parseInt(projectId))
  }

  if (category) {
    filteredEquipment = filteredEquipment.filter((item) => item.category === category)
  }

  return NextResponse.json(filteredEquipment)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.assetCode) {
      return NextResponse.json({ error: "Equipment name and asset code are required" }, { status: 400 })
    }

    // Check for duplicate asset code
    if (equipment.some((item) => item.assetCode === body.assetCode)) {
      return NextResponse.json({ error: "Asset code already exists" }, { status: 400 })
    }

    // In a real app, you would save to database here
    const newEquipment = {
      id: equipment.length + 1,
      name: body.name,
      category: body.category || "Uncategorized",
      makeModel: body.makeModel || "Unknown",
      assetCode: body.assetCode,
      year: body.year || new Date().getFullYear(),
      projectId: body.projectId || null,
      status: "Operational",
      utilization: 0,
    }

    // Add to our mock database
    equipment.push(newEquipment)

    return NextResponse.json(newEquipment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create equipment" }, { status: 500 })
  }
}

