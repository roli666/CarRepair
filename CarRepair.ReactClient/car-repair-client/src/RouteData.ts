class CarRepairRoute {
    constructor(public Title: string, public Path: string) { }
}

type AllowedRoutes = "home" | "admin"

export const Routes: Map<AllowedRoutes, CarRepairRoute> = new Map([
    ["home", new CarRepairRoute("Home","/")],
    ["admin", new CarRepairRoute("Admin","/admin")]
])