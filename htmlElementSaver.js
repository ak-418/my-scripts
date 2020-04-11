// ==UserScript==
// @name         HTML Element saver
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        enter site name
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let fileName = prompt("Enter file name: ") || window.location.pathname.replace(/\//g, '');
    let doc = document.implementation.createHTMLDocument(fileName);
    let className = prompt("Enter classname (default: 'content')");
    let index = prompt("Enter index(default: 0)");
    let content = document.getElementsByClassName(className ? className : 'content')[index ? index : 0];
    let cloned = content.cloneNode(true);
    let images = cloned.getElementsByTagName('img');
    for(let i = 0; i <images.length; i++){
        images[i].setAttribute('srcset', '');
    }
    doc.body.appendChild(cloned);
    let allData = doc.getElementsByTagName('html')[0].outerHTML;
    var data = new Blob([allData], {type: "text/html"});

    var url = window.URL.createObjectURL(data);

    let element = document.createElement("a");
    element.setAttribute('href', url);

    element.setAttribute('download', `${fileName}.html`);
    document.body.appendChild(element);
    element.click();
})();