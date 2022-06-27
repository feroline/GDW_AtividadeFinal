let parser, xmlDoc;
let text = "<bookstore><book>" +
    "<title>Everyday Italian</title>" +
    "<author>Giada De Laurentiis</author>" +
    "<year>2005</year>" +
    "</book></bookstore>";

let htmlTable;
if (window.DOMParser) {
    htmlTable = String(document.querySelector('#bodyTable').innerHTML, "text/html");
console.log(htmlTable)


    parser = new DOMParser();
//parser = new DOMParser();
xmlDoc = parser.parseFromString(htmlTable,"text/xml");

document.getElementById("demo").innerHTML =
    xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;

}