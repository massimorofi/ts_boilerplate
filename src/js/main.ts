import { Router } from './routing/Router';
import { MyGraph } from './pages/pageA'

/**
 * Add dynamically sections to the main DOM
 */
function addSections() {
    var r = new Router();
    var graph = new MyGraph();
    //add routes (<ID>: source html element, <HTML Element>: destination html element ID, <Path to HTML File>,<Function>));
    r.addRoute('pagea', 'panel', 'html/a.html', () => { graph.drawChart() });
    r.addRoute('pageb', 'panel', 'html/b.html', null);
    r.addRoute('pagec', 'panel', 'html/c.html', null);
}

var open = false;
/* Set the width of the side navigation to 0 */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function main() {
    addSections();
    // set eventlisteners
    document.getElementById('open-btn').addEventListener('click', () => { openNav() });
    document.getElementById('close-btn').addEventListener('click', () => { closeNav() });
    document.getElementById('mySidenav').addEventListener('click', () => { closeNav() });
}

// run main function
main();


