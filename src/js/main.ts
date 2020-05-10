import { Router } from './routing/Router';
import { MyGraph } from './pages/pageA';
import { PageC } from './pages/pageC';

var $ = require('jquery');
var mainRouter = new Router();
/**
 * Add dynamically sections to the main DOM
 */
function addSections() {

    var graph = new MyGraph();
    //add routes (<ID>: source html element, <HTML Element>: destination html element ID, <Path to HTML File>,<Function>));
    mainRouter.addRoute('pagea', 'panel', 'html/a.html', () => { graph.drawChart() });
    mainRouter.addRoute('pageb', 'panel', 'html/b.html', null);
    mainRouter.addRoute('pagec', 'panel', 'html/c.html', () => {
        PageC.loadFeeds(['https://news.yahoo.com/rss/popularstories?s=covid'], 20);
    });
}

var open = false;
/* Set the width of the side navigation to 0 */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


async function setInitPage() {
    const targetPage = window.location.href.split('#')[1];
    if (targetPage != undefined) {
        console.log('Setting main Page:::' + targetPage);
        mainRouter.route(targetPage);
    }
    else {
        mainRouter.route('pageb');
    }
};




function main() {
    addSections();
    // set eventlisteners
    document.getElementById('open-btn').addEventListener('click', () => { openNav() });
    document.getElementById('close-btn').addEventListener('click', () => { closeNav() });
    document.getElementById('mySidenav').addEventListener('click', () => { closeNav() });
    // Init main page
    setInitPage();
};

// run main function
main();


