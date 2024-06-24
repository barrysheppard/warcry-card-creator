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

    cardData.cardTitle = 'Iron Golems';
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
    cardData.ability4checked = false;
    cardData.ability5checked = false;
    cardData.ability6checked = false;
    cardData.ability7checked = false;

    cardData.ability1Name = "Clashing Iron"
    cardData.ability2Name = "Spine-crushing Blow";
    cardData.ability3Name = "Lead with Strength";
    cardData.ability4Name = 'Fourth ability name';
    cardData.ability5Name = 'Fifth ability name';
    cardData.ability6Name = 'Sixth ability name';
    cardData.ability7Name = 'Seventh ability name';

    cardData.ability1Text = "A fighter can make this reaction after they are targeted by a melee attack action but before the hit rolls are made. Count up to two critical hits from that attack action as hits instead.";
    cardData.ability2Text = "Until the end of this fighter's activation, add the value of this ability to the Strength characteristic of melee attack actions made by this fighter.";
    cardData.ability3Text = "A fighter can only use this ability if an enemy fighter has been taken down by an attack action made by them this activation. This fighter makes a bonus move action or a bonus attack action.";
    cardData.ability4Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability5Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability6Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability7Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';

    cardData.tagRunemarksOne = new Array;;
    cardData.tagRunemarksTwo = new Array;
    cardData.tagRunemarksTwo.push("runemarks/black/fighters-brute.svg")
    cardData.tagRunemarksThree = new Array;
    cardData.tagRunemarksThree.push("runemarks/black/fighters-leader.svg")
    cardData.tagRunemarksFour = new Array;
    cardData.tagRunemarksFive = new Array;
    cardData.tagRunemarksSix = new Array;
    cardData.tagRunemarksSeven = new Array;

    cardData.bg01 = false;
    cardData.bg02 = false;
    cardData.bg03 = false;
    cardData.bg04 = false;
    cardData.bg05 = false;
    cardData.bg06 = false;
    cardData.bg07 = false;
    cardData.bg08 = true;
    cardData.bg09 = false;

    return cardData;
}

function drawAbility(id, pixelPosition) {

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

    // Calculate the font size based on the total characters and maxWidth
    if(document.getElementById('remove-scaling').checked){
        var fontSize = 18;
    } else {
        var fontSize = calculateFontSizeToFit(3000, 18, minFontSize = 16, name + text);
    }
    // Set the font size
    getContext().font = fontSize + 'px Georgia, serif';

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

    // idea here is to check the number of runemarks being used per row
    // then adjust the text size to account.
    // would need to check cardData.tagRunemarksOne

    // Changing position and wrap based on individual
    if(id == 1){ max_tagRunemarks = readTagRunemark("One").length }
    if(id == 2){ max_tagRunemarks = readTagRunemark("Two").length }
    if(id == 3){ max_tagRunemarks = readTagRunemark("Three").length }
    if(id == 4){ max_tagRunemarks = readTagRunemark("Four").length }
    if(id == 5){ max_tagRunemarks = readTagRunemark("Five").length }
    if(id == 6){ max_tagRunemarks = readTagRunemark("Six").length}
    if(id == 7){ max_tagRunemarks = readTagRunemark("Seven").length }

    // Adding option to align text
    if (document.getElementById('align-abilities').checked){
        max_tagRunemarks = Math.max(
            readTagRunemark("One").length,
            readTagRunemark("Two").length,
            readTagRunemark("Three").length,
            readTagRunemark("Four").length,
            readTagRunemark("Five").length,
            readTagRunemark("Six").length,
            readTagRunemark("Seven").length
            );
    }

    if(getSelectedFactionRunemark() == "assets/img/blank.gif"){
        max_tagRunemarks = max_tagRunemarks -1;
    }
    if (max_tagRunemarks < 0) {
        pixelPosition.x = pixelPosition.x - 200;
    }
    if (max_tagRunemarks == 0) {
        pixelPosition.x = pixelPosition.x - 100;
    }
    if (max_tagRunemarks == 1) {
        pixelPosition.x = pixelPosition.x -10;
    }
    if (max_tagRunemarks == 2) {
        pixelPosition.x = pixelPosition.x + 80;
    }
    if (max_tagRunemarks > 2) {
        pixelPosition.x = pixelPosition.x + 160;
    }

    // Print new title variable
        // Set the font size
        getContext().font = 'bold ' + fontSize + 'px Georgia, serif';
        writeScaled(title, { x: pixelPosition.x, y: pixelPosition.y });
    // record the bold width for later use
    var titleWidth = getContext().measureText(title).width;
        // Set the font size
        getContext().font = fontSize + 'px Georgia, serif';

    // Get how many runemarks are tick
    // This will determine how far the word wrap should go

    if (max_tagRunemarks < 0) {
        fitWidth = 1000;
    }
    if (max_tagRunemarks == 0) {
        fitWidth = 900;
    }
    if (max_tagRunemarks == 1) {
        fitWidth = 800;
    }
    if (max_tagRunemarks == 2) {
        fitWidth = 700;
    }
    if (max_tagRunemarks > 2) {
        fitWidth = 600;
    }

    // this will add carriage turns if needed
    lines = splitWordWrap(getContext(), text, fitWidth, titleWidth);

    for (var i = 0; i < lines.length; i++) {
        if (i == 0) {
            writeScaled(lines[i], { x: pixelPosition.x + titleWidth, y: pixelPosition.y + (i * 22) });
        } else {
            writeScaled(lines[i], { x: pixelPosition.x, y: pixelPosition.y + (i * 22) });
        }
    }
}

function calculateFontSizeToFit(maxWidth, startingFontSize, minFontSize, text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let fontSize = startingFontSize;

    do {
        context.font = fontSize + 'px Georgia, serif';
        const textWidth = context.measureText(text).width;

        if (textWidth <= maxWidth) {
            break; // If the text fits, exit the loop
        }

        fontSize--; // Reduce the font size if text width is greater than maxWidth
    } while (fontSize > minFontSize);

    return fontSize;
}




function drawAbilityLarge(id, pixelPosition) {
    getContext().font = '24px Georgia, serif';
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

    // Changing position and wrap based on individual
    if(id == 1){ max_tagRunemarks = readTagRunemark("One").length }
    if(id == 2){ max_tagRunemarks = readTagRunemark("Two").length }
    if(id == 3){ max_tagRunemarks = readTagRunemark("Three").length }
    if(id == 4){ max_tagRunemarks = readTagRunemark("Four").length }
    if(id == 5){ max_tagRunemarks = readTagRunemark("Five").length }
    if(id == 6){ max_tagRunemarks = readTagRunemark("Six").length}
    if(id == 7){ max_tagRunemarks = readTagRunemark("Seven").length }

    // Adding option to align text
    if (document.getElementById('align-abilities').checked){
        max_tagRunemarks = Math.max(
            readTagRunemark("One").length,
            readTagRunemark("Two").length,
            readTagRunemark("Three").length,
            readTagRunemark("Four").length,
            readTagRunemark("Five").length,
            readTagRunemark("Six").length,
            readTagRunemark("Seven").length
            );
    }

    // Adjust if faction runemark if blank
    if(getSelectedFactionRunemark() == "assets/img/blank.gif"){
        max_tagRunemarks = max_tagRunemarks -1;
    }

    if (max_tagRunemarks < 0) {
        fitWidth = 1000;
        pixelPosition.x = pixelPosition.x - 160;
    } else if (max_tagRunemarks == 0) {
        fitWidth = 880;
        pixelPosition.x = pixelPosition.x - 60;
    } else if (max_tagRunemarks == 1) {
        fitWidth = 750;
        pixelPosition.x = pixelPosition.x + 50;
    } else if (max_tagRunemarks >= 2) {
        fitWidth = 650;
        pixelPosition.x = pixelPosition.x + 150;
    }

    // Calculate the font size based on the total characters and maxWidth
    var fontSize = calculateFontSizeToFit(3300, 32, minFontSize = 24, name + text);
    // Calculate the font size based on the total characters and maxWidth
    if(document.getElementById('remove-scaling').checked){
        var fontSize = 32;
    } else {
        var fontSize = calculateFontSizeToFit(3300, 32, minFontSize = 24, name + text);
    }

    // Print new title variable
    getContext().font = 'bold ' + fontSize + 'px Georgia, serif';
    writeScaled(title, { x: pixelPosition.x, y: pixelPosition.y });
    // record the bold width for later use
    var titleWidth = getContext().measureText(title).width;
    getContext().font = fontSize + 'px Georgia, serif';

    // this will add carriage turns if needed
    lines = splitWordWrap(getContext(), text, fitWidth, titleWidth);

    for (var i = 0; i < lines.length; i++) {
        if (i == 0) {
            writeScaled(lines[i], { x: pixelPosition.x + titleWidth, y: pixelPosition.y + (i * fontSize * 1.25) });
        } else {
            writeScaled(lines[i], { x: pixelPosition.x, y: pixelPosition.y + (i * fontSize * 1.25) });
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

    startX = 1122/2;
    startY = 90;
    if (document.getElementById('bg-09').checked) {
        getContext().font = '70px schoensperger';
    } else {
        getContext().font = '70px lithosblack';
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

function drawCardTranslationAbilities(value) {
    getContext().font = '28px Georgia, serif';
    getContext().fillStyle = 'white';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    //writeScaled(value, { x: (1772 / 2), y: 80 });
}

function drawFactionRunemark(image, inc) {
    // for 7 spacing its + 150 for 6 spacing it's + 175
    // if we have 6 items then it's different spacing to seven both start here
    y_pos = 140;

    ability = ['ability1-toggle', 'ability2-toggle', 'ability3-toggle', 'ability4-toggle',
        'ability5-toggle', 'ability6-toggle', 'ability7-toggle'];

    // for 7 spacing its + 150 for 6 spacing it's + 175
    for (x in ability) {
        if (document.getElementById(ability[x]).checked) {
            var positions = { x: 50, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, scalePixelPosition({ x: 80, y: 80 }), $("#circle")[0]);
            drawImageSrc(positions, scalePixelPosition({ x: 80, y: 80 }), replacedImage);
        }
        y_pos += inc;
    }
}

function drawFactionRunemarkLarge(image, inc) {
    // for 7 spacing its + 150 for 6 spacing it's + 175
    // if we have 6 items then it's different spacing to seven both start here
    y_pos = 150;
    inc = 200;
    ability = ['ability1-toggle', 'ability2-toggle', 'ability3-toggle', 'ability4-toggle',
        'ability5-toggle', 'ability6-toggle', 'ability7-toggle'];

    // for 7 spacing its + 150 for 6 spacing it's + 175
    for (x in ability) {
        if (document.getElementById(ability[x]).checked) {
            var positions = { x: 65, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 100, y: 100 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 100, y: 100 }, replacedImage);
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
    //drawImageSrc({ x: 150, y: 40 }, { x: 70, y: 70 }, image);
    //drawImageSrc({ x: 900, y: 40 }, { x: 70, y: 70 }, image);

    // if we have 6 items then it's different spacing to seven both start here
    y_pos = 140;

    ability = ['ability1-toggle', 'ability2-toggle', 'ability3-toggle', 'ability4-toggle',
        'ability5-toggle', 'ability6-toggle', 'ability7-toggle'];

    // for 7 spacing its + 150 for 6 spacing it's + 175


    for (x in ability) {
        if (document.getElementById(ability[x]).checked) {
            var positions = { x: 50, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, scalePixelPosition({ x: 80, y: 80 }), $("#circle")[0]);
            drawImageSrc(positions, scalePixelPosition({ x: 80, y: 80 }), replacedImage);
        }
        y_pos += inc;
    }
}


function drawSubfactionRunemarkLarge(image, inc) {

    // draw image on header
    //drawImageSrc({ x: 150, y: 30 }, { x: 80, y: 80 }, image);
    //drawImageSrc({ x: 900, y: 30 }, { x: 80, y: 80 }, image);


    // if we have 6 items then it's different spacing to seven both start here
    y_pos = 150;

    ability = ['ability1-toggle', 'ability2-toggle', 'ability3-toggle', 'ability4-toggle',
        'ability5-toggle', 'ability6-toggle', 'ability7-toggle'];

    // for 7 spacing its + 150 for 6 spacing it's + 175


    for (x in ability) {
        if (document.getElementById(ability[x]).checked) {
            var positions = { x: 65, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 100, y: 100 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 100, y: 100 }, replacedImage);
        }
        y_pos += inc;
    }
}

function drawTagRunemark(index, runemark, row) {

    // Check for only the first 3 checked
    tripleCheck = (document.getElementById('ability1-toggle').checked ||
        document.getElementById('ability2-toggle').checked ||
        document.getElementById('ability3-toggle').checked) &&
        !document.getElementById('ability4-toggle').checked &&
        !document.getElementById('ability5-toggle').checked &&
        !document.getElementById('ability6-toggle').checked &&
        !document.getElementById('ability7-toggle').checked;

    // draw the runemarks
    // this will only draw 3 per row at most
    var positions = []
    if (tripleCheck) {
        if (row == 1 && document.getElementById('ability1-toggle').checked) {
            positions = [{ x: 175, y: 150 }, { x: 280, y: 150 }];
        } else if (row == 2 && document.getElementById('ability2-toggle').checked) {
            positions = [{ x: 175, y: 350 }, { x: 280, y: 350 }];
        } else if (row == 3 && document.getElementById('ability3-toggle').checked) {
            positions = [{ x: 175, y: 550 }, { x: 280, y: 550 }];
        }
    }
    else if (document.getElementById('ability7-toggle').checked) {
        if (row == 1 && document.getElementById('ability1-toggle').checked) {
            positions = [{ x: 140, y: 140 }, { x: 230, y: 140 }, { x: 320, y: 140 }];
        } else if (row == 2 && document.getElementById('ability2-toggle').checked) {
            positions = [{ x: 140, y: 140 + 90*1 }, { x: 230, y: 140 + 90*1}, { x: 320, y: 140 + 90*1 }];
        } else if (row == 3 && document.getElementById('ability3-toggle').checked) {
            positions = [{ x: 140, y: 140 + 90*2 }, { x: 230, y: 140 + 90*2 }, { x: 320, y: 140 + 90*2 }];
        } else if (row == 4 && document.getElementById('ability4-toggle').checked) {
            positions = [{ x: 140, y: 140 + 90*3 }, { x: 230, y: 140 + 90*3 }, { x: 320, y: 140 + 90*3 }];
        } else if (row == 5 && document.getElementById('ability5-toggle').checked) {
            positions = [{ x: 140, y: 140 + 90*4 }, { x: 230, y: 140 + 90*4 }, { x: 320, y: 140 + 90*4 }];
        } else if (row == 6 && document.getElementById('ability6-toggle').checked) {
            positions = [{ x: 140, y: 140 + 90*5 }, { x: 230, y: 140 + 90*5 }, { x: 320, y: 140 + 90*5 }];
        } else if (row == 7 && document.getElementById('ability7-toggle').checked) {
            positions = [{ x: 140, y: 140 + 90*6 }, { x: 230, y: 140 + 90*6 }, { x: 320, y: 140 + 90*6 }];
        }
    }
    else {
        if (row == 1 && document.getElementById('ability1-toggle').checked) {
            positions = [{ x: 140, y: 140 }, { x: 230, y: 140 }, { x: 320, y: 140 }];
        } else if (row == 2 && document.getElementById('ability2-toggle').checked) {
            positions = [{ x: 140, y: 140 + 110*1 }, { x: 230, y: 140 + 110*1}, { x: 320, y: 140 + 110*1 }];
        } else if (row == 3 && document.getElementById('ability3-toggle').checked) {
            positions = [{ x: 140, y: 140 + 110*2 }, { x: 230, y: 140 + 110*2 }, { x: 320, y: 140 + 110*2 }];
        } else if (row == 4 && document.getElementById('ability4-toggle').checked) {
            positions = [{ x: 140, y: 140 + 110*3 }, { x: 230, y: 140 + 110*3 }, { x: 320, y: 140 + 110*3 }];
        } else if (row == 5 && document.getElementById('ability5-toggle').checked) {
            positions = [{ x: 140, y: 140 + 110*4 }, { x: 230, y: 140 + 110*4 }, { x: 320, y: 140 + 110*4 }];
        } else if (row == 6 && document.getElementById('ability6-toggle').checked) {
            positions = [{ x: 140, y: 140 + 110*5 }, { x: 230, y: 140 + 110*5 }, { x: 320, y: 140 + 110*5 }];
        }
    }

    // if the blank faction icon is selected move all the runemarks left by 100
    if(getSelectedFactionRunemark() == "assets/img/blank.gif"){
        if (tripleCheck) {
            positions = positions.map(({x, y}) => ({x: x - 90, y}));
        } else {
            positions = positions.map(({x, y}) => ({x: x - 90, y}));
        }
    }

    if (index >= positions.length) return;

    if (tripleCheck) {
        var img = $("#circle")[0],
            position = scalePixelPosition(positions[index]),
            size = scalePixelPosition({ x: 100, y: 100 });
    } else {
        var img = $("#circle")[0],
            position = scalePixelPosition(positions[index]),
            size = scalePixelPosition({ x: 80, y: 80 });
    }

    position = scalePixelPosition({ x: positions[index].x, y: positions[index].y });
    if (tripleCheck) {
        drawImage(position, scalePixelPosition({ x: 100, y: 100 }), img);
    } else {
        drawImage(position, scalePixelPosition({ x: 80, y: 80 }), img);

    }

    var image = new Image();
    image.onload = function () {
        drawImage(position, size, image);

        // write the runemark name underneath
        if (document.getElementById('runemark-names').checked){
            value = runemark.slice(25);
            value = value.replace(".svg", "");
            if (value == "leader"){
                value = "hero";
            }
            if (tripleCheck) {
                if (document.getElementById('bg-09').checked){
                    getContext().font = '22px schoensperger';
                } else {
                    getContext().font = '22px rodchenkoctt';
                }
            } else {
                if (document.getElementById('bg-09').checked){
                    getContext().font = '20px schoensperger';
                } else {
                    getContext().font = '20px rodchenkoctt';
                }
            }
            getContext().fillStyle = 'white';
            getContext().textAlign = "center";
            getContext().textBaseline = "middle";
            if (tripleCheck) {
                x_value = positions[index].x + 100/2;
                y_value = positions[index].y + 110;
            } else {
                x_value = positions[index].x + 40;
                y_value = positions[index].y + 80;
            }
            text = value.charAt(0).toUpperCase() + value.slice(1);
            writeScaled(text, { x: x_value+2, y: y_value+2 });
            writeScaled(text, { x: x_value+2, y: y_value-2 });
            writeScaled(text, { x: x_value-2, y: y_value+2 });
            writeScaled(text, { x: x_value-2, y: y_value-2 });
            getContext().fillStyle = 'black';
            getContext().textAlign = "center";
            getContext().textBaseline = "middle";
            writeScaled(text, { x: x_value, y: y_value });
        }

    };
    image.src = runemark;

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

    } else if (document.getElementById('bg-09').checked) {
        return document.getElementById('bg-mordheim-101');
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
        //x: canvas.width / warcryCardOne.width,
        //y: canvas.height / warcryCardOne.height
        x: canvas.width / canvas.width,
        y: canvas.height / canvas.height
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
        result = result + "Nineteen"
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
    window.localStorage.removeItem("cardDataMap");
    window.localStorage.removeItem("latestAbilitiesName");
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
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "warcry_abilities_" + data.cardTitle.replace(/ /g, "_") + ".json");
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
    data.cardTranslationDouble = document.getElementById("card-translation-double").value;
    data.cardTranslationTriple = document.getElementById("card-translation-triple").value;
    data.cardTranslationQuad = document.getElementById("card-translation-quad").value;

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


    data.ability1ReactionChecked = document.getElementById('ability1-reaction').checked;
    data.ability1DoubleChecked = document.getElementById('ability1-double').checked;
    data.ability1TripleChecked = document.getElementById('ability1-triple').checked;
    data.ability1QuadChecked = document.getElementById('ability1-quad').checked;

    data.ability2ReactionChecked = document.getElementById('ability2-reaction').checked;
    data.ability2DoubleChecked = document.getElementById('ability2-double').checked;
    data.ability2TripleChecked = document.getElementById('ability2-triple').checked;
    data.ability2QuadChecked = document.getElementById('ability2-quad').checked;

    data.ability3ReactionChecked = document.getElementById('ability3-reaction').checked;
    data.ability3DoubleChecked = document.getElementById('ability3-double').checked;
    data.ability3TripleChecked = document.getElementById('ability3-triple').checked;
    data.ability3QuadChecked = document.getElementById('ability3-quad').checked;

    data.ability4ReactionChecked = document.getElementById('ability4-reaction').checked;
    data.ability4DoubleChecked = document.getElementById('ability4-double').checked;
    data.ability4TripleChecked = document.getElementById('ability4-triple').checked;
    data.ability4QuadChecked = document.getElementById('ability4-quad').checked;

    data.ability5ReactionChecked = document.getElementById('ability5-reaction').checked;
    data.ability5DoubleChecked = document.getElementById('ability5-double').checked;
    data.ability5TripleChecked = document.getElementById('ability5-triple').checked;
    data.ability5QuadChecked = document.getElementById('ability5-quad').checked;

    data.ability6ReactionChecked = document.getElementById('ability6-reaction').checked;
    data.ability6DoubleChecked = document.getElementById('ability6-double').checked;
    data.ability6TripleChecked = document.getElementById('ability6-triple').checked;
    data.ability6QuadChecked = document.getElementById('ability6-quad').checked;

    data.ability7ReactionChecked = document.getElementById('ability7-reaction').checked;
    data.ability7DoubleChecked = document.getElementById('ability7-double').checked;
    data.ability7TripleChecked = document.getElementById('ability7-triple').checked;
    data.ability7QuadChecked = document.getElementById('ability7-quad').checked;



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
    data.bg09 = document.getElementById('bg-09').checked;

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

    // Check for only the first 3 checked
    tripleCheck = (document.getElementById('ability1-toggle').checked ||
        document.getElementById('ability2-toggle').checked ||
        document.getElementById('ability3-toggle').checked) &&
        !document.getElementById('ability4-toggle').checked &&
        !document.getElementById('ability5-toggle').checked &&
        !document.getElementById('ability6-toggle').checked &&
        !document.getElementById('ability7-toggle').checked;

    if(getSelectedFactionRunemark() != "assets/img/blank.gif"){
        // sybmols at the top
        if (tripleCheck) {
            //drawImageSrc({ x: 60, y: 35 }, { x: 70, y: 70 }, cardData.factionRunemark);
            //drawImageSrc({ x: 998, y: 35 }, { x: 70, y: 70 }, cardData.factionRunemark);

            if (cardData.subfactionRunemark == 'assets/img/blank.gif') {
                drawFactionRunemarkLarge(cardData.factionRunemark, 200);
            }
            drawSubfactionRunemarkLarge(cardData.subfactionRunemark, 200);
        }
        else if (document.getElementById('ability7-toggle').checked) {
            //drawImageSrc({ x: 50, y: 39 }, { x: 65, y: 65 }, cardData.factionRunemark);
            //drawImageSrc({ x: 1008, y: 39 }, { x: 65, y: 65 }, cardData.factionRunemark);
            if (cardData.subfactionRunemark == 'assets/img/blank.gif') {
                drawFactionRunemark(cardData.factionRunemark, 90);
            }
            drawSubfactionRunemark(cardData.subfactionRunemark, 90);
        }
        else {
            //drawImageSrc({ x: 50, y: 39 }, { x: 65, y: 65 }, cardData.factionRunemark);
            //drawImageSrc({ x: 1008, y: 39 }, { x: 65, y: 65 }, cardData.factionRunemark);
            if (cardData.subfactionRunemark == 'assets/img/blank.gif') {
                drawFactionRunemark(cardData.factionRunemark, 110);
            }
            drawSubfactionRunemark(cardData.subfactionRunemark, 110);
        }
    }

    // idea here is to check the number of runemarks being used per row
    // then adjust the text size to account.
    // would need to check cardData.tagRunemarksOne

    x_value = 250;

    // for 7 spacing its + 150 for 6 spacing it's + 175

    ability = ['ability1-toggle', 'ability2-toggle', 'ability3-toggle', 'ability4-toggle',
        'ability5-toggle', 'ability6-toggle', 'ability7-toggle'];

    // Drawing the ability text if we have 3 abilities
    if (tripleCheck) {
        y_value = 180;
        for (i in ability) {
            if (document.getElementById(ability[i]).checked) {
                num = parseInt(i) + 1;
                drawAbilityLarge(num, { x: x_value, y: y_value });
            }
            y_value += 200;
        }
    }
    // Drawing the ability text if we have 7 abilities
    else if (document.getElementById('ability7-toggle').checked) {
        y_value = 150;
        for (i in ability) {
            if (document.getElementById(ability[i]).checked) {
                num = parseInt(i) + 1;
                drawAbility(num, { x: x_value, y: y_value });
            }
            y_value += 90;
        }
        // Drawing the ability text if we have 6 abilities
    } else {
        y_value = 155;
        for (i in ability) {
            if (document.getElementById(ability[i]).checked) {
                num = parseInt(i) + 1;
                drawAbility(num, { x: x_value, y: y_value });
            }
            y_value += 105;
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
    drawBorder();
}

function saveCardAsImage() {
    data = readControls();
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute("download", "warcry_abilities_" + data.cardTitle.replace(/ /g, "_") + ".png");

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
    //var scaledPosition = { x: pixelPosition.x * scalingFactor.x, y: pixelPosition.y * scalingFactor.y };
    var scaledPosition = pixelPosition;

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
    document.getElementById("card-title").value = cardData.cardTitle;

    $('#card-translation-abilities').value = cardData.cardTranslationAbilities;
    document.getElementById("card-translation-abilities").value = cardData.cardTranslationAbilities;

    // the double, triple, and quad names were missing from earlier json exports
    // the below sets the ability name to the default if it's not included

    if (cardData.cardTranslationDouble == null) {
        $('#card-translation-double').value = "Double";
        document.getElementById("card-translation-double").value = "Double";

    } else {
        $('#card-translation-double').value = cardData.cardTranslationDouble;
        document.getElementById("card-translation-double").value = cardData.cardTranslationDouble;
    }

    if (cardData.cardTranslationTriple == null) {
        $('#card-translation-triple').value = "Triple";
        document.getElementById("card-translation-triple").value = "Triple";

    } else {
        $('#card-translation-triple').value = cardData.cardTranslationTriple;
        document.getElementById("card-translation-triple").value = cardData.cardTranslationTriple;
    }

    if (cardData.cardTranslationQuad == null) {
        $('#card-translation-quad').value = "Quad";
        document.getElementById("card-translation-quad").value = "Quad";

    } else {
        $('#card-translation-quad').value = cardData.cardTranslationQuad;
        document.getElementById("card-translation-quad").value = cardData.cardTranslationQuad;
    }


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



    // if the variable isn't in cardData then the default is set to true
    if (cardData.ability1ReactionChecked == null) {
        document.getElementById('ability1-reaction').checked = true;
    } else {
        document.getElementById('ability1-reaction').checked = cardData.ability1ReactionChecked;
    }
    document.getElementById('ability1-double').checked = cardData.ability1DoubleChecked;
    document.getElementById('ability1-triple').checked = cardData.ability1TripleChecked;
    document.getElementById('ability1-quad').checked = cardData.ability1QuadChecked;

    document.getElementById('ability2-reaction').checked = cardData.ability2ReactionChecked;
    if (cardData.ability2DoubleChecked == null) {
        document.getElementById('ability2-double').checked = true;
    } else {
        document.getElementById('ability2-double').checked = cardData.ability2DoubleChecked;
    }
    document.getElementById('ability2-triple').checked = cardData.ability2TripleChecked;
    document.getElementById('ability2-quad').checked = cardData.ability2QuadChecked;

    document.getElementById('ability3-reaction').checked = cardData.ability3ReactionChecked;
    if (cardData.ability3DoubleChecked == null) {
        document.getElementById('ability3-double').checked = true;
    } else {
        document.getElementById('ability3-double').checked = cardData.ability3DoubleChecked;
    }
    document.getElementById('ability3-triple').checked = cardData.ability3TripleChecked;
    document.getElementById('ability3-quad').checked = cardData.ability3QuadChecked;

    document.getElementById('ability4-reaction').checked = cardData.ability4ReactionChecked;
    document.getElementById('ability4-double').checked = cardData.ability4DoubleChecked;
    if (cardData.ability4DoubleChecked == null) {
        document.getElementById('ability4-double').checked = true;
    } else {
        document.getElementById('ability4-double').checked = cardData.ability4DoubleChecked;
    }
    document.getElementById('ability4-triple').checked = cardData.ability4TripleChecked;

    document.getElementById('ability4-quad').checked = cardData.ability4QuadChecked;

    document.getElementById('ability5-reaction').checked = cardData.ability5ReactionChecked;
    document.getElementById('ability5-double').checked = cardData.ability5DoubleChecked;
    if (cardData.ability5TripleChecked == null) {
        document.getElementById('ability5-triple').checked = true;
    } else {
        document.getElementById('ability5-triple').checked = cardData.ability5TripleChecked;
    }
    document.getElementById('ability5-quad').checked = cardData.ability5QuadChecked;

    document.getElementById('ability6-reaction').checke = cardData.ability6ReactionChecked;
    document.getElementById('ability6-double').checked = cardData.ability6DoubleChecked;
    if (cardData.ability6TripleChecked == null) {
        document.getElementById('ability6-triple').checked = true;
    } else {
        document.getElementById('ability6-triple').checked = cardData.ability6TripleChecked;
    }
    document.getElementById('ability6-quad').checked = cardData.ability6QuadChecked;

    document.getElementById('ability7-reaction').checked = cardData.ability7ReactionChecked;
    document.getElementById('ability7-double').checked = cardData.ability7DoubleChecked;
    document.getElementById('ability7-triple').checked = cardData.ability7TripleChecked;
    if (cardData.ability7QuadChecked == null) {
        document.getElementById('ability7-quad').checked = true;
    } else {
        document.getElementById('ability7-quad').checked = cardData.ability7QuadChecked;
    }



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
    document.getElementById('bg-09').checked = cardData.bg09;

    // render the updated info
    render(cardData);
}

window.onload = function () {
    var cardData = loadLatestCardData();
    writeControls(cardData);
    refreshSaveSlots();


    getAbilityList()
        // log response or catch error of fetch promise
        .then((data) => updateAbilityListDropdown(data))

        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);

        var id = urlParams.get('id');
        var ability = urlParams.get('ability');
        var warband = urlParams.get('warband');

        if (id && id.trim() !== '') {
            loadAbilityById(id);
        } else if (ability && ability.trim() !== '' && validateInput(warband)) {
            loadFighterByName(ability, warband);
        } else {
            console.log("Invalid input parameters.");
        }
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



function updateAbilityListDropdown(data){

    // Sort the data array by warband then cost
    const sortedData = data.sort((a, b) => {
        if (a.warband === b.warband) {
          const costOrder = { reaction: 1, double: 2, triple: 3, quad: 4 };

          if (a.cost in costOrder && b.cost in costOrder) {
            return costOrder[a.cost] - costOrder[b.cost];
          } else if (a.cost in costOrder) {
            return -1;
          } else if (b.cost in costOrder) {
            return 1;
          }
        }

        return a.warband.localeCompare(b.warband);
      });


    for (let i = 1; i <= 7; i++) {
      $.each(sortedData, function(index, option) {
        $('#sel' + i).append($('<option/>').attr("value", option.id).text(option.warband + " - [" + option.cost + "] - " + option.name));
      });
    }
}

function loadAbilityFromList(abilityNumber){
    elementName = "sel" + abilityNumber;
    var x = document.getElementById(elementName).selectedIndex;
    var y = document.getElementById(elementName).options;
    console.log("Index: " + y[x].index + " is " + y[x].text);
    getAbilityList()
    // log response or catch error of fetch promise
    .then((data) => saveAbilityFromList(data[y[x].index], abilityNumber));
}


async function getAbilityList(){
    // await response of fetch call
    let response = await fetch("https://raw.githubusercontent.com/krisling049/warcry_data/main/data/abilities.json");
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    const sortedData = data.map(item => {
        if (item.cost === "reaction") {
          item.cost = "Reaction";
        } else if (item.cost === "double") {
          item.cost = "Double";
        } else if (item.cost === "triple") {
          item.cost = "Triple";
        } else if (item.cost === "quad") {
          item.cost = "Quad";
        }
        return item;
      }).sort((a, b) => {
        if (a.warband === b.warband) {
          const costOrder = { Reaction: 1, Double: 2, Triple: 3, Quad: 4 };

          if (a.cost in costOrder && b.cost in costOrder) {
            return costOrder[a.cost] - costOrder[b.cost];
          } else if (a.cost in costOrder) {
            return -1;
          } else if (b.cost in costOrder) {
            return 1;
          }
        }

        return a.warband.localeCompare(b.warband);
      });


    return sortedData;
}

function saveAbilityFromList(ability, abilityNumber){

    var data = readControls();
    // change from just runemark name to full path

    runemarks =  getRunemarks(ability.runemarks);

    dynamicAbilityName = "ability" + abilityNumber + "Name";
    dynamicAbilityText = "ability" + abilityNumber + "Text";
    dynamicAbilityReactionChecked = "ability" + abilityNumber + "ReactionChecked";
    dynamicAbilityDoubleChecked = "ability" + abilityNumber + "DoubleChecked";
    dynamicAbilityTripleChecked = "ability" + abilityNumber + "TripleChecked";
    dynamicAbilityQuadChecked = "ability" + abilityNumber + "QuadChecked";

    data[dynamicAbilityName] = ability.name;
    data[dynamicAbilityText] = ability.description;
    data[dynamicAbilityReactionChecked] = false;
    data[dynamicAbilityDoubleChecked] = false;
    data[dynamicAbilityTripleChecked] = false;
    data[dynamicAbilityQuadChecked] = false;
    if(ability.cost == "Reaction"){data[dynamicAbilityReactionChecked] = true;}
    else if(ability.cost == "Double"){data[dynamicAbilityDoubleChecked] = true;}
    else if(ability.cost == "Triple"){data[dynamicAbilityTripleChecked] = true;}
    else if(ability.cost == "Quad"){data[dynamicAbilityQuadChecked] = true;}

    if(abilityNumber == 1) {data.tagRunemarksOne = runemarks}
    if(abilityNumber == 2) {data.tagRunemarksTwo = runemarks}
    if(abilityNumber == 3) {data.tagRunemarksThree = runemarks}
    if(abilityNumber == 4) {data.tagRunemarksFour = runemarks}
    if(abilityNumber == 5) {data.tagRunemarksFive = runemarks}
    if(abilityNumber == 6) {data.tagRunemarksSix = runemarks}
    if(abilityNumber == 7) {data.tagRunemarksSeven = runemarks}
    console.log(data);
    writeControls(data);

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
    if (runemarks.includes("icon bearer")){
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


drawBorder = function () {
    if(!document.getElementById("removeBorder").checked){
        getContext().drawImage(document.getElementById('card-border'), 0, 0, 1122, 822);
    }
}
