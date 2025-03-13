import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Clock, Wrench } from "lucide-react"

export default function MaintenanceOverview() {
  const scheduledMaintenance = [
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

  const completedMaintenance = [
    {
      id: 4,
      equipment: "Crane Liebherr LTM 1100",
      assetCode: "CR-LIE-002",
      type: "Preventive",
      completedDate: "2023-03-05",
      completedBy: "James Wilson",
      status: "Completed",
    },
    {
      id: 5,
      equipment: "Bulldozer CAT D8T",
      assetCode: "BD-CAT-004",
      type: "Corrective",
      completedDate: "2023-03-02",
      completedBy: "Thomas Brown",
      status: "Completed",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Maintenance Schedule</CardTitle>
          <CardDescription>Upcoming and in-progress maintenance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledMaintenance.map((task) => (
              <div key={task.id} className="flex items-start gap-4 rounded-lg border p-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback
                    className={
                      task.status === "Scheduled" ? "bg-blue-100 text-blue-500" : "bg-yellow-100 text-yellow-500"
                    }
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
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Maintenance Statistics</CardTitle>
          <CardDescription>Overview of maintenance activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Preventive Maintenance</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Corrective Maintenance</span>
                    <span className="text-sm text-muted-foreground">25%</span>
                  </div>
                  <Progress value={25} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Scheduled Tasks</span>
                    <span className="text-sm text-muted-foreground">60%</span>
                  </div>
                  <Progress value={60} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completed Tasks</span>
                    <span className="text-sm text-muted-foreground">40%</span>
                  </div>
                  <Progress value={40} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Total Tasks</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">32</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">In Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">8</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Completed</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">24</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              <div className="space-y-4">
                {completedMaintenance.map((task) => (
                  <div key={task.id} className="flex items-start gap-4 rounded-lg border p-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-green-100 text-green-500">
                        <CheckCircle className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{task.equipment}</p>
                        <Badge variant="outline">{task.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Asset Code: {task.assetCode}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{task.type}</Badge>
                        <span className="text-xs text-muted-foreground">Completed: {task.completedDate}</span>
                      </div>
                      <p className="text-xs">Completed by: {task.completedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

