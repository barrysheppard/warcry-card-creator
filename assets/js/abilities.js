function addToImageCheckboxSelector(imgSrc, grid, bgColor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
    <label for="checkbox-${imgSrc}">
        <img src="${imgSrc}" width="50" height="50" alt="" style="background-color:${bgColor};">
    </label>
    <input type="checkbox" style="display:none;" id="checkbox-${imgSrc}" onchange="onTagRunemarkSelectionChanged(this, '${bgColor}')">
    `;
    // grid.appendChild(div);
    return div;
}

function addToImageRadioSelector(imageSrc, imageSelector, radioGroupName, bgColor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
        <label for="${radioGroupName}-${imageSrc}"><img src="${imageSrc}" width="50" height="50" alt="" style="background-color:${bgColor};"></label>
        <input type="radio" style="display:none;" name="${radioGroupName}" id="${radioGroupName}-${imageSrc}" onchange="onRunemarkSelectionChanged(this, '${bgColor}')">
    `;
    imageSelector.appendChild(div);
    return div;
}

function defaultCardData() {
    var cardData = new Object;
    cardData.name = "Warcry_Abliities"; // want to remove this eventually

    cardData.cardTitle = 'Iron Golem';
    cardData.cardTranslationAbilities = 'Abilities';
    cardData.cardTranslationReaction = 'Reaction';
    cardData.cardTranslationDouble = 'Double';
    cardData.cardTranslationTriple = 'Triple';
    cardData.cardTranslationQuad = 'Quad';
    cardData.factionRunemark = 'runemarks/white/factions-chaos-iron-golems.svg';
    cardData.subfactionRunemark = 'assets/img/blank.gif';

    cardData.ability1checked = true;
    cardData.ability2checked = true;
    cardData.ability3checked = true;
    cardData.ability4checked = true;
    cardData.ability5checked = true;
    cardData.ability6checked = true;
    cardData.ability7checked = false;

    cardData.ability1Name = 'First ability name';
    cardData.ability2Name = 'Second ability name';
    cardData.ability3Name = 'Third ability name';
    cardData.ability4Name = 'Fourth ability name';
    cardData.ability5Name = 'Fifth ability name';
    cardData.ability6Name = 'Sixth ability name';
    cardData.ability7Name = 'Seventh ability name';

    cardData.ability1Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability2Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability3Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability4Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability5Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability6Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability7Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';

    cardData.tagRunemarksOne = new Array;
    cardData.tagRunemarksOne.push('runemarks/black/fighters-berserker.svg');
    cardData.tagRunemarksTwo = new Array;
    cardData.tagRunemarksThree = new Array;
    cardData.tagRunemarksFour = new Array;
    cardData.tagRunemarksFive = new Array;
    cardData.tagRunemarksSix = new Array;
    cardData.tagRunemarksSeven = new Array;

    cardData.bg01 = false;
    cardData.bg02 = false;
    cardData.bg03 = false;
    cardData.bg04 = true;
    cardData.bg05 = false;
    cardData.bg06 = false;
    cardData.bg07 = false;
    cardData.bg08 = false;

    return cardData;
}

function drawAbility(id, pixelPosition) {
    getContext().font = '28px Georgia, serif';
    getContext().fillStyle = 'black';
    getContext().textAlign = 'left';

    var reaction = document.getElementById('ability' + id + '-reaction'),
        double = document.getElementById('ability' + id + '-double'),
        triple = document.getElementById('ability' + id + '-triple'),
        quad = document.getElementById('ability' + id + '-quad'),
        name = document.getElementById('ability' + id + '-name').value,
        text = document.getElementById('ability' + id + '-text').value,
        transReaction = document.getElementById('card-translation-reaction').value,
        transDouble = document.getElementById('card-translation-double').value,
        transTriple = document.getElementById('card-translation-triple').value,
        transQuad = document.getElementById('card-translation-quad').value;

    // https://stackoverflow.com/a/35119260; http://jsfiddle.net/BaG4J/1/
    //var textblock = (function () {
    var txt = '';
    var title = '';

    if (reaction.checked) {
        if (transReaction.length) {
            //var txt = '[' + transReaction + '] ' + name + ': ' + text;
            // new title variable for the text to be in bold
            var title = '[' + transReaction + '] ' + name + ': ';
        } else {
            var title = '[Reaction] ' + name + ': ';
        }
    } else if (double.checked) {
        if (transDouble.length) {
            var title = '[' + transDouble + '] ' + name + ': ';
        } else {
            var title = '[Double] ' + name + ': ';
        }
    } else if (triple.checked) {
        if (transTriple.length) {
            var title = '[' + transTriple + '] ' + name + ': ';
        } else {
            var title = '[Triple] ' + name + ': ';
        }
    } else if (quad.checked) {
        if (transQuad.length) {
            var title = '[' + transQuad + '] ' + name + ': ';
        } else {
            var title = '[Quad] ' + name + ': ';
        }
    }

    // Print new title variable
    getContext().font = 'bold 28px Georgia, serif';
    writeScaled(title, { x: pixelPosition.x, y: pixelPosition.y });
    // record the bold width for later use
    var titleWidth = getContext().measureText(title).width;
    getContext().font = '28px Georgia, serif';


    // Get how many runemarks are tick
    // This will determine how far the word wrap should go
    max_tagRunemarks = Math.max(readTagRunemark("One").length, readTagRunemark("Two").length,
        readTagRunemark("Three").length, readTagRunemark("Four").length,
        readTagRunemark("Five").length, readTagRunemark("Six").length,
        readTagRunemark("Seven").length);
    if (max_tagRunemarks < 2) {
        fitWidth = 1400;
    }
    if (max_tagRunemarks == 2) {
        fitWidth = 1300;
    }
    if (max_tagRunemarks > 2) {
        fitWidth = 1200;
    }

    // this will add carriage turns if needed
    lines = splitWordWrap(getContext(), text, fitWidth, titleWidth);


    for (var i = 0; i < lines.length; i++) {
        if (i == 0) {
            writeScaled(lines[i], { x: pixelPosition.x + titleWidth, y: pixelPosition.y + (i * 35) });
        } else {
            writeScaled(lines[i], { x: pixelPosition.x, y: pixelPosition.y + (i * 35) });
        }
    }
}


function drawBackground() {
    getContext().drawImage(
        getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}

function drawCardElementFromInput(inputElement, pixelPosition) {
    var value = inputElement.value;
    writeScaled(value, pixelPosition);
}

function drawCardElementFromInputId(inputId, pixelPosition) {
    drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}

function drawCardTitle(value) {
    getContext().font = '92px rodchenkoctt';
    getContext().fillStyle = 'white';
    getContext().textAlign = 'center';
    writeScaled(value, { x: (1772 / 2), y: 135 });
}

function drawCardTranslationAbilities(value) {
    getContext().font = '28px Georgia, serif';
    getContext().fillStyle = 'white';
    getContext().textAlign = 'center';
    writeScaled(value, { x: (1772 / 2), y: 55 });
}

function drawFactionRunemark(image, inc) {

    // for 7 spacing its + 150 for 6 spacing it's + 175
    drawImageSrc({ x: 92.5, y: 35 }, { x: 135, y: 135 }, image);

    // if we have 6 items then it's different spacing to seven both start here
    y_pos = 205;

    ability = ['ability1-toggle', 'ability2-toggle', 'ability3-toggle', 'ability4-toggle',
        'ability5-toggle', 'ability6-toggle', 'ability7-toggle'];

    // for 7 spacing its + 150 for 6 spacing it's + 175
    for (x in ability) {
        if (document.getElementById(ability[x]).checked) {
            var positions = { x: 65, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
        }
        y_pos += inc;
    }
}

function drawImage(scaledPosition, scaledSize, image) {
    if (image != null) {
        if (image.complete) {
            getContext().drawImage(image, scaledPosition.x, scaledPosition.y, scaledSize.x, scaledSize.y);
        }
        else {
            image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        }
    }
}

function drawImageSrc(scaledPosition, scaledSize, imageSrc) {
    if (imageSrc != null) {
        var image = new Image();
        image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        image.src = imageSrc;
    }
}

function drawSubfactionRunemark(image, inc) {

    // draw image on header
    drawImageSrc({ x: 224, y: 58 }, { x: 90, y: 90 }, image);

    // if we have 6 items then it's different spacing to seven both start here
    y_pos = 205;

    ability = ['ability1-toggle', 'ability2-toggle', 'ability3-toggle', 'ability4-toggle',
        'ability5-toggle', 'ability6-toggle', 'ability7-toggle'];

    // for 7 spacing its + 150 for 6 spacing it's + 175


    for (x in ability) {
        if (document.getElementById(ability[x]).checked) {
            var positions = { x: 65, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
        }
        y_pos += inc;
    }
}

function drawTagRunemark(index, runemark, row) {
    // draw the runemarks
    // this will only draw 3 per row at most
    var positions = []
    if (document.getElementById('ability7-toggle').checked) {
        if (row == 1 && document.getElementById('ability1-toggle').checked) {
            positions = [{ x: 175, y: 210 }, { x: 285, y: 210 }, { x: 395, y: 210 }];
        } else if (row == 2 && document.getElementById('ability2-toggle').checked) {
            positions = [{ x: 175, y: 360 }, { x: 285, y: 360 }, { x: 395, y: 360 }];
        } else if (row == 3 && document.getElementById('ability3-toggle').checked) {
            positions = [{ x: 175, y: 510 }, { x: 285, y: 510 }, { x: 395, y: 510 }];
        } else if (row == 4 && document.getElementById('ability4-toggle').checked) {
            positions = [{ x: 175, y: 660 }, { x: 285, y: 660 }, { x: 395, y: 660 }];
        } else if (row == 5 && document.getElementById('ability5-toggle').checked) {
            positions = [{ x: 175, y: 810 }, { x: 285, y: 810 }, { x: 395, y: 810 }];
        } else if (row == 6 && document.getElementById('ability6-toggle').checked) {
            positions = [{ x: 175, y: 960 }, { x: 285, y: 960 }, { x: 395, y: 960 }];
        } else if (row == 7 && document.getElementById('ability7-toggle').checked) {
            positions = [{ x: 175, y: 1110 }, { x: 285, y: 1110 }, { x: 395, y: 1110 }];
        }
    }
    else {
        if (row == 1 && document.getElementById('ability1-toggle').checked) {
            positions = [{ x: 175, y: 210 }, { x: 285, y: 210 }, { x: 395, y: 210 }];
        } else if (row == 2 && document.getElementById('ability2-toggle').checked) {
            positions = [{ x: 175, y: 385 }, { x: 285, y: 385 }, { x: 395, y: 385 }];
        } else if (row == 3 && document.getElementById('ability3-toggle').checked) {
            positions = [{ x: 175, y: 560 }, { x: 285, y: 560 }, { x: 395, y: 560 }];
        } else if (row == 4 && document.getElementById('ability4-toggle').checked) {
            positions = [{ x: 175, y: 735 }, { x: 285, y: 735 }, { x: 395, y: 735 }];
        } else if (row == 5 && document.getElementById('ability5-toggle').checked) {
            positions = [{ x: 175, y: 900 }, { x: 285, y: 900 }, { x: 395, y: 900 }];
        } else if (row == 6 && document.getElementById('ability6-toggle').checked) {
            positions = [{ x: 175, y: 1075 }, { x: 285, y: 1075 }, { x: 395, y: 1075 }];
        }
    }

    if (index >= positions.length) return;

    var img = $("#circle")[0],
        position = scalePixelPosition(positions[index]),
        size = scalePixelPosition({ x: 90, y: 90 });

    position = scalePixelPosition({ x: positions[index].x, y: positions[index].y });

    drawImage(position, { x: 90, y: 90 }, img);
    drawImageSrc(position, size, runemark);
}

async function fileChange(file) {
    // Function to be triggered when file input changes
    // As readJSONFile is a promise, it must resolve before the contents can be read - in this case logged to the console
    //readJSONFile(file).then(json => data);
    readJSONFile(file).then(json =>
        writeControls(json)
    );
    readJSONFile(file).then(json =>
        render(json)
    );
}

function getBackgroundImage() {
    if (document.getElementById('bg-01').checked) {
        return document.getElementById('bg-dark-102');

    } else if (document.getElementById('bg-02').checked) {
        return document.getElementById('bg-dark-302');

    } else if (document.getElementById('bg-03').checked) {
        return document.getElementById('bg-fire-102');

    } else if (document.getElementById('bg-04').checked) {
        return document.getElementById('bg-ghur-401');

    } else if (document.getElementById('bg-05').checked) {
        return document.getElementById('bg-dark-103');

    } else if (document.getElementById('bg-06').checked) {
        return document.getElementById('bg-dark-303');

    } else if (document.getElementById('bg-07').checked) {
        return document.getElementById('bg-fire-103');

    } else if (document.getElementById('bg-08').checked) {
        return document.getElementById('bg-ghur-402');
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
}

async function getBase64ImgFromUrl(imgUrl) {
    let img = new Image();
    let imgpromise = onload2promise(img); // see comment of T S why you should do it this way.
    img.src = imgUrl;
    await imgpromise;
    var imgData = getBase64Image(img);
    return imgData;
}

function getCanvas() {
    return document.getElementById("canvas");
}

function getContext() {
    return getCanvas().getContext("2d");
}

function getImage(element) {
    return $(element).find("img")[0];
}

function getLabel(element) {
    return $(element).prop("labels")[0];
}

function getLatestCardDataName() {
    return "latestCardData";
}

function getName() {
    //var textInput = $("#saveNameInput")[0];
    return "Warcry_Abliities";
}

function getScalingFactor(canvas, warcryCardOne) {
    return {
        x: canvas.width / warcryCardOne.width,
        y: canvas.height / warcryCardOne.height
    };
}

function getSelectedRunemark(radioDiv) {
    var checked = $(radioDiv).find('input:checked');
    if (checked.length > 0) {
        return getImage(getLabel(checked[0])).getAttribute("src");
    }
    return null;
}

function getSelectedFactionRunemark() {
    return getSelectedRunemark($('#factionRunemarkSelect')[0]);
}

function getSelectedSubfactionRunemark() {
    return getSelectedRunemark($('#subfactionRunemarkSelect')[0]);
}

function getTagRunemarkId(runemark, ability) {
    // the id starts with the ability number in text form, one to seven lower case
    var result = ability;
    // the second part is One to Twentyfive each starting with a capital
    // each runemark is in order, so we can get the second part based on 
    if (runemark == "runemarks/black/fighters-agile.svg") {
        result = result + "One"
    }
    else if (runemark == "runemarks/black/fighters-ally.svg") {
        result = result + "Two"
    }
    else if (runemark == "runemarks/black/fighters-beast.svg") {
        result = result + "Three"
    }
    else if (runemark == "runemarks/black/fighters-berserker.svg") {
        result = result + "Four"
    }
    else if (runemark == "runemarks/black/fighters-brute.svg") {
        result = result + "Five"
    }
    else if (runemark == "runemarks/black/fighters-bulwark.svg") {
        result = result + "Six"
    }
    else if (runemark == "runemarks/black/fighters-champion.svg") {
        result = result + "Seven"
    }
    else if (runemark == "runemarks/black/fighters-destroyer.svg") {
        result = result + "Eight"
    }
    else if (runemark == "runemarks/black/fighters-elite.svg") {
        result = result + "Nine"
    }
    else if (runemark == "runemarks/black/fighters-ferocious.svg") {
        result = result + "Ten"
    }
    else if (runemark == "runemarks/black/fighters-fly.svg") {
        result = result + "Eleven"
    }
    else if (runemark == "runemarks/black/fighters-frenzied.svg") {
        result = result + "Twelve"
    }
    else if (runemark == "runemarks/black/fighters-gargantuan.svg") {
        result = result + "Thirteen"
    }
    // leader became hero so went back one messing up the order
    else if (runemark == "runemarks/black/fighters-leader.svg") {
        result = result + "Fifteen"
    }
    else if (runemark == "runemarks/black/fighters-icon-bearer.svg") {
        result = result + "Fourteen"
    }
    else if (runemark == "runemarks/black/fighters-minion.svg") {
        result = result + "Sixteen"
    }
    else if (runemark == "runemarks/black/fighters-mount.svg") {
        result = result + "Seventeen"
    }
    else if (runemark == "runemarks/black/fighters-mystic.svg") {
        result = result + "Eighteen"
    }
    else if (runemark == "runemarks/black/fighters-priest.svg") {
        result = result + "Ninteen"
    }
    else if (runemark == "runemarks/black/fighters-scout.svg") {
        result = result + "Twenty"
    }
    else if (runemark == "runemarks/black/fighters-sentience.svg") {
        result = result + "Twentyone"
    }
    else if (runemark == "runemarks/black/fighters-terrifying.svg") {
        result = result + "Twentytwo"
    }
    else if (runemark == "runemarks/black/fighters-thrall.svg") {
        result = result + "Twentythree"
    }
    else if (runemark == "runemarks/black/fighters-trapper.svg") {
        result = result + "Twentyfour"
    }
    else if (runemark == "runemarks/black/fighters-warrior.svg") {
        result = result + "Twentyfive"
    }

    return result;
}

async function handleImageUrlFromDisk(imageUrl) {
    if (imageUrl &&
        imageUrl.startsWith("blob:")) {
        // The image was loaded from disk. So we can load it later, we need to stringify it.
        imageUrl = await getBase64ImgFromUrl(imageUrl);
    }

    return imageUrl;
}

function loadCardData(cardDataName) {
    if (!cardDataName) {
        return null;
    }

    var map = loadCardDataMap();
    if (map[cardDataName]) {
        return map[cardDataName];
    }

    return null;
}

function loadCardDataMap() {
    var storage = window.localStorage.getItem("cardDataMap");
    if (storage != null) {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["Warcry_Abliities"] = defaultCardData();
    saveCardDataMap(map);
    return map;
}

function loadLatestCardData() {
    var latestFighterName = window.localStorage.getItem("latestAbilitiesName");
    if (latestFighterName == null) {
        latestFighterName = "Warcry_Abliities";
    }

    console.log("Loading '" + latestFighterName + "'...");

    var data = loadCardData(latestFighterName);

    if (data) {
        console.log("Loaded data:");
        console.log(data);
    }
    else {
        console.log("Failed to load data - loading default");
        data = defaultCardData();
    }

    return data;
}

function onload2promise(obj) {
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}

function onAnyChange() {
    var cardData = readControls();
    render(cardData);
    saveLatestCardData();
}

function onWeaponControlsToggled(weaponCheckbox) {
    var controlsDiv = $(weaponCheckbox.parentNode).find("#weaponInputs")[0];
    controlsDiv.style.display = weaponCheckbox.checked ? "block" : "none";
    onAnyChange();
}

function onWeaponMinRangeChanged(minRange) {
    var maxRange = $(minRange.parentNode).find("#rangeMax")[0];
    maxRange.value = Math.max(minRange.value, maxRange.value);
    onAnyChange();
}

function onWeaponMaxRangeChanged(maxRange) {
    var minRange = $(maxRange.parentNode).find("#rangeMin")[0];
    minRange.value = Math.min(maxRange.value, minRange.value);
    onAnyChange();
}

function onRunemarkSelectionChanged(radioButton, backgroundColor) {
    var radioSection = radioButton.parentNode.parentNode;
    var allRadioButtons = $('input', radioSection);
    for (i = 0; i < allRadioButtons.length; i++) {
        getImage(getLabel(allRadioButtons[i])).style.backgroundColor = backgroundColor;
    }
    getImage(getLabel(radioButton)).style.backgroundColor = "#00bc8c";
    onAnyChange();
}

function onTagRunemarkSelectionChanged(checkbox, backgroundColor) {
    getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "#00bc8c" : backgroundColor;
    onAnyChange();
}

function onFactionRunemarkFileSelect() {
    var imageSelect = $("#additionalFactionMarkSelect")[0];
    var selectGrid = $("#factionRunemarkSelect")[0];

    for (i = 0; i < imageSelect.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "faction", "black");
    }
}

function onSubfactionRunemarkFileSelect() {
    var imageSelect = $("#additionalSubfactionMarkSelect")[0];
    var selectGrid = $("#subfactionRunemarkSelect")[0];

    for (i = 0; i < imageSelect.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "subfaction", "black");
    }
}

function onWeaponRunemarkFileSelect(input, weaponName) {
    var grid = $(input.parentNode).find("#weaponRunemarkSelect")[0];

    for (i = 0; i < input.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(input.files[i]), grid, weaponName, "white");
    }
}

function onTagRunemarkFileSelect() {
    var imageSelect = $("#additionalTagMarkSelect")[0];
    // var selectGrid = $("#tagRunemarkSelect")[0];
    var selectGrid = $("[id^='tagRunemarkSelect_']")[0];

    for (i = 0; i < imageSelect.files.length; i++) {
        addToImageCheckboxSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "white");
    }
}

function onClearCache() {
    window.localStorage.clear();
    location.reload();
    return false;
}

function onResetToDefault() {
    var cardData = defaultCardData();
    writeControls(cardData);
    render(cardData);
}

async function onSaveClicked() {

    data = readControls();
    var exportObj = JSON.stringify(data, null, 4);
    var exportName = data.cardTitle;
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "warcry_abilities_" + exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function readTagRunemark(num) {
    var array = new Array;
    mark_name = "#tagRunemarkSelect_abilitiesCollapseFour" + num;
    var checkedBoxes = $(mark_name).find('input:checked');
    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}

function readControls() {
    var data = new Object;
    data.name = getName();

    data.cardTranslationAbilities = document.getElementById('card-translation-abilities').value;
    data.cardTitle = document.getElementById('card-title').value;

    data.factionRunemark = getSelectedFactionRunemark();
    data.subfactionRunemark = getSelectedSubfactionRunemark();

    data.ability1checked = document.getElementById('ability1-toggle').checked;
    data.ability2checked = document.getElementById('ability2-toggle').checked;
    data.ability3checked = document.getElementById('ability3-toggle').checked;
    data.ability4checked = document.getElementById('ability4-toggle').checked;
    data.ability5checked = document.getElementById('ability5-toggle').checked;
    data.ability6checked = document.getElementById('ability6-toggle').checked;
    data.ability7checked = document.getElementById('ability7-toggle').checked;

    data.ability1Name = document.getElementById('ability1-name').value;
    data.ability2Name = document.getElementById('ability2-name').value;
    data.ability3Name = document.getElementById('ability3-name').value;
    data.ability4Name = document.getElementById('ability4-name').value;
    data.ability5Name = document.getElementById('ability5-name').value;
    data.ability6Name = document.getElementById('ability6-name').value;
    data.ability7Name = document.getElementById('ability7-name').value;

    data.ability1Text = document.getElementById('ability1-text').value;
    data.ability2Text = document.getElementById('ability2-text').value;
    data.ability3Text = document.getElementById('ability3-text').value;
    data.ability4Text = document.getElementById('ability4-text').value;
    data.ability5Text = document.getElementById('ability5-text').value;
    data.ability6Text = document.getElementById('ability6-text').value;
    data.ability7Text = document.getElementById('ability7-text').value;


    data.tagRunemarksOne = readTagRunemark("One");
    data.tagRunemarksTwo = readTagRunemark("Two");
    data.tagRunemarksThree = readTagRunemark("Three");
    data.tagRunemarksFour = readTagRunemark("Four");
    data.tagRunemarksFive = readTagRunemark("Five");
    data.tagRunemarksSix = readTagRunemark("Six");
    data.tagRunemarksSeven = readTagRunemark("Seven");
    /*
        data.tagRunemarksOne = readtagRunemarksOne();
        data.tagRunemarksTwo = readTagRunemarksTwo();
        data.tagRunemarksThree = readTagRunemarksThree();
        data.tagRunemarksFour = readTagRunemarksFour();
        data.tagRunemarksFive = readTagRunemarksFive();
        data.tagRunemarksSix = readTagRunemarksSix();
        data.tagRunemarksSeven = readTagRunemarksSeven();
    */
    data.bg01 = document.getElementById('bg-01').checked;
    data.bg02 = document.getElementById('bg-02').checked;
    data.bg03 = document.getElementById('bg-03').checked;
    data.bg04 = document.getElementById('bg-04').checked;
    data.bg05 = document.getElementById('bg-05').checked;
    data.bg06 = document.getElementById('bg-06').checked;
    data.bg07 = document.getElementById('bg-07').checked;
    data.bg08 = document.getElementById('bg-08').checked;

    return data;
}

async function readJSONFile(file) {
    // Function will return a new Promise which will resolve or reject based on whether the JSON file is read and parsed successfully
    return new Promise((resolve, reject) => {
        // Define a FileReader Object to read the file
        let fileReader = new FileReader();
        // Specify what the FileReader should do on the successful read of a file
        fileReader.onload = event => {
            // If successfully read, resolve the Promise with JSON parsed contents of the file
            resolve(JSON.parse(event.target.result))
        };
        // If the file is not successfully read, reject with the error
        fileReader.onerror = error => reject(error);
        // Read from the file, which will kick-off the onload or onerror events defined above based on the outcome
        fileReader.readAsText(file);
    });
}

function refreshSaveSlots() {
    // Remove all
    $('select').children('option').remove();
    var cardDataName = readControls().name;
    var map = loadCardDataMap();

    for (let [key, value] of Object.entries(map)) {
        var selected = false;
        if (cardDataName &&
            key == cardDataName) {
            selected = true;
        }
        var newOption = new Option(key, key, selected, selected);
        $('#saveSlotsSelect').append(newOption);
    }
}

function render(cardData) {
    drawBackground();

    // Text headers at the top
    drawCardTranslationAbilities(cardData.cardTranslationAbilities);
    drawCardTitle(cardData.cardTitle);

    // sybmols at the top
    if (document.getElementById('ability7-toggle').checked) {
        drawFactionRunemark(cardData.factionRunemark, 151);
        drawSubfactionRunemark(cardData.subfactionRunemark, 151);
    }
    else {
        drawFactionRunemark(cardData.factionRunemark, 174);
        drawSubfactionRunemark(cardData.subfactionRunemark, 174);
    }

    // idea here is to check the number of runemarks being used per row
    // then adjust the text size to account.
    // would need to check cardData.tagRunemarksOne

    max_tagRunemarks = Math.max(cardData.tagRunemarksOne.length, cardData.tagRunemarksTwo.length,
        cardData.tagRunemarksThree.length, cardData.tagRunemarksFour.length,
        cardData.tagRunemarksFive.length, cardData.tagRunemarksSix.length,
        cardData.tagRunemarksSeven.length);
    if (max_tagRunemarks < 2) {
        x_value = 300;
    }
    if (max_tagRunemarks == 2) {
        x_value = 400;
    }
    if (max_tagRunemarks > 2) {
        x_value = 500;
    }

    // for 7 spacing its + 150 for 6 spacing it's + 175

    ability = ['ability1-toggle', 'ability2-toggle', 'ability3-toggle', 'ability4-toggle',
        'ability5-toggle', 'ability6-toggle', 'ability7-toggle'];

    // Drawing the ability text if we have 7 abilities
    if (document.getElementById('ability7-toggle').checked) {
        y_value = 210;
        for (i in ability) {
            if (document.getElementById(ability[i]).checked) {
                num = parseInt(i) + 1;
                drawAbility(num, { x: x_value, y: y_value });
            }
            y_value += 150;
        }
        // Drawing the ability text if we have 6 abilities
    } else {
        y_value = 225;
        for (i in ability) {
            if (document.getElementById(ability[i]).checked) {
                num = parseInt(i) + 1;
                drawAbility(num, { x: x_value, y: y_value });
            }
            y_value += 175;
        }

    }

    // array of arrays, each will have the names of the imgs selected for each row
    tagRunemark = [cardData.tagRunemarksOne, cardData.tagRunemarksTwo,
    cardData.tagRunemarksThree, cardData.tagRunemarksFour, cardData.tagRunemarksFive,
    cardData.tagRunemarksSix, cardData.tagRunemarksSeven];
    // draw the runemarks
    for (x in tagRunemark) {
        for (i in tagRunemark[x]) {
            // this will only draw the first 3 runemarks per row
            drawTagRunemark(parseInt(i), tagRunemark[x][i], parseInt(x) + 1);
        }
    }
}

function saveCardAsImage() {
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute('download', 'warcry-ability-card.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function saveCardDataMap(newMap) {
    window.localStorage.setItem("cardDataMap", JSON.stringify(newMap));
}

function saveLatestCardData() {
    var cardData = readControls();
    if (!cardData.name) {
        return;
    }

    window.localStorage.setItem("latestAbilitiesName", cardData.name);
    saveCardData(cardData);
}

async function saveCardData(cardData) {
    var finishSaving = function () {
        var map = loadCardDataMap();
        map[cardData.name] = cardData;
        window.localStorage.setItem("cardDataMap", JSON.stringify(map));
    };

    if (cardData != null &&
        cardData.name) {
        // handle images we may have loaded from disk...
        cardData.imageUrl = await handleImageUrlFromDisk(cardData.imageUrl);
        cardData.factionRunemark = await handleImageUrlFromDisk(cardData.factionRunemark);
        cardData.subfactionRunemark = await handleImageUrlFromDisk(cardData.subfactionRunemark);

        for (i = 0; i < cardData.tagRunemarksOne.length; i++) {
            cardData.tagRunemarksOne[i] = await handleImageUrlFromDisk(cardData.tagRunemarksOne[i]);
        }
        for (i = 0; i < cardData.tagRunemarksTwo.length; i++) {
            cardData.tagRunemarksTwo[i] = await handleImageUrlFromDisk(cardData.tagRunemarksTwo[i]);
        }
        for (i = 0; i < cardData.tagRunemarksThree.length; i++) {
            cardData.tagRunemarksThree[i] = await handleImageUrlFromDisk(cardData.tagRunemarksThree[i]);
        }
        for (i = 0; i < cardData.tagRunemarksFour.length; i++) {
            cardData.tagRunemarksFour[i] = await handleImageUrlFromDisk(cardData.tagRunemarksFour[i]);
        }
        for (i = 0; i < cardData.tagRunemarksFive.length; i++) {
            cardData.tagRunemarksFive[i] = await handleImageUrlFromDisk(cardData.tagRunemarksFive[i]);
        }
        for (i = 0; i < cardData.tagRunemarksSix.length; i++) {
            cardData.tagRunemarksSix[i] = await handleImageUrlFromDisk(cardData.tagRunemarksSix[i]);
        }
        for (i = 0; i < cardData.tagRunemarksSeven.length; i++) {
            cardData.tagRunemarksSeven[i] = await handleImageUrlFromDisk(cardData.tagRunemarksSeven[i]);
        }

        finishSaving();
    }
}

function scalePixelPosition(pixelPosition) {
    var scalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    var scaledPosition = { x: pixelPosition.x * scalingFactor.x, y: pixelPosition.y * scalingFactor.y };
    return scaledPosition;
}

function setSelectedFactionRunemark(runemark) {
    var factionRunemarksDiv = $("#factionRunemarkSelect");
    {
        var checked = factionRunemarksDiv.find('input:checked');
        for (var i = 0; i < checked.length; i++) {
            checked[i].checked = false;
        }
        var icons = factionRunemarksDiv.find('img');
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = 'black';
        }
    }
    var queryString = "img[src='" + runemark + "']";
    var imgs = factionRunemarksDiv.find(queryString);
    if (imgs.length > 0) {
        var checkbox = $(imgs[0].parentNode.parentNode).find('input')[0];
        checkbox.checked = true;
        imgs[0].style.backgroundColor = "#00bc8c";
    } else {
        var newDiv = addToImageCheckboxSelector(runemark, factionRunemarksDiv[0], 'black');
        $(newDiv).find('img')[0].style.backgroundColor = "#00bc8c";
        $(newDiv).find('input')[0].checked = true;
    }
}

function setSelectedSubfactionRunemark(runemark) {
    var subfactionRunemarksDiv = $("#subfactionRunemarkSelect");
    {
        var checked = subfactionRunemarksDiv.find('input:checked');
        for (var i = 0; i < checked.length; i++) {
            checked[i].checked = false;
        }
        var icons = subfactionRunemarksDiv.find('img');
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = 'black';
        }
    }
    var queryString = "img[src='" + runemark + "']";
    var imgs = subfactionRunemarksDiv.find(queryString);
    if (imgs.length > 0) {
        var checkbox = $(imgs[0].parentNode.parentNode).find('input')[0];
        checkbox.checked = true;
        imgs[0].style.backgroundColor = "#00bc8c";
    } else {
        var newDiv = addToImageCheckboxSelector(runemark, subfactionRunemarksDiv[0], 'black');
        $(newDiv).find('img')[0].style.backgroundColor = "#00bc8c";
        $(newDiv).find('input')[0].checked = true;
    }
}

function setName(name) {
    //var textInput = $("#saveNameInput")[0];
    //textInput.value = name;
}

function writeControls(cardData) {
    // Saving all the data from cardData into the selections in the webpage
    //setName(cardData.name); // want to remove this eventually

    $('#card-title').value = cardData.cardTitle;
    $('#card-translation-abilities').value = cardData.cardTranslationAbilities;
    $('#card-translation-double').value = cardData.cardTranslationDouble;
    $('#card-translation-triple').value = cardData.cardTranslationTriple;
    $('#card-translation-quad').value = cardData.cardTranslationQuad;

    setSelectedFactionRunemark(cardData.factionRunemark);
    setSelectedSubfactionRunemark(cardData.subfactionRunemark);

    // check and uncheck if needed
    document.getElementById('ability1-toggle').checked = cardData.ability1checked;
    document.getElementById('ability2-toggle').checked = cardData.ability2checked;
    document.getElementById('ability3-toggle').checked = cardData.ability3checked;
    document.getElementById('ability4-toggle').checked = cardData.ability4checked;
    document.getElementById('ability5-toggle').checked = cardData.ability5checked;
    document.getElementById('ability6-toggle').checked = cardData.ability6checked;
    document.getElementById('ability7-toggle').checked = cardData.ability7checked;

    document.getElementById("ability1-name").value = cardData.ability1Name;
    document.getElementById("ability2-name").value = cardData.ability2Name;
    document.getElementById("ability3-name").value = cardData.ability3Name;
    document.getElementById("ability4-name").value = cardData.ability4Name;
    document.getElementById("ability5-name").value = cardData.ability5Name;
    document.getElementById("ability6-name").value = cardData.ability6Name;
    document.getElementById("ability7-name").value = cardData.ability7Name;

    document.getElementById("ability1-text").value = cardData.ability1Text;
    document.getElementById("ability2-text").value = cardData.ability2Text;
    document.getElementById("ability3-text").value = cardData.ability3Text;
    document.getElementById("ability4-text").value = cardData.ability4Text;
    document.getElementById("ability5-text").value = cardData.ability5Text;
    document.getElementById("ability6-text").value = cardData.ability6Text;
    document.getElementById("ability7-text").value = cardData.ability7Text;

    // in this section we get the current runemarks data
    // then we clear all the selections, and reselect them per data
    // this is for when we're loading a new data set rather than the current selections
    runes_one = cardData.tagRunemarksOne,
        runes_two = cardData.tagRunemarksTwo,
        runes_three = cardData.tagRunemarksThree,
        runes_four = cardData.tagRunemarksFour,
        runes_five = cardData.tagRunemarksFive,
        runes_six = cardData.tagRunemarksSix,
        runes_seven = cardData.tagRunemarksSeven;
    all_runes = [runes_one, runes_two, runes_three, runes_four, runes_five,
        runes_six, runes_seven]

    // first we clear all the ability runetags
    // id name is format of tagPrefix followed ny tagSuffix
    tagPrefix = ["one", "two", "three", "four", "five", "six", "seven"];
    tagSuffix = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen",
        "Nineteen", "Twenty", "Twentyone", "Twentytwo", "Twentythree", "Twentyfour", "Twentyfive"];

    for (i in tagPrefix) {
        for (j in tagSuffix) {
            rune_id = tagPrefix[i] + tagSuffix[j];
            document.getElementById(rune_id).checked = false;
            getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#FFFFFF";
        }
    }

    // this next section will select the required tags
    // all_runes has the 7 arracys, tagPrefix has the 'one' to 'seven' needed for getTagRunemarkId
    for (i in all_runes) {
        if (all_runes[i].length > 0) {
            for (j in all_runes[i]) {
                rune_id = getTagRunemarkId(all_runes[i][j], tagPrefix[i]);
                document.getElementById(rune_id).checked = true;
                getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#00bc8c";
            }
        }
    }
    // check and uncheck backgrounds if needed
    document.getElementById('bg-01').checked = cardData.bg01;
    document.getElementById('bg-02').checked = cardData.bg02;
    document.getElementById('bg-03').checked = cardData.bg03;
    document.getElementById('bg-04').checked = cardData.bg04;
    document.getElementById('bg-05').checked = cardData.bg05;
    document.getElementById('bg-06').checked = cardData.bg06;
    document.getElementById('bg-07').checked = cardData.bg07;
    document.getElementById('bg-08').checked = cardData.bg08;

    // render the updated info
    render(cardData);
}

window.onload = function () {
    var cardData = loadLatestCardData();
    writeControls(cardData);
    refreshSaveSlots();
}

function writeScaled(value, pixelPos) {
    var scaledPos = scalePixelPosition(pixelPos);
    writeValue(getContext(), value, scaledPos);
}

$(document).ready(function () {
    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.stroke();
});

function writeValue(ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = { x: pos.x / scale.x, y: pos.y / scale.y };

    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}


function splitWordWrap(context, text, fitWidth, titleWidth) {
    // this was modified from the print version to only return the text array
    return_array = [];
    var lines = text.split('\n');
    lineNum = 0;
    for (var i = 0; i < lines.length; i++) {
        fitWidth = fitWidth || 0;
        if (fitWidth <= 0) {
            return_array.push(lines[i]);
            lineNum++;
        }
        var words = lines[i].split(' ');
        var idx = 1;
        while (words.length > 0 && idx <= words.length) {
            var str = words.slice(0, idx).join(' ');
            var w = context.measureText(str).width;
            // by multipling titleWidth by boolean,
            // it will only substract for the first line
            if (w > fitWidth - titleWidth * (lineNum == 0)) {
                if (idx == 1) {
                    idx = 2;
                }
                return_array.push(words.slice(0, idx - 1).join(' '));
                lineNum++;
                words = words.splice(idx - 1);
                idx = 1;
            }
            else {
                idx++;
            }
        }
        if (idx > 0) {
            return_array.push(words.join(' '));
            lineNum++;
        }
    }
    return return_array;
}


