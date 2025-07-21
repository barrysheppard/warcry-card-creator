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

getBackgroundImage = function () {
    var selectedOption = document.getElementById('background-list').value;

    if (selectedOption === 'bg-01') {
        return document.getElementById('bg-dark-102');

    } else if (selectedOption === 'bg-02') {
        return document.getElementById('bg-dark-112');

    } else if (selectedOption === 'bg-03') {
        return document.getElementById('bg-dark-302');

    } else if (selectedOption === 'bg-04') {
        return document.getElementById('bg-dark-312');

    } else if (selectedOption === 'bg-05') {
        return document.getElementById('bg-fire-102');

    } else if (selectedOption === 'bg-06') {
        return document.getElementById('bg-fire-112');

    } else if (selectedOption === 'bg-07') {
        return document.getElementById('bg-ghur-401');

    } else if (selectedOption === 'bg-08') {
        return document.getElementById('bg-ghur-402');

    } else if (selectedOption === 'bg-09') {
        return document.getElementById('bg-ghur-403');

    } else if (selectedOption === 'bg-10') {
        return document.getElementById('bg-ghur-404');

    } else if (selectedOption === 'bg-11') {
        return document.getElementById('bg-ghur-501');

    } else if (selectedOption === 'bg-12') {
        return document.getElementById('bg-christmas-001');

    } else if (selectedOption === 'bg-13') {
        return document.getElementById('mordheim01');

    } else if (selectedOption === 'bg-14') {
        return document.getElementById('bg-aos');

    } else if (selectedOption === 'bg-15') {
        return document.getElementById('bg-green');

    } else if (selectedOption === 'bg-16') {
        return document.getElementById('bg-red');

    } else if (selectedOption === 'bg-17') {
        return document.getElementById('bg-dark-arcane');

    } else if (selectedOption === 'bg-18') {
        return document.getElementById('bg-cursed-city');
    }
    else if (selectedOption === 'bg-19') {
       return document.getElementById('bg-oldworld');
    }
    else if (selectedOption === 'bg-20') {
       return document.getElementById('bg-embergard');   
    }
    else if (selectedOption === 'bg-21') {
       return document.getElementById('bg-grey');   
    }
    else if (selectedOption === 'bg-22') {
       return document.getElementById('bg-gold');   
    }
    else if (selectedOption === 'bg-23') {
       return document.getElementById('bg-skulls');   
    }
    else if (selectedOption === 'bg-24') {
       return document.getElementById('bg-dark-black');   
    }
    else if (selectedOption === 'bg-25') {
        return document.getElementById('bg-frostgrave');   
    }
}

drawFrame = function(){
    
    if(!document.getElementById("removeFaction").checked){
    // draw some black background circles to get a smooth look
    startX = 67;
    startY = 62;
    // black border
    var img = $("#circle_black")[0];
    var position = scalePixelPosition({ x: startX, y: startY });
    var size = scalePixelPosition({ x: 144, y: 144 });
    getContext().drawImage(img, position.x, position.y, size.x, size.y);
    }


    if(document.getElementById("removeCost").checked){
        if(document.getElementById("removeFaction").checked){
            getContext().drawImage(document.getElementById('warcry-fighter-frame-no-cost-no-faction'), 0, 0, getCanvas().width, getCanvas().height);
        } else {
            getContext().drawImage(document.getElementById('warcry-fighter-frame-no-cost'), 0, 0, getCanvas().width, getCanvas().height);
        }
    
    } else {
        // draw some black background circles to get a smooth look
        startX = 454;
        startY = 62;
        // black border
        var img = $("#circle_black")[0];
        var position = scalePixelPosition({ x: startX, y: startY });
        var size = scalePixelPosition({ x: 144, y: 144 });
        getContext().drawImage(img, position.x, position.y, size.x, size.y);
        if(document.getElementById("removeFaction").checked){
            getContext().drawImage(document.getElementById('warcry-fighter-frame-no-cost-no-faction'), 0, 0, getCanvas().width, getCanvas().height);
            getContext().drawImage(document.getElementById('warcry-fighter-frame-cost'), 0, 0, getCanvas().width, getCanvas().height);

        } else {
            getContext().drawImage(document.getElementById('warcry-fighter-frame'), 0, 0, getCanvas().width, getCanvas().height);
        }
    }
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

drawFighterName = function (value) {
    startX = 850;
    startY = 690;
    if (document.getElementById('background-list').value === 'bg-13') {
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

function scaleFontSizeToFit(text, maxWidth, startingFontSize) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let fontSize = startingFontSize;

    let textWidth; // Define textWidth here

    do {
      context.font = fontSize + 'px sans-serif'; // Change the font family as needed
      textWidth = context.measureText(text).width; // Calculate textWidth
      fontSize--;
    } while (textWidth > maxWidth && fontSize > 0);

    return fontSize;
  }

  function drawFighterName2(value) {
    const startX = 850;
    const startY = 725;
    maxWidth = 450;
    const font = scaleFontSizeToFit(value, maxWidth, 44);

    if (document.getElementById('background-list').value === 'bg-13') {
      getContext().font = font + 'px schoensperger';
    } else {
      getContext().font = font + 'px rodchenkoctt';
    }

    getContext().fillStyle = 'white';
    getContext().textAlign = 'center';
    getContext().textBaseline = 'middle';
    writeScaled(value, { x: startX + 2, y: startY });
    writeScaled(value, { x: startX, y: startY + 2 });
    writeScaled(value, { x: startX + 2, y: startY + 2 });
    writeScaled(value, { x: startX - 2, y: startY });
    writeScaled(value, { x: startX, y: startY - 2 });
    writeScaled(value, { x: startX - 2, y: startY - 2 });

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

    var img = $("#circle_black")[0];
    var position = scalePixelPosition(positions[index]);
    var size = scalePixelPosition({ x: 100, y: 100 });
    getContext().drawImage(img, position.x-2, position.y-2, size.x+4, size.y+4);

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
        value = value.replace("-", "");
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
    $("#fighterImageUrl")[0].value = image;
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


function getDefaultWeaponData() {
    var weaponData = new Object;
    weaponData.enabled = true;
    weaponData.rangeMin = 0;
    weaponData.rangeMax = 1;
    weaponData.attacks = 1;
    weaponData.strength = 3;
    weaponData.damageBase = 1;
    weaponData.damageCrit = 2;
    weaponData.runemark = "runemarks/black/weapons-dagger.svg";
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
    data.customBackgroundUrl = getCustomBackgroundUrl();
    data.customBackgroundProperties = getCustomBackgroundProperties();
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
    data.bg14 = document.getElementById('bg-14').checked;
    data.bg15 = document.getElementById('bg-15').checked;
    data.bg16 = document.getElementById('bg-16').checked;
    data.bgselected = document.getElementById('background-list').value;

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
    // black outsideline
    var img = $("#circle_black")[0];
    var position = scalePixelPosition({ x: startX -1, y: startY-1 });
    var size = scalePixelPosition({ x: 90, y: 90 });
    getContext().drawImage(img, position.x, position.y, size.x, size.y);
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
    // black border
    var img = $("#circle_black")[0];
    var position = scalePixelPosition({ x: startX, y: startY });
    var size = scalePixelPosition({ x: 88, y: 88 });
    getContext().drawImage(img, position.x-1, position.y-1, size.x+2, size.y+2);
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

    console.log(image)
    // draw the runemark
    var position = scalePixelPosition({ x: startX + 4, y: startY+4 });
    var size = scalePixelPosition({ x: 80, y: 80 });
    drawImageSrc(position, size, image);
}
/*
const render = function(fighterData) {
    if (fighterData.customBackgroundUrl) {
      renderCustomBackground(fighterData);
    } else {
      renderDefaultBackground(fighterData);
    }
  };
*/

  function render(fighterData) {
    return new Promise((resolve, reject) => {
      beginCanvasBuffer();
      getContext().clearRect(0, 0, canvas.width, canvas.height);
      let promise;
      if (fighterData.customBackgroundUrl) {
        promise = renderCustomBackground(fighterData);
      } else {
        promise = renderDefaultBackground(fighterData);
      }
      promise.then(function() {
          commitCanvasBuffer();
          resolve();
        });
      });
  }



const renderCustomBackground = function(fighterData) {
    const backgroundImage = new Image();
    const removeTextAndFrame = document.getElementById("removeTextAndFrame").checked;
    console.log(removeTextAndFrame);
    backgroundImage.onload = function() {
        const position = scalePixelPosition({
        x: fighterData.customBackgroundProperties.offsetX,
        y: fighterData.customBackgroundProperties.offsetY
        });
        const scale = fighterData.customBackgroundProperties.scalePercent;
        const width = backgroundImage.width * scale / 100;
        const height = backgroundImage.height * scale / 100;
        getContext().drawImage(backgroundImage, position.x, position.y, width, height);
        if(!removeTextAndFrame){
            drawFrame();
            if (!(document.getElementById('subfaction-runemarks/none/blank.gif').checked) && fighterData.subfactionRunemark != null) {
            drawSubfactionRunemark(fighterData.subfactionRunemark);
            }
            if (!(document.getElementById('checkbox-assets/img/blank2.gif').checked) && fighterData.deploymentRunemark != null) {
            drawDeploymentRunemark(fighterData.deploymentRunemark);
            }
        };
        renderFighterImage(fighterData);

    };
    backgroundImage.src = fighterData.customBackgroundUrl;
    
};

const renderDefaultBackground = function(fighterData) {
    const removeTextAndFrame = document.getElementById("removeTextAndFrame").checked;
    getContext().drawImage(getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
    if(!removeTextAndFrame){
        drawFrame();
    }
    drawBorder();
    renderFighterImage(fighterData);
    return Promise.resolve();
};

const renderFighterImage = function(fighterData) {
    const removeTextAndFrame = document.getElementById("removeTextAndFrame").checked;
    if (fighterData.imageUrl) {
        const image = new Image();
        image.onload = function() {
            const position = scalePixelPosition({
                x: 600 + fighterData.imageProperties.offsetX,
                y: 30 + fighterData.imageProperties.offsetY
            });
            const scale = fighterData.imageProperties.scalePercent / 100.0;
            const width = image.width * scale;
            const height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);
            if(!removeTextAndFrame){
                drawFrame();
                drawOverlayTexts(fighterData);
            }
            drawBorder();
        };
        image.src = fighterData.imageUrl;
    } else {
        // Drawn if no image, or when file is loaded but no image included
        if(!removeTextAndFrame){
            drawFrame();
            drawOverlayTexts(fighterData);
        }
        drawBorder();
    }
};



function drawOverlayTexts(fighterData) {
    const {
      fighterName,
      fighterName2,
      factionRunemark,
      subfactionRunemark,
      deploymentRunemark,
      move,
      wounds,
      toughness,
      pointCost,
      weapon1,
      weapon2,
      tagRunemarks,
    } = fighterData;

    // Set default values for the checkboxes
    const subfactionCheckbox = document.getElementById('subfaction-runemarks/none/blank.gif');
    const deploymentCheckbox = document.getElementById('checkbox-assets/img/blank2.gif');

    const showSubfactionRunemark = subfactionCheckbox.checked;
    const showDeploymentRunemark = deploymentCheckbox.checked;

    // These are the texts to overlay
    drawFighterName(fighterName);
    drawFighterName2(fighterName2);
    if(!document.getElementById("removeFaction").checked){
        drawFactionRunemark(factionRunemark);
    }
    drawBorder();

    // Draw subfaction runemark if enabled
    if (!(document.getElementById('subfaction-runemarks/none/blank.gif').checked)
        && fighterData.subfactionRunemark != null
        && !document.getElementById("bladebornRunemark").checked
        ) {
        drawSubfactionRunemark(subfactionRunemark);
    }

    // Draw deployment runemark if enabled
    if (!(document.getElementById('checkbox-assets/img/blank2.gif').checked) && fighterData.deploymentRunemark != null) {
        drawDeploymentRunemark(fighterData.deploymentRunemark);
    }
    drawMove(move);
    drawWounds(wounds);
    drawToughness(toughness);
    if(!document.getElementById("removeCost").checked){
        drawPointCost(pointCost);
    }
    // Determine which weapon(s) to draw and their positions
    if (weapon1.enabled && weapon2.enabled) {
      drawWeapon(weapon2, { x: 68, y: 520 }); // Default was x:29, y:397
      drawWeapon(weapon1, { x: 68, y: 640 }); // Default was x:29, y:564
    } else if (weapon1.enabled) {
      drawWeapon(weapon1, { x: 68, y: 550 }); // Default was x:29, y:463
    } else if (weapon2.enabled) {
      drawWeapon(weapon2, { x: 68, y: 550 }); // Default was x:29, y:463
    }

    if (!(document.getElementById('subfaction-runemarks/none/blank.gif').checked)
          && fighterData.subfactionRunemark != null
          && document.getElementById("bladebornRunemark").checked
          ) {
        blackRunemark = subfactionRunemark.replace('runemarks/white/', 'runemarks/black/');
        tagRunemarks.unshift(blackRunemark);
    }

    // Draw tag runemarks
    for (let i = 0; i < tagRunemarks.length; i++) {
      drawTagRunemark(i, tagRunemarks[i]);
    }
  }


async function writeControls(fighterData) {
    //setName("Warcry_Fighter_Card"); // Always default, trying to move away from this

    // here we check for base64 loaded image and convert it back to imageUrl
    if (fighterData.base64Image) {
        // first convert to blob
        const dataToBlob = async (imageData) => {
            return await (await fetch(imageData)).blob();
        };
        const blob = await dataToBlob(fighterData.base64Image);
        // then create URL object
        fighterData.imageUrl = URL.createObjectURL(blob);
        // Now that's saved, clear out the base64 so we don't reassign
        fighterData.base64Image = null;
    }

    if (fighterData.base64CustomBackground) {
        // first convert to blob
        const dataToBlob = async (imageData) => {
            return await (await fetch(imageData)).blob();
        };
        const blob = await dataToBlob(fighterData.base64CustomBackground);
        // then create URL object
        fighterData.customBackgroundUrl = URL.createObjectURL(blob);
        // Now that's saved, clear out the base64 so we don't reassign
        fighterData.base64CustomBackground = null;
    }

    setModelImage(fighterData.imageUrl);
    setModelImageProperties(fighterData.imageProperties);
    setCustomBackground(fighterData.customBackgroundUrl);
    setCustomBackgroundProperties(fighterData.customBackgroundProperties);
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

    document.getElementById("saveName").value = fighterData.fighterName + " " + fighterData.fighterName2;

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
    document.getElementById('bg-14').checked = fighterData.bg14;
    document.getElementById('bg-15').checked = fighterData.bg15;
    document.getElementById('bg-16').checked = fighterData.bg16;
    document.getElementById('background-list').value = fighterData.bgselected;

    // render the updated info
    render(fighterData);
    updateStats();
}

function defaultFighterData() {
    var fighterData = new Object;
    fighterData.name = "Warcry_Fighter_Card";
    fighterData.imageUrl = null;
    fighterData.imageProperties = getDefaultModelImageProperties();
    fighterData.base64Image = null;
    fighterData.customBackgroundUrl = null;
    fighterData.customBackgroundProperties = getDefaultModelImageProperties();
    fighterData.base64CustomBackground = null;
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
    fighterData.bg14 = false;
    fighterData.bg15 = false;
    fighterData.bg16 = false;
    fighterData.bgselected = "bg-11";

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

    var data = loadFighterData(latestFighterName);

    if (data) {
        console.log("Loaded data:");
        console.log(data);
    }
    else {
        console.log("Failed to load data - loading default");
        data = defaultFighterData();
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

function getLatestFighterDataName() {
    return "latestFighterData";
}

window.onload = function () {
    var fighterData = loadLatestFighterData();
    writeControls(fighterData);
    refreshSaveSlots();

    getFighterList()
        // log response or catch error of fetch promise
        .then((data) => updateFighterListDropdown(data))

        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);

        var id = urlParams.get('id');
        var fighter = urlParams.get('fighter');
        var warband = urlParams.get('warband');

        if (id && id.trim() !== '') {
            loadFighterById(id);
        } else if (fighter && fighter.trim() !== '' && validateInput(warband)) {
            loadFighterByName(fighter, warband);
        } else {
            console.log("Invalid input parameters.");
        }
    updateStats();
}

function validateInput(input) {
    // Only allow letters, spaces, and hyphens
    var regex = /^[a-zA-Z\s:-]+$/;
    return regex.test(input);
}

onAnyChange = function () {
    var fighterData = readControls();
    render(fighterData);
    saveLatestFighterData();
    updateStats();
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

function onWeaponMinRangeChanged(minRangeInput) {
    var maxRange = $(minRangeInput.parentNode).find(".form-control[name='rangeMax']")[0];
    if (maxRange) {
        maxRange.value = Math.max(minRangeInput.value, maxRange.value);
        onAnyChange();
    }
    onAnyChange();
}

function onWeaponMaxRangeChanged(maxRangeInput) {
    var minRange = $(maxRangeInput.parentNode).find(".form-control[name='rangeMin']")[0];
    if (minRange) {
        minRange.value = Math.min(minRange.value, maxRangeInput.value);
        onAnyChange();
    }
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
    window.localStorage.removeItem("fighterDataMap");
    window.localStorage.removeItem("latestFighterName");

    location.reload();
    return false;
}

function resetToDefault() {
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

async function onExportToFile() {
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
    var exportObj = JSON.stringify(data, ['name', 'imageUrl',
        'imageProperties', 'offsetX', 'offsetY', 'scalePercent',
        'factionRunemark', 'subfactionRunemark', 'deploymentRunemark', 'fighterName', 'fighterName2',
        'toughness', 'wounds', 'move', 'pointCost', 'tagRunemarks',
        'weapon1', 'attacks', 'damageBase', 'damageCrit',
        'enabled', 'rangeMax', 'rangeMin', 'runemark', 'strength',
        'weapon2', 'attacks', 'damageBase', 'damageCrit',
        'enabled', 'rangeMax', 'rangeMin', 'runemark', 'strength',
        'bg01', 'bg02', 'bg03', 'bg04', 'bg05', 'bg06', 'bg07', 'bg08', 'bg09', 'bg10',
        'bg11','bg12','bg13', 'bg14', 'bg15', 'bg16', 'bgselected',
        'customBackgroundUrl', 'customBackgroundProperties','customBackgroundOffsetX',
        'customBackgroundOffsetY', 'customBackgroundScalePercent',
        'base64CustomBackground', 'base64Image'], 4);

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    file_name = "warcry_fighter_" + data.fighterName.replace(/ /g, "_").trim();

    if (!data.fighterName2.trim()) {
        file_name = file_name + ".json";
    } else {
        file_name = file_name + "_" + data.fighterName2.replace(/ /g, "_").trim() + ".json";
    }

    downloadAnchorNode.setAttribute("download", file_name);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function onExportToImage() {
    data = readControls();
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    file_name = "warcry_fighter_" + data.fighterName.replace(/ /g, "_");
    if (data.fighterName2 == "" || data.fighterName2 == " ") {
        file_name = file_name + ".png";
    } else {
        file_name = file_name +  "_" + data.fighterName2.replace(/ /g, "_") + ".png";
    }
    element.setAttribute("download", file_name);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


function onExportToImageNoBorder() {
    let data = readControls();
    data.removeBorder = true;
  
    let fileName = "warcry_fighter_" + data.fighterName.replace(/ /g, "_");
    if (data.fighterName2 == "" || data.fighterName2 == " ") {
        fileName = fileName + "_no_border.png";
    } else {
        fileName = fileName +  "_" + data.fighterName2.replace(/ /g, "_") + "_no_border.png";
    }  
    render(data).then(function() {
      let imageData = getContext().getImageData(0, 0, getCanvas().width, getCanvas().height);
      let tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = 1122;
      tmpCanvas.height = 822;
      document.body.appendChild(tmpCanvas);
      let tmpContext = tmpCanvas.getContext('2d');
      tmpContext.putImageData(imageData, 0, 0);
      downloadImageData(tmpCanvas, fileName);
      document.body.removeChild(tmpCanvas);
      render(readControls());
    });
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

        // Check if fighterData.bgselected value already exists
        if (!json.bgselected) {
        // Iterate through each bg option in fighterData
        for (const prop in json) {
            if (prop.startsWith('bg') && json[prop]) {
            bgSelectedValue = prop.replace('bg', 'bg-');
            break;
            }
        }

        // Update fighterData.bgselected only if a value is found
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



async function getFighterList(){
    // await response of fetch call
    let response = await fetch("https://krisling049.github.io/warcry_data/fighters.json");
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
        // Sort the data array by warband then name
        const sortedData = data.sort((a, b) => {
            if (a.warband === b.warband) {
            return a.name.localeCompare(b.name);
            } else {
            return a.warband.localeCompare(b.warband);
            }
        });
    return sortedData;
}


function updateFighterListDropdown(data){

    // Sort the data array by warband then name
    const sortedData = data.sort((a, b) => {
        if (a.warband === b.warband) {
        return a.name.localeCompare(b.name);
        } else {
        return a.warband.localeCompare(b.warband);
        }
    });

    $.each(sortedData, function(i, option) {
        $('#sel').append($('<option/>').attr("value", option.id).text(option.warband + " - " + option.name));
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



async function loadFighterById(id) {

    // I want the runemark ticked
    document.getElementById("runemark-names").checked = true;

    // Load the JSON file
    fetch("https://krisling049.github.io/warcry_data/fighters.json")
      .then(response => response.json())
      .then(data => {
        // Find the fighter with the matching id
        const fighter = data.find(f => f._id === id);

        // Check if fighter is found
        if (fighter) {
          // Call saveFighterFromList with the fighter as input
          saveFighterFromList(fighter);
        } else {
          console.log("Fighter not found.");
        }
      })
      .catch(error => {
        console.log("Error loading fighters:", error);
      });
  }


async function loadFighterByName(name, warband) {
    let response = await fetch("https://krisling049.github.io/warcry_data/fighters.jsonn");
    let data = await response.json();
    let filteredData = data.filter((fighter) => {
      let fullName = fighter.name + " " + fighter.subtitle;
      if (warband) {
        return (
          fullName.toLowerCase().includes(name.toLowerCase()) &&
          fighter.warband.toLowerCase().includes(warband.toLowerCase())
        );
      } else {
        return fullName.toLowerCase().includes(name.toLowerCase());
      }
    });

    if (filteredData.length == 1) {
      saveFighterFromList(filteredData[0]);
    } else if (filteredData.length > 1) {
      // Fuzzy match
      console.log("Fuzzy matching fighter.");
      let options = {
        includeScore: true,
        keys: ["name", "subtitle"],
        threshold: 0.4, // adjust the threshold as needed
      };
      let fuse = new Fuse(filteredData, options);
      let result = fuse.search(name);
      if (result.length > 0) {
        saveFighterFromList(result[0].item);
      } else {
        console.log("No matching fighter found.");
      }
    } else {
      console.log("No matching fighter found.");
    }
    updateStats();
  }



function saveFighterFromList(fighter){

    var oldData = readControls();
    console.log(fighter);

    var fighterData = new Object;
    fighterData.name = "Warcry_Fighter_Card";
    fighterData.imageUrl = oldData.imageUrl;
    fighterData.imageProperties = oldData.imageProperties;
    fighterData.customBackgroundUrl = oldData.customBackgroundUrl;
    fighterData.customBackgroundProperties = oldData.customBackgroundProperties;
    fighterData.base64Image = null;
    fighterData.base64CustomBackground = null;
    fighterData.factionRunemark = getFactionRunemark(fighter.warband);

    fighterName = fighter.name;
    fighterName2 = " ";

    if (fighter.name.length > 20) {
      const lastSpaceIndex = fighter.name.lastIndexOf(" ", 20);
      if (lastSpaceIndex !== -1) {
        fighterName = fighter.name.substring(0, lastSpaceIndex);
        fighterName2 = fighter.name.substring(lastSpaceIndex + 1);
      }
    }

    fighterData.fighterName = fighterName;
    fighterData.fighterName2 = fighterName2;
    fighterData.toughness = fighter.toughness;
    fighterData.wounds = fighter.wounds;
    fighterData.move = fighter.movement;
    fighterData.pointCost = fighter.points;
    fighterData.tagRunemarks = getRunemarks(fighter.runemarks);
    fighterData.weapon1 = getDefaultWeaponData1();
    fighterData.weapon1.enabled = true;
    fighterData.weapon1.rangeMin = fighter.weapons[0].min_range;
    fighterData.weapon1.rangeMax = fighter.weapons[0].max_range;
    fighterData.weapon1.attacks = fighter.weapons[0].attacks;;
    fighterData.weapon1.strength = fighter.weapons[0].strength;
    fighterData.weapon1.damageBase = fighter.weapons[0].dmg_hit;
    fighterData.weapon1.damageCrit = fighter.weapons[0].dmg_crit;
    fighterData.weapon1.runemark = getWeaponRunemark(fighter.weapons[0].runemark);

    fighterData.weapon2 = getDefaultWeaponData2();
    if (fighter.weapons && fighter.weapons.length > 1 && fighter.weapons[1].hasOwnProperty("attacks")) {
        fighterData.weapon2.enabled = true;
        fighterData.weapon2.rangeMin = fighter.weapons[1].min_range;
        fighterData.weapon2.rangeMax = fighter.weapons[1].max_range;
        fighterData.weapon2.attacks = fighter.weapons[1].attacks;
        fighterData.weapon2.strength = fighter.weapons[1].strength;
        fighterData.weapon2.damageBase = fighter.weapons[1].dmg_hit;
        fighterData.weapon2.damageCrit = fighter.weapons[1].dmg_crit;
        fighterData.weapon2.runemark = getWeaponRunemark(fighter.weapons[1].runemark);
    } else {
        fighterData.weapon2.enabled = false;
    }
    fighterData.subfactionRunemark = getBladebornRunemark(fighter.subfaction);
    if (fighter.name == 'Grombrindal, the White Dwarf') {
        fighterData.subfactionRunemark = "runemarks/white/bladeborn-grombrindal.svg";
      }
    fighterData.deploymentRunemark = null;
    fighterData.bg01 = oldData.bg01;
    fighterData.bg02 = oldData.bg02;
    fighterData.bg03 = oldData.bg03;
    fighterData.bg04 = oldData.bg04;
    fighterData.bg05 = oldData.bg05;
    fighterData.bg06 = oldData.bg06;
    fighterData.bg07 = oldData.bg07;
    fighterData.bg08 = oldData.bg08;
    fighterData.bg09 = oldData.bg09;
    fighterData.bg10 = oldData.bg10;
    fighterData.bg11 = oldData.bg11;
    fighterData.bg12 = oldData.bg12;
    fighterData.bg13 = oldData.bg13;
    fighterData.bg14 = oldData.bg14;
    fighterData.bg15 = oldData.bg15;
    fighterData.bg16 = oldData.bg16;
    fighterData.bgselected = oldData.bgselected;
    writeControls(fighterData);
    updateStats();
}

function getFactionRunemark(warband){
    if(warband == "Beasts of Chaos") {runemark = "runemarks/white/factions-chaos-beasts-of-chaos.svg"}
    else if(warband == "Chaos Legionnaires") {runemark = "runemarks/white/factions-chaos-chaos-legionnaires.svg";}
    else if(warband == "Corvus Cabal") {runemark = "runemarks/white/factions-chaos-corvus-cabal.svg";}
    else if(warband == "Cypher Lords") {runemark = "runemarks/white/factions-chaos-cypher-lords.svg";}
    else if(warband == "Darkoath Savagers") {runemark = "runemarks/white/factions-chaos-darkoath-savagers.svg";}
    else if(warband == "Chaos Everchosen") {runemark = "runemarks/white/factions-chaos-everchosen.svg";}
    else if(warband == "Horns of Hashut") {runemark = "runemarks/white/factions-chaos-horns-of-hashut.svg";}
    else if(warband == "Iron Golems") {runemark = "runemarks/white/factions-chaos-iron-golems.svg";}
    else if(warband == "Jade Obelisk") {runemark = "runemarks/white/factions-chaos-jade-obelisk.svg";}
    else if(warband == "Blades of Khorne: Bloodbound") {runemark = "runemarks/white/factions-chaos-khorne-bloodbound.svg";}
    else if(warband == "Blades of Khorne: Daemons") {runemark = "runemarks/white/factions-chaos-khorne-daemons.svg";}
    else if(warband == "Daemons of Khorne") {runemark = "runemarks/white/factions-chaos-khorne-daemons.svg";}
    else if(warband == "Maggotkin of Nurgle: Daemons") {runemark = "runemarks/white/factions-chaos-nurgle-daemons.svg";}
    else if(warband == "Maggotkin of Nurgle: Rotbringers") {runemark = "runemarks/white/factions-chaos-nurgle-rotbringers.svg";}
    else if(warband == "Rotmire Creed") {runemark = "runemarks/white/factions-chaos-rotmire-creed.svg";}
    else if(warband == "Scions of the Flame") {runemark = "runemarks/white/factions-chaos-scions-of-the-flame.svg";}
    else if(warband == "Skaven") {runemark = "runemarks/white/factions-chaos-skaven.svg";}
    else if(warband == "Hedonites of Slaanesh: Daemons") {runemark = "runemarks/white/factions-chaos-slaanesh-daemons.svg";}
    else if(warband == "Hedonites of Slaanesh: Sybarites") {runemark = "runemarks/white/factions-chaos-slaanesh-sybarites.svg";}
    else if(warband == "Slaves to Darkness") {runemark = "runemarks/white/factions-chaos-slaves-to-darkness.svg";}
    else if(warband == "Spire Tyrants") {runemark = "runemarks/white/factions-chaos-spire-tyrants.svg";}
    else if(warband == "Splintered Fang") {runemark = "runemarks/white/factions-chaos-splintered-fang.svg";}
    else if(warband == "Tarantulos Brood") {runemark = "runemarks/white/factions-chaos-tarantulos-brood.svg";}
    else if(warband == "The Unmade") {runemark = "runemarks/white/factions-chaos-the-unmade.svg";}
    else if(warband == "Disciples of Tzeentch: Arcanites") {runemark = "runemarks/white/factions-chaos-tzeentch-arcanites.svg";}
    else if(warband == "Disciples of Tzeentch: Daemons") {runemark = "runemarks/white/factions-chaos-tzeentch-daemons.svg";}
    else if(warband == "Untamed Beasts") {runemark = "runemarks/white/factions-chaos-untamed-beasts.svg";}
    else if(warband == "Flesh-eater Courts") {runemark = "runemarks/white/factions-death-flesh-eater-courts.svg";}
    else if(warband == "Legions of Nagash") {runemark = "runemarks/white/factions-death-legions-of-nagash.svg";}
    else if(warband == "Nighthaunt") {runemark = "runemarks/white/factions-death-nighthaunt.svg";}
    else if(warband == "Ossiarch Bonereapers") {runemark = "runemarks/white/factions-death-ossiarch-bonereapers.svg";}
    else if(warband == "Royal Beastflayers") {runemark = "runemarks/white/factions-death-royal-beastflayers.svg";}
    else if(warband == "Soulblight Gravelords") {runemark = "runemarks/white/factions-death-soulblight-gravelords.svg";}
    else if(warband == "Bonesplitterz") {runemark = "runemarks/white/factions-destruction-bonesplitterz.svg";}
    else if(warband == "Gloomspite Gitz") {runemark = "runemarks/white/factions-destruction-gloomspite-gitz.svg";}
    else if(warband == "Ironjawz") {runemark = "runemarks/white/factions-destruction-ironjawz.svg";}
    else if(warband == "Kruleboyz") {runemark = "runemarks/white/factions-destruction-kruleboyz.svg";}
    else if(warband == "Ogor Mawtribes") {runemark = "runemarks/white/factions-destruction-ogor-mawtribes.svg";}
    else if(warband == "chaos") {runemark = "runemarks/white/grand-alliance-chaos.svg";}
    else if(warband == "destruction") {runemark = "runemarks/white/grand-alliance-destruction.svg";}
    else if(warband == "death") {runemark = "runemarks/white/grand-alliance-death.svg";}
    else if(warband == "Cities of Sigmar") {runemark = "runemarks/white/factions-order-cities-of-sigmar.svg";}
    else if(warband == "Daughters of Khaine") {runemark = "runemarks/white/factions-order-daughters-of-khaine.svg";}
    else if(warband == "Fyreslayers") {runemark = "runemarks/white/factions-order-fyreslayers.svg";}
    else if(warband == "Hunters of Huanchi") {runemark = "runemarks/white/factions-order-hunters-of-huanchi.svg";}
    else if(warband == "Idoneth Deepkin") {runemark = "runemarks/white/factions-order-idoneth-deepkin.svg";}
    else if(warband == "Khainite Shadowstalkers") {runemark = "runemarks/white/factions-order-khainite-shadowstalkers.svg";}
    else if(warband == "Kharadron Overlords") {runemark = "runemarks/white/factions-order-kharadron-overlords.svg";}
    else if(warband == "Lumineth Realm-lords") {runemark = "runemarks/white/factions-order-lumineth-realmlords.svg";}
    else if(warband == "Seraphon") {runemark = "runemarks/white/factions-order-seraphon.svg";}
    else if(warband == "Stormcast Eternals Sacrosanct Chamber") {runemark = "runemarks/white/factions-order-stormcast-eternals-sacrosanct.svg";}
    else if(warband == "Stormcast Eternals Thunderstrike Stormcast") {runemark = "runemarks/white/factions-order-stormcast-eternals-thunderstrike.svg";}
    else if(warband == "Stormcast Eternals Vanguard Auxiliary Chamber") {runemark = "runemarks/white/factions-order-stormcast-eternals-vanguard.svg";}
    else if(warband == "Stormcast Eternals Warrior Chamber") {runemark = "runemarks/white/factions-order-stormcast-eternals-warrior.svg";}
    else if(warband == "Stormcast Eternals Questor Soulsworn") {runemark = "runemarks/white/factions-order-stormcast-eternals-questor-soulsworn.svg";}
    else if(warband == "Sylvaneth") {runemark = "runemarks/white/factions-order-sylvaneth.svg";}
    else if(warband == "Askurgan Trueblades") {runemark = "runemarks/white/factions-death-askurgan-trueblades.svg";}
    else if(warband == "Claws of Karanak") {runemark = "runemarks/white/factions-chaos-claws-of-karanak.svg";}
    else if(warband == "Wildercorps Hunters") {runemark = "runemarks/white/factions-order-wildercorps-hunters.svg";}
    else if(warband == "Gorger Mawpack") {runemark = "runemarks/white/factions-destruction-gorgor-mawpack.svg";}
    else if(warband == "Kruleboyz Monsta-killaz") {runemark = "runemarks/white/factions-destruction-monsta-killaz.svg";}
    else if(warband == "Vulkyn Flameseekers") {runemark = "runemarks/white/factions-order-vulkyn-flameseekers.svg";}
    else if(warband == "Blacktalons") {runemark = "runemarks/white/factions-order-blacktalons.svg";}
    else if(warband == "Order of Azyr") {runemark = "runemarks/white/factions-order-the-order-of-azyr.svg";}
    else if(warband == "Cities of Sigmar: Castelite Hosts") {runemark = "runemarks/white/factions-order-cities-of-sigmar-castelite-hosts.svg";}
    else if(warband == "Cities of Sigmar: Dispossessed") {runemark = "runemarks/white/factions-order-cities-of-sigmar-dispossessed.svg";}
    else if(warband == "Cities of Sigmar: Darkling Covens") {runemark = "runemarks/white/factions-order-cities-of-sigmar-darkling-covens.svg";}
    else if(warband == "Ulfenkarn") {runemark = "runemarks/white/factions-death-ulfenkarn.svg";}
    else if(warband == "Ydrilan Riverblades") {runemark = "runemarks/white/factions-order-ydrilan-riverblades.svg";}
    else if(warband == "Pyregheists") {runemark = "runemarks/white/factions-death-pyregheists.svg";}
    else if(warband == "order") {runemark = "runemarks/white/grand-alliance-order.svg";}
    else if(warband == "Twistweald") {runemark = "runemarks/white/factions-order-twistweald.svg";}
    else if(warband == "Teratic Cohort") {runemark = "runemarks/white/factions-death-teratic_cohort.svg";}
    else if(warband == "Darkoath") {runemark = "runemarks/white/factions-chaos-darkoath.svg";}
    else if(warband == "Stormcast Eternals Ruination Chamber") {runemark = "runemarks/white/factions-order-stormcast-eternals-ruination.svg";}
    else if(warband == "Helsmiths of Hashut") {runemark = "runemarks/white/factions-chaos-helsmiths-of-hashut.svg";}



    else { runemark = "runemarks/white/factions-chaos-everchosen.svg";}
    console.log(warband)
    console.log(runemark)

    return runemark;
}

function getRunemarks(runemarks){
    tagRunemarks = new Array;

    if (runemarks.includes("agile")){
        tagRunemarks.push('runemarks/black/fighters-agile.svg');
        }
    if (runemarks.includes("fly")){
       tagRunemarks.push('runemarks/black/fighters-fly.svg');
        }
    if (runemarks.includes("beast")){
        tagRunemarks.push('runemarks/black/fighters-beast.svg');
    }
    if (runemarks.includes("berserker")){
        tagRunemarks.push('runemarks/black/fighters-berserker.svg');
        }
    if (runemarks.includes("brute")){
        tagRunemarks.push('runemarks/black/fighters-brute.svg');
    }
    if (runemarks.includes("bulwark")){
        tagRunemarks.push('runemarks/black/fighters-bulwark.svg');
    }
    if (runemarks.includes("champion")){
        tagRunemarks.push('runemarks/black/fighters-champion.svg');
    }
    if (runemarks.includes("sentience")){
        tagRunemarks.push('runemarks/black/fighters-sentience.svg');
    }
    if (runemarks.includes("destroyer")){
        tagRunemarks.push('runemarks/black/fighters-destroyer.svg');
    }
    if (runemarks.includes("elite")){
        tagRunemarks.push('runemarks/black/fighters-elite.svg');
    }
    if (runemarks.includes("icon-bearer")){
        tagRunemarks.push('runemarks/black/fighters-icon-bearer.svg');
    }
    if (runemarks.includes("mount")){
        tagRunemarks.push('runemarks/black/fighters-mount.svg');
    }
    if (runemarks.includes("hero")){
        tagRunemarks.push('runemarks/black/fighters-leader.svg');
    }
    if (runemarks.includes("mystic")){
        tagRunemarks.push('runemarks/black/fighters-mystic.svg');
    }
    if (runemarks.includes("minion")){
        tagRunemarks.push('runemarks/black/fighters-minion.svg');
    }
    if (runemarks.includes("scout")){
        tagRunemarks.push('runemarks/black/fighters-scout.svg');
    }
    if (runemarks.includes("trapper")){
        tagRunemarks.push('runemarks/black/fighters-trapper.svg');
    }
    if (runemarks.includes("warrior")){
        tagRunemarks.push('runemarks/black/fighters-warrior.svg');
    }
    if (runemarks.includes("monster")){
        tagRunemarks.push('runemarks/black/fighters-gargantuan.svg');
    }
    if (runemarks.includes("thrall")){
        tagRunemarks.push('runemarks/black/fighters-thrall.svg');
    }
    if (runemarks.includes("ally")){
        tagRunemarks.push('runemarks/black/fighters-ally.svg');
    }
    if (runemarks.includes("ferocious")){
        tagRunemarks.push('runemarks/black/fighters-ferocious.svg');
    }
    if (runemarks.includes("frenzied")){
        tagRunemarks.push('runemarks/black/fighters-frenzied.svg');
    }
    if (runemarks.includes("priest")){
        tagRunemarks.push('runemarks/black/fighters-priest.svg');
    }
    if (runemarks.includes("terrifying")){
        tagRunemarks.push('runemarks/black/fighters-terrifying.svg');
    }
    return tagRunemarks;
}


function getWeaponRunemark(weaponSymbol){
    if(weaponSymbol == "axe") {runemark = "runemarks/black/weapons-axe.svg"}
    else if(weaponSymbol == "bident") {runemark = "runemarks/black/weapons-bident.svg";}
    else if(weaponSymbol == "blast") {runemark = "runemarks/black/weapons-blast.svg";}
    else if(weaponSymbol == "claws") {runemark = "runemarks/black/weapons-claws.svg";}
    else if(weaponSymbol == "club") {runemark = "runemarks/black/weapons-club.svg";}
    else if(weaponSymbol == "dagger") {runemark = "runemarks/black/weapons-dagger.svg";}
    else if(weaponSymbol == "fangs") {runemark = "runemarks/black/weapons-fangs.svg";}
    else if(weaponSymbol == "hammer") {runemark = "runemarks/black/weapons-hammer.svg";}
    else if(weaponSymbol == "hook") {runemark = "runemarks/black/weapons-hook.svg";}
    else if(weaponSymbol == "mace") {runemark = "runemarks/black/weapons-mace.svg";}
    else if(weaponSymbol == "ranged") {runemark = "runemarks/black/weapons-ranged-weapon.svg";}
    else if(weaponSymbol == "reach") {runemark = "runemarks/black/weapons-reach-weapon.svg";}
    else if(weaponSymbol == "scythe") {runemark = "runemarks/black/weapons-scythe.svg";}
    else if(weaponSymbol == "spear") {runemark = "runemarks/black/weapons-spear.svg";}
    else if(weaponSymbol == "sword") {runemark = "runemarks/black/weapons-sword.svg";}
    else if(weaponSymbol == "unarmed") {runemark = "runemarks/black/weapons-unarmed.svg";}
    else if(weaponSymbol == "pistol") {runemark = "runemarks/black/weapons-pistol.svg";}
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
    else if(bladeborn == "Skabbik's Plaguepack") {runemark = "runemarks/white/bladeborn-skabbiks.svg";}
    else if(bladeborn == "The Headmen's Curse") {runemark = "runemarks/white/bladeborn-theheadsmen.svg";}
    else if(bladeborn == "Ephilim's Pandaemonium") {runemark = "runemarks/white/bladeborn-ephilims.svg";}
    else if(bladeborn == "Domitan's Stormcoven") {runemark = "runemarks/white/bladeborn-domitans.svg";}
    else if(bladeborn == "The Shadeborn") {runemark = "runemarks/white/bladeborn-the-shadeborn.svg";}
    else if(bladeborn == "Gorechosen of Dromm") {runemark = "runemarks/white/bladeborn-gorechhosen-of-dromm.svg";}
    else if(bladeborn == "Skittershank's Clawpack") {runemark = "runemarks/white/bladeborn-skittershanks-clawpack.svg";}
    else if(bladeborn == "Thricefold Discord") {runemark = "runemarks/white/bladeborn-the-thricefold-discord.svg";}
    else if(bladeborn == "Brethren of the Bolt") {runemark = "runemarks/white/bladeborn-brethern-of-the-bolt.svg";}
    else if(bladeborn == "Cyreni's Razors") {runemark = "runemarks/white/bladeborn-cyrenis-razors.svg";}
    else if(bladeborn == "Daggok's Stab-ladz") {runemark = "runemarks/white/bladeborn-daggoks-stab-ladz.svg";}
    else if(bladeborn == "Zondara's Gravebreakers") {runemark = "runemarks/white/bladeborn-zondaras-gravebreakers.svg";}
    else if(bladeborn == "Skinnerkin") {runemark = "runemarks/white/bladeborn-the-skinnerkin.svg";}
    else if(bladeborn == "Grombrindal") {runemark = "runemarks/white/bladeborn-grombrindal.svg";}
    else if(bladeborn == "Gladitorium") {runemark = "runemarks/white/bladeborn-gladitorium.svg";}
    else if(bladeborn == "Zikkit's Tunnelpack") {runemark = "runemarks/white/bladeborn-zikkits-tunnelpack.svg";}
    else if(bladeborn == "Borgit's Beastgrabbaz") {runemark = "runemarks/white/bladeborn-borgits-beastgrabbaz.svg";}

    else runemark = null;
    return runemark;
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
    var fighterData = readControls();
    render(fighterData);
    saveLatestFighterData();
}

function getCustomBackgroundUrl() {
    var imageSelect = $("#customBackgroundUrl")[0].value;
    return imageSelect;
}

function updateStats(){
    estimatePoints();
    calculateDamage();
}

function calculateDamage() {
    var fighterData = readControls();

    var attacks = fighterData.weapon1.attacks;
    var strength = fighterData.weapon1.strength;
    var damage = fighterData.weapon1.damageBase;
    var crit = fighterData.weapon1.damageCrit;
    var name = 'Weapon 1';

    var averageDamageT3 = calculateAverageDamage(attacks, strength, damage, crit, 3);
    var averageDamageT4 = calculateAverageDamage(attacks, strength, damage, crit, 4);
    var averageDamageT5 = calculateAverageDamage(attacks, strength, damage, crit, 5);

    var resultText = `${name} - T3: ${averageDamageT3.toFixed(2)}, T4: ${averageDamageT4.toFixed(2)}, T5: ${averageDamageT5.toFixed(2)}`;

    document.getElementById('weapon1_stats').innerText = resultText;

    if(fighterData.weapon2.enabled){
        var attacks = fighterData.weapon2.attacks;
        var strength = fighterData.weapon2.strength;
        var damage = fighterData.weapon2.damageBase;
        var crit = fighterData.weapon2.damageCrit;
        var name = 'Weapon 2';

        var averageDamageT3 = calculateAverageDamage(attacks, strength, damage, crit, 3);
        var averageDamageT4 = calculateAverageDamage(attacks, strength, damage, crit, 4);
        var averageDamageT5 = calculateAverageDamage(attacks, strength, damage, crit, 5);

        var resultText = `${name} - T3: ${averageDamageT3.toFixed(2)}, T4: ${averageDamageT4.toFixed(2)}, T5: ${averageDamageT5.toFixed(2)}`;

        document.getElementById('weapon2_stats').innerText = resultText;
    } else {
        var resultText = ' ';

        document.getElementById('weapon2_stats').innerText = resultText;
    }
}

function calculateAverageDamage(attacks, strength, damage, crit, toughness) {
    var averageDamage = 0;
    var hitProbability = 0;
    var critProbability = 1 / 6;

    if (strength > toughness) {
        hitProbability = 3 / 6;
    } else if (strength == toughness) {
        hitProbability = 2 / 6;
    } else if (strength < toughness) {
        hitProbability = 1 / 6;
    }

    averageDamage += attacks * hitProbability * damage;
    averageDamage += attacks * critProbability * crit;

    return averageDamage;
}


function estimatePoints() {
    var fighterData = readControls();
    var adjustment = document.getElementById("adjustment").value;
    var averageDamage1T4 = calculateAverageDamage(fighterData.weapon1.attacks, fighterData.weapon1.strength,
                                                fighterData.weapon1.damageBase, fighterData.weapon1.damageCrit, 4);
    var averageDamage2T4 = calculateAverageDamage(fighterData.weapon2.attacks, fighterData.weapon2.strength,
                                                fighterData.weapon2.damageBase, fighterData.weapon2.damageCrit, 4);

    var pointsPerDamage = 11.36 // 25/2;
    var pointsPerWound = 3.67 // 25/6;

    dualweapons_percentage = 0;
    if (fighterData.weapon1.enabled && fighterData.weapon2.enabled){
        dualweapons_percentage = 10;
    }

    maxRangePercentageMap = {
        1:0,
        2:5,
        3:7,
        4:13,
        5:20,
        6:24,
        7:25,
        8:35,
        9:38,
        10:41,
        11:44,
        12:46,
        13:49,
        14:52,
        15:55,
        16:58,
        17:61,
        18:64,
        19:67,
        20:70,
        21:73,
        22:74,
        23:78,
        24:80
    };

    weapon1range_percentage = maxRangePercentageMap[fighterData.weapon1.rangeMax] ?? 0;
    weapon2range_percentage = maxRangePercentageMap[fighterData.weapon2.rangeMax] ?? 0;

    minRangePercentageMap = {
        0: 0,
        3: -5,
        6: -10
    };
    
    minRange1_percentage = minRangePercentageMap[fighterData.weapon1.rangeMin] ?? 0;
    minRange2_percentage = minRangePercentageMap[fighterData.weapon2.rangeMin] ?? 0;


    strengthPercentageMap = {
        2: -24,
        3: -11,
        4: 0,
        5: 9,
        6: 18
    };

    strength1_percentage = strengthPercentageMap[fighterData.weapon1.strength] ?? 0;
    strength2_percentage = strengthPercentageMap[fighterData.weapon2.strength] ?? 0;
    
    weapon1points = averageDamage1T4 * pointsPerDamage *  (1 + (weapon1range_percentage+minRange1_percentage+strength1_percentage) / 100);
    weapon2points = averageDamage2T4 * pointsPerDamage *  (1 + (weapon2range_percentage+minRange2_percentage+strength2_percentage) / 100);

    primaryWeaponDamage1 = averageDamage1T4;
    weaponrange_percentage1 = weapon1range_percentage + minRange1_percentage
    primaryWeaponDamage2 = averageDamage2T4;
    weaponrange_percentage2 = weapon2range_percentage + minRange2_percentage

    // Calculate the adjustment percentage based on the difference from the baseline
    percentage = 0;

    movePercentageMap = {
        1: -12,
        2: -12,
        3: -12,
        4: 0,
        5: 10,
        6: 18,
        7: 24,
        8: 31,
        9: 38,
        10: 38,
        11: 40,
        12: 45
    };
    
    move_percentage = movePercentageMap[fighterData.move] ?? 0;

    toughnessPercentageMap = {
        1: -12,
        2: -10,
        3: -7.4,
        4: 0,
        5: 7.5,
        6: 9,
        7: 15,
    };
    
    toughness_percentage = toughnessPercentageMap[fighterData.toughness] ?? 0;

    fly_percentage = 0;
    if(fighterData.tagRunemarks.includes("runemarks/black/fighters-fly.svg")){
        fly_percentage = 10;
    }

    percentage += move_percentage;
    percentage += toughness_percentage;
    percentage += fly_percentage;

    fighter_percentage = percentage;

    percentage += parseInt(adjustment);
    percentage += dualweapons_percentage;

    // here we split to account for both weapons
    percentage1 = percentage;
    percentage1 += weaponrange_percentage1;
    percentage1 += strength1_percentage;
    percentage2 = percentage;
    percentage2 += weaponrange_percentage2;
    percentage2 += strength2_percentage;
    // round it out
    percentage1 = Math.round(percentage1)
    percentage2 = Math.round(percentage2)
    
    points = 0;
    points_for_wounds = pointsPerWound * fighterData.wounds;
    points_for_damage1 = pointsPerDamage * primaryWeaponDamage1;
    points_for_damage2 = pointsPerDamage * primaryWeaponDamage2;

    basepoints1 = Math.round((points_for_wounds + points_for_damage1));
    basepoints2 = Math.round((points_for_wounds + points_for_damage2));
    

    // Apply the adjustment to the points value
    points1 = basepoints1 * (1 + percentage1 / 100);
    points2 = basepoints2 * (1 + percentage2 / 100);

    if(points1 > points2) {
        basepoints = basepoints1
        points = points1
        points_for_damage = points_for_damage1
        percentage = percentage1
        weaponrange_percentage = weaponrange_percentage1
    } else {
        basepoints = basepoints2
        points = points2
        points_for_damage = points_for_damage2
        percentage = percentage2
        weaponrange_percentage = weaponrange_percentage2
    }

    points = Math.round(points / 5) * 5;
    fighter_points = Math.round(points_for_wounds * (1 + fighter_percentage / 100) /5)*5;
    weapon1_points = Math.round(averageDamage1T4 * pointsPerDamage * (1 + (weaponrange_percentage1)/ 100)/5)*5
    weapon2_points = Math.round(averageDamage2T4 * pointsPerDamage * (1 + (weaponrange_percentage2) / 100)/5)*5


    var resultText = `Estimated points: ${points}
    - Core Stats : ${fighter_points}
    - Weapon 1 : ${weapon1_points}`
    if(fighterData.weapon2.enabled){
        resultText = resultText + 
   
    `
    - Weapon 2 : ${weapon2_points}`
    }
    resultText = resultText +  
     `

     
        `;
    var resultTextDetails = `Base ${basepoints} points with ${percentage}% adjustment:

        Core Fighter:
        - Base from Wounds : ${Math.round(points_for_wounds)} pts
            - Movement : ${move_percentage}%
            - Toughness : ${toughness_percentage}%
            - Fly : ${fly_percentage}%
            - Manual Adjustment : ${parseInt(adjustment)}%
        - Adjusted Core : ${Math.round(points_for_wounds * (1 + fighter_percentage / 100))} pts

        Weapons
        - Base from Weapon1 : ${Math.round(averageDamage1T4 * pointsPerDamage)} pts
            - Weapon 1 Strength: ${strength1_percentage}%
            - Weapon Range: ${weaponrange_percentage1}%
        - Adjusted Weapon 1 : ${Math.round(averageDamage1T4 * pointsPerDamage * (1 + weaponrange_percentage1 / 100))} pts

        - Base from Weapon2 : ${Math.round(averageDamage2T4 * pointsPerDamage)} pts
            - Weapon 2 Strength: ${strength2_percentage}%
            - Weapon 2 Range: ${weaponrange_percentage2}%
        - Adjusted Weapon 2 : ${Math.round(averageDamage2T4 * pointsPerDamage * (1 + weaponrange_percentage2 / 100))} pts

        - Dual Weapons : ${dualweapons_percentage}%


        `;
    document.getElementById('estimated_points').innerText = resultText;
    document.getElementById('estimated_points_details').innerText = resultTextDetails;

}



// Moving over from the fighter updates


function onfighterNameChange() {
    document.getElementById("saveName").value = document.getElementById("fighterName").value;
    onAnyChange();
  }
  
  function onSlotListChange() {
    let selectedValue = document.getElementById("slotList").value;
    if (selectedValue) {
      document.getElementById("saveName").value = selectedValue;
    }
  }

  
function onSaveSlot() {
    let name = document.getElementById("saveName").value || generateName();
    let data = readControls();
    writefighterData(name, data);
    updateSlotList();
    document.getElementById("slotList").value = name;
  }


function onLoadSlot() {
    let slotList = document.getElementById("slotList");
    let selectedName = slotList.value;
    if (!selectedName) {
      return;
    }
  
    let data = readControls(selectedName);
    if (!data) {
      return;
    }
  
    writeControls(data);
    document.getElementById("saveName").value = selectedName;
  }
  
  function onDeleteSlot() {
    let slotList = document.getElementById("slotList");
    let selectedName = slotList.value;
    if (!selectedName) {
      return;
    }
  
    writefighterData(selectedName, null);
    updateSlotList();
  }
  
  function updateSlotList() {
    let slotList = document.getElementById("slotList");
    let shouldContain = enumeratefighterSlots(false);
    let contains = Array.from(slotList.options).map(o => o.value);
  
    Array.from(slotList.options).forEach(option => {
      if (!shouldContain.includes(option.value)) {
        slotList.removeChild(option);
      }
    });
    shouldContain.forEach(value => {
      if (!contains.includes(value)) {
        slotList.add(new Option(value, value));
      }
    });
  }
  
  async function writefighterData(name, data) {
    let slots = readfighterSlots();
    if (data == null) {
      delete slots[name];
    } else {
      data.base64Image = await handleImageUrlFromDisk(data.imageUrl)
      data.base64CustomBackground = await handleImageUrlFromDisk(data.customBackgroundUrl)
      slots[name] = data;
    }
    window.localStorage.setItem("fighterDataSlots", JSON.stringify(slots));
  }
  
  function enumeratefighterSlots(includeDefault = false) {
    return Object.keys(readfighterSlots()).filter(x => includeDefault || x != "default");
  }
  
 
function readfighterSlots() {
    let raw = window.localStorage.getItem("fighterDataSlots");
    return raw ? JSON.parse(raw) : {};
  } 



  function commitCanvasBuffer() {
    let currentCanvas = getCanvas();
    let currentContext = currentCanvas.getContext("2d");
    let targetCanvas = document.getElementById("canvas");
    let targetContext = targetCanvas.getContext("2d");
    let imageData = currentContext.getImageData(0, 0, currentCanvas.width, currentCanvas.height);
  
    targetContext.putImageData(imageData, 0, 0);
    _canvas = targetCanvas;
    // Check if currentCanvas is a child of document.body before removing it
    if (currentCanvas.parentNode === document.body) {
        document.body.removeChild(currentCanvas);
  }
}
  

function beginCanvasBuffer() {
    let currentCanvas = getCanvas();
    let tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = currentCanvas.width;
    tmpCanvas.height = currentCanvas.height;
    tmpCanvas.style.display = "none";
    document.body.appendChild(tmpCanvas);
    _canvas = tmpCanvas;
    return currentCanvas;
  }


  function downloadImageData(canvas, fileName) {
    let element = document.createElement('a');
  
    element.setAttribute('href', canvas.toDataURL('image/png'));
  
    element.setAttribute("download", fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }