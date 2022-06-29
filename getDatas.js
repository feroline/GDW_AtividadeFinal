let $bodyTable = '#bodyTable';
let grupos = {};

if (window.DOMParser) {
    let $buttonXML = document.querySelector('#buttonXML');
    let $buttonJSON = document.querySelector('#buttonJSON');

    $buttonXML.addEventListener('click', function (){
        createAndDownload('dados.xml',getXML());

    });
    $buttonJSON.addEventListener('click', function (){
        createAndDownload('dados.json',getJSON());
    });
}



function getJSON(){
    return JSON.stringify(getData());
}

function setData(td,grupo){


    let atributo = td.getAttribute('datatype')

        if(atributo === 'codigoFundo'){
            grupo.codigoFundo = td.textContent;
        }else if (atributo === 'setor'){
            grupo.setor = td.textContent;
        }else if (atributo === 'preco'){
            grupo.preco = td.textContent;
        }

    return grupo;
}

function getData(){
    let grupo = new Object();
    let tds = document.querySelectorAll('td');
    setGrupos(new Object());
    let count = 0;

        tds.forEach(function (td,i){

        setData(td,grupo);

        if(i != 0 && (i % 3 === 0)){
            setData(td,grupo)
            setGrupos(grupo,count)
            count ++;
            grupo = new Object();
        }
    });

    return getGrupos();
}

function setGrupos(grupo,count){
    grupos[count] = grupo;
}

function getGrupos(){
    return grupos;
}

function getHTML(){
       return document.querySelector($bodyTable).outerHTML;
}

function getXML() {
    let parser, xmlDoc;

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(getHTML(),"text/xml");

    return new XMLSerializer().serializeToString(xmlDoc);

}

function createAndDownload(filename, text) {
    const element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

