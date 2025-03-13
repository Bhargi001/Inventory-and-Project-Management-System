import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Wrench } from "lucide-react"

export default function UpcomingMaintenance() {
  const maintenanceTasks = [
    {
      id: 1,
      equipment: "Excavator CAT 320D",
      assetCode: "EX-CAT-001",
      type: "Preventive",
      dueDate: "2023-03-15",
      assignedTo: "John Smith",
      status: "Scheduled",
    },
    {
      id: 2,
      equipment: "Loader Komatsu WA380",
      assetCode: "LD-KOM-003",
      type: "Preventive",
      dueDate: "2023-03-18",
      assignedTo: "Mike Johnson",
      status: "Scheduled",
    },
    {
      id: 3,
      equipment: "Dump Truck Volvo A40G",
      assetCode: "DT-VOL-007",
      type: "Corrective",
      dueDate: "2023-03-12",
      assignedTo: "Robert Davis",
      status: "In Progress",
    },
  ]

  return (
    <div className="space-y-4">
      {maintenanceTasks.map((task) => (
        <div key={task.id} className="flex items-start gap-4 rounded-lg border p-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback
              className={task.status === "Scheduled" ? "bg-blue-100 text-blue-500" : "bg-yellow-100 text-yellow-500"}
            >
              {task.status === "Scheduled" ? <Clock className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{task.equipment}</p>
              <Badge variant={task.status === "Scheduled" ? "outline" : "default"}>{task.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Asset Code: {task.assetCode}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{task.type}</Badge>
              <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
            </div>
            <p className="text-xs">Assigned to: {task.assignedTo}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

