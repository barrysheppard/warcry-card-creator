const GROUPS = ["Shield", "Dagger", "Hammer"];
const COLOURS = ["red", "blue"];

function writeValue(ctx, value, position) {
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

function getScalingFactor(canvas, warcryCardOne) {
  return {
    x: canvas.width / warcryCardOne.width,
    y: canvas.height / warcryCardOne.height
  };
}

function getCanvas() {
  return document.getElementById("canvas");
}

function getContext() {
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
    'bg-18': 'bg-white',
  };

  const selectedOption = document.getElementById('background-list').value;
  const backgroundImageId = backgroundMap[selectedOption];

  return document.getElementById(backgroundImageId);
}

function drawBorder() {
  if (!document.getElementById("removeBorder").checked) {
    getContext().drawImage(document.getElementById('card-border'), 0, 0, getCanvas().width, getCanvas().height);
  }
}

function scalePixelPosition(pixelPosition) {
  let scalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
  let scaledPosition = {
    x: pixelPosition.x * scalingFactor.x,
    y: pixelPosition.y * scalingFactor.y
  };
  return scaledPosition;
}

function writeScaled(value, pixelPos) {
  let scaledPos = scalePixelPosition(pixelPos);
  writeValue(getContext(), value, scaledPos);
}

function drawCardElementFromInput(inputElement, pixelPosition) {
  let value = inputElement.value;
  writeScaled(value, pixelPosition);
}

function drawCardElementFromInputId(inputId, pixelPosition) {
  drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}

function drawMissionName(value) {
  startX = 1122 / 2;
  startY = 140;
  if (document.getElementById('background-list').value === 'bg-13') {
    getContext().font = '60px schoensperger';
  } else {
    getContext().font = '60px lithosblack';
  }
  if (document.getElementById("white").checked) {
    getContext().fillStyle = 'black';
  } else {
    getContext().fillStyle = 'white';
  }
  getContext().textAlign = "center";
  getContext().textBaseline = "middle";
  writeScaled(value, {
    x: startX + 2,
    y: startY
  });
  writeScaled(value, {
    x: startX,
    y: startY + 2
  });
  writeScaled(value, {
    x: startX + 2,
    y: startY + 2
  });
  writeScaled(value, {
    x: startX - 2,
    y: startY
  });
  writeScaled(value, {
    x: startX,
    y: startY - 2
  });
  writeScaled(value, {
    x: startX - 2,
    y: startY - 2
  });

  if (document.getElementById("white").checked) {
    getContext().fillStyle = 'white';
  } else {
    getContext().fillStyle = 'black';
  }
  writeScaled(value, {
    x: startX,
    y: startY
  });
}

function drawMissionType(value) {
  startX = 1122 / 2;
  startY = 90;
  if (document.getElementById('background-list').value === 'bg-13') {
    getContext().font = '40px schoensperger';
  } else {
    getContext().font = '40px lithosblack';
  }

  if (document.getElementById("white").checked) {
    getContext().fillStyle = 'black';
  } else {
    getContext().fillStyle = 'white';
  }
  getContext().textAlign = "center";
  getContext().textBaseline = "middle";
  writeScaled(value, {
    x: startX + 2,
    y: startY
  });
  writeScaled(value, {
    x: startX,
    y: startY + 2
  });
  writeScaled(value, {
    x: startX + 2,
    y: startY + 2
  });
  writeScaled(value, {
    x: startX - 2,
    y: startY
  });
  writeScaled(value, {
    x: startX,
    y: startY - 2
  });
  writeScaled(value, {
    x: startX - 2,
    y: startY - 2
  });

  if (document.getElementById("white").checked) {
    getContext().fillStyle = 'white';
  } else {
    getContext().fillStyle = 'black';
  }
  writeScaled(value, {
    x: startX,
    y: startY
  });
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
    } else {
      image.onload = function() {
        drawImage(scaledPosition, scaledSize, image);
      };
    }
  }
}

function drawImageSrc(scaledPosition, scaledSize, imageSrc) {
  if (imageSrc != null) {
    let image = new Image();
    image.onload = function() {
      drawImage(scaledPosition, scaledSize, image);
    };
    image.src = imageSrc;
  }
}

function drawModel(imageUrl, imageProps) {
  if (imageUrl != null) {
    let image = new Image();
    image.onload = function() {
      let position = scalePixelPosition({
        x: imageProps.offsetX,
        y: imageProps.offsetY
      });
      let scale = imageProps.scalePercent / 100.0;
      let width = image.width * scale;
      let height = image.height * scale;
      getContext().drawImage(image, position.x, position.y, width, height);
      //URL.revokeObjectURL(image.src);
    };
    image.src = imageUrl;
  }
}

function getName() {
  //let textInput = $("#saveNameInput")[0];
  return "Warcry_Mission_Card";
}

function setName(name) {
  //let textInput = $("#saveNameInput")[0];
  //textInput.value = name;
}

function setModelImage(image) {
  $("#missionImageUrl")[0].value = image;
}

function getModelImage() {
  let imageSelect = $("#imageSelect")[0];

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
  let imageSelect = $("#missionImageUrl")[0].value;
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
  let data = new Object;
  data.name = getName();
  data.imageUrl = getFighterImageUrl();
  data.imageProperties = getModelImageProperties();
  data.customBackgroundUrl = getCustomBackgroundUrl();
  data.customBackgroundProperties = getCustomBackgroundProperties();
  data.missionName = document.getElementById("missionName").value;
  data.missionType = document.getElementById("missionType").value;
  data.bgselected = document.getElementById('background-list').value;

  COLOURS.forEach(colour => {
    data["remove" + titelize(colour) + "Deployment"] = document.getElementById("remove" + titelize(colour) + "Deployment").checked;

    GROUPS.forEach(group => {
      data[colour + group + "RenderMode"] = document.getElementById(colour + group + "RenderMode").value;
      data[colour + group + "XValue"] = document.getElementById(colour + group + "X").value;
      data[colour + group + "YValue"] = document.getElementById(colour + group + "Y").value;
      data[colour + group + "Turn"] = document.getElementById(colour + group + "Turn").value;
    });
  });

  for (let i = 1; i <= 6; i++) {
    data["objective" + i + "XValue"] = document.getElementById("objective" + i + "X").value;
    data["objective" + i + "YValue"] = document.getElementById("objective" + i + "Y").value;
    data["objective" + i + "Icon"] = document.getElementById("objective" + i + "Icon").value;
    data["objective" + i + "RenderMode"] = document.getElementById("objective" + i + "RenderMode").value;
  }

  data.removeBorder = document.getElementById("removeBorder").checked;
  data.removeDeployment = document.getElementById("removeDeployment").checked;
  data.symmetrical = document.getElementById("symmetrical").checked;
  data.orientation = document.getElementById("orientation").checked;
  data.white = document.getElementById("white").checked;

  data.textValue = document.getElementById("textValue").value;

  return data;
}

function render(missionData) {
  if (missionData.customBackgroundUrl) {
    renderCustomBackground(missionData);
  } else {
    renderDefaultBackground(missionData);
  }
}

function renderCustomBackground(missionData) {
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

function renderDefaultBackground(missionData) {
  getContext().drawImage(getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
  drawBorder();
  renderFighterImage(missionData);
  drawDeployment();
  drawText();
  drawIcons();
};

function renderFighterImage(missionData) {
  if (missionData.imageUrl) {
    const image = new Image();
    image.onload = function() {
      const position = scalePixelPosition({
        x: 160 + missionData.imageProperties.offsetX,
        y: 160 + missionData.imageProperties.offsetY
      });
      const scale = missionData.imageProperties.scalePercent / 100.0;
      const width = image.width * scale;
      const height = image.height * scale;
      getContext().drawImage(image, position.x, position.y, width, height);
      if (true) {
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
    if (true) {
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

  COLOURS.forEach(colour => {
    document.getElementById("remove" + titelize(colour) + "Deployment").checked = data["remove" + titelize(colour) + "Deployment"];

    GROUPS.forEach(group => {
      document.getElementById(colour + group + "RenderMode").value = data[colour + group + "RenderMode"] || "edge";
      document.getElementById(colour + group + "X").value = data[colour + group + "XValue"];
      document.getElementById(colour + group + "Y").value = data[colour + group + "YValue"];
      document.getElementById(colour + group + "Turn").value = data[colour + group + "Turn"];
    });
  });

  for (let i = 1; i <= 6; i++) {
    document.getElementById("objective" + i + "X").value = data["objective" + i + "XValue"];
    document.getElementById("objective" + i + "Y").value = data["objective" + i + "YValue"];
    document.getElementById("objective" + i + "Icon").value = data["objective" + i + "Icon"];
    document.getElementById("objective" + i + "RenderMode").value = data["objective" + i + "RenderMode"] || "edge";
  }

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
  let data = new Object;
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
  let storage = window.localStorage.getItem("missionDataMap");
  if (storage != null) {
    return JSON.parse(storage);
  }
  // Set up the map.
  let map = new Object;
  map["Warcry_Mission_Card"] = defaultmissionData();
  savemissionDataMap(map);
  return map;
}

function loadLatestmissionData() {
  let latestFighterName = window.localStorage.getItem("latestFighterName");
  if (latestFighterName == null) {
    latestFighterName = "Warcry_Mission_Card";
  }

  let data = loadmissionData(latestFighterName);

  if (data) {
    console.log("Loaded data:");
    console.log(data);
  } else {
    console.log("Failed to load data - loading default");
    data = defaultCardData();
  }

  return data;
}

function saveLatestmissionData() {
  let missionData = readControls();
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

  let map = loadmissionDataMap();
  if (map[missionDataName]) {
    return map[missionDataName];
  }

  return null;
}

function getBase64Image(img) {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  let dataURL = canvas.toDataURL("image/png");

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
  let imgData = getBase64Image(img);
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

function onAnyChange() {
  let missionData = readControls();
  render(missionData);
  saveLatestmissionData();
}

function onFighterImageUpload() {
  image = getModelImage();
  setModelImage(image);
  let missionData = readControls();
  render(missionData);
  saveLatestmissionData();
}

function onCopyFromRed() {
  document.getElementById("blueHammerX").value = 30 - document.getElementById("redHammerX").value;
  document.getElementById("blueHammerY").value = 22 - document.getElementById("redHammerY").value;

  document.getElementById("blueShieldX").value = 30 - document.getElementById("redShieldX").value;
  document.getElementById("blueShieldY").value = 22 - document.getElementById("redShieldY").value;

  document.getElementById("blueDaggerX").value = 30 - document.getElementById("redDaggerX").value;
  document.getElementById("blueDaggerY").value = 22 - document.getElementById("redDaggerY").value;

  document.getElementById("blueHammerTurn").value = document.getElementById("redHammerTurn").value;
  document.getElementById("blueShieldTurn").value = document.getElementById("redShieldTurn").value;
  document.getElementById("blueDaggerTurn").value = document.getElementById("redDaggerTurn").value;

  document.getElementById("blueHammerRenderMode").value = document.getElementById("redHammerRenderMode").value;
  document.getElementById("blueShieldRenderMode").value = document.getElementById("redShieldRenderMode").value;
  document.getElementById("blueDaggerRenderMode").value = document.getElementById("redDaggerRenderMode").value;

  onAnyChange();
}

function onClearCache() {
  window.localStorage.clear();
  location.reload();
  return false;
}

function onResetToDefault() {
  let missionData = defaultmissionData();
  writeControls(missionData);
}

function refreshSaveSlots() {
  // Remove all
  $('select:not([data-clear-on-load="false"])').children('option').remove();

  let missionDataName = readControls().name;

  let map = loadmissionDataMap();

  for (let [key, value] of Object.entries(map)) {
    let selected = false;
    if (missionDataName &&
        key == missionDataName) {
      selected = true;
    }
    let newOption = new Option(key, key, selected, selected);
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
  let exportObj = JSON.stringify(data);

  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  file_name = "warcry_mission_";
  if (data.missionType != "") {
    file_name = file_name + data.missionType.replace(/ /g, "_") + "_";
  }
  file_name = file_name + data.missionName.replace(/ /g, "_") + ".json";
  downloadAnchorNode.setAttribute("download", file_name);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function saveCardAsImage() {
  data = readControls();
  let element = document.createElement('a');
  element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));

  file_name = "warcry_mission_";
  if (data.missionType != "") {
    file_name = file_name + data.missionType.replace(/ /g, "_") + "_";
  }
  file_name = file_name + data.missionName.replace(/ /g, "_") + ".png";

  element.setAttribute("download", file_name);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

$(document).ready(function() {
  let missionData = loadLatestmissionData();
  writeControls(missionData);
  refreshSaveSlots();
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

  let saveJson = function(json) {
    json.customBackgroundUrl = null;
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

  readJSONFile(file).then(json => saveJson(json));
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
  let imageSelect = $("#customBackgroundSelect")[0];
  if (imageSelect.files.length > 0) {
    return URL.createObjectURL(imageSelect.files[0]);
  }
  return null;
}

function setCustomBackground(image) {
  $("#customBackgroundUrl")[0].value = image;
}

function onCustomBackgroundUpload() {
  image = getCustomBackground();
  setCustomBackground(image);
  let missionData = readControls();
  render(missionData);
  saveLatestmissionData();
}

function getCustomBackgroundUrl() {
  let imageSelect = $("#customBackgroundUrl")[0].value;
  return imageSelect;
}

function drawOverlayTexts(missionData) {
  // These are the texts to overlay
  drawMissionName(missionData.missionName);
  drawMissionType(missionData.missionType);

  drawBorder();
}

function drawMap() {
  getContext().drawImage(document.getElementById('map'), 0, 0, getCanvas().width, getCanvas().height);
}

function drawIcon(name, x, y) {
  newCoord = convertInchesToPixels(x, y);
  getContext().drawImage(document.getElementById(name), newCoord.x, newCoord.y, 70, 70);
}

function convertInchesToPixels(x_inches, y_inches) {
  // X start is 173 and end is 173+352+352.
  // in inches that 704 = 30 inches. 704/30 = 23.46
  // y start is 162 and end is 162+ 252
  // in inches that 504 is 22 inches. 504/22 = 22.9
  const startX = 173;
  const startY = 162;
  const x = startX + x_inches * 23.46;
  const y = startY + y_inches * 22.9;
  return {
    x,
    y
  };
}

function convertInchesToPixelsLine(x_inches, y_inches) {
  // X start is 173 and end is 173+352+352.
  // in inches that 704 = 30 inches. 704/30 = 23.46
  // y start is 162 and end is 162+ 252
  // in inches that 504 is 22 inches. 504/22 = 22.9
  const startX = 205;
  const startY = 200;
  const x = startX + (x_inches * 23.7);
  const y = startY + (y_inches * 22.9);

  return {
    x,
    y
  };
}

function drawThickLine(ctx, x1, y1, x2, y2, thickness, color = "black", arrowSize = 10) {
  // Calculate the angle of the line from start to end
  const angle = Math.atan2(y2 - y1, x2 - x1);

  const start = convertInchesToPixelsLine(x1, y1);
  const end = convertInchesToPixelsLine(x2, y2);

  // Shorten line, so it doesn't interfere with the arrow head
  // This is really crude, but I don't know the math. Something-something cos/sin.
  // Since all angles are 90dgr, we can essentially end up with one of 4 numbers,
  // namely [-1, 0, 1, 2]
  const direction = (2 * angle / Math.PI).toFixed();
  const xOffset = (direction == 1 || direction == -1 ? 0 : (-1 * (direction - 1))) * arrowSize;
  const yOffset = (direction == 0 || direction == 2 ? 0 : direction) * arrowSize;

  ctx.beginPath();
  ctx.moveTo(start.x + xOffset, start.y + yOffset);
  ctx.lineTo(end.x, end.y);

  // Save the current stroke style and line width
  const originalStrokeStyle = ctx.strokeStyle;
  const originalLineWidth = ctx.lineWidth;

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

  // Draw the arrowhead at the end of the line
  ctx.save();
  ctx.translate(end.x, end.y);
  ctx.rotate(angle); // Use the original angle
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
  let color = "black";
  let labelOffsetY = (YValue > 5 && YValue < 12) || YValue > 16 ? -25 : 25;
  let labelOffsetX = (XValue > 7 && XValue < 16) || XValue > 23 ? -25 : 25;

  if (XValue != 15) {
    if (XValue < 15) {
      drawThickLine(getContext(), 0, YValue, XValue, YValue, 6, color);
      if (XValue != 0) {
        let value = XValue + '"';
        let point = convertInchesToPixelsLine(XValue / 2, YValue);
        writeScaledBorder(value, point.x, point.y + labelOffsetY);
      }
    } else {
      drawThickLine(getContext(), 30, YValue, XValue, YValue, 6, color);
      if (XValue != 30) {
        let value = (30 - XValue) + '"';
        let point = convertInchesToPixelsLine(15 + XValue / 2, YValue);
        writeScaledBorder(value, point.x, point.y + labelOffsetY);
      }
    }
  }

  if (YValue != 11) {
    if (YValue < 11) {
      drawThickLine(getContext(), XValue, 0, XValue, YValue, 6, color);
      if (YValue != 0) {
        let value = YValue + '"';
        let point = convertInchesToPixelsLine(XValue, YValue / 2);
        writeScaledBorder(value, point.x + labelOffsetX, point.y);
      }
    } else {
      if (XValue == 15) {
        // Special case - mirrow label placement on centre line
        labelOffsetX = labelOffsetX * -1;
      }
      drawThickLine(getContext(), XValue, 22, XValue, YValue, 6, color);
      if (YValue != 22) {
        let value = (22 - YValue) + '"';
        let point = convertInchesToPixelsLine(XValue, 11 + YValue / 2);
        writeScaledBorder(value, point.x + labelOffsetX, point.y);
      }
    }
  }

  if (Turn > 1) {
    drawTurnLabel(XValue, YValue, Turn);
  }
}

function drawLinesFromCentre(XValue, YValue, Turn) {
  let color = "black";
  let labelOffsetY = (YValue > 5 && YValue < 12) || YValue > 16 ? -25 : 25;
  let labelOffsetX = (XValue > 7 && XValue < 16) || XValue > 23 ? -25 : 25;

  if (XValue != 15) {
    if (XValue < 15) {
      drawThickLine(getContext(), 15, YValue, XValue, YValue, 6, color);
      if (XValue != 15) {
        let value = (15 - XValue) + '"';
        let newX = 15 + (XValue - 15) / 2;
        let point = convertInchesToPixelsLine(newX, YValue);
        writeScaledBorder(value, point.x, point.y + labelOffsetY);
      }
    } else {
      drawThickLine(getContext(), 15, YValue, XValue, YValue, 6, color);
      if (XValue != 15) {
        let value = (XValue - 15) + '"';
        let newX = 15 + (XValue - 15) / 2;
        let point = convertInchesToPixelsLine(newX, YValue);
        writeScaledBorder(value, point.x, point.y + labelOffsetY);
      }
    }
  }

  if (YValue != 11) {
    if (YValue < 11) {
      drawThickLine(getContext(), XValue, 11, XValue, YValue, 6, color);
      if (YValue != 11) {
        let value = (11 - YValue) + '"';
        let newY = 11 + (YValue - 11) / 2;
        let point = convertInchesToPixelsLine(XValue, newY);
        writeScaledBorder(value, point.x + labelOffsetX, point.y);
      }
    } else {
      if (XValue == 15) {
        // Special case - mirrow label placement on centre line
        labelOffsetX = labelOffsetX * -1;
      }
      drawThickLine(getContext(), XValue, 11, XValue, YValue, 6, color);
      if (YValue != 22) {
        let value = (YValue - 11) + '"';
        let newY = 11 + (YValue - 11) / 2;
        let point = convertInchesToPixelsLine(XValue, newY);
        writeScaledBorder(value, point.x + labelOffsetX, point.y);
      }
    }
  }

  if (Turn > 1) {
    drawTurnLabel(XValue, YValue, Turn);
  }
}

function drawLinesShort(XValue, YValue, Turn) {
  let color = "black";
  let labelOffsetY = (YValue > 5 && YValue < 12) || YValue > 16 ? -25 : 25;
  let labelOffsetX = (XValue > 7 && XValue < 16) || XValue > 23 ? -25 : 25;

  if (XValue != 15) {
    if (XValue < 8) {
      // draw from edge
      drawThickLine(getContext(), 0, YValue, XValue, YValue, 6, color)
      if (XValue != 0) {
        let label = XValue + '"';
        let point = convertInchesToPixelsLine(XValue / 2, YValue);
        writeScaledBorder(label, point.x, point.y + labelOffsetY);
      }
    } else if (XValue < 15) {
      // draw from centre
      drawThickLine(getContext(), 15, YValue, XValue, YValue, 6, color);
      let label = (15 - XValue) + '"';
      let newX = 15 + (XValue - 15) / 2;
      let point = convertInchesToPixelsLine(newX, YValue);
      writeScaledBorder(label, point.x, point.y + labelOffsetY);
    } else if (XValue < 23) {
      // draw from centre
      drawThickLine(getContext(), 15, YValue, XValue, YValue, 6, color);
      let label = (XValue - 15) + '"';
      let newX = 15 + (XValue - 15) / 2;
      let point = convertInchesToPixelsLine(newX, YValue);
      writeScaledBorder(label, point.x, point.y + labelOffsetY);
    } else {
      // draw from edge
      drawThickLine(getContext(), 30, YValue, XValue, YValue, 6, color)
      if (XValue != 30) {
        let label = (30 - XValue) + '"';
        let point = convertInchesToPixelsLine(15 + XValue / 2, YValue);
        writeScaledBorder(label, point.x, point.y + labelOffsetY);
      }
    }
  }

  if (YValue != 11) {
    if (YValue > 11 && XValue == 15) {
      // Special case - mirrow label placement on centre line
      labelOffsetX = labelOffsetX * -1;
    }
    if (YValue < 6) {
      // draw from edge
      drawThickLine(getContext(), XValue, 0, XValue, YValue, 6, color)
      if (YValue != 0) {
        let label = YValue + '"';
        let point = convertInchesToPixelsLine(XValue, YValue / 2);
        writeScaledBorder(label, point.x + labelOffsetX, point.y);
      }
    } else if (YValue < 11) {
      // draw from centre
      drawThickLine(getContext(), XValue, 11, XValue, YValue, 6, color);
      let label = (11 - YValue) + '"';
      let newY = 11 + (YValue - 11) / 2;
      let point = convertInchesToPixelsLine(XValue, newY);
      writeScaledBorder(label, point.x + labelOffsetX, point.y);
    } else if (YValue < 17) {
      // draw from centre
      drawThickLine(getContext(), XValue, 11, XValue, YValue, 6, color);
      let label = (YValue - 11) + '"';
      let newY = 11 + (YValue - 11) / 2;
      let point = convertInchesToPixelsLine(XValue, newY);
      writeScaledBorder(label, point.x + labelOffsetX, point.y);
    } else {
      // draw from edge
      drawThickLine(getContext(), XValue, 22, XValue, YValue, 6, color)
      if (YValue != 22) {
        let label = (22 - YValue) + '"';
        let point = convertInchesToPixelsLine(XValue, 11 + YValue / 2);
        writeScaledBorder(label, point.x + labelOffsetX, point.y);
      }
    }
  }

  if (Turn > 1) {
    drawTurnLabel(XValue, YValue, Turn);
  }
}

function drawBorderLine(XValue, YValue, Turn) {
  let color = "black";
  let arrowSize = 0;

  if (YValue == 0) {
    if (XValue < 15) {
      drawThickLine(getContext(), 0, 0, 15, 0, 6, color, arrowSize);
      // Left perpendicular cap
      drawThickLine(getContext(), 0, 0 - .4, 0, 0 + .4, 6, color, arrowSize);
      // Right perpendicular cap
      drawThickLine(getContext(), 15, 0 - .4, 15, 0 + .4, 6, color, arrowSize);
    } else if (XValue > 15) {
      drawThickLine(getContext(), 15, 0, 30, 0, 6, color, arrowSize);
      // Left perpendicular cap
      drawThickLine(getContext(), 15, 0 - .4, 15, 0 + .4, 6, color, arrowSize);
      // Right perpendicular cap
      drawThickLine(getContext(), 30, 0 - .4, 30, 0 + .4, 6, color, arrowSize);
    } else if (XValue == 15) {
      drawThickLine(getContext(), 0, 0, 30, 0, 6, color, arrowSize);
      // Left perpendicular cap
      drawThickLine(getContext(), 0, 0 - .4, 0, 0 + .4, 6, color, arrowSize);
      // Right perpendicular cap
      drawThickLine(getContext(), 30, 0 - .4, 30, 0 + .4, 6, color, arrowSize);
    }
  }

  if (YValue == 22) {
    if (XValue < 15) {
      drawThickLine(getContext(), 0, 22, 15, 22, 6, color, arrowSize);
      // Left perpendicular cap
      drawThickLine(getContext(), 0, 22 - .4, 0, 22 + .4, 6, color, arrowSize);
      // Right perpendicular cap
      drawThickLine(getContext(), 15, 22 - .4, 15, 22 + .4, 6, color, arrowSize);
    } else if (XValue > 15) {
      drawThickLine(getContext(), 15, 22, 30, 22, 6, color, arrowSize);
      // Left perpendicular cap
      drawThickLine(getContext(), 15, 22 - .4, 15, 22 + .4, 6, color, arrowSize);
      // Right perpendicular cap
      drawThickLine(getContext(), 30, 22 - .4, 30, 22 + .4, 6, color, arrowSize);
    } else if (XValue == 15) {
      drawThickLine(getContext(), 0, 22, 30, 22, 6, color, arrowSize);
      // Left perpendicular cap
      drawThickLine(getContext(), 0, 22 - .4, 0, 22 + .4, 6, color, arrowSize);
      // Right perpendicular cap
      drawThickLine(getContext(), 30, 22 - .4, 30, 22 + .4, 6, color, arrowSize);
    }
  }

  if (XValue == 0) {
    if (YValue < 11) {
      drawThickLine(getContext(), 0, 0, 0, 11, 6, color, arrowSize);
      // Top perpendicular cap
      drawThickLine(getContext(), 0 - .4, 0, 0 + .4, 0, 6, color, arrowSize);
      // Bottom perpendicular cap
      drawThickLine(getContext(), 0 - .4, 11, 0 + .4, 11, 6, color, arrowSize);
    } else if (YValue > 11) {
      drawThickLine(getContext(), 0, 11, 0, 22, 6, color, arrowSize);
      // Top perpendicular cap
      drawThickLine(getContext(), 0 - .4, 11, 0 + .4, 11, 6, color, arrowSize);
      // Bottom perpendicular cap
      drawThickLine(getContext(), 0 - .4, 22, 0 + .4, 22, 6, color, arrowSize);
    } else if (YValue == 11) {
      drawThickLine(getContext(), 0, 0, 0, 22, 6, color, arrowSize);
      // Top perpendicular cap
      drawThickLine(getContext(), 0 - .4, 0, 0 + .4, 0, 6, color, arrowSize);
      // Bottom perpendicular cap
      drawThickLine(getContext(), 0 - .4, 22, 0 + .4, 22, 6, color, arrowSize);
    }
  }

  if (XValue == 30) {
    if (YValue < 11) {
      // Original line
      drawThickLine(getContext(), 30, 0, 30, 11, 6, color, arrowSize);
      // Top perpendicular cap
      drawThickLine(getContext(), 30 - .4, 0, 30 + .4, 0, 6, color, arrowSize);
      // Bottom perpendicular cap
      drawThickLine(getContext(), 30 - .4, 11, 30 + .4, 11, 6, color, arrowSize);
    } else if (YValue > 11) {
      drawThickLine(getContext(), 30, 11, 30, 22, 6, color, arrowSize);
      // Top perpendicular cap
      drawThickLine(getContext(), 30 - .4, 11, 30 + .4, 11, 6, color, arrowSize);
      // Bottom perpendicular cap
      drawThickLine(getContext(), 30 - .4, 22, 30 + .4, 22, 6, color, arrowSize);
    } else if (YValue == 11) {
      drawThickLine(getContext(), 30, 0, 30, 22, 6, color, arrowSize);
      // Top perpendicular cap
      drawThickLine(getContext(), 30 - .4, 0, 30 + .4, 0, 6, color, arrowSize);
      // Bottom perpendicular cap
      drawThickLine(getContext(), 30 - .4, 22, 30 + .4, 22, 6, color, arrowSize);
    }
  }

  if (Turn > 1) {
    drawTurnLabel(XValue, YValue, Turn);
  }
}

function drawTurnLabel(XValue, YValue, turn) {
  let point = convertInchesToPixelsLine(XValue, YValue);
  let label = "Rnd " + turn;
  let xOffset = 0;
  if (XValue == 0) {
    xOffset = -50;
  } else if (XValue == 30) {
    xOffset = 50;
  }
  if (YValue == 0 || (YValue > 5 && YValue < 12) || (YValue > 16 && YValue < 22)) {
    writeScaledBorder(label, point.x + xOffset, point.y - 40);
  } else {
    writeScaledBorder(label, point.x + xOffset, point.y + 40);
  }
}

function writeScaledBorder(value, startX, startY) {
  getContext().fillStyle = 'white';
  writeScaled(value, {
    x: startX + 1,
    y: startY
  });
  writeScaled(value, {
    x: startX,
    y: startY + 1
  });
  writeScaled(value, {
    x: startX + 1,
    y: startY + 1
  });
  writeScaled(value, {
    x: startX - 1,
    y: startY
  });
  writeScaled(value, {
    x: startX,
    y: startY - 1
  });
  writeScaled(value, {
    x: startX - 1,
    y: startY - 1
  });
  getContext().fillStyle = 'black';
  writeScaled(value, {
    x: startX,
    y: startY
  });
}

function drawIcons() {
  const isOrientationChecked = document.getElementById("orientation").checked;
  let imgElement, position, size, imageSrc;
  if (isOrientationChecked) {
    // Orientation Runemark
    if (document.getElementById("white").checked) {
      imgElement = document.getElementById("orientation_icon_white");
    } else {
      imgElement = document.getElementById("orientation_icon");
    }
    imageSrc = imgElement.src;
    position = scalePixelPosition({
      x: 80,
      y: 75
    });
    size = scalePixelPosition({
      x: 80,
      y: 80
    });
    drawImageSrc(position, size, imageSrc);

    position = scalePixelPosition({
      x: 950,
      y: 75
    });
    size = scalePixelPosition({
      x: 80,
      y: 80
    });
    drawImageSrc(position, size, imageSrc);
  }
  const isSymmetricalChecked = document.getElementById("symmetrical").checked;
  if (isSymmetricalChecked) {
    // Symmetrical runemark
    if (document.getElementById("white").checked) {
      imgElement = document.getElementById("symmetrical_icon_white");
    } else {
      imgElement = document.getElementById("symmetrical_icon");
    }
    imageSrc = imgElement.src;
    position = scalePixelPosition({
      x: 80,
      y: 650
    });
    size = scalePixelPosition({
      x: 80,
      y: 80
    });
    drawImageSrc(position, size, imageSrc);
  }
}

function splitWordWrap(context, text, fitWidth) {
  // this was modified from the print version to only return the text array
  let return_array = [];
  let lines = text.split('\n');
  let lineNum = 0;
  for (let i = 0; i < lines.length; i++) {
    fitWidth = fitWidth || 0;
    if (fitWidth <= 0) {
      return_array.push(lines[i]);
      lineNum++;
    }
    let words = lines[i].split(' ');
    let idx = 1;
    while (words.length > 0 && idx <= words.length) {
      let str = words.slice(0, idx).join(' ');
      let w = context.measureText(str).width;
      if (w > fitWidth) {
        if (idx == 1) {
          idx = 2;
        }
        return_array.push(words.slice(0, idx - 1).join(' '));
        lineNum++;
        words = words.splice(idx - 1);
        idx = 1;
      } else {
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

function drawText() {
  const cardText = document.getElementById("textValue").value;

  getContext().font = '32px Georgia, serif';
  if (document.getElementById("white").checked) {
    getContext().fillStyle = 'white';
  } else {
    getContext().fillStyle = 'black';
  }

  getContext().textAlign = "left";
  getContext().textBaseline = "middle";

  const font_size = 32;
  const lineHeight = font_size;
  getContext().font = font_size + 'px Georgia, serif';

  let text_array = (splitWordWrap(getContext(), cardText, 800));

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

function drawDeployment() {
  const removeDeployment = document.getElementById("removeDeployment").checked;
  const removeBlueDeployment = document.getElementById("removeBlueDeployment").checked;
  const removeRedDeployment = document.getElementById("removeRedDeployment").checked;

  if (removeDeployment) {
    return;
  }

  drawMap();

  // prepare text for line drawing
  // Draw the text in the middle of the line
  getContext().font = "24px LithosBlack"; // Adjust the font size and style as needed
  getContext().fillStyle = "black";
  getContext().textAlign = "center";
  getContext().textBaseline = "middle";

  let components = [];

  // Treasure and Objectives
  for (let i = 1; i <= 6; i++) {
    let xValue = document.getElementById("objective" + i + "X").value;
    let yValue = document.getElementById("objective" + i + "Y").value;
    let icon = document.getElementById("objective" + i + "Icon").value;
    let label = "";
    let iconName = "objective_" + icon;
    let renderMode = document.getElementById("objective" + i + "RenderMode").value;

    let renderLine = renderMode == "line";
    let renderShort = renderMode == "short";
    let renderFromCentre = renderMode == "centre";

    if (icon > 0) {
      components.push({
        xValue: xValue,
        yValue: yValue,
        iconName: iconName,
        label: label,
        renderLine: renderLine,
        renderFromCentre: renderFromCentre,
        renderShort: renderShort
      });
    }
  }

  let deployments = [];
  if (!removeRedDeployment) {
    GROUPS.forEach(group => {
      deployments.push("red" + group);
    });
  }
  if (!removeBlueDeployment) {
    GROUPS.forEach(group => {
      deployments.push("blue" + group);
    });
  }

  deployments.forEach(deployment => {
    let xValue = document.getElementById(deployment + "X").value;
    let yValue = document.getElementById(deployment + "Y").value;
    let label = document.getElementById(deployment + "Turn").value;
    let renderMode = document.getElementById(deployment + "RenderMode").value;

    let renderLine = renderMode == "line";
    let renderShort = renderMode == "short";
    let renderFromCentre = renderMode == "centre";

    let iconName = camelToSnake(deployment);

    components.push({
      xValue: xValue,
      yValue: yValue,
      iconName: iconName,
      label: label,
      renderLine: renderLine,
      renderFromCentre: renderFromCentre,
      renderShort: renderShort
    });
  });

  components.forEach(component => {
    if (component.renderLine) {
      drawBorderLine(component.xValue, component.yValue, component.label);
    } else if (component.renderShort) {
      drawLinesShort(component.xValue, component.yValue, component.label);
    } else if (component.renderFromCentre) {
      drawLinesFromCentre(component.xValue, component.yValue, component.label);
    } else {
      drawLines(component.xValue, component.yValue, component.label);
    }
  });
  components.forEach(component => {
    drawIcon(component.iconName, component.xValue, component.yValue);
  });
}

function camelToSnake(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase()
}

function titelize(str) {
  const b = str.substr(0, 4).normalize();
  return b[0].toUpperCase() + b.substr(1) + str.substr(4);
}

function onJoystickKeyPress(input) {
  let event = window.event;
  const modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

  if (modifierKey && !(event.keyCode == 9 && event.shiftKey)) {
    return;
  }

  if ((event.keyCode < 37 || event.keyCode > 40) && event.keyCode != 32 && event.keyCode != 9 && event.keyCode != 187) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  let scopeName = input.id.replace(/Joystick/, "");
  let xField = document.getElementById(scopeName + "X");
  let yField = document.getElementById(scopeName + "Y");
  let iconField = document.getElementById(scopeName + "Icon");
  let renderModeField = document.getElementById(scopeName + "RenderMode");
  let numberOfOptions = renderModeField.options.length;
  let joysticks = Array.from(document.querySelectorAll('input[type="radio"][name="joystick"]'));

  switch (event.keyCode) {
  case 9: // tab
    let index;
    if (event.shiftKey) {
      index = joysticks.indexOf(input) - 1;
      if (index < 0) {
        index = joysticks.length - 1;
      }
    } else {
      index = (joysticks.indexOf(input) + 1) % joysticks.length;
    }
    document.getElementById("redCollapse").classList.add("show");
    document.getElementById("blueCollapse").classList.add("show");
    document.getElementById("objectiveCollapse").classList.add("show");
    joysticks[index].focus();
    joysticks[index].checked = true;
    break;
  case 32: // spacebar
    renderModeField.selectedIndex = (renderModeField.selectedIndex + 1) % numberOfOptions;
    break;
  case 187: // plus (+)
    if (iconField) {
      iconField.value = Math.min(10, parseInt(iconField.value) + 1);
    }
    break;
  case 37: // left
    xField.value = Math.max(0, parseInt(xField.value) - 1);
    break;
  case 38: // up
    yField.value = Math.max(0, parseInt(yField.value) - 1);
    break;
  case 39: // right
    xField.value = Math.min(30, parseInt(xField.value) + 1);
    break;
  case 40: // down
    yField.value = Math.min(22, parseInt(yField.value) + 1);
    break;
  default:
    return;
  }

  onAnyChange();
}
