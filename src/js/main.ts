import { Router } from './routing/Router';

/**
 * Add dynamically sections to the main DOM
 */
function addSections() {
    var r = new Router();
    //add routes (<ID>: source html element, <HTML Element>: destination html element ID, <Path to HTML File>,<Function>));
    r.addRoute('pagea', 'panel', 'html/a.html', null);
    r.addRoute('pageb', 'panel', 'html/b.html', null);
    r.addRoute('pagec', 'panel', 'html/c.html', null);
}

function main() {
    addSections();
}

// run main function
main();


