import * as $ from 'jquery';

export class Router {
    map: Map<string, Route>;

    constructor() {
        this.map = new Map<string, Route>();
    }
    /**
     * 
     * @param source route ID (can be the same IT fo the HTL element that is clicked)
     * Load HTML Portion
     */
    route(source: string) {
        var r = this.map.get(source);
        var fileName = r.path;
        var xobj = new XMLHttpRequest();
        xobj.open('GET', fileName, true);
        xobj.overrideMimeType('text/html');
        xobj.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        xobj.setRequestHeader('Access-Control-Allow-Origin', '*');
        xobj.setRequestHeader('Access-Control-Allow-Methods', 'GET');
        xobj.setRequestHeader('Access-Control-Allow-Headers', 'text/html');
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == 200) {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                //console.log(id + "--->" + xobj.responseText);
                Router.removeRow(r.target);
                Router.addRow(r.target, xobj.responseText);
                if (r.func != null) {
                    r.func();
                }
            }
        };
        xobj.send(null);
    }
    /**
     * 
     * @param parent HTML wlement to which the HTML will be appended
     * @param html HTML string to add to the DOM
     */
    static addRow(parent: string, html: string) {
        const div = document.createElement('div');
        div.className = parent + '.row';
        div.innerHTML = html;
        document.getElementById(parent).appendChild(div);
    }
    /**
     * 
     * @param parent of the remove element 
     */
    static removeRow(parent: string) {
        const node = document.getElementById(parent);
        node.removeChild(node.firstChild);
    }

    /**
     * 
     * @param routes map of routes (the map ID is usually the ID of the HTML element that was selected)
     */
    addRoutesMap(routes: Map<string, Route>) {
        for (var id of routes.keys()) {
            this.map.set(id, routes.get(id));
            document.getElementById(id).addEventListener('click', this.clickListener());
        }
    }

    private clickListener(): (this: HTMLElement, ev: MouseEvent) => any {
        return e => {
            var id = $(e.target).attr('id');
            this.route(id);
        };
    }
    /**
     * 
     * @param id of the route to get
     */
    get(id: string) {
        return this.map.get(id);
    }

    /**
     * 
     * @param source html
     * @param target html   
     * @param path to html file
     * @param func callback
     */
    addRoute(source: string, target: string, path: string, func: () => any) {
        this.map.set(source, new Route(source, target, path, func));
        document.getElementById(source).addEventListener('click', this.clickListener());
    }

}

/**
 * Route Class
 */
export class Route {
    source: string;
    target: string;
    path: string;
    func: () => any;
    /**
     * 
     * @param source html
     * @param target html
     * @param path to html section
     * @param func 
     */
    constructor(source: string, target: string, path: string, func: () => any) {
        this.source = source;
        this.target = target;
        this.path = path;
        this.func = func;
    }

}