import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function RecentIncidents() {
  const incidents = [
    {
      id: 1,
      equipment: "Excavator CAT 320D",
      project: "Highway Extension Project",
      type: "Breakdown",
      details: "Hydraulic system failure",
      date: "2023-03-10",
      status: "Open",
    },
    {
      id: 2,
      equipment: "Loader Komatsu WA380",
      project: "Commercial Building Site",
      type: "Breakdown",
      details: "Engine overheating",
      date: "2023-03-08",
      status: "In Progress",
    },
    {
      id: 3,
      equipment: "Dump Truck Volvo A40G",
      project: "Mining Site Alpha",
      type: "Duress",
      details: "Transmission issues",
      date: "2023-03-05",
      status: "Resolved",
    },
  ]

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <div key={incident.id} className="flex items-start gap-4 rounded-lg border p-3">
          <Avatar className="h-9 w-9">
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
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{incident.equipment}</p>
              <Badge
                variant={
                  incident.status === "Open" ? "destructive" : incident.status === "In Progress" ? "default" : "outline"
                }
              >
                {incident.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{incident.project}</p>
            <p className="text-xs">{incident.details}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{incident.type}</Badge>
              <span className="text-xs text-muted-foreground">{incident.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

