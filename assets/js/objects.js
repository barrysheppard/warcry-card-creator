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
    if (document.getElementById('select_warcry_object_ghur').checked) {
        return document.getElementById('warcry_object_ghur');
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
    getContext().font = '10px rodchenkoctt';
    getContext().fillStyle = "#E0DDDC";
    getContext().textAlign = 'center';
    writeScaled(value, { x: 88, y: 20 });
}

drawObjectName = function (value) {
    getContext().font = '20px rodchenkoctt';
    getContext().fillStyle = "#E0DDDC";
    getContext().textAlign = 'center ';
    writeScaled(value, { x: 88, y: 36 });
}

drawObjectText = function (value) {
    getContext().font = '9px helvetica';
    getContext().fillStyle = 'black';
    getContext().textAlign = 'left';

    var lines = value.split('\n');
    for (var i = 0; i < lines.length; i++) {
        writeScaled(lines[i], { x: 20, y: 150 + (i * 10) });
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
    var imageSelect = $("#imageSelect")[0];

    if (image != null) {
        // TODO: Not sure how to do this. It might not even be possible! Leave it for now...
        // imageSelect.files[0] = image;
    }
    else {
        imageSelect.value = null;
    }
}

function getDefaultModelImageProperties() {
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100
    };
}

function getModelImageProperties() {
    return {
        offsetX: $("#imageOffsetX")[0].valueAsNumber,
        offsetY: $("#imageOffsetY")[0].valueAsNumber,
        scalePercent: $("#imageScalePercent")[0].valueAsNumber
    };
}

function setModelImageProperties(modelImageProperties) {
    $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
    $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
    $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
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
    var textInput = $("#saveNameInput")[0];
    return textInput.value;
}

function setName(name) {
    var textInput = $("#saveNameInput")[0];
    textInput.value = name;
}

function getModelImage() {
    var imageSelect = $("#imageSelect")[0];

    if (imageSelect.files.length > 0) {
        return URL.createObjectURL(imageSelect.files[0]);
    }

    return null;
}




function setModelImage(image) {
    var imageSelect = $("#imageSelect")[0];

    if (image != null) {
        // TODO: Not sure how to do this. It might not even be possible! Leave it for now...
        // imageSelect.files[0] = image;
    }
    else {
        imageSelect.value = null;
    }
}

function getDefaultModelImageProperties() {
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100
    };
}

function getModelImageProperties() {
    return {
        offsetX: $("#imageOffsetX")[0].valueAsNumber,
        offsetY: $("#imageOffsetY")[0].valueAsNumber,
        scalePercent: $("#imageScalePercent")[0].valueAsNumber
    };
}

function setModelImageProperties(modelImageProperties) {
    $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
    $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
    $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
}


function readControls() {
    var data = new Object;
    data.name = getName();
    data.imageUrl = getModelImage();
    data.imageProperties = getModelImageProperties();

    data.objectTitle = document.getElementById('object-title').value;
    data.objectName = document.getElementById('object-name').value;
    data.objectText = document.getElementById('object-text').value;
    return data;
}



render = function (cardData) {
    drawBackground();

    if (cardData.imageUrl != null) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: cardData.imageProperties.offsetX, y: cardData.imageProperties.offsetY });
            var scale = cardData.imageProperties.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            // These are the texts to overlay

            URL.revokeObjectURL(image.src);
        };
        image.src = cardData.imageUrl;
    }

    drawObjectTitle(cardData.objectTitle);
    drawObjectName(cardData.objectName);
    drawObjectText(cardData.objectText);

};

function writeControls(cardData) {
    setName(cardData.name);
    setModelImage(cardData.imageUrl);
    setModelImageProperties(cardData.imageProperties);

    $('#object-title').value = cardData.objectTitle;
    $('#object-name').value = cardData.objectName;
    $('#object-text').value = cardData.objectText;
}

function defaultCardData() {
    var cardData = new Object;
    cardData.name = 'Default';
    cardData.imageUrl = null;
    cardData.imageProperties = getDefaultModelImageProperties();

    cardData.objectName = 'Healing Potion';
    cardData.objectTitle = 'Lesser Artefact';
    cardData.objectText = "[Consumable] Discard this card\nafter use.\nBonus Action: Heal 1d6 damage\nfrom this fighter.";

    return cardData;
}

function saveCardDataMap(newMap) {
    window.localStorage.setItem("cardDataMap", JSON.stringify(newMap));
}

function loadCardDataMap() {
    var storage = window.localStorage.getItem("cardDataMap");
    if (storage != null) {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["Default"] = defaultCardData();
    saveCardDataMap(map);
    return map;
}

function loadLatestCardData() {
    var latestObjectName = window.localStorage.getItem("latestObjectName");
    if (latestObjectName == null) {
        latestObjectName = "Default";
    }

    console.log("Loading '" + latestObjectName + "'...");

    var data = loadCardData(latestObjectName);

    if (data) {
        console.log("Loaded data:");
        console.log(data);
    }
    else {
        console.log("Failed to load a fighter data.");
    }

    return data;
}

function saveLatestCardData() {
    var cardData = readControls();
    if (!cardData.name) {
        return;
    }

    window.localStorage.setItem("latestObjectName", cardData.name);
    saveCardData(cardData);
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


        finishSaving();
    }
}

function getLatestCardDataName() {
    return "latestCardData";
}

window.onload = function () {
    //window.localStorage.clear();
    var cardData = loadLatestCardData();
    writeControls(cardData);
    render(cardData);
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
    window.localStorage.clear();
    location.reload();
    return false;
}

function onResetToDefault() {
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

function onSaveClicked() {
    var cardData = readControls();
    console.log("Saving '" + cardData.name + "'...");
    saveCardData(cardData);
    refreshSaveSlots();
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

// …
// …
// …

function saveCardAsImage() {
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute('download', 'aeronautica-object-card.png');
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
