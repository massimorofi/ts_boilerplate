
export class RouteMap {
    map: Map<string, Route>;
    constructor() {
        this.map = new Map<string, Route>();

    }
    
    addRoutesMap(routes: Map<string, Route>) {
        for (var id of routes.keys()) {
            this.map.set(id, routes.get(id));
        }
    }
    get(id: string) {
        return this.map.get(id);
    }
    addRoute(id: string, element: string, path: string, func: () => any) {
        this.map.set(id, new Route(id, element, path, func))
    }

}

export class Route {
    id: string;
    element: string;
    path: string;
    func: () => any;

    constructor(id: string, element: string, path: string, func: () => any) {
        this.id = id;
        this.element = element;
        this.path = path;
        this.func = func;
    }

}