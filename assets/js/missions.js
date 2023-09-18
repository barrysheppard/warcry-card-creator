const writeValue = function(ctx, value, position) {
    if (!ctx || typeof ctx.fillText !== 'function') {
      throw new Error('Invalid canvas context');
    }
  
    const canvas = getCanvas();
    const backgroundImage = getBackgroundImage();
    const scale = getScalingFactor(canvas, backgroundImage);
    const scaledPosition = {
      x: position.x / scale.x,
      y: position.y / scale.y
    };
  
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, scaledPosition.x, scaledPosition.y);
  };

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

function getBackgroundImage() {
    const backgroundMap = {
        'bg-01': 'bg-dark-102',
        'bg-02': 'bg-dark-112',
        'bg-03': 'bg-dark-302',
        'bg-04': 'bg-dark-312',
        'bg-05': 'bg-fire-102',
        'bg-06': 'bg-fire-112',
        'bg-07': 'bg-ghur-401',
        'bg-08': 'bg-ghur-402',
        'bg-09': 'bg-ghur-403',
        'bg-10': 'bg-ghur-404',
        'bg-11': 'bg-ghur-501',
        'bg-12': 'bg-christmas-001',
        'bg-13': 'mordheim01',
        'bg-14': 'bg-aos',
        'bg-15': 'bg-green',
        'bg-16': 'bg-red',
        'bg-17': 'bg-dark-arcane',
    };

    const selectedOption = document.getElementById('background-list').value;
    const backgroundImageId = backgroundMap[selectedOption];

    return document.getElementById(backgroundImageId);
}



drawBorder = function () {
    if(!document.getElementById("removeBorder").checked){
        getContext().drawImage(document.getElementById('card-border'), 0, 0, getCanvas().width, getCanvas().height);
    }
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

drawMissionName = function (value) {
    startX = 1122/2;
    startY = 140;
    if (document.getElementById('background-list').value === 'bg-13') {
        getContext().font = '60px schoensperger';
    } else {
        getContext().font = '60px lithosblack';
    }    
    if (document.getElementById("white").checked){
        getContext().fillStyle = 'black';
    } else {
        getContext().fillStyle = 'white';
    }
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: startX+2, y: startY });
    writeScaled(value, { x: startX, y: startY+2 });
    writeScaled(value, { x: startX+2, y: startY+2 });
    writeScaled(value, { x: startX-2, y: startY });
    writeScaled(value, { x: startX, y: startY-2 });
    writeScaled(value, { x: startX-2, y: startY-2 });

    if (document.getElementById("white").checked){
        getContext().fillStyle = 'white';
    } else {
        getContext().fillStyle = 'black';
    }
    writeScaled(value, { x: startX, y: startY });
    


}

drawMissionType = function (value) {
    startX = 1122/2;
    startY = 90;
    if (document.getElementById('background-list').value === 'bg-13') {
        getContext().font = '40px schoensperger';
    } else {
        getContext().font = '40px lithosblack';
    }    
    
    if (document.getElementById("white").checked){
        getContext().fillStyle = 'black';
    } else {
        getContext().fillStyle = 'white';
    }
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: startX+2, y: startY });
    writeScaled(value, { x: startX, y: startY+2 });
    writeScaled(value, { x: startX+2, y: startY+2 });
    writeScaled(value, { x: startX-2, y: startY });
    writeScaled(value, { x: startX, y: startY-2 });
    writeScaled(value, { x: startX-2, y: startY-2 });

    if (document.getElementById("white").checked){
        getContext().fillStyle = 'white';
    } else {
        getContext().fillStyle = 'black';
    }
    writeScaled(value, { x: startX, y: startY });
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


function drawModel(imageUrl, imageProps) {
    if (imageUrl != null) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: imageProps.offsetX, y: imageProps.offsetY });
            var scale = imageProps.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);
            //URL.revokeObjectURL(image.src);
        };
        image.src = imageUrl;
    }
}

function getName() {
    //var textInput = $("#saveNameInput")[0];
    return "Warcry_Mission_Card";
}

function setName(name) {
    //var textInput = $("#saveNameInput")[0];
    //textInput.value = name;
}


function setModelImage(image) {
    $("#missionImageUrl")[0].value = image;
}

function getModelImage() {
    var imageSelect = $("#imageSelect")[0];

    if (imageSelect.files.length > 0) {
        return URL.createObjectURL(imageSelect.files[0]);
    }
    return null;
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




function getFighterImageUrl() {
    var imageSelect = $("#missionImageUrl")[0].value;
    // if (imageSelect.files.length > 0) {
    //return URL.createObjectURL(imageSelect.files[0]);
    // }
    return imageSelect;
}

function getDefaultModelImageProperties() {
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100
    };
}



function readControls() {
    var data = new Object;
    data.name = getName();
    data.imageUrl = getFighterImageUrl();
    data.imageProperties = getModelImageProperties();
    data.customBackgroundUrl = getCustomBackgroundUrl();
    data.customBackgroundProperties = getCustomBackgroundProperties();
    data.missionName = document.getElementById("missionName").value;
    data.missionType = document.getElementById("missionType").value;
    data.bgselected = document.getElementById('background-list').value;


    data.blueHammerXValue = document.getElementById("blueHammerX").value;
    data.blueHammerYValue = document.getElementById("blueHammerY").value;
    data.blueHammerLine = document.getElementById("blueHammerLineDeployment").checked;
    data.blueHammerTurn = document.getElementById("blueHammerTurn").value;

    data.blueShieldXValue = document.getElementById("blueShieldX").value;
    data.blueShieldYValue = document.getElementById("blueShieldY").value;
    data.blueShieldLine = document.getElementById("blueShieldLineDeployment").checked;
    data.blueShieldTurn = document.getElementById("blueShieldTurn").value;

    data.blueDaggerXValue = document.getElementById("blueDaggerX").value;
    data.blueDaggerYValue = document.getElementById("blueDaggerY").value;
    data.blueDaggerLine = document.getElementById("blueDaggerLineDeployment").checked;
    data.blueDaggerTurn = document.getElementById("blueDaggerTurn").value;

    data.removeBlueDeployment = document.getElementById("removeBlueDeployment").checked;

    data.redHammerXValue = document.getElementById("redHammerX").value;
    data.redHammerYValue = document.getElementById("redHammerY").value;
    data.redHammerLine = document.getElementById("redHammerLineDeployment").checked;
    data.redHammerTurn = document.getElementById("redHammerTurn").value;

    data.redShieldXValue = document.getElementById("redShieldX").value;
    data.redShieldYValue = document.getElementById("redShieldY").value;
    data.redShieldLine = document.getElementById("redShieldLineDeployment").checked;
    data.redShieldTurn = document.getElementById("redShieldTurn").value;

    data.redDaggerXValue = document.getElementById("redDaggerX").value;
    data.redDaggerYValue = document.getElementById("redDaggerY").value;
    data.redDaggerLine = document.getElementById("redDaggerLineDeployment").checked;
    data.redDaggerTurn = document.getElementById("redDaggerTurn").value;

    data.removeRedDeployment = document.getElementById("removeRedDeployment").checked;

    data.objective1XValue = document.getElementById("objective1X").value;
    data.objective1YValue = document.getElementById("objective1Y").value;
    data.objective1Icon = document.getElementById("objective1Icon").value;
    data.objective2XValue = document.getElementById("objective2X").value;
    data.objective2YValue = document.getElementById("objective2Y").value;
    data.objective2Icon = document.getElementById("objective2Icon").value;
    data.objective3XValue = document.getElementById("objective3X").value;
    data.objective3YValue = document.getElementById("objective3Y").value;
    data.objective3Icon = document.getElementById("objective3Icon").value;
    data.objective4XValue = document.getElementById("objective4X").value;
    data.objective4YValue = document.getElementById("objective4Y").value;
    data.objective4Icon = document.getElementById("objective4Icon").value;
    data.objective5XValue = document.getElementById("objective5X").value;
    data.objective5YValue = document.getElementById("objective5Y").value;
    data.objective5Icon = document.getElementById("objective5Icon").value;
    data.objective6XValue = document.getElementById("objective6X").value;
    data.objective6YValue = document.getElementById("objective6Y").value;
    data.objective6Icon = document.getElementById("objective6Icon").value;

    data.removeBorder = document.getElementById("removeBorder").checked;
    data.removeDeployment = document.getElementById("removeDeployment").checked;
    data.symmetrical = document.getElementById("symmetrical").checked;
    data.orientation = document.getElementById("orientation").checked;
    data.white = document.getElementById("white").checked;

    data.textValue = document.getElementById("textValue").value;


    return data;
}


const render = function(missionData) {
    
    if (missionData.customBackgroundUrl) {
      renderCustomBackground(missionData);
    } else {
      renderDefaultBackground(missionData);
    }


  
}
  
const renderCustomBackground = function(missionData) {
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
        const position = scalePixelPosition({
            x: missionData.customBackgroundProperties.offsetX,
            y: missionData.customBackgroundProperties.offsetY
        });
        const scale = missionData.customBackgroundProperties.scalePercent;
        const width = backgroundImage.width * scale / 100;
        const height = backgroundImage.height * scale / 100;
        getContext().drawImage(backgroundImage, position.x, position.y, width, height);
        renderFighterImage(missionData);
        drawDeployment();
        drawText();
        drawIcons();

    };
    backgroundImage.src = missionData.customBackgroundUrl;
};
  
const renderDefaultBackground = function(missionData) {
    getContext().drawImage(getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
    drawBorder();
    renderFighterImage(missionData);
    drawDeployment();
    drawText();
    drawIcons();

};
  

const renderFighterImage = function(missionData) {
    if (missionData.imageUrl) {
        const image = new Image();
        image.onload = function() {
            const position = scalePixelPosition({
                x: 160+ missionData.imageProperties.offsetX,
                y: 160 + missionData.imageProperties.offsetY
            });
            const scale = missionData.imageProperties.scalePercent / 100.0;
            const width = image.width * scale;
            const height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);
            if(true){
                //drawFrame();
                drawOverlayTexts(missionData);
                drawIcons();

            }
            drawBorder();
        };
        image.src = missionData.imageUrl;
    } else {
        // Drawn if no image, or when file is loaded but no image included
        removeDeployment = document.getElementById("removeDeployment").checked;
        if(true){
            //drawFrame();
            drawOverlayTexts(missionData);
            drawIcons();
        }
        drawBorder();
    }
};



async function writeControls(data) {
    //setName("Warcry_Mission_Card"); // Always default, trying to move away from this

    // here we check for base64 loaded image and convert it back to imageUrl
    if (data.base64Image) {
        // first convert to blob
        const dataToBlob = async (imageData) => {
            return await (await fetch(imageData)).blob();
        };
        const blob = await dataToBlob(data.base64Image);
        // then create URL object
        data.imageUrl = URL.createObjectURL(blob);
        // Now that's saved, clear out the base64 so we don't reassign
        data.base64Image = null;
    }

    if (data.base64CustomBackground) {
        // first convert to blob
        const dataToBlob = async (imageData) => {
            return await (await fetch(imageData)).blob();
        };
        const blob = await dataToBlob(data.base64CustomBackground);
        // then create URL object
        data.customBackgroundUrl = URL.createObjectURL(blob);
        // Now that's saved, clear out the base64 so we don't reassign
        data.base64CustomBackground = null;
    }

    setModelImage(data.imageUrl);
    setModelImageProperties(data.imageProperties);
    setCustomBackground(data.customBackgroundUrl);
    setCustomBackgroundProperties(data.customBackgroundProperties);
    $("#missionName")[0].value = data.missionName;
    $("#missionType")[0].value = data.missionType;

    // check and uncheck if needed

    document.getElementById('background-list').value = data.bgselected;

    document.getElementById("blueHammerX").value = data.blueHammerXValue;
    document.getElementById("blueHammerY").value = data.blueHammerYValue;
    document.getElementById("blueHammerLineDeployment").checked = data.blueHammerLine;
    document.getElementById("blueHammerTurn").value = data.blueHammerTurn;
    
    document.getElementById("blueShieldX").value = data.blueShieldXValue;
    document.getElementById("blueShieldY").value = data.blueShieldYValue;
    document.getElementById("blueShieldLineDeployment").checked = data.blueShieldLine;
    document.getElementById("blueShieldTurn").value = data.blueShieldTurn;
    
    document.getElementById("blueDaggerX").value = data.blueDaggerXValue;
    document.getElementById("blueDaggerY").value = data.blueDaggerYValue;
    document.getElementById("blueDaggerLineDeployment").checked = data.blueDaggerLine;
    document.getElementById("blueDaggerTurn").value = data.blueDaggerTurn;
    
    document.getElementById("removeBlueDeployment").checked = data.removeBlueDeployment;
    
    document.getElementById("redHammerX").value = data.redHammerXValue;
    document.getElementById("redHammerY").value = data.redHammerYValue;
    document.getElementById("redHammerLineDeployment").checked = data.redHammerLine;
    document.getElementById("redHammerTurn").value = data.redHammerTurn;
    
    document.getElementById("redShieldX").value = data.redShieldXValue;
    document.getElementById("redShieldY").value = data.redShieldYValue;
    document.getElementById("redShieldLineDeployment").checked = data.redShieldLine;
    document.getElementById("redShieldTurn").value = data.redShieldTurn;
    
    document.getElementById("redDaggerX").value = data.redDaggerXValue;
    document.getElementById("redDaggerY").value = data.redDaggerYValue;
    document.getElementById("redDaggerLineDeployment").checked = data.redDaggerLine;
    document.getElementById("redDaggerTurn").value = data.redDaggerTurn;
    
    document.getElementById("removeRedDeployment").checked = data.removeRedDeployment;
    
    document.getElementById("objective1X").value = data.objective1XValue;
    document.getElementById("objective1Y").value = data.objective1YValue;
    document.getElementById("objective1Icon").value = data.objective1Icon;
    document.getElementById("objective2X").value = data.objective2XValue;
    document.getElementById("objective2Y").value = data.objective2YValue;
    document.getElementById("objective2Icon").value = data.objective2Icon;
    document.getElementById("objective3X").value = data.objective3XValue;
    document.getElementById("objective3Y").value = data.objective3YValue;
    document.getElementById("objective3Icon").value = data.objective3Icon;
    document.getElementById("objective4X").value = data.objective4XValue;
    document.getElementById("objective4Y").value = data.objective4YValue;
    document.getElementById("objective4Icon").value = data.objective4Icon;
    document.getElementById("objective5X").value = data.objective5XValue;
    document.getElementById("objective5Y").value = data.objective5YValue;
    document.getElementById("objective5Icon").value = data.objective5Icon;
    document.getElementById("objective6X").value = data.objective6XValue;
    document.getElementById("objective6Y").value = data.objective6YValue;
    document.getElementById("objective6Icon").value = data.objective6Icon;
    
    document.getElementById("removeBorder").checked = data.removeBorder;
    document.getElementById("removeDeployment").checked = data.removeDeployment;
    document.getElementById("symmetrical").checked = data.symmetrical;
    document.getElementById("orientation").checked = data.orientation;
    document.getElementById("white").checked = data.white;
    
    document.getElementById("textValue").value = data.textValue;
    
    // render the updated info
    render(data);
}

function defaultmissionData() {
    var data = new Object;
    data.name = "Warcry_Mission_Card";
    data.imageUrl = null;
    data.imageProperties = getDefaultModelImageProperties();
    data.base64Image = null;
    data.customBackgroundUrl = null;
    data.customBackgroundProperties = getDefaultModelImageProperties();
    data.base64CustomBackground = null;
    data.missionName = "Straight Face Off";
    data.missionType = "Deployment";

    data.bgselected = "bg-07";

    data.blueHammerXValue = 24;
    data.blueHammerYValue = 17;
    data.blueHammerLine = false;
    data.blueHammerTurn = 1;

    data.blueShieldXValue = 15;
    data.blueShieldYValue = 15;
    data.blueShieldLine = false;
    data.blueShieldTurn = 1;

    data.blueDaggerXValue = 6;
    data.blueDaggerYValue = 17;
    data.blueDaggerLine = false;
    data.blueDaggerTurn = 1;

    data.removeBlueDeployment = false;

    data.redHammerXValue = 24;
    data.redHammerYValue = 5;
    data.redHammerLine = false;
    data.redHammerTurn = 1;

    data.redShieldXValue = 15;
    data.redShieldYValue = 7;
    data.redShieldLine = false;
    data.redShieldTurn = 1;

    data.redDaggerXValue = 6
    data.redDaggerYValue = 5;
    data.redDaggerLine = false;
    data.redDaggerTurn = 1;

    data.removeRedDeployment = false;

    data.objective1XValue = 0;
    data.objective1YValue = 0;
    data.objective1Icon = 0;
    data.objective2XValue = 0;
    data.objective2YValue = 0;
    data.objective2Icon = 0;
    data.objective3XValue = 0;
    data.objective3YValue = 0;
    data.objective3Icon = 0;
    data.objective4XValue = 0;
    data.objective4YValue = 0;
    data.objective4Icon = 0;
    data.objective5XValue = 0;
    data.objective5YValue = 0;
    data.objective5Icon = 0;
    data.objective6XValue = 0;
    data.objective6YValue = 0;
    data.objective6Icon = 0;

    data.removeBorder = false;
    data.removeDeployment = false;
    data.symmetrical = false;
    data.orientation = true;
    data.white = false;

    data.textValue = "";

    return data;
}

function savemissionDataMap(newMap) {
    window.localStorage.setItem("missionDataMap", JSON.stringify(newMap));
}

function loadmissionDataMap() {
    var storage = window.localStorage.getItem("missionDataMap");
    if (storage != null) {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["Warcry_Mission_Card"] = defaultmissionData();
    savemissionDataMap(map);
    return map;
}

function loadLatestmissionData() {
    var latestFighterName = window.localStorage.getItem("latestFighterName");
    if (latestFighterName == null) {
        latestFighterName = "Warcry_Mission_Card";
    }

    var data = loadmissionData(latestFighterName);

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

function saveLatestmissionData() {
    var missionData = readControls();
    if (!missionData.name) {
        return;
    }

    window.localStorage.setItem("latestFighterName", missionData.name);
    //savemissionData(missionData);
}

function loadmissionData(missionDataName) {
    if (!missionDataName) {
        return null;
    }

    var map = loadmissionDataMap();
    if (map[missionDataName]) {
        return map[missionDataName];
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

function getLatestmissionDataName() {
    return "latestmissionData";
}

window.onload = function () {
    //window.localStorage.clear();

    var missionData = loadLatestmissionData();
    writeControls(missionData);
    refreshSaveSlots();

}

function validateInput(input) {
    // Only allow letters, spaces, and hyphens
    var regex = /^[a-zA-Z\s:-]+$/;
    return regex.test(input);
}

onAnyChange = function () {
    var missionData = readControls();
    render(missionData);
    saveLatestmissionData();
}

onFighterImageUpload = function () {
    image = getModelImage();
    setModelImage(image);
    var missionData = readControls();
    render(missionData);
    saveLatestmissionData();
}


function onClearCache() {
    window.localStorage.clear();
    location.reload();
    return false;
}

function onResetToDefault() {
    var missionData = defaultmissionData();
    writeControls(missionData);
}

function refreshSaveSlots() {
    // Remove all
    $('select').children('option').remove();

    var missionDataName = readControls().name;

    var map = loadmissionDataMap();

    for (let [key, value] of Object.entries(map)) {
        var selected = false;
        if (missionDataName &&
            key == missionDataName) {
            selected = true;
        }
        var newOption = new Option(key, key, selected, selected);
        $('#saveSlotsSelect').append(newOption);
    }
}

async function onSaveClicked() {
    data = readControls();

    // weird situation where when no image is saved, but json is then saved
    // when the json is loaded a blank image loads and if you try save json
    // again, this section will hang.

    // here is where we should be changing the imageUrl to base64
    data.base64Image = await handleImageUrlFromDisk(data.imageUrl)
    data.base64CustomBackground = await handleImageUrlFromDisk(data.customBackgroundUrl)

    // temp null while I work out image saving
    //data.imageUrl = null;

    // need to be explicit due to sub arrays
    var exportObj = JSON.stringify(data);

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    file_name = "warcry_mission_";
    if (data.missionType != "") {
        file_name = file_name + data.missionType.replace(/ /g, "_")+  "_";
    }
    file_name = file_name + data.missionName.replace(/ /g, "_") + ".json";
    downloadAnchorNode.setAttribute("download", file_name);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function saveCardAsImage() {
    data = readControls();
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    
    file_name = "warcry_mission_";
    if (data.missionType != "") {
        file_name = file_name + data.missionType.replace(/ /g, "_")+  "_";
    }
    file_name = file_name + data.missionName.replace(/ /g, "_") + ".png";

    element.setAttribute("download", file_name);
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
    // As readJSONFile is a promise, it must resolve before the contents can be read
    // in this case logged to the console

    var saveJson = function (json) {
        json.customBackgroundUrl =  null;
        if (typeof json.customBackgroundProperties === "undefined") {
            json.customBackgroundProperties = getDefaultModelImageProperties();
        }

        // Check with old jsons where bgselected didn't exist
        let bgSelectedValue;

        // Check if missionData.bgselected value already exists
        if (!json.bgselected) {
        // Iterate through each bg option in missionData
        for (const prop in json) {
            if (prop.startsWith('bg') && json[prop]) {
            bgSelectedValue = prop.replace('bg', 'bg-');
            break;
            }
        }

        // Update missionData.bgselected only if a value is found
        if (bgSelectedValue) {
            json.bgselected = bgSelectedValue;
        }
        }
        writeControls(json);
    };

    readJSONFile(file).then(json =>
        saveJson(json)
    );

}

function getCustomBackgroundProperties() {
    return {
        offsetX: $("#customBackgroundOffsetX")[0].valueAsNumber,
        offsetY: $("#customBackgroundOffsetY")[0].valueAsNumber,
        scalePercent: $("#customBackgroundScalePercent")[0].valueAsNumber,
    };
}

function setCustomBackgroundProperties(customBackgroundProperties) {
    $("#customBackgroundOffsetX")[0].value = customBackgroundProperties.offsetX || 0;
    $("#customBackgroundOffsetY")[0].value = customBackgroundProperties.offsetY || 0;
    $("#customBackgroundScalePercent")[0].value = customBackgroundProperties.scalePercent || 100;
}

function getCustomBackground() {
    var imageSelect = $("#customBackgroundSelect")[0];
    if (imageSelect.files.length > 0) {
        return URL.createObjectURL(imageSelect.files[0]);
    }
    return null;
}

function setCustomBackground(image) {
    $("#customBackgroundUrl")[0].value = image;
}

onCustomBackgroundUpload = function () {
    image = getCustomBackground();
    setCustomBackground(image);
    var missionData = readControls();
    render(missionData);
    saveLatestmissionData();
}

function getCustomBackgroundUrl() {
    var imageSelect = $("#customBackgroundUrl")[0].value;
    return imageSelect;
}

function drawOverlayTexts(missionData) {
    const {
      missionName,
      missionType
    } = missionData;
  
    // These are the texts to overlay
    drawMissionName(missionName);
    drawMissionType(missionType);

    drawBorder();
  
  }

  function drawMap(){
    getContext().drawImage(document.getElementById('map'), 0, 0, getCanvas().width, getCanvas().height); 
  }

  function drawIcon(name, x, y){
    newCoord = convertInchesToPixels(x, y);
    getContext().drawImage(document.getElementById(name), newCoord.x, newCoord.y, 70, 70); 
  }

function convertInchesToPixels(x_inches, y_inches){
    // X start is 173 and end is 173+352+352.
    // in inches that 704 = 30 inches. 704/30 = 23.46
    // y start is 162 and end is 162+ 252
    // in inches that 504 is 22 inches. 504/22 = 22.9
    startX = 173;
    startY = 162;
    x = startX + x_inches * 23.46;
    y = startY + y_inches * 22.9;
    return { x, y };
}

function convertInchesToPixelsLine(x_inches, y_inches){
    // X start is 173 and end is 173+352+352.
    // in inches that 704 = 30 inches. 704/30 = 23.46
    // y start is 162 and end is 162+ 252
    // in inches that 504 is 22 inches. 504/22 = 22.9
    startX = 205;
    startY = 200;
    x = startX + x_inches * 23.7;
    y = startY + y_inches * 22.9;

    return { x, y };
}


function drawThickLine(ctx, x1, y1, x2, y2, thickness, color = "black", arrowSize = 10) {
    // Calculate the angle of the line from start to end
    var angle = Math.atan2(y2 - y1, x2 - x1);

    start = convertInchesToPixelsLine(x1, y1);
    end = convertInchesToPixelsLine(x2, y2);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);

    // Save the current stroke style and line width
    var originalStrokeStyle = ctx.strokeStyle;
    var originalLineWidth = ctx.lineWidth;

    // Set the new stroke style and line width
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;

    // Draw the line with the new thickness and color
    ctx.stroke();

    // Draw the arrowhead at the start of the line
    ctx.save();
    ctx.translate(start.x, start.y);
    ctx.rotate(angle + Math.PI); // Reverse the angle
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowSize, arrowSize);
    ctx.lineTo(-arrowSize, -arrowSize);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();

    // Restore the original stroke style and line width
    ctx.strokeStyle = originalStrokeStyle;
    ctx.lineWidth = originalLineWidth;

    ctx.closePath();
}


function drawLines(XValue, YValue, Turn) {
    if(XValue != 15){
        if(XValue < 15) {
            drawThickLine(getContext(), 0, YValue, XValue, YValue, 6, color="black")
        
            if(XValue!=0 && XValue!=30){
                value = XValue.toString() + '"';
                x = convertInchesToPixelsLine(XValue/2, YValue).x;
                y = convertInchesToPixelsLine(XValue/2, YValue).y;
                writeScaledBorder(value, x, y);
            }
        } else {
            drawThickLine(getContext(), 30, YValue, XValue, YValue, 6, color="black")
            if(XValue!=0 && XValue!=30){
                value = (30-XValue).toString() + '"';
                x = convertInchesToPixelsLine(15 + XValue/2, YValue).x;
                y = convertInchesToPixelsLine(15 + XValue/2, YValue).y;
                writeScaledBorder(value, x, y);
            }
        }
    }
    if(YValue != 11){
        if(YValue < 11) {
            drawThickLine(getContext(), XValue, 0, XValue, YValue, 6, color="black")
            if(YValue!=0 && YValue!=22){
                value = YValue.toString() + '"';
                x = convertInchesToPixelsLine(XValue, YValue/2).x;
                y = convertInchesToPixelsLine(XValue, YValue/2).y;
                writeScaledBorder(value, x, y);
            }
        } else {
             drawThickLine(getContext(), XValue, 22, XValue, YValue, 6, color="black")
             if(YValue!=0 && YValue!=22){
                value = (22-YValue).toString() + '"';
                x = convertInchesToPixelsLine(XValue, 11+YValue/2).x;
                y = convertInchesToPixelsLine(XValue, 11+YValue/2).y;
                writeScaledBorder(value, x, y);
             }
        }
    }
    if(Turn > 1) {
        x = convertInchesToPixelsLine(XValue, YValue).x
        value = "Rnd " + Turn.toString();
        if(YValue<11){
            y = convertInchesToPixelsLine(XValue, YValue).y + 40
            writeScaledBorder(value, x, y)

        } else {
            y = convertInchesToPixelsLine(XValue, YValue).y - 40
            writeScaledBorder(value, x, y)
        }

    }

}

function writeScaledBorder(value, startX, startY) {
    getContext().fillStyle = 'white';
    writeScaled(value, { x: startX+1, y: startY });
    writeScaled(value, { x: startX, y: startY+1 });
    writeScaled(value, { x: startX+1, y: startY+1 });
    writeScaled(value, { x: startX-1, y: startY });
    writeScaled(value, { x: startX, y: startY-1 });
    writeScaled(value, { x: startX-1, y: startY-1 });
    getContext().fillStyle = 'black';
    writeScaled(value, { x: startX, y: startY });
}

function drawBorderLine(XValue, YValue, Turn) {

    if(YValue == 0){
        if(XValue < 15){
            drawThickLine(getContext(), 0, 0, 15, 0, 6, color="black", arrowSize=0)
            // Left perpendicular cap
            drawThickLine(getContext(), 0, 0-.4, 0, 0+.4, 6, color="black", arrowSize=0);
            // Right perpendicular cap
            drawThickLine(getContext(), 15, 0-.4, 15, 0+.4, 6, color="black", arrowSize=0); 
        } else if (XValue > 15){
            drawThickLine(getContext(), 15, 0, 30, 0, 6, color="black", arrowSize=0);
            // Left perpendicular cap
            drawThickLine(getContext(), 15, 0-.4, 15, 0+.4, 6, color="black", arrowSize=0); 
            // Right perpendicular cap
            drawThickLine(getContext(), 30, 0-.4, 30, 0+.4, 6, color="black", arrowSize=0); 
        } else if (XValue == 15){
            drawThickLine(getContext(), 0, 0, 30, 0, 6, color="black", arrowSize=0);
            // Left perpendicular cap
            drawThickLine(getContext(), 0, 0-.4, 0, 0+.4, 6, color="black", arrowSize=0);
            // Right perpendicular cap
            drawThickLine(getContext(), 30, 0-.4, 30, 0+.4, 6, color="black", arrowSize=0);
        }
    }
    
    if(YValue == 22){
        if(XValue < 15){
            drawThickLine(getContext(), 0, 22, 15, 22, 6, color="black", arrowSize=0)
            // Left perpendicular cap
            drawThickLine(getContext(), 0, 22-.4, 0, 22+.4, 6, color="black", arrowSize=0);
            // Right perpendicular cap
            drawThickLine(getContext(), 15, 22-.4, 15, 22+.4, 6, color="black", arrowSize=0); 
        } else if (XValue > 15){
            drawThickLine(getContext(), 15, 22, 30, 22, 6, color="black", arrowSize=0)
            // Left perpendicular cap
            drawThickLine(getContext(), 15, 22-.4, 15, 22+.4, 6, color="black", arrowSize=0); 
            // Right perpendicular cap
            drawThickLine(getContext(), 30, 22-.4, 30, 22+.4, 6, color="black", arrowSize=0); 
        } else if (XValue == 15){
            drawThickLine(getContext(), 0, 22, 30, 22, 6, color="black", arrowSize=0)
            // Left perpendicular cap
            drawThickLine(getContext(), 0, 22-.4, 0, 22+.4, 6, color="black", arrowSize=0);
            // Right perpendicular cap
            drawThickLine(getContext(), 30, 22-.4, 30, 22+.4, 6, color="black", arrowSize=0); 
        }
    }

    if(XValue == 0){
        if(YValue < 11){
            drawThickLine(getContext(), 0, 0, 0, 11, 6, color="black", arrowSize=0)
            // Top perpendicular cap
            drawThickLine(getContext(), 0-.4, 0, 0+.4, 0, 6, color="black", arrowSize=0);
            // Bottom perpendicular cap
            drawThickLine(getContext(), 0-.4, 11, 0+.4, 11, 6, color="black", arrowSize=0);     
        } else if (YValue > 11){
            drawThickLine(getContext(), 0, 11, 0, 22, 6, color="black", arrowSize=0)
            // Top perpendicular cap
            drawThickLine(getContext(), 0-.4, 11, 0+.4, 11, 6, color="black", arrowSize=0);
            // Bottom perpendicular cap
            drawThickLine(getContext(), 0-.4, 22, 0+.4, 22, 6, color="black", arrowSize=0);
        } else if (YValue == 11){
            drawThickLine(getContext(), 0, 0, 0, 22, 6, color="black", arrowSize=0)
            // Top perpendicular cap
            drawThickLine(getContext(), 0-.4, 0, 0+.4, 0, 6, color="black", arrowSize=0);
            // Bottom perpendicular cap
            drawThickLine(getContext(), 0-.4, 22, 0+.4, 22, 6, color="black", arrowSize=0);
        }
    }

    if(XValue == 30){
        if(YValue < 11){
            // Original line
            drawThickLine(getContext(), 30, 0, 30, 11, 6, color="black", arrowSize=0);
            // Top perpendicular cap
            drawThickLine(getContext(), 30-.4, 0, 30+.4, 0, 6, color="black", arrowSize=0);
            // Bottom perpendicular cap
            drawThickLine(getContext(), 30-.4, 11, 30+.4, 11, 6, color="black", arrowSize=0);
        } else if (YValue > 11){
            drawThickLine(getContext(), 30, 11, 30, 22, 6, color="black", arrowSize=0)
            // Top perpendicular cap
            drawThickLine(getContext(), 30-.4, 11, 30+.4, 11, 6, color="black", arrowSize=0);
            // Bottom perpendicular cap
            drawThickLine(getContext(), 30-.4, 22, 30+.4, 22, 6, color="black", arrowSize=0);
        } else if (YValue == 11){
            drawThickLine(getContext(), 30, 0, 30, 22, 6, color="black", arrowSize=0)
            // Top perpendicular cap
            drawThickLine(getContext(), 30-.4, 0, 30+.4, 0, 6, color="black", arrowSize=0);
            // Bottom perpendicular cap
            drawThickLine(getContext(), 30-.4, 22, 30+.4, 22, 6, color="black", arrowSize=0);
        }
    }

    if(Turn > 1) {
        x = convertInchesToPixelsLine(XValue, YValue).x
        value = "Rnd " + Turn.toString()
        if(YValue<11){
            y = convertInchesToPixelsLine(XValue, YValue).y + 40
            writeScaledBorder(value, x, y);
        } else {
            y = convertInchesToPixelsLine(XValue, YValue).y - 40
            writeScaledBorder(value, x, y);
        }

    }

}


function drawIcons(){

    isOrientationChecked = document.getElementById("orientation").checked;
    if(isOrientationChecked){
        // Orientation Runemark
        if(document.getElementById("white").checked){
            imgElement = document.getElementById("orientation_icon_white");
        } else {
            imgElement = document.getElementById("orientation_icon");
        }
        imageSrc = imgElement.src;
        position = scalePixelPosition({ x: 80, y: 75 });
        size = scalePixelPosition({ x: 80, y: 80 });
        drawImageSrc(position, size, imageSrc);

        position = scalePixelPosition({ x: 950, y: 75 });
        size = scalePixelPosition({ x: 80, y: 80 });
        drawImageSrc(position, size, imageSrc);
    }
    isSymmetricalChecked = document.getElementById("symmetrical").checked;
    if(isSymmetricalChecked){
        // Symmetrical runemark
        if(document.getElementById("white").checked){
            imgElement = document.getElementById("symmetrical_icon_white");
        } else {
            imgElement = document.getElementById("symmetrical_icon");
        }
        imageSrc = imgElement.src;
        position = scalePixelPosition({ x: 80, y: 650 });
        size = scalePixelPosition({ x: 80, y: 80 });
        drawImageSrc(position, size, imageSrc);
    }
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



function drawText(){
    
    cardText = document.getElementById("textValue").value;

    getContext().font = '32px Georgia, serif';
    if(document.getElementById("white").checked){
        getContext().fillStyle = 'white';
    } else {
        getContext().fillStyle = 'black';
    }

    
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";

    font_size = 32;
    lineHeight = font_size;
    getContext().font = font_size + 'px Georgia, serif';

    text_array = (splitWordWrap(getContext(), cardText, 800));

    let xPosition = 180; // Initialize x-coordinate position

    for (line in text_array) {
        const text = text_array[line];
        let startIndex = 0;
        yStart = 180;

        while (startIndex < text.length) {
            const start = text.indexOf("**", startIndex);

            if (start === -1) {
                // No more ** sequences found in this line, print the rest in black
                getContext().font = font_size + 'px Georgia, serif';
                const printText = text.substring(startIndex);
                const textWidth = getContext().measureText(printText).width;
                getContext().fillText(printText, xPosition, yStart + (line * lineHeight));
                xPosition += textWidth; // Update the x-coordinate position
                break;
            }

            if (start > startIndex) {
                // Print text before the ** in black
                getContext().font = font_size + 'px Georgia, serif';
                const printText = text.substring(startIndex, start);
                const textWidth = getContext().measureText(printText).width;
                getContext().fillText(printText, xPosition, yStart + (line * lineHeight));
                xPosition += textWidth; // Update the x-coordinate position
            }

            const end = text.indexOf("**", start + 2);

            if (end === -1) {
                // If no closing ** found, print the rest in black
                getContext().font = font_size + 'px Georgia, serif';
                const printText = text.substring(start);
                const textWidth = getContext().measureText(printText).width;
                getContext().fillText(printText, xPosition, yStart + (line * lineHeight));
                xPosition += textWidth; // Update the x-coordinate position
                break;
            }

            // Print text between ** in special format
            //getContext().fillStyle = '#eb4a04';
            getContext().font = 'bold ' + font_size + 'px Georgia, serif';
            const printTextBetween = text.substring(start + 2, end);
            const textWidthBetween = getContext().measureText(printTextBetween).width;
            getContext().fillText(printTextBetween, xPosition, yStart + (line * lineHeight));
            getContext().font = font_size + 'px Georgia, serif';
            xPosition += textWidthBetween; // Update the x-coordinate position

            startIndex = end + 2;
        }

        // Reset x-coordinate position for the next line
        xPosition = 180;
    }

}

function drawDeployment(){

    const removeDeployment = document.getElementById("removeDeployment").checked;
    if(!removeDeployment){
    drawMap();

    var blueHammerXValue = document.getElementById("blueHammerX").value;
    var blueHammerYValue = document.getElementById("blueHammerY").value;
    var blueHammerLine = document.getElementById("blueHammerLineDeployment").checked;
    var blueHammerTurn = document.getElementById("blueHammerTurn").value;

    var blueShieldXValue = document.getElementById("blueShieldX").value;
    var blueShieldYValue = document.getElementById("blueShieldY").value;
    var blueShieldLine = document.getElementById("blueShieldLineDeployment").checked;
    var blueShieldTurn = document.getElementById("blueShieldTurn").value;

    var blueDaggerXValue = document.getElementById("blueDaggerX").value;
    var blueDaggerYValue = document.getElementById("blueDaggerY").value;
    var blueDaggerLine = document.getElementById("blueDaggerLineDeployment").checked;
    var blueDaggerTurn = document.getElementById("blueDaggerTurn").value;

    var removeBlueDeployment = document.getElementById("removeBlueDeployment").checked;

    var redHammerXValue = document.getElementById("redHammerX").value;
    var redHammerYValue = document.getElementById("redHammerY").value;
    var redHammerLine = document.getElementById("redHammerLineDeployment").checked;
    var redHammerTurn = document.getElementById("redHammerTurn").value;

    var redShieldXValue = document.getElementById("redShieldX").value;
    var redShieldYValue = document.getElementById("redShieldY").value;
    var redShieldLine = document.getElementById("redShieldLineDeployment").checked;
    var redShieldTurn = document.getElementById("redShieldTurn").value;

    var redDaggerXValue = document.getElementById("redDaggerX").value;
    var redDaggerYValue = document.getElementById("redDaggerY").value;
    var redDaggerLine = document.getElementById("redDaggerLineDeployment").checked;
    var redDaggerTurn = document.getElementById("redDaggerTurn").value;

    var removeRedDeployment = document.getElementById("removeRedDeployment").checked;


    var objective1XValue = document.getElementById("objective1X").value;
    var objective1YValue = document.getElementById("objective1Y").value;
    var objective1Icon = document.getElementById("objective1Icon").value;
    var objective2XValue = document.getElementById("objective2X").value;
    var objective2YValue = document.getElementById("objective2Y").value;
    var objective2Icon = document.getElementById("objective2Icon").value;
    var objective3XValue = document.getElementById("objective3X").value;
    var objective3YValue = document.getElementById("objective3Y").value;
    var objective3Icon = document.getElementById("objective3Icon").value;
    var objective4XValue = document.getElementById("objective4X").value;
    var objective4YValue = document.getElementById("objective4Y").value;
    var objective4Icon = document.getElementById("objective4Icon").value;
    var objective5XValue = document.getElementById("objective5X").value;
    var objective5YValue = document.getElementById("objective5Y").value;
    var objective5Icon = document.getElementById("objective5Icon").value;
    var objective6XValue = document.getElementById("objective6X").value;
    var objective6YValue = document.getElementById("objective6Y").value;
    var objective6Icon = document.getElementById("objective6Icon").value;


    // prepare text for line drawing
    // Draw the text in the middle of the line
    getContext().font = "24px LithosBlack"; // Adjust the font size and style as needed
    getContext().fillStyle = "black";
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    

    // Treasure and Objectives Lines
    if(objective1Icon>0){
        drawLines(objective1XValue, objective1YValue, "");
    }
    if(objective2Icon>0){
        drawLines(objective2XValue, objective2YValue, "");
    }
    if(objective3Icon>0){
        drawLines(objective3XValue, objective3YValue, "");
    }
    if(objective4Icon>0){
        drawLines(objective4XValue, objective4YValue, "");
    }
    if(objective5Icon>0){
        drawLines(objective5XValue, objective5YValue, "");
    }
    if(objective6Icon>0){
        drawLines(objective6XValue, objective6YValue, "");
    }
    
    if(!removeRedDeployment){
        if(redShieldLine){
            drawBorderLine(redShieldXValue, redShieldYValue, redShieldTurn);
        } else {
            drawLines(redShieldXValue, redShieldYValue, redShieldTurn);
        }
        if(redDaggerLine){
            drawBorderLine(redDaggerXValue, redDaggerYValue, redDaggerTurn);
        } else {
            drawLines(redDaggerXValue, redDaggerYValue, redDaggerTurn);
        }
        if(redHammerLine){
            drawBorderLine(redHammerXValue, redHammerYValue, redHammerTurn);
        } else {
            drawLines(redHammerXValue, redHammerYValue, redHammerTurn);
        }
    }

    if(!removeBlueDeployment){
        if(blueShieldLine){
            drawBorderLine(blueShieldXValue, blueShieldYValue, blueShieldTurn);
        } else {
            drawLines(blueShieldXValue, blueShieldYValue, blueShieldTurn);
        }
        if(blueDaggerLine){
            drawBorderLine(blueDaggerXValue, blueDaggerYValue, blueDaggerTurn);
        } else {
            drawLines(blueDaggerXValue, blueDaggerYValue, blueDaggerTurn);
        }
        if(blueHammerLine){
            drawBorderLine(blueHammerXValue, blueHammerYValue, blueHammerTurn);
        } else {
            drawLines(blueHammerXValue, blueHammerYValue, blueHammerTurn);
        }
    }

        // Treasure and Objectives Icons
        if(objective1Icon>0){
            drawIcon("green_objective_" + objective1Icon, objective1XValue, objective1YValue);
        }
        if(objective2Icon>0){
            drawIcon("green_objective_" + objective2Icon, objective2XValue, objective2YValue);
        }
        if(objective3Icon>0){
            drawIcon("green_objective_" + objective3Icon, objective3XValue, objective3YValue);
        }
        if(objective4Icon>0){
            drawIcon("green_objective_" + objective4Icon, objective4XValue, objective4YValue);
        }
        if(objective5Icon>0){
            drawIcon("green_objective_" + objective5Icon, objective5XValue, objective5YValue);
        }
        if(objective6Icon>0){
            drawIcon("green_objective_" + objective6Icon, objective6XValue, objective6YValue);
        }

        // input is in inches, X 0 to 30, Y 0 to 22
        if(!removeRedDeployment){
            drawIcon("red_shield", redShieldXValue, redShieldYValue)
            drawIcon("red_dagger", redDaggerXValue, redDaggerYValue);
            drawIcon("red_hammer", redHammerXValue, redHammerYValue);
        }
        if(!removeBlueDeployment){
        drawIcon("blue_shield", blueShieldXValue, blueShieldYValue);
        drawIcon("blue_dagger", blueDaggerXValue, blueDaggerYValue);
        drawIcon("blue_hammer", blueHammerXValue, blueHammerYValue);
        }

    }
}


function drawArrow(context, startX, startY, endX, endY, arrowSize = 10, color = "black") {
    // Calculate the angle of the line
    var angle = Math.atan2(endY - startY, endX - startX);

    // Draw the main line
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();

    // Draw the arrowhead
    context.beginPath();
    context.moveTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6));
    context.lineTo(endX, endY);
    context.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6));
    context.fillStyle = color;
    context.fill();
}
