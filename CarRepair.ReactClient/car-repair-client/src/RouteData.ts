class CarRepairRoute {
    constructor(public Title: string, public Path: string) { }
}

type AllowedRoutes = "home" | "jobEditor" | "carEditor" | "clientEditor"

export const Routes: Map<AllowedRoutes, CarRepairRoute> = new Map([
    ["home", new CarRepairRoute("Home","/")],
    ["jobEditor", new CarRepairRoute("Jobs","/admin/jobs")],
    ["carEditor", new CarRepairRoute("Cars","/admin/cars")],
    ["clientEditor", new CarRepairRoute("Clients","/admin/clients")]
])