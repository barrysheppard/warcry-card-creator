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
    if (document.getElementById('bg-01').checked) {
        return document.getElementById('bg-dark-102');

    } else if (document.getElementById('bg-02').checked) {
        return document.getElementById('bg-dark-112');

    } else if (document.getElementById('bg-03').checked) {
        return document.getElementById('bg-dark-302');

    } else if (document.getElementById('bg-04').checked) {
        return document.getElementById('bg-dark-312');

    } else if (document.getElementById('bg-05').checked) {
        return document.getElementById('bg-fire-102');

    } else if (document.getElementById('bg-06').checked) {
        return document.getElementById('bg-fire-112');

    } else if (document.getElementById('bg-07').checked) {
        return document.getElementById('bg-ghur-401');

    } else if (document.getElementById('bg-08').checked) {
        return document.getElementById('bg-ghur-402');

    } else if (document.getElementById('bg-09').checked) {
        return document.getElementById('bg-ghur-403');

    } else if (document.getElementById('bg-10').checked) {
        return document.getElementById('bg-ghur-404');

    } else if (document.getElementById('bg-11').checked) {
        return document.getElementById('bg-ghur-501');

    } else if (document.getElementById('bg-12').checked) {
        return document.getElementById('bg-christmas-001');
    
    } else if (document.getElementById('bg-13').checked) {
        return document.getElementById('mordheim01');
    }

}

drawBackground = function () {
    getContext().drawImage(
        getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}


drawBorder = function () {
    getContext().drawImage(
        document.getElementById('card-border'), 0, 0, getCanvas().width, getCanvas().height);
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

drawFighterName = function (value) {
    startX = 860;
    startY = 700;
    if (document.getElementById('bg-13').checked){
        getContext().font = '44px schoensperger';
    } else {
        getContext().font = '44px rodchenkoctt';
    }
    
    getContext().fillStyle = 'white';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: startX+2, y: startY });
    writeScaled(value, { x: startX, y: startY+2 });
    writeScaled(value, { x: startX+2, y: startY+2 });
    writeScaled(value, { x: startX-2, y: startY });
    writeScaled(value, { x: startX, y: startY-2 });
    writeScaled(value, { x: startX-2, y: startY-2 });

    getContext().fillStyle = 'black';
    writeScaled(value, { x: startX, y: startY });
    
}

drawFighterName2 = function (value) {
    startX = 860;
    startY = 732;
    if (document.getElementById('bg-13').checked){
        getContext().font = '32px schoensperger';
    } else {
        getContext().font = '32px rodchenkoctt';
    }
    
    getContext().fillStyle = 'white';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: startX+2, y: startY });
    writeScaled(value, { x: startX, y: startY+2 });
    writeScaled(value, { x: startX+2, y: startY+2 });
    writeScaled(value, { x: startX-2, y: startY });
    writeScaled(value, { x: startX, y: startY-2 });
    writeScaled(value, { x: startX-2, y: startY-2 });

    getContext().fillStyle = 'black';
    writeScaled(value, { x: startX, y: startY });
}

drawToughness = function (value) {
    getContext().font = "60px rodchenkoctt";
    getContext().fillStyle = "white";
    getContext().textBaseline = "middle";
    getContext().textAlign = "right";
    if (value == "0") {
        value = "*";
    }
    writeScaled(value, { x: 365, y: 270 });
}

drawWounds = function (value) {
    getContext().font = "60px rodchenkoctt";
    getContext().fillStyle = "white";
    getContext().textBaseline = "middle";
    getContext().textAlign = "left";
    if (value == "0") {
        value = "*";
    }
    writeScaled(value, { x: 265, y: 350 });
}

drawMove = function (value) {
    getContext().font = "60px rodchenkoctt";
    getContext().fillStyle = "white";
    getContext().textBaseline = "middle";
    getContext().textAlign = "left";
    if (value == "0") {
        value = "*";
    }
    writeScaled(value, { x: 180, y: 270 });
}

drawPointCost = function (value) {
    getContext().font = "60px rodchenkoctt";
    getContext().fillStyle = "white";
    getContext().textBaseline = "middle";
    getContext().textAlign = "center";
    writeScaled(value, { x: 525, y: 135 });
}

getWeaponStatblockImage = function () {
    return document.getElementById("weapon-profile");
}

drawWeaponStatblock = function (pixelPosition) {
    var image = getWeaponStatblockImage();
    var scaledPosition = scalePixelPosition(pixelPosition);
    var scaledSize = scalePixelPosition({ x: image.width, y: image.height });
    getContext().drawImage(
        image,
        scaledPosition.x,
        scaledPosition.y,
        scaledSize.x,
        scaledSize.y);
}

drawWeapon = function (weaponData, pixelPosition) {

    getContext().font = "48px rodchenkoctt";
    getContext().textBaseline = "top";
    getContext().textAlign = "left";
    getContext().fillStyle = "black";

    drawWeaponStatblock(pixelPosition);

    if (weaponData.damageBase == "0") {
        weaponData.damageBase = "*";
    }

    if (weaponData.damageCrit == "0") {
        weaponData.damageCrit = "*";
    }

    var statsPosY = pixelPosition.y + 58;
    var range = (weaponData.rangeMin > 0 ? (weaponData.rangeMin + "-") : "") + weaponData.rangeMax;
    getContext().textAlign = "center";
    writeScaled(range, { x: pixelPosition.x + 150, y: statsPosY });
    writeScaled(
        weaponData.attacks,
        { x: pixelPosition.x + 260, y: statsPosY });
    writeScaled(
        weaponData.strength,
        { x: pixelPosition.x + 374, y: statsPosY });
    writeScaled(
        weaponData.damageBase + "/" + weaponData.damageCrit,
        { x: pixelPosition.x + 475, y: statsPosY });

    var position = scalePixelPosition({ x: pixelPosition.x + 10, y: pixelPosition.y + 20 });
    var size = scalePixelPosition({ x: 70, y: 70 });
    drawImageSrc(position, size, weaponData.runemark);
}

function getWeapon(weaponId) {
    return $(weaponId).find("#weaponEnabled")[0].checked ? $(weaponId) : null;
}

function getWeapon1() {
    return getWeapon("#weapon1");
}

function getWeapon2() {
    return getWeapon("#weapon2");
}

function getLabel(element) {
    return $(element).prop("labels")[0];
}

function getImage(element) {
    return $(element).find("img")[0];
}

function getSelectedRunemark(radioDiv) {
    var checked = $(radioDiv).find('input:checked');
    if (checked.length > 0) {
        return getImage(getLabel(checked[0])).getAttribute("src");
    }
    return null;
}

function setSelectedRunemark(radioDiv, runemark, radioGroupName, bgColor) {
    // uncheck all
    {
        var checked = $(radioDiv).find('input:checked');
        for (var i = 0; i < checked.length; i++) {
            checked[i].checked = false;
        }
        var icons = $(radioDiv).find('img');
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = bgColor;
        }
    }

    if (runemark != null) {
        var queryString = "img[src='" + runemark + "']";
        var img = $(radioDiv).find(queryString);
        if (img.length > 0) {
            var radioButton = $(img[0].parentNode.parentNode).find("input")[0];
            radioButton.checked = true;
            // img[0].style.backgroundColor = "tomato";
            img[0].style.backgroundColor = "#00bc8c";
        }
        else {
            var newDiv =
                addToImageRadioSelector(
                    runemark,
                    radioDiv,
                    radioGroupName,
                    bgColor);
            // $(newDiv).find("img")[0].style.backgroundColor = "tomato";
            $(newDiv).find("img")[0].style.backgroundColor = "#00bc8c";
            $(newDiv).find("input")[0].checked = true;
        }
    }
}

function getSelectedFactionRunemark() {
    return getSelectedRunemark($('#factionRunemarkSelect')[0]);
}

function setSelectedFactionRunemark(runemark) {
    setSelectedRunemark($('#factionRunemarkSelect')[0], runemark, "faction", "black");
}

function getSelectedSubfactionRunemark() {
    return getSelectedRunemark($('#subfactionRunemarkSelect')[0]);
}

function setSelectedSubfactionRunemark(runemark) {
    setSelectedRunemark($('#subfactionRunemarkSelect')[0], runemark, "subfaction", "black");
}

function getSelectedDeploymentRunemark() {
    return getSelectedRunemark($('#deploymentRunemarkSelect')[0]);
}

function setSelectedDeploymentRunemark(runemark) {
    setSelectedRunemark($('#deploymentRunemarkSelect')[0], runemark, "deployment", "black");
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

function drawTagRunemark(index, runemark) {
    var positions = [{ x: 370, y: 400 }, { x: 490, y: 400 }, { x: 430, y: 300 }];
    if (index >= positions.length) return;

    var img = $("#circle")[0];

    var position = scalePixelPosition(positions[index]);
    var size = scalePixelPosition({ x: 100, y: 100 });
    getContext().drawImage(img, position.x, position.y, size.x, size.y);

    position = scalePixelPosition({ x: positions[index].x + 10, y: positions[index].y + 10 });
    size = scalePixelPosition({ x: 80, y: 80 });
    drawImageSrc(position, size, runemark);


    // write the runemark name underneath
    if (document.getElementById('runemark-names').checked){

        value = runemark.slice(25);
        value = value.replace(".svg", "");
        if (value == "leader"){
            value = "hero";
        }
        if (document.getElementById('bg-13').checked){
            getContext().font = '24px schoensperger';
        } else {
            getContext().font = '24px rodchenkoctt';
        }

        getContext().fillStyle = 'white';
        getContext().textAlign = "center";
        getContext().textBaseline = "middle";
        x_value = positions[index].x + 50;
        y_value = positions[index].y + 100;
        writeScaled(value, { x: x_value+1, y: y_value+1 });
        writeScaled(value, { x: x_value+1, y: y_value-1 });
        writeScaled(value, { x: x_value-1, y: y_value+1 });
        writeScaled(value, { x: x_value-1, y: y_value-1 });

        getContext().fillStyle = 'black';
        getContext().textAlign = "center";
        getContext().textBaseline = "middle";
        writeScaled(value, { x: x_value, y: y_value });
    }

}

function drawModel(imageUrl, imageProps) {
    if (imageUrl != null) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: 590 + imageProps.offsetX, y: imageProps.offsetY });
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
    return "Warcry_Fighter_Card";
}

function setName(name) {
    //var textInput = $("#saveNameInput")[0];
    //textInput.value = name;
}


function setModelImage(image) {
    console.log("setModelImage:" + image);
    $("#fighterImageUrl")[0].value = image;

    //  if (image != null) {
    // TODO: Not sure how to do this. It might not even be possible! Leave it for now...
    //    imageSelect.value = image;
    // }
    // else {
    //    imageSelect.value = null;
    // }
}

function getModelImage() {
    var imageSelect = $("#imageSelect")[0];

    if (imageSelect.files.length > 0) {
        return URL.createObjectURL(imageSelect.files[0]);
    }
    return null;
}


function getFighterImageUrl() {
    var imageSelect = $("#fighterImageUrl")[0].value;
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

function getDefaultWeaponData() {
    var weaponData = new Object;
    weaponData.enabled = true;
    weaponData.rangeMin = 0;
    weaponData.rangeMax = 1;
    weaponData.attacks = 1;
    weaponData.strength = 3;
    weaponData.damageBase = 1;
    weaponData.damageCrit = 2;
    weaponData.runemark = null;
    return weaponData;
}

function getDefaultWeaponData1() {
    var data = getDefaultWeaponData();
    data.enabled = true;
    return data;
}

function getDefaultWeaponData2() {
    var data = getDefaultWeaponData();
    data.enabled = false;
    return data;
}

function readWeaponControls(weaponId) {
    var weaponData = new Object;
    var weaponDiv = $(weaponId);
    weaponData.enabled = weaponDiv.find("#weaponEnabled")[0].checked;
    weaponData.rangeMin = weaponDiv.find("#rangeMin")[0].value;
    weaponData.rangeMax = weaponDiv.find("#rangeMax")[0].value;
    weaponData.attacks = weaponDiv.find("#attacks")[0].value;
    weaponData.strength = weaponDiv.find("#strength")[0].value;
    weaponData.damageBase = weaponDiv.find("#damageBase")[0].value;
    weaponData.damageCrit = weaponDiv.find("#damageCrit")[0].value;
    weaponData.runemark = getSelectedRunemark(weaponDiv.find("#weaponRunemarkSelect")[0]);
    return weaponData;
}

function writeWeaponControls(weaponId, weaponData, weaponName) {
    weaponDiv = $(weaponId);
    weaponDiv.find("#weaponEnabled")[0].checked = weaponData.enabled;
    weaponDiv.find("#weaponInputs")[0].style.display = weaponData.enabled ? "block" : "none";
    weaponDiv.find("#rangeMin")[0].value = weaponData.rangeMin;
    weaponDiv.find("#rangeMax")[0].value = weaponData.rangeMax;
    weaponDiv.find("#attacks")[0].value = weaponData.attacks;
    weaponDiv.find("#strength")[0].value = weaponData.strength;
    weaponDiv.find("#damageBase")[0].value = weaponData.damageBase;
    weaponDiv.find("#damageCrit")[0].value = weaponData.damageCrit;
    setSelectedRunemark(
        weaponDiv.find("#weaponRunemarkSelect")[0],
        weaponData.runemark,
        weaponName,
        "white");
}

function readTagRunemarks() {
    var array = new Array;
    var checkedBoxes = $("#tagRunemarkSelect").find('input:checked');
    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}

function setSelectedTagRunemarks(selectedRunemarksArray) {
    var tagRunemarksDiv = $("#tagRunemarkSelect");
    // uncheck all
    {
        var checked = tagRunemarksDiv.find('input:checked');
        for (var i = 0; i < checked.length; i++) {
            checked[i].checked = false;
        }
        var icons = tagRunemarksDiv.find('img');
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = "white";
        }
    }

    for (var i = 0; i < selectedRunemarksArray.length; i++) {
        var runemark = selectedRunemarksArray[i];
        var queryString = "img[src='" + runemark + "']";
        var imgs = tagRunemarksDiv.find(queryString);
        if (imgs.length > 0) {
            var checkbox = $(imgs[0].parentNode.parentNode).find("input")[0];
            checkbox.checked = true;
            // imgs[0].style.backgroundColor = "tomato";
            imgs[0].style.backgroundColor = "#00bc8c";
        }
        else {
            var newDiv =
                addToImageCheckboxSelector(
                    runemark,
                    tagRunemarksDiv[0],
                    "white");
            // $(newDiv).find("img")[0].style.backgroundColor = "tomato";
            $(newDiv).find("img")[0].style.backgroundColor = "#00bc8c";
            $(newDiv).find("input")[0].checked = true;
        }
    }
}

function readControls() {
    var data = new Object;
    data.name = getName();
    data.imageUrl = getFighterImageUrl();
    data.imageProperties = getModelImageProperties();
    data.factionRunemark = getSelectedFactionRunemark();
    data.subfactionRunemark = getSelectedSubfactionRunemark();
    data.deploymentRunemark = getSelectedDeploymentRunemark();
    data.fighterName = document.getElementById("fighterName").value;
    data.fighterName2 = document.getElementById("fighterName2").value;
    data.toughness = document.getElementById("toughness").value;
    data.wounds = document.getElementById("numWounds").value;
    data.move = document.getElementById("movement").value;
    data.pointCost = document.getElementById("pointCost").value;
    data.tagRunemarks = readTagRunemarks();
    data.weapon1 = readWeaponControls("#weapon1");
    data.weapon2 = readWeaponControls("#weapon2");
    data.bg01 = document.getElementById('bg-01').checked;
    data.bg02 = document.getElementById('bg-02').checked;
    data.bg03 = document.getElementById('bg-03').checked;
    data.bg04 = document.getElementById('bg-04').checked;
    data.bg05 = document.getElementById('bg-05').checked;
    data.bg06 = document.getElementById('bg-06').checked;
    data.bg07 = document.getElementById('bg-07').checked;
    data.bg08 = document.getElementById('bg-08').checked;
    data.bg09 = document.getElementById('bg-09').checked;
    data.bg10 = document.getElementById('bg-10').checked;
    data.bg11 = document.getElementById('bg-11').checked;
    data.bg12 = document.getElementById('bg-12').checked;
    data.bg13 = document.getElementById('bg-13').checked;

    return data;
}

function drawFactionRunemark(image) {
    var position = scalePixelPosition({ x: 84, y: 76 });
    var size = scalePixelPosition({ x: 110, y: 110 });
    drawImageSrc(position, size, image);
}
function drawSubfactionRunemark(image) {

    // draw the background circle first
    // intial points
    startX = 200;
    startY = 52;
    // white border
    var img = $("#circle")[0];
    var position = scalePixelPosition({ x: startX, y: startY });
    var size = scalePixelPosition({ x: 88, y: 88 });
    getContext().drawImage(img, position.x, position.y, size.x, size.y);
    // black centre
    var img = $("#circle_black")[0];
    var position = scalePixelPosition({ x: startX + 4, y: startY+4 });
    var size = scalePixelPosition({ x: 80, y: 80 });
    getContext().drawImage(img, position.x, position.y, size.x, size.y);


    // draw the runemark
    var position = scalePixelPosition({ x: startX + 4, y: startY+4 });
    var size = scalePixelPosition({ x: 80, y: 80 });
    drawImageSrc(position, size, image);
}

function drawDeploymentRunemark(image) {

    // draw the background circle first
    // intial points
    startX = 980;
    startY = 50;
    // white border
    var img = $("#circle")[0];
    var position = scalePixelPosition({ x: startX, y: startY });
    var size = scalePixelPosition({ x: 88, y: 88 });
    getContext().drawImage(img, position.x, position.y, size.x, size.y);
    // black centre
    var img = $("#circle_black")[0];
    var position = scalePixelPosition({ x: startX + 4, y: startY+4 });
    var size = scalePixelPosition({ x: 80, y: 80 });
    getContext().drawImage(img, position.x, position.y, size.x, size.y);


    // draw the runemark
    var position = scalePixelPosition({ x: startX + 4, y: startY+4 });
    var size = scalePixelPosition({ x: 80, y: 80 });
    drawImageSrc(position, size, image);
}

render = function (fighterData) {
    console.log("Render:");
    console.log(fighterData);

    drawBackground();

    // drawModel(fighterData.imageUrl, fighterData.imageProperties);

    // Section added below to try have text above uploaded image

    if (fighterData.imageUrl) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: 600 + fighterData.imageProperties.offsetX, y: 200 + fighterData.imageProperties.offsetY });
            var scale = fighterData.imageProperties.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            // These are the texts to overlay
            drawFighterName(fighterData.fighterName);
            drawFighterName2(fighterData.fighterName2);
            //URL.revokeObjectURL(image.src);

            drawFactionRunemark(fighterData.factionRunemark);
            drawBorder();

            if (!(document.getElementById('subfaction-runemarks/none/blank.gif').checked)) {
                if (fighterData.subfactionRunemark != null) {
                    drawSubfactionRunemark(fighterData.subfactionRunemark);
                }
            }
        
            if (!(document.getElementById('checkbox-assets/img/blank2.gif').checked)) {
                if (fighterData.deploymentRunemark != null) {
                    drawDeploymentRunemark(fighterData.deploymentRunemark);
                }
            }

            drawMove(fighterData.move);
            drawWounds(fighterData.wounds);
            drawToughness(fighterData.toughness);
            drawPointCost(fighterData.pointCost);
                
            if (fighterData.weapon1.enabled && fighterData.weapon2.enabled) {
        
                drawWeapon(fighterData.weapon2, { x: 68, y: 550 }); // Default was x:29, y:397
                drawWeapon(fighterData.weapon1, { x: 68, y: 670 }); // Default was x:29, y:564
            }
            else if (fighterData.weapon1.enabled) {
                drawWeapon(fighterData.weapon1, { x: 68, y: 550 }); // Default was x:29, y:463
            }
            else if (fighterData.weapon2.enabled) {
                drawWeapon(fighterData.weapon2, { x: 68, y: 550 }); // Default was x:29, y:463
            }
            for (i = 0; i < fighterData.tagRunemarks.length; i++) {
                drawTagRunemark(i, fighterData.tagRunemarks[i]);
            }
        

        };
        image.src = fighterData.imageUrl;
    }
    else {

    // Drawn if no image, or when file is loaded but no image included
    drawFighterName(fighterData.fighterName);
    drawFighterName2(fighterData.fighterName2);


    // section added above

    drawFactionRunemark(fighterData.factionRunemark);

    if (!(document.getElementById('subfaction-runemarks/none/blank.gif').checked)) {
        if (fighterData.subfactionRunemark != null) {
            drawSubfactionRunemark(fighterData.subfactionRunemark);
        }
    }

    if (!(document.getElementById('checkbox-assets/img/blank2.gif').checked)) {
        if (fighterData.deploymentRunemark != null) {
            drawDeploymentRunemark(fighterData.deploymentRunemark);
        }
    }

    drawMove(fighterData.move);
    drawWounds(fighterData.wounds);
    drawToughness(fighterData.toughness);
    drawPointCost(fighterData.pointCost);


    if (fighterData.weapon1.enabled && fighterData.weapon2.enabled) {
        
        drawWeapon(fighterData.weapon2, { x: 68, y: 510 }); // Default was x:29, y:397
        drawWeapon(fighterData.weapon1, { x: 68, y: 630 }); // Default was x:29, y:564
    }
    else if (fighterData.weapon1.enabled) {
        drawWeapon(fighterData.weapon1, { x: 68, y: 550 }); // Default was x:29, y:463
    }
    else if (fighterData.weapon2.enabled) {
        drawWeapon(fighterData.weapon2, { x: 68, y: 550 }); // Default was x:29, y:463
    }
    for (i = 0; i < fighterData.tagRunemarks.length; i++) {
        drawTagRunemark(i, fighterData.tagRunemarks[i]);
    }

    }

}

async function writeControls(fighterData) {
    //setName("Warcry_Fighter_Card"); // Always default, trying to move away from this

    // here we check for base64 loaded image and convert it back to imageUrl
    if (fighterData.base64Image != null) {

        // first convert to blob
        const dataToBlob = async (imageData) => {
            return await (await fetch(imageData)).blob();
        };
        const blob = await dataToBlob(fighterData.base64Image);
        // then create URL object
        fighterData.imageUrl = URL.createObjectURL(blob);
        // Now that's saved, clear out the base64 so we don't reassign
        fighterData.base64Image = null;
    } else {
        fighterData.imageUrl = null;
    }

    setModelImage(fighterData.imageUrl);
    setModelImageProperties(fighterData.imageProperties);
    setSelectedFactionRunemark(fighterData.factionRunemark);
    setSelectedSubfactionRunemark(fighterData.subfactionRunemark);
    setSelectedDeploymentRunemark(fighterData.deploymentRunemark);
    $("#fighterName")[0].value = fighterData.fighterName;
    $("#fighterName2")[0].value = fighterData.fighterName2;
    $("#toughness")[0].value = fighterData.toughness;
    $("#numWounds")[0].value = fighterData.wounds;
    $("#movement")[0].value = fighterData.move;
    $("#pointCost")[0].value = fighterData.pointCost;
    setSelectedTagRunemarks(fighterData.tagRunemarks);
    writeWeaponControls("#weapon1", fighterData.weapon1, "weapon1");
    writeWeaponControls("#weapon2", fighterData.weapon2, "weapon2");

    // check and uncheck if needed
    document.getElementById('bg-01').checked = fighterData.bg01;
    document.getElementById('bg-02').checked = fighterData.bg02;
    document.getElementById('bg-03').checked = fighterData.bg03;
    document.getElementById('bg-04').checked = fighterData.bg04;
    document.getElementById('bg-05').checked = fighterData.bg05;
    document.getElementById('bg-06').checked = fighterData.bg06;
    document.getElementById('bg-07').checked = fighterData.bg07;
    document.getElementById('bg-08').checked = fighterData.bg08;
    document.getElementById('bg-09').checked = fighterData.bg09;
    document.getElementById('bg-10').checked = fighterData.bg10;
    document.getElementById('bg-11').checked = fighterData.bg11;
    document.getElementById('bg-12').checked = fighterData.bg12;
    document.getElementById('bg-13').checked = fighterData.bg13;

    // render the updated info
    render(fighterData);
}

function defaultFighterData() {
    var fighterData = new Object;
    fighterData.name = "Warcry_Fighter_Card";
    fighterData.imageUrl = null;
    fighterData.imageProperties = getDefaultModelImageProperties();
    fighterData.factionRunemark = 'runemarks/white/factions-chaos-iron-golems.svg';
    fighterData.fighterName = "Name";
    fighterData.fighterName2 = "subtitle";
    fighterData.toughness = 4;
    fighterData.wounds = 15;
    fighterData.move = 5;
    fighterData.pointCost = 125;
    fighterData.tagRunemarks = new Array;
    fighterData.tagRunemarks.push('runemarks/black/fighters-berserker.svg');
    fighterData.weapon1 = getDefaultWeaponData1();
    fighterData.weapon2 = getDefaultWeaponData2();
    fighterData.subfactionRunemark = null;
    fighterData.deploymentRunemark = null;

    fighterData.bg01 = false;
    fighterData.bg02 = false;
    fighterData.bg03 = false;
    fighterData.bg04 = false;
    fighterData.bg05 = false;
    fighterData.bg06 = false;
    fighterData.bg07 = false;
    fighterData.bg08 = false;
    fighterData.bg09 = false;
    fighterData.bg10 = false;
    fighterData.bg11 = true;
    fighterData.bg12 = false;
    fighterData.bg13 = false;

    return fighterData;
}

function saveFighterDataMap(newMap) {
    window.localStorage.setItem("fighterDataMap", JSON.stringify(newMap));
}

function loadFighterDataMap() {
    var storage = window.localStorage.getItem("fighterDataMap");
    if (storage != null) {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["Warcry_Fighter_Card"] = defaultFighterData();
    saveFighterDataMap(map);
    return map;
}

function loadLatestFighterData() {
    var latestFighterName = window.localStorage.getItem("latestFighterName");
    if (latestFighterName == null) {
        latestFighterName = "Warcry_Fighter_Card";
    }

    console.log("Loading '" + latestFighterName + "'...");

    var data = loadFighterData(latestFighterName);

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

function saveLatestFighterData() {
    var fighterData = readControls();
    if (!fighterData.name) {
        return;
    }

    window.localStorage.setItem("latestFighterName", fighterData.name);
    //saveFighterData(fighterData);
}

function loadFighterData(fighterDataName) {
    if (!fighterDataName) {
        return null;
    }

    var map = loadFighterDataMap();
    if (map[fighterDataName]) {
        return map[fighterDataName];
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
/*
async function saveFighterData(fighterData) {
    var finishSaving = function () {
        var map = loadFighterDataMap();
        map[fighterData.name] = fighterData;
        window.localStorage.setItem("fighterDataMap", JSON.stringify(map));
    };

    if (fighterData != null &&
        fighterData.name) {
        // handle images we may have loaded from disk...
        fighterData.imageUrl = await handleImageUrlFromDisk(fighterData.imageUrl);
        fighterData.factionRunemark = await handleImageUrlFromDisk(fighterData.factionRunemark);
        fighterData.subfactionRunemark = await handleImageUrlFromDisk(fighterData.subfactionRunemark);
        fighterData.deploymentRunemark = await handleImageUrlFromDisk(fighterData.deploymentRunemark);
        for (i = 0; i < fighterData.tagRunemarks.length; i++) {
            fighterData.tagRunemarks[i] = await handleImageUrlFromDisk(fighterData.tagRunemarks[i]);
        }
        fighterData.weapon1.runemark = await handleImageUrlFromDisk(fighterData.weapon1.runemark);
        fighterData.weapon2.runemark = await handleImageUrlFromDisk(fighterData.weapon2.runemark);

        finishSaving();
    }
}
*/
function getLatestFighterDataName() {
    return "latestFighterData";
}

window.onload = function () {
    //window.localStorage.clear();
    var fighterData = loadLatestFighterData();
    writeControls(fighterData);
    refreshSaveSlots();

    getFighterList()
        // log response or catch error of fetch promise
        .then((data) => updateFighterListDropdown(data))
}

onAnyChange = function () {
    var fighterData = readControls();
    render(fighterData);
    saveLatestFighterData();
}

onFighterImageUpload = function () {
    image = getModelImage();
    setModelImage(image);
    var fighterData = readControls();
    render(fighterData);
    saveLatestFighterData();
}

function onWeaponControlsToggled(weaponCheckbox) {
    var controlsDiv = $(weaponCheckbox.parentNode).find("#weaponInputs")[0];
    controlsDiv.style.display = weaponCheckbox.checked ? "block" : "none";

    onAnyChange();
}

onWeaponMinRangeChanged = function (minRange) {
    var maxRange = $(minRange.parentNode).find("#rangeMax")[0];
    maxRange.value = Math.max(minRange.value, maxRange.value);

    onAnyChange();
}

onWeaponMaxRangeChanged = function (maxRange) {
    var minRange = $(maxRange.parentNode).find("#rangeMin")[0];
    minRange.value = Math.min(maxRange.value, minRange.value);

    onAnyChange();
}

onRunemarkSelectionChanged = function (radioButton, backgroundColor) {
    var radioSection = radioButton.parentNode.parentNode;
    var allRadioButtons = $('input', radioSection);
    for (i = 0; i < allRadioButtons.length; i++) {
        getImage(getLabel(allRadioButtons[i])).style.backgroundColor = backgroundColor;
    }

    // getImage(getLabel(radioButton)).style.backgroundColor = "tomato";
    getImage(getLabel(radioButton)).style.backgroundColor = "#00bc8c";

    onAnyChange();
}

onDeploymentRunemarkSelectionChanged = function (radioButton, backgroundColor) {
    var radioSection = radioButton.parentNode.parentNode;
    var allRadioButtons = $('input', radioSection);
    for (i = 0; i < allRadioButtons.length; i++) {
        getImage(getLabel(allRadioButtons[i])).style.backgroundColor = backgroundColor;
    }

    // getImage(getLabel(radioButton)).style.backgroundColor = "tomato";
    getImage(getLabel(radioButton)).style.backgroundColor = "#00bc8c";

    onAnyChange();
}

onTagRunemarkSelectionChanged = function (checkbox, backgroundColor) {
    // getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "tomato" : backgroundColor;
    getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "#00bc8c" : backgroundColor;

    onAnyChange();
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

onFactionRunemarkFileSelect = function () {
    var imageSelect = $("#additionalFactionMarkSelect")[0];
    var selectGrid = $("#factionRunemarkSelect")[0];

    for (i = 0; i < imageSelect.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "faction", "black");
    }
}

onSubfactionRunemarkFileSelect = function () {
    var imageSelect = $("#additionalSubfactionMarkSelect")[0];
    var selectGrid = $("#subfactionRunemarkSelect")[0];

    for (i = 0; i < imageSelect.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "subfaction", "black");
    }
}

onDeploymentRunemarkFileSelect = function () {
    var imageSelect = $("#additionalDeploymentMarkSelect")[0];
    var selectGrid = $("#deploymentRunemarkSelect")[0];

    for (i = 0; i < imageSelect.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "deployment", "black");
    }
}

onWeaponRunemarkFileSelect = function (input, weaponName) {
    var grid = $(input.parentNode).find("#weaponRunemarkSelect")[0];

    for (i = 0; i < input.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(input.files[i]), grid, weaponName, "white");
    }
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
    grid.appendChild(div);
    return div;
}

function onClearCache() {
    window.localStorage.clear();
    location.reload();
    return false;
}

function onResetToDefault() {
    var fighterData = defaultFighterData();
    writeControls(fighterData);
}

function refreshSaveSlots() {
    // Remove all
    $('select').children('option').remove();

    var fighterDataName = readControls().name;

    var map = loadFighterDataMap();

    for (let [key, value] of Object.entries(map)) {
        var selected = false;
        if (fighterDataName &&
            key == fighterDataName) {
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

    // temp null while I work out image saving
    //data.imageUrl = null;

    // need to be explicit due to sub arrays
    var exportObj = JSON.stringify(data, ['name', 'imageUrl', 'imageProperties', 'offsetX', 'offsetY',
        'scalePercent', 'factionRunemark', 'subfactionRunemark', 'deploymentRunemark', 'fighterName', 'fighterName2',
        'toughness', 'wounds', 'move', 'pointCost', 'tagRunemarks', 'weapon1', 'attacks', 'damageBase', 'damageCrit',
        'enabled', 'rangeMax', 'rangeMin', 'runemark', 'strength', 'weapon2', 'attacks', 'damageBase', 'damageCrit',
        'enabled', 'rangeMax', 'rangeMin', 'runemark', 'strength',
        'bg01', 'bg02', 'bg03', 'bg04', 'bg05', 'bg06', 'bg07', 'bg08', 'bg09', 'bg10', 'bg11','bg12','bg13',
        'base64Image'], 4);

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "warcry_fighter_" + data.fighterName.replace(/ /g, "_") + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function saveCardAsImage() {
    data = readControls();
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute("download", "warcry_fighter_" + data.fighterName.replace(/ /g, "_") + ".png");
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
        writeControls(json);
    };

    readJSONFile(file).then(json =>
        saveJson(json)
    );

}



async function getFighterList(){

    // await response of fetch call
    let response = await fetch("assets/fighters.json");
    
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
    
}


function updateFighterListDropdown(data){
    console.log(data);
    $.each(data, function(i, option) {
        $('#sel').append($('<option/>').attr("value", option.id).text(option.Name + " - " + option.Warband));
    });

}

function loadFighterFromList(){
    
        var x = document.getElementById("sel").selectedIndex;
        var y = document.getElementById("sel").options;
        console.log("Index: " + y[x].index + " is " + y[x].text);

        getFighterList()
        // log response or catch error of fetch promise
        .then((data) => saveFighterFromList(data[y[x].index]));

}

function saveFighterFromList(fighter){

    console.log(fighter);

    var fighterData = new Object;
    fighterData.name = "Warcry_Fighter_Card";
    fighterData.imageUrl = null;
    fighterData.imageProperties = {
            offsetX: 0,
            offsetY: 0,
            scalePercent: 200
        };
    

    fighterData.factionRunemark = getFactionRunemark(fighter.Warband);    
    fighterData.fighterName = fighter.Name;
    fighterData.fighterName2 = "";
    fighterData.toughness = fighter.Toughness;
    fighterData.wounds = fighter.Wounds;
    fighterData.move = fighter.Movement;
    fighterData.pointCost = fighter.Points;
    fighterData.tagRunemarks = getRunemarks(fighter.Runemarks);
    fighterData.weapon1 = getDefaultWeaponData1();
    fighterData.weapon1.enabled = true;
    fighterData.weapon1.rangeMin = fighter.Weapon1_Min_Range;
    fighterData.weapon1.rangeMax = fighter.Weapon1_Max_Range;
    fighterData.weapon1.attacks = fighter.Weapon1_Attacks;
    fighterData.weapon1.strength = fighter.Weapon1_Strength;
    fighterData.weapon1.damageBase = fighter.Weapon1_Dmg_Hit;
    fighterData.weapon1.damageCrit = fighter.Weapon1_Dmg_Crit;
    fighterData.weapon1.runemark = getWeaponRunemark(fighter.Weapon1_Runemark);

    fighterData.weapon2 = getDefaultWeaponData2();
    if (fighter.Weapon2 == "TRUE"){
        fighterData.weapon2.enabled = true;
    } else {
        fighterData.weapon2.enabled = false;
    }
    fighterData.weapon2.rangeMin = fighter.Weapon2_Min_Range;
    fighterData.weapon2.rangeMax = fighter.Weapon2_Max_Range;
    fighterData.weapon2.attacks = fighter.Weapon2_Attacks;
    fighterData.weapon2.strength = fighter.Weapon2_Strength;
    fighterData.weapon2.damageBase = fighter.Weapon2_Dmg_Hit;
    fighterData.weapon2.damageCrit = fighter.Weapon2_Dmg_Crit;
    fighterData.weapon2.runemark = fighter.Weapon2_Runemark;
    fighterData.weapon2.runemark = getWeaponRunemark(fighter.Weapon2_Runemark);


    fighterData.subfactionRunemark = getBladebornRunemark(fighter.Bladeborn);
    fighterData.deploymentRunemark = null;

    fighterData.bg01 = false;
    fighterData.bg02 = false;
    fighterData.bg03 = false;
    fighterData.bg04 = false;
    fighterData.bg05 = false;
    fighterData.bg06 = false;
    fighterData.bg07 = false;
    fighterData.bg08 = false;
    fighterData.bg09 = false;
    fighterData.bg10 = false;
    fighterData.bg11 = true;
    fighterData.bg12 = false;
    fighterData.bg13 = false;

    writeControls(fighterData);
}



function getFactionRunemark(warband){
    if(warband == "Beasts of Chaos") {runemark = "runemarks/white/factions-chaos-beasts-of-chaos.svg"} 
    else if(warband == "Chaos Legionnaaires") {runemark = "runemarks/white/factions-chaos-chaos-legionnaires.svg";}
    else if(warband == "Corvus Cabal") {runemark = "runemarks/white/factions-chaos-corvus-cabal.svg";}
    else if(warband == "Cypher Lords") {runemark = "runemarks/white/factions-chaos-cypher-lords.svg";}
    else if(warband == "Darkoath Savagers") {runemark = "runemarks/white/factions-chaos-darkoath-savagers.svg";}
    else if(warband == "Chaos Everchosen") {runemark = "runemarks/white/factions-chaos-everchosen.svg";}
    else if(warband == "Horns of Hashut") {runemark = "runemarks/white/factions-chaos-horns-of-hashut.svg";}
    else if(warband == "Iron GOlems") {runemark = "runemarks/white/factions-chaos-iron-golems.svg";}
    else if(warband == "Jade Obelisk") {runemark = "runemarks/white/factions-chaos-jade-obelisk.svg";}
    else if(warband == "Khorne Bloodbound") {runemark = "runemarks/white/factions-chaos-khorne-bloodbound.svg";}
    else if(warband == "Khorne Daemons") {runemark = "runemarks/white/factions-chaos-khorne-daemons.svg";}
    else if(warband == "Nurgle Daemons") {runemark = "runemarks/white/factions-chaos-nurgle-daemons.svg";}
    else if(warband == "Nurgle Rotbringers") {runemark = "runemarks/white/factions-chaos-nurgle-rotbringers.svg";}
    else if(warband == "Rotmire Creed") {runemark = "runemarks/white/factions-chaos-rotmire-creed.svg";}
    else if(warband == "Scions of the FLame") {runemark = "runemarks/white/factions-chaos-scions-of-the-flame.svg";}
    else if(warband == "Skaven") {runemark = "runemarks/white/factions-chaos-skaven.svg";}
    else if(warband == "Slaanesh Daemons") {runemark = "runemarks/white/factions-chaos-slaanesh-daemons.svg";}
    else if(warband == "Slaanesh Sybarites") {runemark = "runemarks/white/factions-chaos-slaanesh-sybarites.svg";}
    else if(warband == "Slaves to Darkness") {runemark = "runemarks/white/factions-chaos-slaves-to-darkness.svg";}
    else if(warband == "Spire Tyrants") {runemark = "runemarks/white/factions-chaos-spire-tyrants.svg";}
    else if(warband == "Splintered Fang") {runemark = "runemarks/white/factions-chaos-splintered-fang.svg";}
    else if(warband == "Tarantulos Brood") {runemark = "runemarks/white/factions-chaos-tarantulos-brood.svg";}
    else if(warband == "The Unmade") {runemark = "runemarks/white/factions-chaos-the-unmade.svg";}
    else if(warband == "Tzeentch Arcanites") {runemark = "runemarks/white/factions-chaos-tzeentch-arcanites.svg";}
    else if(warband == "Tzeentch Daemons") {runemark = "runemarks/white/factions-chaos-tzeentch-daemons.svg";}
    else if(warband == "Untamed Beasts") {runemark = "runemarks/white/factions-chaos-untamed-beasts.svg";}
    else if(warband == "Flesh-eater Courts") {runemark = "runemarks/white/factions-death-flesh-eater-courts.svg";}
    else if(warband == "Legions of Nagash") {runemark = "runemarks/white/factions-death-legions-of-nagash.svg";}
    else if(warband == "Nighthaunt") {runemark = "runemarks/white/factions-death-nighthaunt.svg";}
    else if(warband == "Ossiarch Bonereapers") {runemark = "runemarks/white/factions-death-ossiarch-bonereapers.svg";}
    else if(warband == "Soulblight Gravelords") {runemark = "runemarks/white/factions-death-soulblight-gravelords.svg";}
    else if(warband == "Bonesplitterz") {runemark = "runemarks/white/factions-destruction-bonesplitterz.svg";}
    else if(warband == "Gloomspite Gitz") {runemark = "runemarks/white/factions-destruction-gloomspite-gitz.svg";}
    else if(warband == "Ironjawz") {runemark = "runemarks/white/factions-destruction-ironjawz.svg";}
    else if(warband == "Kruleboyz") {runemark = "runemarks/white/factions-destruction-kruleboyz.svg";}
    else if(warband == "Ogor Mawtribes") {runemark = "runemarks/white/factions-destruction-ogor-mawtribes.svg";}
    /*
    else if(warband = "Cities of Sigmar Alt") {runemark = "runemarks/white/factions-order-cities-of-sigmar-alternative.svg";}
    else if(warband = "Chaos Legionnaaires") {runemark = "runemarks/white/factions-order-cities-of-sigmar-anvilgard.svg";}
    else if(warband = "Chaos Legionnaaires") {runemark = "runemarks/white/factions-order-cities-of-sigmar-greywater-fastness.svg";}
    else if(warband = "Chaos Legionnaaires") {runemark = "runemarks/white/factions-order-cities-of-sigmar-hallowheart.svg";}
    else if(warband = "Chaos Legionnaaires") {runemark = "runemarks/white/factions-order-cities-of-sigmar-hammerhal.svg";}
    else if(warband = "Chaos Legionnaaires") {runemark = "runemarks/white/factions-order-cities-of-sigmar-tempests-eye.svg";}
    else if(warband = "Chaos Legionnaaires") {runemark = "runemarks/white/factions-order-cities-of-sigmar-the-living-city.svg";}
    else if(warband = "Chaos Legionnaaires") {runemark = "runemarks/white/factions-order-cities-of-sigmar-the-phoenicium.svg";}
    */
    else if(warband == "Cities of Sigmar") {runemark = "runemarks/white/factions-order-cities-of-sigmar.svg";}
    else if(warband == "Daughters of Khaine") {runemark = "runemarks/white/factions-order-daughters-of-khaine.svg";}
    else if(warband == "Fyreslayers") {runemark = "runemarks/white/factions-order-fyreslayers.svg";}
    else if(warband == "Hunters of Hunachi") {runemark = "runemarks/white/factions-order-hunters-of-huanchi.svg";}
    else if(warband == "Idoneth Deepkin") {runemark = "runemarks/white/factions-order-idoneth-deepkin.svg";}
    else if(warband == "Khainite Shadowstalkers") {runemark = "runemarks/white/factions-order-khainite-shadowstalkers.svg";}
    else if(warband == "Kharadron Overlords") {runemark = "runemarks/white/factions-order-kharadron-overlords.svg";}
    else if(warband == "Lumineth Realm-lords") {runemark = "runemarks/white/factions-order-lumineth-realmlords.svg";}
    else if(warband == "Seraphon") {runemark = "runemarks/white/factions-order-seraphon.svg";}
    //else if(warband = "Chaos Legionnaaires") {runemark = "runemarks/white/factions-order-stormcast-eternals-alternative.svg";}
    else if(warband == "SCE:Sacrosanct") {runemark = "runemarks/white/factions-order-stormcast-eternals-sacrosanct.svg";}
    else if(warband == "SCE:Thunderstrike") {runemark = "runemarks/white/factions-order-stormcast-eternals-thunderstrike.svg";}
    else if(warband == "SCE:Vanguard") {runemark = "runemarks/white/factions-order-stormcast-eternals-vanguard.svg";}
    else if(warband == "SCE:Warrior") {runemark = "runemarks/white/factions-order-stormcast-eternals-warrior.svg";}
    //else if(warband = "Chaos Legionnaaires") {runemark = "runemarks/white/factions-order-sylvaneth-alternative.svg";}
    else if(warband == "Sylvaneth") {runemark = "runemarks/white/factions-order-sylvaneth.svg";}
    else if(warband == "Askurgan Trueblades") {runemark = "runemarks/white/factions-death-askurgan-trueblades.svg";}
    else if(warband == "Claws of Karanak") {runemark = "runemarks/white/factions-chaos-claws-of-karanak.svg";}

    else { runemark = "runemarks/white/factions-chaos-everchosen.svg";}
    return runemark;
}

function getRunemarks(runemarks){
    tagRunemarks = new Array;

    if (runemarks.includes("Agile")){
        tagRunemarks.push('runemarks/black/fighters-agile.svg');
        }
    if (runemarks.includes("Fly")){
       tagRunemarks.push('runemarks/black/fighters-fly.svg');
        }
    if (runemarks.includes("Beast")){
        tagRunemarks.push('runemarks/black/fighters-beast.svg');
    }
    if (runemarks.includes("Berserker")){
        tagRunemarks.push('runemarks/black/fighters-berserker.svg');
        }
    if (runemarks.includes("Brute")){
        tagRunemarks.push('runemarks/black/fighters-brute.svg');
    }
    if (runemarks.includes("Bulwark")){
        tagRunemarks.push('runemarks/black/fighters-bulwark.svg');
    }
    if (runemarks.includes("Champion")){
        tagRunemarks.push('runemarks/black/fighters-champion.svg');
    }
    if (runemarks.includes("Sentience")){
        tagRunemarks.push('runemarks/black/fighters-sentience.svg');
    }
    if (runemarks.includes("Destroyer")){
        tagRunemarks.push('runemarks/black/fighters-destroyer.svg');
    }
    if (runemarks.includes("Elite")){
        tagRunemarks.push('runemarks/black/fighters-elite.svg');
    }
    if (runemarks.includes("Icon Bearer")){ 
        tagRunemarks.push('runemarks/black/fighters-icon-bearer.svg');
    }
    if (runemarks.includes("Mount")){
        tagRunemarks.push('runemarks/black/fighters-mount.svg');
    }
    if (runemarks.includes("Hero")){
        tagRunemarks.push('runemarks/black/fighters-leader.svg');
    }
    if (runemarks.includes("Mystic")){
        tagRunemarks.push('runemarks/black/fighters-mystic.svg');
    }
    if (runemarks.includes("Minion")){
        tagRunemarks.push('runemarks/black/fighters-minion.svg');
    }
    if (runemarks.includes("Scout")){
        tagRunemarks.push('runemarks/black/fighters-scout.svg');
    }
    if (runemarks.includes("Trapper")){
        tagRunemarks.push('runemarks/black/fighters-trapper.svg');
    }
    if (runemarks.includes("Warrior")){
        tagRunemarks.push('runemarks/black/fighters-warrior.svg');
    }
    if (runemarks.includes("Monster")){
        tagRunemarks.push('runemarks/black/fighters-monster.svg');
    }
    if (runemarks.includes("Thrall")){
        tagRunemarks.push('runemarks/black/fighters-thrall.svg');
    }
    if (runemarks.includes("Ally")){
        tagRunemarks.push('runemarks/black/fighters-ally.svg');
    }
    if (runemarks.includes("Ferocious")){
        tagRunemarks.push('runemarks/black/fighters-ferocious.svg');
    }
    if (runemarks.includes("Frenzied")){
        tagRunemarks.push('runemarks/black/fighters-frenzied.svg');
    }
    if (runemarks.includes("Priest")){
        tagRunemarks.push('runemarks/black/fighters-priest.svg');
    }
    if (runemarks.includes("Terrifying")){
        tagRunemarks.push('runemarks/black/fighters-terrifying.svg');
    }
    return tagRunemarks;


}


function getWeaponRunemark(weaponSymbol){
    if(weaponSymbol == "Axe") {runemark = "runemarks/black/weapons-axe.svg"} 
    else if(weaponSymbol == "Bident") {runemark = "runemarks/black/weapons-bident.svg";}
    else if(weaponSymbol == "Blast") {runemark = "runemarks/black/weapons-blast.svg";}
    else if(weaponSymbol == "Claws") {runemark = "runemarks/black/weapons-claws.svg";}
    else if(weaponSymbol == "Club") {runemark = "runemarks/black/weapons-club.svg";}
    else if(weaponSymbol == "Dagger") {runemark = "runemarks/black/weapons-dagger.svg";}
    else if(weaponSymbol == "Fangs") {runemark = "runemarks/black/weapons-fangs.svg";}
    else if(weaponSymbol == "Hammer") {runemark = "runemarks/black/weapons-hammer.svg";}
    else if(weaponSymbol == "Hook") {runemark = "runemarks/black/weapons-hook.svg";}
    else if(weaponSymbol == "Mace") {runemark = "runemarks/black/weapons-mace.svg";}
    else if(weaponSymbol == "Ranged Weapon") {runemark = "runemarks/black/weapons-ranged-weapon.svg";}
    else if(weaponSymbol == "Reach Weapon") {runemark = "runemarks/black/weapons-reach-weapon.svg";}
    else if(weaponSymbol == "Scythe") {runemark = "runemarks/black/weapons-scythe.svg";}
    else if(weaponSymbol == "Spear") {runemark = "runemarks/black/weapons-spear.svg";}
    else if(weaponSymbol == "Sword") {runemark = "runemarks/black/weapons-sword.svg";}
    else if(weaponSymbol == "Unarmed") {runemark = "runemarks/black/weapons-unarmed.svg";}
    else { runemark = "runemarks/black/weapons-dagger.svg";}
    return runemark;
}



function getBladebornRunemark(bladeborn){

    if(bladeborn == "Blackpowder's Buccaneers") {runemark = "runemarks/white/bladeborn-blackpowders.svg";}
    else if(bladeborn == "Thorns of the Briar Queen") {runemark = "runemarks/white/bladeborn-briarqueen.svg";}
    else if(bladeborn == "The Chosen Axes") {runemark = "runemarks/white/bladeborn-chosenaxes.svg";}
    else if(bladeborn == "The Crimson Court") {runemark = "runemarks/white/bladeborn-crimsoncourt.svg";}
    else if(bladeborn == "Da Kunnin’ Krew") {runemark = "runemarks/white/bladeborn-dakunninkrew.svg";}
    else if(bladeborn == "The Dread Pageant") {runemark = "runemarks/white/bladeborn-dreadpageant.svg";}
    else if(bladeborn == "Elathain's Soulraid") {runemark = "runemarks/white/bladeborn-elathain.svg";}
    else if(bladeborn == "Eyes of the Nine") {runemark = "runemarks/white/bladeborn-eyesofthenine.svg";}
    else if(bladeborn == "The Farstriders") {runemark = "runemarks/white/bladeborn-farstrider.svg";}
    else if(bladeborn == "Garrek's Reavers") {runemark = "runemarks/white/bladeborn-garrek.svg";}
    else if(bladeborn == "The Gnarlspirit Pack") {runemark = "runemarks/white/bladeborn-gnarlspirit.svg";}
    else if(bladeborn == "Godsworn Hunt") {runemark = "runemarks/white/bladeborn-godsworn.svg";}
    else if(bladeborn == "Grashrak's Despoilers") {runemark = "runemarks/white/bladeborn-grashrak.svg";}
    else if(bladeborn == "The Grymwatch") {runemark = "runemarks/white/bladeborn-grymwatch.svg";}
    else if(bladeborn == "Hedrakka's Madmob") {runemark = "runemarks/white/bladeborn-hedkrakka.svg";}
    else if(bladeborn == "Hexbane's Hunters") {runemark = "runemarks/white/bladeborn-hexbaneshunters.svg";}
    else if(bladeborn == "Hrothgorn's Mantrappers") {runemark = "runemarks/white/bladeborn-hrothgorn.svg";}
    else if(bladeborn == "Ironskull's Boyz") {runemark = "runemarks/white/bladeborn-ironskull.svg";}
    else if(bladeborn == "Kainan's Reapers") {runemark = "runemarks/white/bladeborn-kainan.svg";}
    else if(bladeborn == "Khagra's Ravagers") {runemark = "runemarks/white/bladeborn-khagra.svg";}
    else if(bladeborn == "Magore's Fiends") {runemark = "runemarks/white/bladeborn-magore.svg";}
    else if(bladeborn == "Mollog's Mob") {runemark = "runemarks/white/bladeborn-mollog.svg";}
    else if(bladeborn == "Morgok's Krushas") {runemark = "runemarks/white/bladeborn-morgok.svg";}
    else if(bladeborn == "Morgwaeth's Blade-Coven") {runemark = "runemarks/white/bladeborn-morgwaeth.svg";}
    else if(bladeborn == "Miyari's Purifiers") {runemark = "runemarks/white/bladeborn-myari.svg";}
    else if(bladeborn == "Rippa's Snarlfangs") {runemark = "runemarks/white/bladeborn-rippa.svg";}
    else if(bladeborn == "The Sepulchral Guard") {runemark = "runemarks/white/bladeborn-sepulchral.svg";}
    else if(bladeborn == "Skaeth's Wild Hunt") {runemark = "runemarks/white/bladeborn-skaeth.svg";}
    else if(bladeborn == "Spiteclaw's Swarm") {runemark = "runemarks/white/bladeborn-spiteclaw.svg";}
    else if(bladeborn == "The Starblood Stalkers") {runemark = "runemarks/white/bladeborn-starblood.svg";}
    else if(bladeborn == "Steelheart's Champions") {runemark = "runemarks/white/bladeborn-steelheart.svg";}
    else if(bladeborn == "Stormsire's Cursebreakers") {runemark = "runemarks/white/bladeborn-stormsire.svg";}
    else if(bladeborn == "The Exiled Dead") {runemark = "runemarks/white/bladeborn-theexileddead.svg";}
    else if(bladeborn == "Thundrik's Profiteers") {runemark = "runemarks/white/bladeborn-thundrik.svg";}
    else if(bladeborn == "The Sons of Velmorn") {runemark = "runemarks/white/bladeborn-velmorn.svg";}
    else if(bladeborn == "The Wurmspat") {runemark = "runemarks/white/bladeborn-wurmspat.svg";}
    else if(bladeborn == "Xandire's Truthseekers") {runemark = "runemarks/white/bladeborn-xandires.svg";}
    else if(bladeborn == "Ylthari's Guardians") {runemark = "runemarks/white/bladeborn-ylthari.svg";}
    else if(bladeborn == "Zarbag's Gitz") {runemark = "runemarks/white/bladeborn-zarbag.svg";}
    else if(bladeborn == "Grinkrak's Looncourt") {runemark = "runemarks/white/bladeborn-grinkrakslooncourt.svg";}
    else if(bladeborn == "Gryselle's Arenai") {runemark = "runemarks/white/bladeborn-grysellesarenai.svg";}

    else runemark = null;
    return runemark;
}