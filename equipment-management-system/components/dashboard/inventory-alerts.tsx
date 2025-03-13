import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Package } from "lucide-react"

export default function InventoryAlerts() {
  const alerts = [
    {
      id: 1,
      item: "Hydraulic Oil",
      code: "HYD-OIL-001",
      currentStock: 50,
      minStock: 100,
      status: "Critical",
    },
    {
      id: 2,
      item: "Air Filters",
      code: "FLT-AIR-002",
      currentStock: 25,
      minStock: 30,
      status: "Low",
    },
    {
      id: 3,
      item: "Diesel Fuel",
      code: "FUEL-DSL-001",
      currentStock: 1200,
      minStock: 2000,
      status: "Low",
    },
    {
      id: 4,
      item: "Engine Oil",
      code: "ENG-OIL-001",
      currentStock: 20,
      minStock: 50,
      status: "Critical",
    },
  ]

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start gap-4 rounded-lg border p-3">
          <div
            className={`rounded-full p-2 ${
              alert.status === "Critical" ? "bg-red-100 text-red-500" : "bg-amber-100 text-amber-500"
            }`}
          >
            {alert.status === "Critical" ? <AlertTriangle className="h-4 w-4" /> : <Package className="h-4 w-4" />}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{alert.item}</p>
              <Badge variant={alert.status === "Critical" ? "destructive" : "default"}>{alert.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Code: {alert.code}</p>
            <div className="flex items-center justify-between text-xs">
              <span>Current: {alert.currentStock} units</span>
              <span>Minimum: {alert.minStock} units</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

