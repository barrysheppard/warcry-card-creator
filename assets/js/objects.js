writeValue = function (ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = { x: pos.x / scale.x, y: pos.y / scale.y };

    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}

getScalingFactor = function (canvas, warcryCardOne) {
    return {
        x: canvas.width / warcryCardOne.width,
        y: canvas.height / warcryCardOne.height
    };
}

getCanvas = function () {
    return document.getElementById("canvas");
}

getContext = function () {
    return getCanvas().getContext("2d");
}

getBackgroundImage = function () {

    var selectedOption = document.getElementById('background-list').value;

    if (selectedOption === 'bg_ghur') {
        return document.getElementById('warcry_object_ghur');
    }
    else if (selectedOption === 'bg_fire') {
        return document.getElementById('warcry_object_fire');
    }
    else if (selectedOption === 'bg_arcane') {
        return document.getElementById('warcry_object_arcane');
    }
    else if (selectedOption === 'bg_arcaneblue') {
        return document.getElementById('warcry_object_arcaneblue');
    }
    else if (selectedOption === 'bg_blackmarble') {
        return document.getElementById('warcry_object_blackmarble');
    }
    else if (selectedOption === 'bg_cursedcity') {
        return document.getElementById('warcry_object_cursedcity');
    }
    else if (selectedOption === 'bg_dark') {
        return document.getElementById('warcry_object_dark');
    }
    else if (selectedOption === 'bg_ghurplain') {
        return document.getElementById('warcry_object_ghurplain');
    }
    else if (selectedOption === 'bg_green') {
        return document.getElementById('warcry_object_green');
    }
    else if (selectedOption === 'bg_plain') {
        return document.getElementById('warcry_object_plain');
    }
    else if (selectedOption === 'bg_red') {
        return document.getElementById('warcry_object_red');
    }
    else if (selectedOption === 'bg_mordheim') {
        return document.getElementById('warcry_object_mordheim');
    }


}

drawBackground = function () {
    getContext().drawImage(
        getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}

scalePixelPosition = function (pixelPosition) {
    var scalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    var scaledPosition = { x: pixelPosition.x * scalingFactor.x, y: pixelPosition.y * scalingFactor.y };
    return scaledPosition;
}

writeScaled = function (value, pixelPos) {
    var scaledPos = scalePixelPosition(pixelPos);
    writeValue(getContext(), value, scaledPos);
}

drawCardElementFromInput = function (inputElement, pixelPosition) {
    var value = inputElement.value;
    writeScaled(value, pixelPosition);
}

drawCardElementFromInputId = function (inputId, pixelPosition) {
    drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}

drawObjectTitle = function (value) {
    var objectData = readControls();
    font_size = objectData.titleSize;
    colour = objectData.nameColour;
    colourBorder = objectData.nameColourBorder;
    x_pos = 822/2;
    y_pos = 1030;

    // Dark Border first.
    if (document.getElementById('background-list').value === 'bg_mordheim') {
        getContext().font = font_size + 'px schoensperger';
    } else {
        getContext().font = font_size + 'px lithosblack';
    }        getContext().fillStyle = colourBorder;
    getContext().textAlign = 'center';
    writeScaled(value, { x: x_pos +2, y: y_pos+2 });
    writeScaled(value, { x: x_pos -2, y: y_pos-2 });
    writeScaled(value, { x: x_pos +2, y: y_pos-2 });
    writeScaled(value, { x: x_pos -2, y: y_pos+2 });


    getContext().fillStyle = colour;
    writeScaled(value, { x: x_pos, y: y_pos });
}

drawObjectName = function (value) {
    var objectData = readControls();
    font_size = objectData.nameSize;
    colour = objectData.nameColour;
    x_pos = 822/2;
    y_pos = 140;
    // Dark Border first.s
    if (document.getElementById('background-list').value === 'bg_mordheim') {
        getContext().font = font_size + 'px schoensperger';
    } else {
        getContext().font = font_size + 'px lithosblack';
    }
    getContext().fillStyle = colourBorder;
    writeScaled(value, { x: x_pos +2, y: y_pos+2 });
    writeScaled(value, { x: x_pos -2, y: y_pos-2 });
    writeScaled(value, { x: x_pos +2, y: y_pos-2 });
    writeScaled(value, { x: x_pos -2, y: y_pos+2 });

    getContext().fillStyle = colour;
    writeScaled(value, { x: x_pos, y: y_pos });
}

drawBodyText = function (italicText, normalText) {
    var objectData = readControls();
    font_size = objectData.textSize;

    getContext().font = 'italic '+ font_size + 'px rodchenkoctt';
    getContext().fillStyle = 'black';
    getContext().textAlign = 'left';

    currentPrintLine = 250; // The y for the first line
    nextLineSize = parseInt(font_size); // The amount to add to y for next line

    if (italicText != ""){
        lines = splitWordWrap(getContext(), italicText, 500);
        for (var i = 0; i < lines.length; i++) {
            writeScaled(lines[i], { x: 170, y: currentPrintLine });
            currentPrintLine = currentPrintLine + nextLineSize;
        }
    }
    // Same again but this time without italics
    getContext().font = font_size + 'px rodchenkoctt';

    lines = splitWordWrap(getContext(), normalText, 500);
    for (var i = 0; i < lines.length; i++) {
        writeScaled(lines[i], { x: 170, y: currentPrintLine });
        currentPrintLine = currentPrintLine + nextLineSize;
    }
}


function getLabel(element) {
    return $(element).prop("labels")[0];
}

function getImage(element) {
    return $(element).find("img")[0];
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



function setModelImage(image) {
    console.log("setModelImage:" + image);
    $("#objectImageUrl")[0].value = image;
}

function getDefaultModelImageProperties() {
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100,
        opacity: 1
    };
}

function getModelImageProperties() {
    return {
        offsetX: $("#imageOffsetX")[0].valueAsNumber,
        offsetY: $("#imageOffsetY")[0].valueAsNumber,
        scalePercent: $("#imageScalePercent")[0].valueAsNumber,
        opacity: $("#imageOpacity")[0].valueAsNumber
    };
}

function setModelImageProperties(modelImageProperties) {
    $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
    $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
    $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
    $("#imageOpacity")[0].value = modelImageProperties.opacity;
}


function drawModel(imageUrl, imageProps) {
    if (imageUrl != null) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: imageProps.offsetX, y: imageProps.offsetY });
            var scale = imageProps.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            URL.revokeObjectURL(image.src);
        };
        image.src = imageUrl;
    }
}

function getName() {
    //var textInput = $("#saveNameInput")[0];
    return "Warcry_Object";
}

function setName(name) {
    //var textInput = $("#saveNameInput")[0];
    //textInput.value = name;
}

function getModelImage() {
    var imageSelect = $("#imageSelect")[0];

    if (imageSelect.files.length > 0) {
        return URL.createObjectURL(imageSelect.files[0]);
    }

    return null;
}

function readControls() {
    var data = new Object;
    data.name = getName();
    data.imageUrl = getObjectImageUrl();
    data.imageProperties = getModelImageProperties();

    data.objectTitle = document.getElementById('object-title').value;
    data.objectName = document.getElementById('object-name').value;
    data.objectText = document.getElementById('object-text').value;
    data.objectItalicText = document.getElementById('object-italic-text').value;

    data.nameSize = document.getElementById('nameSize').value;
    data.nameColour = document.getElementById('colorPicker').value;
    data.nameColourBorder = document.getElementById('colorPickerBorder').value;

    data.titleSize = document.getElementById('titleSize').value;
    data.textSize = document.getElementById('textSize').value;

    data.bgselected = document.getElementById('background-list').value;


    return data;
}

render = function (cardData) {

    console.log(cardData);

    drawBackground();

    if (cardData.imageUrl) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: cardData.imageProperties.offsetX, y: cardData.imageProperties.offsetY });
            var scale = cardData.imageProperties.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            // opacity variable goes from 0 to 1, need to add new variable to let user scale this
            getContext().globalAlpha = cardData.imageProperties.opacity;
            getContext().drawImage(image, position.x, position.y, width, height);
            getContext().globalAlpha = 1;
            // These are the texts to go over the image
            drawObjectTitle(cardData.objectTitle);
            drawObjectName(cardData.objectName);
            drawBodyText(cardData.objectItalicText, cardData.objectText);
            //URL.revokeObjectURL(image.src);
        };
        image.src = cardData.imageUrl;
    } else {
        // draw the same texts without the image
        drawObjectTitle(cardData.objectTitle);
        drawObjectName(cardData.objectName);
        drawBodyText(cardData.objectItalicText, cardData.objectText);
    }
    drawBorder();
};

async function writeControls(cardData) {

    console.log("writeControls");
    console.log(cardData);

    // here we check for base64 loaded image and convert it back to imageUrl
    if (cardData.base64Image) {
        // first convert to blob
        const dataToBlob = async (imageData) => {
            return await (await fetch(imageData)).blob();
        };
        const blob = await dataToBlob(cardData.base64Image);
        // then create URL object
        cardData.imageUrl = URL.createObjectURL(blob);
        // Now that's saved, clear out the base64 so we don't reassign
        cardData.base64Image = null;
    }

    setModelImage(cardData.imageUrl);
    setModelImageProperties(cardData.imageProperties);

    $('#object-title')[0].value = cardData.objectTitle;
    $('#object-name')[0].value = cardData.objectName;
    $('#object-text')[0].value = cardData.objectText;
    $('#object-italic-text')[0].value = cardData.objectItalicText;

    $('#nameSize')[0].value = cardData.nameSize;
    $('#colorPicker')[0].value = cardData.nameColour;
    $('#colorPickerBorder')[0].value = cardData.nameColourBorder;

    $('#titleSize')[0].value = cardData.titleSize;
    $('#textSize')[0].value = cardData.textSize;

    document.getElementById('background-list').value = cardData.bgselected;

    // render the updated info
    render(cardData);
}

function defaultCardData() {
    var cardData = new Object;
    cardData.name = "Warcry_Object";
    cardData.imageUrl = null;
    cardData.imageProperties = getDefaultModelImageProperties();

    cardData.objectName = 'Healing Potion';
    cardData.objectTitle = 'Lesser Artefact';
    cardData.objectText = "[Consumable] Discard this card after use. Bonus Action: Heal 1d6 damage from this fighter.";
    cardData.objectItalicText = "Flavour text in italics.";

    cardData.bgselected = "bg_plain";

    cardData.nameSize = 60;
    cardData.nameColour = '#000000';
    cardData.nameColourBorder = '#E0DDDC';
    cardData.titleSize = 50;
    cardData.textSize = 50;

    return cardData;
}

function saveCardDataMap(newMap) {
    window.localStorage.setItem("cardObjectDataMap", JSON.stringify(newMap));
}

function loadCardDataMap() {
    var storage = window.localStorage.getItem("cardObjectDataMap");
    if (storage != null) {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["Warcry_Object"] = defaultCardData();
    saveCardDataMap(map);
    return map;
}

function loadLatestCardData() {
    var latestObjectName = window.localStorage.getItem("latestObjectName");
    if (latestObjectName == null) {
        latestObjectName = "Warcry_Object";
    }
    console.log("Loading '" + latestObjectName + "'...");

    var data = loadCardData(latestObjectName);

    if (data) {
        console.log("Loaded data:");
    }
    else {
        console.log("Failed to load data, loading default.");
        data = defaultCardData();
    }
    return data;
}

function saveLatestCardData() {
    var cardData = readControls();
    if (!cardData.name) {
        return;
    }

    window.localStorage.setItem("latestObjectName", cardData.name);
    //saveCardData(cardData);
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

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

function onload2promise(obj) {
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}

async function getBase64ImgFromUrl(imgUrl) {
    let img = new Image();
    let imgpromise = onload2promise(img); // see comment of T S why you should do it this way.
    img.src = imgUrl;
    await imgpromise;
    var imgData = getBase64Image(img);
    return imgData;
}

async function handleImageUrlFromDisk(imageUrl) {
    if (imageUrl &&
        imageUrl.startsWith("blob:")) {
        // The image was loaded from disk. So we can load it later, we need to stringify it.
        imageUrl = await getBase64ImgFromUrl(imageUrl);
    }
    return imageUrl;
}

function getLatestCardDataName() {
    return "latestCardData";
}

window.onload = function () {
    var cardData = loadLatestCardData();
    writeControls(cardData);
    refreshSaveSlots();
}

onAnyChange = function () {
    var cardData = readControls();
    render(cardData);
    saveLatestCardData();
}

addToImageRadioSelector = function (imageSrc, imageSelector, radioGroupName, bgColor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
        <label for="${radioGroupName}-${imageSrc}"><img src="${imageSrc}" width="50" height="50" alt="" style="background-color:${bgColor};"></label>
        <input type="radio" style="display:none;" name="${radioGroupName}" id="${radioGroupName}-${imageSrc}" onchange="onRunemarkSelectionChanged(this, '${bgColor}')">
    `;
    imageSelector.appendChild(div);
    return div;
}

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

function onClearCache() {
    window.localStorage.removeItem("cardObjectDataMap");
    window.localStorage.removeItem("latestObjectName");
    location.reload();
    return false;
}

function onResetToDefault() {
    onClearCache();
    var cardData = defaultCardData();
    writeControls(cardData);
    render(cardData);
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

async function onSaveClicked() {
    data = readControls();
    data.base64Image = null;
    console.log("onSaveClicked:");
    console.log(data);

    // here is where we should be changing the imageUrl to base64
    data.base64Image = await handleImageUrlFromDisk(data.imageUrl);

    var exportObj = JSON.stringify(data, null, 4);
    var exportName = data.objectName;

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "warcry_object_" + exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function onLoadClicked() {
    var cardDataName = $('#saveSlotsSelect').find(":selected").text();
    console.log("Loading '" + cardDataName + "'...");
    cardData = loadCardData(cardDataName);
    writeControls(cardData);
    render(cardData);
    refreshSaveSlots();
}

function onDeleteClicked() {
    var cardDataName = $('#saveSlotsSelect').find(":selected").text();

    console.log("Deleting '" + cardDataName + "'...");

    var map = loadCardDataMap();
    delete map[cardDataName];

    saveCardDataMap(map);

    refreshSaveSlots();
}

function saveCardAsImage() {
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute('download', 'warcry-object-card.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

$(document).ready(function () {
    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.stroke();
});

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

async function fileChange(file) {
    // Function to be triggered when file input changes
    // As readJSONFile is a promise, it must resolve before the contents can be read - in this case logged to the console
    //readJSONFile(file).then(json => data);
    readJSONFile(file).then(json =>
        writeControls(json)
    );
}

function splitWordWrap(context, text, fitWidth) {
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

            if (w > fitWidth) {
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

function getObjectImageUrl() {
    var imageSelect = $("#objectImageUrl")[0].value;
    return imageSelect;
}

onObjectImageUpload = function () {
    image = getModelImage();
    setModelImage(image);
    var objectData = readControls();
    render(objectData);
    saveLatestObjectData();
}

function saveLatestObjectData() {
    var objectData = readControls();
    if (!objectData.name) {
        return;
    }
    window.localStorage.setItem("latestObjectName", objectData.name);
    //saveObjectData(objectData);
}

drawBorder = function () {
    if(!document.getElementById("removeBorder").checked){
        getContext().drawImage(document.getElementById('card-border'), 0, 0, 822, 1122);
    }
}
