import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ProjectSummary() {
  const projects = [
    {
      id: 1,
      name: "Highway Extension Project",
      progress: 65,
      startDate: "2022-06-15",
      endDate: "2023-12-30",
      status: "On Track",
    },
    {
      id: 2,
      name: "Commercial Building Site",
      progress: 42,
      startDate: "2022-08-10",
      endDate: "2023-10-15",
      status: "Delayed",
    },
    {
      id: 3,
      name: "Mining Site Alpha",
      progress: 78,
      startDate: "2021-11-05",
      endDate: "2024-05-20",
      status: "On Track",
    },
    {
      id: 4,
      name: "Bridge Construction",
      progress: 35,
      startDate: "2022-03-22",
      endDate: "2023-09-10",
      status: "At Risk",
    },
  ]

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{project.name}</h3>
            <Badge
              variant={
                project.status === "On Track" ? "outline" : project.status === "Delayed" ? "default" : "destructive"
              }
            >
              {project.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={project.progress} className="h-2" />
            <span className="text-xs font-medium">{project.progress}%</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Start: {project.startDate}</span>
            <span>End: {project.endDate}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

