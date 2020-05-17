const container = document.getElementById("container");

const contentPlayer = document.createElement("div");
contentPlayer.setAttribute("id", "content-player");
container.appendChild(contentPlayer);

const menuPlayer = document.createElement("div");
menuPlayer.setAttribute("id", "menu-player");
contentPlayer.appendChild(menuPlayer);

const contentDetailsPlayer = document.createElement("div");
contentDetailsPlayer.setAttribute("id", "content-details-player");
contentPlayer.appendChild(contentDetailsPlayer);

const onglets = document.createElement("ul");
onglets.setAttribute("id", "onglets");
menuPlayer.appendChild(onglets);

const ongletPolitic = document.createElement("li");
const politicText = document.createTextNode("Politic");
ongletPolitic.setAttribute("id", "onglet-politic");
ongletPolitic.appendChild(politicText);
const ongletEconomic = document.createElement("li");
const economicText = document.createTextNode("Economic");
ongletEconomic.setAttribute("id", "onglet-economic");
ongletEconomic.appendChild(economicText);
const ongletDiplomacy = document.createElement("li");
const diplomacyText = document.createTextNode("Diplomacy");
ongletDiplomacy.setAttribute("id", "onglet-diplomacy");
ongletDiplomacy.appendChild(diplomacyText);
const ongletMilitary = document.createElement("li");
const militaryText = document.createTextNode("Military");
ongletMilitary.setAttribute("id", "onglet-military");
ongletMilitary.appendChild(militaryText);
const ongletTechnology = document.createElement("li");
const technologyText = document.createTextNode("Technology");
ongletTechnology.setAttribute("id", "onglet-technology");
ongletTechnology.appendChild(technologyText);

onglets.appendChild(ongletPolitic);
onglets.appendChild(ongletEconomic);
onglets.appendChild(ongletDiplomacy);
onglets.appendChild(ongletMilitary);
onglets.appendChild(ongletTechnology);

let svgObject = document.getElementById("svgObject");

svgObject.addEventListener("load", function () {
    var face = svgObject.contentDocument;

    let svgNode = face.childNodes[2];

    let svg = svgNode.getElementById("layer1");

    console.log(svgNode)
    console.log(svg)

    let childSvgRoot = svgNode.childNodes;

    // Get the inner element by id
    var region = svgNode.getElementsByClassName('regionGroup');
    svgNode.setAttribute("viewBox", "533.883 145.167 257.25 37.0833");

    var svgViewBox = svgNode.getAttribute("viewBox");
    var split = svgViewBox.split(" ");
    var valueViewBox = 0;

    for (var i = 0; i < split.length; i++) {
        valueViewBox += parseInt(split[i]);
    }

    let army = document.createElement("div");
    army.setAttribute("id", "army");
    let armyGeneral = document.createElement("div");
    armyGeneral.setAttribute("id", "army-general");
    let armyNumberGeneral = document.createElement("div");
    armyNumberGeneral.setAttribute("id", "army-number");

    container.appendChild(army);
    container.appendChild(armyGeneral);
    container.appendChild(armyNumberGeneral);

    let armyBlock = document.getElementById("army");
    let armyName = document.getElementById("army-general");
    let armyNumber = document.getElementById("army-number");

    for (let i = 0; i < childSvgRoot.length; i++) {

        //Fogwar
        //Attribute what region is for player
        //Opacity reduct for other region
        //Opacity to one for player(s)
        //Get regions with ajax

        if (childSvgRoot[i].tagName === 'g') {

            let gPrincipal = childSvgRoot[i].childNodes;

            for (let j = 0; j < gPrincipal.length; j++) {
                if (gPrincipal[j].tagName === 'g') {

                    gPrincipal[j].classList.add("regionGroup");

                    gPrincipal[j].setAttribute("style", "cursor: pointer; fill-opacity: 0.5;");

                    var css = '.regionGroup>path:hover { stroke-width: 0.3 !important; fill-opacity: 0.7; }';
                    var style = document.createElement('style');

                    if (style.styleSheet) {
                        style.styleSheet.cssText = css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                    }
                    gPrincipal[j].appendChild(style);

                    childG = gPrincipal[j].childNodes;
                    for (let k = 0; k < childG.length; k++) {
                        if (childG[k].tagName === 'path') {
                            childG[k].classList.add("pathFog");
                        }
                    }
                }
                if (gPrincipal[j].tagName === 'path') {
                    gPrincipal[j].classList.add("pathFog");
                }
            }
        }
    }

    //insérer ce code dans une fonction, comme ça, calcul de ces informations sur les events concernant le zoom
    if (valueViewBox >= 900) {

        for (var i = 0; i < region.length; i++) {

            var regionNodes = region[i].childNodes;

            for (var j = 0; j < regionNodes.length; j++) {

                if (regionNodes[j].tagName === 'text') {

                    regionNodes[j].style.display = 'none';
                }
            }
        }

        armyBlock.setAttribute("class", "army-zoom");
        armyName.style.display = 'none';
        armyNumber.style.display = 'none';
        armyBlock.onmouseover = function () {
            armyNumber.style.display = 'block';
        };
        armyBlock.onmouseout = function () {
            armyNumber.style.display = 'none';
        };
    }

    var urlArmy = '../img/character.png';

    var svgArmy = '<svg width="100px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <image x="10" y="20" width="80" height="80" xlink:href="' + urlArmy + '" /></svg>';
    var svgArmy = '<image x="0" y="0" width="500" height="500" xlink:href="' + urlArmy + '"></image>';
    var svgArmy = '<defs><clipPath id="circleView"><circle cx="250" cy="125" r="125" fill="#FFFFFF" /></clipPath></defs><image width="500" height="250" xlink:href="' + urlArmy + '" clip-path="url(#circleView)" />';

    for (let i = 0; i < region.length; i++) {

        region[i].addEventListener("click", function (event) {

            if (event.target !== this) {

                //display region infos

                let idRegion = this.id;

                alert(`You actually clicked #container ${idRegion} itself.`);

                this.style.strokeWidth = "0.3";

                console.log(idRegion);

                let foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

                let armyContent = document.createElement("div");
                armyContent.setAttribute("id", "army");
                let imgArmyContent = document.createElement("img");
                imgArmyContent.setAttribute("src", `${urlArmy}`);
                armyContent.appendChild(imgArmyContent);

                //$(foreignObject).attr("x", "-1160.8768").attr("y", "-604.71155").attr("width", 8).attr("height", 2).append(armyContent);

                foreignObject.setAttribute("x", "-1160.8768");
                foreignObject.setAttribute("y", "-604.71155");
                foreignObject.setAttribute("width", "20");
                foreignObject.setAttribute("height", "20");

                foreignObject.appendChild(armyContent);

                console.log(foreignObject)

                let selectRegion = document.getElementById(`${idRegion}`);

                let selectParis = document.getElementById("paris");
                console.log(selectParis)

                console.log(selectRegion)
                region[i].appendChild(foreignObject);

                //$('#' + idRegion + '').append(foreignObject);

                $.ajax({
                    type: "GET",
                    data: { name: idRegion },
                    url: Routing.generate('urlregion'),
                    success: function (data) {
                        createRegion(data);
                    }
                });

                /*$.ajax({
                 type: "POST",
                 url: "./View/RegionView.php",
                 data: {idRegion: idRegion},
                 success: function (data) {
                 console.log(data);
                 $('#container').append(data);
                 $("#info-region").show();
                 }
                 });*/

            } else {

                $("#army").click(function () {
                    alert('toto');
                    var infoArmyBlock = document.getElementById("info-army");
                    infoArmyBlock.style.display = 'block';
                });

            }
        }, false);
    }

});

//Many categories in technologies
//Science
//War
//
const technology = [

    {
        science: [
            {
                medecine: {
                    'romanMedecine': 'characterHealth = + 5; populationGrowth = + 0.3% '
                }
            }
        ]
    },
    {
        franks: [
            {
                military: {
                    'francisque': 'closeDistanceStrength = +10%'
                }
            }
        ]
    }
];

const militaryStats = {

    'speed': 0.5,
    'closeStrength': 20,
    'closeDistanceStrength': 10,
    'weight': 10

};

const regionInfos = [
    {
        paris: {
            'population': 30000,
            'wealthByMonth': 1.2,
            'resource': 'grain',
            'terrainType': 'arablesLand'
        }
    }
]
