class CarRepairRoute {
    constructor(public Title: string, public Path: string) { }
}

type AllowedRoutes = "home" | "admin" | "jobs" | "cars" | "clients"

export const Routes: Map<AllowedRoutes, CarRepairRoute> = new Map([
    ["home", new CarRepairRoute("Home","/")],
    ["admin", new CarRepairRoute("Admin","/admin")],
    ["jobs", new CarRepairRoute("Jobs","/admin/jobs")],
    ["cars", new CarRepairRoute("Cars","/admin/cars")],
    ["clients", new CarRepairRoute("Clients","/admin/clients")]
])