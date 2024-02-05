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

let _canvas = null;

function getCanvas() {
  return _canvas || document.getElementById("canvas");
}

function getContext() {
  return getCanvas().getContext("2d");
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

function commitCanvasBuffer(targetCanvas) {
  let currentCanvas = getCanvas();
  let currentContext = currentCanvas.getContext("2d");
  let targetContext = targetCanvas.getContext("2d");
  let imageData = currentContext.getImageData(0, 0, currentCanvas.width, currentCanvas.height);

  targetContext.putImageData(imageData, 0, 0);
  _canvas = targetCanvas;
  document.body.removeChild(currentCanvas);
}

function getBackgroundImage(bgName) {
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
    'bg-transparent': 'bg-transparent',
  };

  bgName = bgName || document.getElementById('background-list').value;
  const backgroundImageId = backgroundMap[bgName];

  return document.getElementById(backgroundImageId);
}

function getMapImage(mapName) {
  return document.getElementById(mapName || "map");
}

function drawBorder(removeBorder) {
  if (!removeBorder) {
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

function drawMissionName(missionData) {
  let value = missionData.missionName;
  let startX = 1122 / 2;
  let startY = 140;
  if (missionData.bgselected === 'bg-13') {
    getContext().font = '60px schoensperger';
  } else {
    getContext().font = '60px lithosblack';
  }
  if (missionData.white) {
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

  if (missionData.white) {
    getContext().fillStyle = 'white';
  } else {
    getContext().fillStyle = 'black';
  }
  writeScaled(value, {
    x: startX,
    y: startY
  });
}

function drawMissionType(missionData) {
  let value = missionData.missionType;
  startX = 1122 / 2;
  startY = 90;
  if (missionData.bgselected === 'bg-13') {
    getContext().font = '40px schoensperger';
  } else {
    getContext().font = '40px lithosblack';
  }

  if (missionData.white) {
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

  if (missionData.white) {
    getContext().fillStyle = 'white';
  } else {
    getContext().fillStyle = 'black';
  }
  writeScaled(value, {
    x: startX,
    y: startY
  });
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

function setModelImage(image) {
  document.getElementById("missionImageUrl").value = image;
}

function getModelImage() {
  let imageSelect = document.getElementById("imageSelect");

  if (imageSelect.files.length > 0) {
    return URL.createObjectURL(imageSelect.files[0]);
  }
  return null;
}

function getModelImageProperties() {
  return {
    offsetX: document.getElementById("imageOffsetX").valueAsNumber,
    offsetY: document.getElementById("imageOffsetY").valueAsNumber,
    scalePercent: document.getElementById("imageScalePercent").valueAsNumber
  };
}

function setModelImageProperties(modelImageProperties) {
  document.getElementById("imageOffsetX").value = modelImageProperties.offsetX;
  document.getElementById("imageOffsetY").value = modelImageProperties.offsetY;
  document.getElementById("imageScalePercent").value = modelImageProperties.scalePercent;
}

function getTerrainImageUrl() {
  let imageSelect = document.getElementById("missionImageUrl").value;
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
  data.imageUrl = getTerrainImageUrl();
  data.imageProperties = getModelImageProperties();
  data.customBackgroundUrl = getCustomBackgroundUrl();
  data.customBackgroundProperties = getCustomBackgroundProperties();
  data.missionName = document.getElementById("missionName").value;
  data.missionType = document.getElementById("missionType").value;
  data.bgselected = document.getElementById('background-list').value;
  data.map = document.getElementById('map-list').value;

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
  data.removeRedDeployment = document.getElementById("removeRedDeployment").checked;
  data.removeBlueDeployment = document.getElementById("removeBlueDeployment").checked;
  data.symmetrical = document.getElementById("symmetrical").checked;
  data.orientation = document.getElementById("orientation").checked;
  data.white = document.getElementById("white").checked;

  data.textValue = document.getElementById("textValue").value;

  return data;
}

function render(missionData) {
  return new Promise((resolve, reject) => {
    let canvas = beginCanvasBuffer();
    getContext().clearRect(0, 0, canvas.width, canvas.height);
    let promise;
    if (missionData.customBackgroundUrl) {
      promise = renderCustomBackground(missionData);
    } else {
      promise = renderDefaultBackground(missionData);
    }
    promise.then(function() {
      drawBorder(missionData.removeBorder);
      drawMap(missionData);
      renderImage(missionData.imageUrl, missionData.imageProperties).then(function() {
        drawOverlayTexts(missionData);
        drawDeployment(missionData);
        drawText(missionData);
        drawIcons(missionData);
        drawBorder(missionData.removeBorder);
        commitCanvasBuffer(canvas);
        resolve();
      });
    });
  });
}

function renderDefaultBackground(missionData) {
  let image = getBackgroundImage(missionData.bgselected);
  getContext().drawImage(image, 0, 0, getCanvas().width, getCanvas().height);
  return Promise.resolve();
};

function renderCustomBackground(missionData) {
  return renderImage(missionData.customBackgroundUrl, missionData.customBackgroundProperties);
};

function renderImage(imageUrl, imageProperties) {
  return new Promise((resolve, reject) => {
    if (imageUrl) {
      const image = new Image();
      image.onload = function() {
        const position = scalePixelPosition({
          x: 160 + imageProperties.offsetX,
          y: 160 + imageProperties.offsetY
        });
        const scale = imageProperties.scalePercent / 100.0;
        const width = image.width * scale;
        const height = image.height * scale;
        getContext().drawImage(image, position.x, position.y, width, height);
        resolve();
      };
      image.src = imageUrl;
    } else {
      // Drawn if no image, or when file is loaded but no image included
      resolve();
    }
  });
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
  document.getElementById("missionName").value = data.missionName;
  document.getElementById("missionType").value = data.missionType;

  document.getElementById("saveName").value = data.missionName;

  // check and uncheck if needed

  document.getElementById('background-list').value = data.bgselected;
  document.getElementById('map-list').value = data.map || "map";

  COLOURS.forEach(colour => {
    document.getElementById("remove" + titelize(colour) + "Deployment").checked = data["remove" + titelize(colour) + "Deployment"];

    GROUPS.forEach(group => {
      document.getElementById(colour + group + "RenderMode").value = data[colour + group + "RenderMode"] || "short";
      document.getElementById(colour + group + "X").value = data[colour + group + "XValue"];
      document.getElementById(colour + group + "Y").value = data[colour + group + "YValue"];
      document.getElementById(colour + group + "Turn").value = data[colour + group + "Turn"];
    });
  });

  for (let i = 1; i <= 6; i++) {
    document.getElementById("objective" + i + "X").value = data["objective" + i + "XValue"];
    document.getElementById("objective" + i + "Y").value = data["objective" + i + "YValue"];
    document.getElementById("objective" + i + "Icon").value = data["objective" + i + "Icon"];
    document.getElementById("objective" + i + "RenderMode").value = data["objective" + i + "RenderMode"] || "short";
  }

  document.getElementById("removeBorder").checked = data.removeBorder;
  document.getElementById("removeDeployment").checked = data.removeDeployment;
  document.getElementById("removeRedDeployment").checked = data.removeRedDeployment;
  document.getElementById("removeBlueDeployment").checked = data.removeBlueDeployment;
  document.getElementById("symmetrical").checked = data.symmetrical;
  document.getElementById("orientation").checked = data.orientation;
  document.getElementById("white").checked = data.white;

  document.getElementById("textValue").value = data.textValue;

  // render the updated info
  render(data);
}

function onMissionNameChange() {
  document.getElementById("saveName").value = document.getElementById("missionName").value;
  onAnyChange();
}

function onSlotListChange() {
  let selectedValue = document.getElementById("slotList").value;
  if (selectedValue) {
    document.getElementById("saveName").value = selectedValue;
  }
}

function defaultMissionData() {
  let data = new Object;
  data.imageUrl = null;
  data.imageProperties = getDefaultModelImageProperties();
  data.base64Image = null;
  data.customBackgroundUrl = null;
  data.customBackgroundProperties = getDefaultModelImageProperties();
  data.base64CustomBackground = null;
  data.missionName = "Straight Face Off";
  data.missionType = "Deployment";

  data.bgselected = "bg-07";
  data.map = "map";

  data.blueHammerXValue = 24;
  data.blueHammerYValue = 17;
  data.blueHammerLine = false;
  data.blueHammerTurn = 1;
  data.blueHammerRenderMode = 'short';

  data.blueShieldXValue = 15;
  data.blueShieldYValue = 15;
  data.blueShieldLine = false;
  data.blueShieldTurn = 1;
  data.blueShieldRenderMode = 'short';

  data.blueDaggerXValue = 6;
  data.blueDaggerYValue = 17;
  data.blueDaggerLine = false;
  data.blueDaggerTurn = 1;
  data.blueDaggerRenderMode = 'short';

  data.removeBlueDeployment = false;

  data.redHammerXValue = 24;
  data.redHammerYValue = 5;
  data.redHammerLine = false;
  data.redHammerTurn = 1;
  data.redHammerRenderMode = 'short';

  data.redShieldXValue = 15;
  data.redShieldYValue = 7;
  data.redShieldLine = false;
  data.redShieldTurn = 1;
  data.redShieldRenderMode = 'short';

  data.redDaggerXValue = 6
  data.redDaggerYValue = 5;
  data.redDaggerLine = false;
  data.redDaggerTurn = 1;
  data.redDaggerRenderMode = 'short';

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
  data.removeRedDeployment = false;
  data.removeBlueDeployment = false;
  data.symmetrical = false;
  data.orientation = true;
  data.white = false;

  data.textValue = "";
  return data;
}

async function writeMissionData(name, data) {
  let slots = readMissionSlots();
  if (data == null) {
    delete slots[name];
  } else {
    data.base64Image = await handleImageUrlFromDisk(data.imageUrl)
    data.base64CustomBackground = await handleImageUrlFromDisk(data.customBackgroundUrl)
    slots[name] = data;
  }
  window.localStorage.setItem("missionDataSlots", JSON.stringify(slots));
}

function readMissionData(name) {
  let slots = readMissionSlots();
  return slots[name];
}

function saveMissionData() {
  writeMissionData("default", readControls());
}

function loadMissionDataOrDefault() {
  let data = readMissionData("default") || defaultMissionData();
  writeControls(data);
}

function readMissionSlots() {
  let raw = window.localStorage.getItem("missionDataSlots");
  return raw ? JSON.parse(raw) : {};
}

function enumerateMissionSlots(includeDefault = false) {
  return Object.keys(readMissionSlots()).filter(x => includeDefault || x != "default");
}

function onSaveSlot() {
  let name = document.getElementById("saveName").value || generateName();
  let data = readControls();
  writeMissionData(name, data);
  updateSlotList();
  document.getElementById("slotList").value = name;
}

function onLoadSlot() {
  let slotList = document.getElementById("slotList");
  let selectedName = slotList.value;
  if (!selectedName) {
    return;
  }

  let data = readMissionData(selectedName);
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

  writeMissionData(selectedName, null);
  updateSlotList();
}

function updateSlotList() {
  let slotList = document.getElementById("slotList");
  let shouldContain = enumerateMissionSlots(false);
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
  saveMissionData();
}

function onTerrainImageUpload() {
  let image = getModelImage();
  setModelImage(image);
  onAnyChange();
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

function onResetToDefault() {
  writeControls(defaultMissionData());
  onAnyChange();
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

function onExportMapToImage() {
  let data = readControls();

  data.missionName = "";
  data.missionType = "";
  data.customBackgroundUrl = null;
  data.bgselected = 'bg-transparent';
  data.removeBorder = true;
  data.symmetrical = false;
  data.orientation = false;

  render(data).then(function() {
    const offset = 80;
    let imageData = getContext().getImageData(0, offset, getCanvas().width, getCanvas().height - offset);
    let tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = 1122;
    tmpCanvas.height = 822 - offset;
    document.body.appendChild(tmpCanvas);
    let tmpContext = tmpCanvas.getContext('2d');
    tmpContext.putImageData(imageData, 0, 0);
    downloadImageData(tmpCanvas, "warcry-mission-map.png");
    document.body.removeChild(tmpCanvas);
    render(readControls());
  });
}

function onExportToImage() {
  let data = readControls();
  let fileName = "warcry_mission_";
  if (data.missionType != "") {
    fileName = fileName + data.missionType.replace(/ /g, "_") + "_";
  }
  fileName = fileName + data.missionName.replace(/ /g, "_") + ".png";

  downloadImageData(getCanvas(), fileName);
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

async function readJSONFile(file) {
  // Function will return a new Promise which will resolve or reject based on whether the JSON file is read and parsed successfully
  return new Promise((resolve, reject) => {
    // Define a FileReader Object to read the file
    let fileReader = new FileReader();
    // Specify what the FileReader should do on the successful read of a file
    fileReader.onload = event => {
      // If successfully read, resolve the Promise with JSON parsed contents of the file
      resolve(JSON.parse(event.target.result));

      saveMissionData();
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
    offsetX: document.getElementById("customBackgroundOffsetX").valueAsNumber,
    offsetY: document.getElementById("customBackgroundOffsetY").valueAsNumber,
    scalePercent: document.getElementById("customBackgroundScalePercent").valueAsNumber,
  };
}

function setCustomBackgroundProperties(customBackgroundProperties) {
  document.getElementById("customBackgroundOffsetX").value = customBackgroundProperties.offsetX || 0;
  document.getElementById("customBackgroundOffsetY").value = customBackgroundProperties.offsetY || 0;
  document.getElementById("customBackgroundScalePercent").value = customBackgroundProperties.scalePercent || 100;
}

function getCustomBackground() {
  let imageSelect = document.getElementById("customBackgroundSelect");
  if (imageSelect.files.length > 0) {
    return URL.createObjectURL(imageSelect.files[0]);
  }
  return null;
}

function setCustomBackground(image) {
  document.getElementById("customBackgroundUrl").value = image;
}

function onCustomBackgroundUpload() {
  image = getCustomBackground();
  setCustomBackground(image);
  onAnyChange();
}

function getCustomBackgroundUrl() {
  let imageSelect = document.getElementById("customBackgroundUrl").value;
  return imageSelect;
}

function drawOverlayTexts(missionData) {
  // These are the texts to overlay
  drawMissionName(missionData);
  drawMissionType(missionData);
}

function drawMap(missionData) {
  getContext().drawImage(getMapImage(missionData.map), 0, 0, getCanvas().width, getCanvas().height);
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

function drawLines(XValue, YValue, turn, mode = "auto") {
  let color = "black";
  let labelOffsetY = (YValue > 5 && YValue < 12) || YValue > 16 ? -25 : 25;
  let labelOffsetX = (XValue > 7 && XValue < 16) || XValue > 23 ? -25 : 25;
  const forceEdge = mode == "edge";
  const forceCentre = mode == "centre";

  if (XValue != 15) {
    if ((XValue < 8 && !forceCentre) || (forceEdge && XValue < 15)) {
      // draw from edge
      drawThickLine(getContext(), 0, YValue, XValue, YValue, 6, color)
      if (XValue != 0) {
        let label = XValue + '"';
        let point = convertInchesToPixelsLine(XValue / 2, YValue);
        writeScaledBorder(label, point.x, point.y + labelOffsetY);
      }
    } else if (XValue < 15 || (forceCentre && XValue < 15)) {
      // draw from centre
      drawThickLine(getContext(), 15, YValue, XValue, YValue, 6, color);
      let label = (15 - XValue) + '"';
      let newX = 15 + (XValue - 15) / 2;
      let point = convertInchesToPixelsLine(newX, YValue);
      writeScaledBorder(label, point.x, point.y + labelOffsetY);
    } else if ((XValue < 23 && !forceEdge) || (forceCentre && XValue > 15)) {
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
    if ((YValue < 6 && !forceCentre) || (forceEdge && YValue < 11)) {
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
    } else if ((YValue < 17 && !forceEdge) || (forceCentre && YValue > 11)) {
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

  if (turn > 1) {
    drawTurnLabel(XValue, YValue, turn);
  }
}

function drawBorderLine(XValue, YValue, turn) {
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

  if (turn > 1) {
    drawTurnLabel(XValue, YValue, turn);
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
  if (XValue == 0) {
    writeScaledBorder(label, point.x - 20 + xOffset, point.y);
  } else if (XValue == 30) {
    writeScaledBorder(label, point.x + 20 + xOffset, point.y);
  } else if (YValue == 0 && XValue == 0) {
    writeScaledBorder(label, point.x + xOffset + 120, point.y - 20);
  } else if (YValue == 0 && XValue < 16) {
    writeScaledBorder(label, point.x + xOffset + 70, point.y - 20);
  } else if (YValue == 0 && XValue == 30) {
    writeScaledBorder(label, point.x + xOffset - 120, point.y - 20);
  } else if (YValue == 0 && XValue > 15) {
    writeScaledBorder(label, point.x + xOffset - 70, point.y - 20);
  } else if (YValue == 22 && XValue < 16) {
    writeScaledBorder(label, point.x + xOffset + 70, point.y + 20);
  } else if (YValue == 22 && XValue > 15) {
    writeScaledBorder(label, point.x + xOffset - 70, point.y + 20);
  } else if ((YValue > 5 && YValue < 12) || (YValue > 16 && YValue < 22)) {
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

function drawIcons(missionData) {
  const isOrientationChecked = missionData.orientation;
  let imgElement, position, size, imageSrc;
  if (isOrientationChecked) {
    // Orientation Runemark
    if (missionData.white) {
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
  const isSymmetricalChecked = missionData.symmetrical;
  if (isSymmetricalChecked) {
    // Symmetrical runemark
    if (missionData.white) {
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

function drawText(missionData) {
  const cardText = missionData.textValue;

  getContext().font = '32px Georgia, serif';
  if (missionData.white) {
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

function drawDeployment(missionData) {
  const removeDeployment = missionData.removeDeployment;
  const removeBlueDeployment = missionData.removeBlueDeployment;
  const removeRedDeployment = missionData.removeRedDeployment;

  if (removeDeployment) {
    return;
  }

  // prepare text for line drawing
  // Draw the text in the middle of the line
  getContext().font = "24px LithosBlack"; // Adjust the font size and style as needed
  getContext().fillStyle = "black";
  getContext().textAlign = "center";
  getContext().textBaseline = "middle";

  let components = [];

  // Treasure and Objectives
  for (let i = 1; i <= 6; i++) {
    let xValue = missionData["objective" + i + "XValue"];
    let yValue = missionData["objective" + i + "YValue"];
    let icon = missionData["objective" + i + "Icon"];
    let label = "";
    let iconName = "objective_" + icon;
    let renderMode = missionData["objective" + i + "RenderMode"];

    if (icon > 0) {
      components.push({
        xValue: xValue,
        yValue: yValue,
        iconName: iconName,
        label: label,
        renderMode: renderMode
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
    let xValue = missionData[deployment + "XValue"];
    let yValue = missionData[deployment + "YValue"];
    let label = missionData[deployment + "Turn"];
    let renderMode = missionData[deployment + "RenderMode"];
    let iconName = camelToSnake(deployment);

    if (parseInt(label) != 0) {
      components.push({
        xValue: xValue,
        yValue: yValue,
        iconName: iconName,
        label: label,
        renderMode: renderMode
      });
    }
  });

  components.forEach(component => {
    if (component.renderMode == "line") {
      drawBorderLine(component.xValue, component.yValue, component.label);
    } else {
      drawLines(component.xValue, component.yValue, component.label, component.renderMode);
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

  const keyCodes = [37, 38, 39, 40, 32, 9, 187, 189];

  if (!keyCodes.includes(event.keyCode)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  let scopeName = input.id.replace(/Joystick/, "");
  let xField = document.getElementById(scopeName + "X");
  let yField = document.getElementById(scopeName + "Y");
  let turnField = document.getElementById(scopeName + "Turn");
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
      const max = parseInt(iconField.max) + 1;
      iconField.value = (parseInt(iconField.value) + 1) % max;
    }
    if (turnField) {
      turnField.value = Math.max(1, (parseInt(turnField.value) + 1) % 6);
    }
    break;
  case 189: // minus (-)
    if (iconField) {
      const max = parseInt(iconField.max) + 1;
      iconField.value = (parseInt(iconField.value) + max - 1) % max;
    }
    if (turnField) {
      turnField.value = (parseInt(turnField.value) + 5) % 6;
      if (turnField.value == 0) {
        turnField.value = 5;
      }
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

function randomDeployment() {
  let name = generateName();
  document.getElementById("missionName").value = name;
  document.getElementById("saveName").value = name;

  // Remove objectives
  for (let i = 1; i <= 6; i++) {
    document.getElementById("objective" + i + "Icon").value = 0;
  }

  const generateX = function() {
    let val = Math.floor(Math.random() * 31);
    if (val < 3) {
      return 0;
    } else if (val > 27) {
      return 30;
    } else if (val < 18 && val > 12) {
      return 15;
    } else {
      return val;
    }
  }

  const generateY = function() {
    let val = Math.floor(Math.random() * 23);
    if (val < 3) {
      return 0;
    } else if (val > 19) {
      return 22;
    } else if (val < 14 && val > 8) {
      return 11;
    } else {
      return val;
    }
  }

  const populateDeployment = function(scope) {
    const turnOptions = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3];
    let x = generateX();
    let y = generateY();

    if (x == 0 || x == 30) {
      if (y > 0 && y < 11) {
        y = 6;
      }
      if (y > 11 && y < 22) {
        y = 16;
      }
    }

    if (y == 0 || y == 22) {
      if (x > 0 && x < 15) {
        x = 7;
      }
      if (x > 15 && x < 30) {
        x = 23;
      }
    }

    document.getElementById(scope + "X").value = x;
    document.getElementById(scope + "Y").value = y;
    let turn = turnOptions[Math.floor(Math.random() * turnOptions.length)];
    document.getElementById(scope + "Turn").value = turn;

    let onLine = (x == 0 && y != 0 && y != 22) || (y == 0 && x != 0 && x != 30) || (x == 30 && y != 0 && y != 22) || (y == 22 && x != 0 && x != 30);
    document.getElementById(scope + "RenderMode").value = onLine ? 'line' : 'short';
    return {
      x: x,
      y: y,
      turn: turn
    }
  }

  const pointsOverlap = function(p1, p2) {
    const distX = Math.abs(p1[0] - p2[0]);
    const distY = Math.abs(p1[1] - p2[1]);
    return distX < 3 && distY < 3;
  }

  const allPoints = function() {
    return COLOURS.flatMap(colour => {
      return GROUPS.map(group => {
        return [
          parseInt(document.getElementById(colour + group + "X").value),
          parseInt(document.getElementById(colour + group + "Y").value)
        ];
      });
    });
  }

  const hasConflicts = function() {
    let points = allPoints();
    return points.filter(point => {
      if (points.filter(p2 => pointsOverlap(point, p2)).length > 1) {
        return true;
      }
      return false;
    }).length > 0;
  }

  while (true) {
    let hasRnd1 = false;
    GROUPS.forEach(group => {
      let deployment = populateDeployment("red" + group);
      hasRnd1 = hasRnd1 || deployment.turn == 1;
    });
    onCopyFromRed();

    if (hasRnd1 && !hasConflicts()) {
      break;
    }
  }

  document.getElementById("symmetrical").checked = true;
  onAnyChange();
}

// I stole these word lists from https://www.chaoticanwriter.com/random-name-generators/fantasy-landscape-name-generator/
const wordlist1 = ["Uncanny", "Blessed", "Clawing", "Kings", "Lords", "Ladys", "Roaring", "Blissful", "Sacred", "Soaring", "High", "Ancients", "Elders", "Fables", "Dead", "Skull", "Skyward", "Sword", "Shielding", "Hammer", "Blistering", "Queens", "Emperors", "Frozen", "Winters", "Summers", "Autumns", "Springs", "Feral", "Hunters", "Forsaken", "Ashen", "Battle", "Beggers", "Broken", "Crows", "Ravens", "Culling", "Death", "Dusken", "Watchers", "Edens", "Ember", "Aether", "Ether", "Far", "Fire", "Fallen", "Hills", "Horizons", "Iron", "Moon", "Moons", "North", "South", "East", "West", "Northern", "Southern", "Eastern", "Western", "Central", "Middle", "Wayward", "Oaken", "Black", "Blue", "Violet", "Shimmering", "Shade", "Doom", "Wolfs", "White", "Wind", "Forgotten", "Myths", "Legends", "Lonely", "Old", "Dragons", "Beasts", "Wishers", "Wanderers", "Dark", "Thundering", "Slavers", "Masters", "Amber", "Blest", "Clouded", "Dying", "Ever", "Fae", "Greater", "Lesser", "Mist", "Woven", "River", "Royal", "Fifth", "Twelfth", "Thirteenth", "Shadow", "Shallow", "Over", "Under", "Lower", "Upper", "Higher", "Two", "Eternity", "Mirror", "Story", "Song", "Birdsong", "Vangard", "Uncharted", "Third", "Seventh", "Monarchs", "Barons", "Vassals", "Knights", "Abbey", "Guilders", "Razors", "Pikes", "Spear", "Alewives", "Bandits", "Sailors", "Castle", "Holy", "Unholy", "Stargazers", "Warriors", "Bishop", "Candle", "Honor", "Forlorn", "Haunted", "Sorrow", "Scorched", "Solar", "Primal", "Dust", "Clay", "Dread", "Dark", "Heart", "Blind", "Prime", "Vagrant", "Devils", "Nights", "Tyrants", "Maidens", "Sellsword", "Slayers", "Silent", "Miners", "Titans", "Cardinal", "Serpent", "Azure", "Ebon", "Wilder", "Wretched", "Sanguine", "Lancers", "Dirge", "Spine", "Hungering", "Rebel", "Scythe", "Edge", "Ice", "Earth", "Wind", "Spirit", "Anima", "Labyrinth", "Storm", "Briar", "Singing", "Dagger", "Mourning", "Wraiths", "Valor", "Jester", "Ruined", "Hellfire", "Bleak", "Rose", "Groveling", "Seers", "Wolfbane", "Dragonscale", "Coral", "Misty", "Blackened", "Hidden", "Lions", "Stags", "Winding", "Witchy", "Pine", "Elm", "Cradle", "Traitors", "Dream", "Burning", "Spell", "Moonlit", "Sunlit", "Moonless", "Sunless", "Lightless", "Darkness", "Darkly", "Blight", "Bright", "Redeemers", "Judgement", "Courage", "Mead", "Bitter", "Sleeping", "Enchanted", "Eldar", "Daemon", "Aegis", "Imperial", "Virtue", "Spade", "Plowshare", "Ignis", "Glacies", "Glacier", "Tempest", "Desolate", "Endless", "Eternal", "Unending", "Leaping", "Indigo", "Buckler", "Needle", "Arrow", "Splintered", "Sacred", "Divine", "Arcane", "Seekers", "Widows", "Liars", "Mad", "Archon", "Praetor", "Dracona", "Heavens", "Swordbearer", "Shiledbearer", "Swordmaiden", "Shieldmaiden", "Magisters", "Regents", "Revenant", "Arch", "Vicar", "Viceroy", "Duchess", "Marquis", "Margrave", "Baronet", "Dame", "Herald", "Gentry", "Thane", "Journeyman", "Falcon", "Blade", "Mage", "Dragoon", "Blasted", "Emerald", "Crimson", "Cerulean", "Twisting", "Shining", "Frozen", "Rotting", "Rotten", "Obsidian", "Severed", "Warring", "Bronze", "Golden", "Silver", "Copper", "Gloaming", "Billowing", "Angel", "Blighted", "Junkers", "Muddled", "Remnant", "Turmoils", "Swollen", "Flooded", "Angular", "Ballast", "Cracked", "Shattered", "Jagged", "Wounded", "Godforsaken", "Wildling", "Basalt", "Granite", "Bluestone", "Druidstone", "Temple", "Ardent", "Meteor", "Colonial", "Shivering", "Wobbling", "Trembling", "Windswept", "Locust", "Evergreen", "Primeval", "Gemstone", "Diamond"];

const wordlist2 = ["Arch", "Archipelago", "Atoll", "Ayre", "Badlands", "Bank", "Barren", "Barrens", "Barrier", "Basin", "Bay", "Baymouth", "Bayou", "Beach", "Berg", "Bight", "Billow", "Bluffs", "Bog", "Boil", "Bornhardt", "Bottoms", "Boulder", "Bowl", "Braid", "Branch", "Brine", "Brook", "Bryn", "Burg", "Burn", "Caldera", "Canal", "Canyon", "Cape", "Capstone", "Cascade", "Cave", "Cavern", "Cay", "Channel", "Chasm", "Chasmata", "Cirque", "Cliff", "Climb", "Coast", "Corona", "Cove", "Crater", "Creek", "Crescent", "Crest", "Crevasse", "Decay", "Deep", "Dell", "Dells", "Delta", "Depths", "Desert", "Desert", "Dome", "Dorsa", "Downs", "Drain", "Drink", "Drop", "Drylands", "Dunes", "Dusts", "Earth", "Everglade", "Evermount", "Everpeak", "Expanse", "Eyes", "Falls", "Fen", "Fenland", "Fields", "Fires", "Firth", "Fissure", "Fjords", "Flatlands", "Flats", "Flood", "Floodplain", "Foreland", "Forest", "Fragments", "Fray", "Frost", "Furrow", "Garden", "Geyser", "Glacier", "Glen", "Gorge", "Green", "Greenwood", "Groove", "Grotto", "Ground", "Grounds", "Grove", "Gulf", "Gully", "Gultch", "Half-Isle", "Hands", "Head", "Headland", "Heath", "Heights", "Hells", "Highlands", "Hill", "Hillcrest", "Hills", "Hole", "Hollow", "Horn", "Hotsprings", "Icelands", "Infenus", "Inferno", "Inlet", "Iris", "Island", "Islands", "Isle", "Isles", "Islet", "Jungle", "Karst", "Kettle", "Knee", "Lagoon", "Lake", "Lakes", "Lands", "Limb", "Linea", "Loch", "Lowlands", "Maculae", "Maelstrom", "Magma", "Main", "Marais", "Mare", "Marine", "Mark", "Marsh", "Marshes", "Marshes", "Marshlands", "Meander", "Meer", "Mesa", "Mire", "Mons", "Montes", "Moor", "Moorland", "Moraine", "Morass", "Mound", "Mount", "Mountain", "Mountains", "Mouth", "Muck", "Mudflats", "Neck", "Oasis", "Ocean", "Ocean", "Overlook", "Palm", "Pan", "Pass", "Passage", "Path", "Peak", "Peninsula", "Pines", "Pinnacle", "Pit", "Place", "Plain", "Plana", "Planes", "Planitia", "Plate", "Plateau", "Point", "Pond", "Pool", "Prairie", "Pyres", "Quag", "Quagmire", "Rainforest", "Range", "Rapid", "Rapids", "Ravine", "Reach", "Recess", "Reef", "Reefs", "Regio", "Ridge", "Ridge", "Rise", "River", "River Delta", "Riverbed", "Riverlands", "Rivulet", "Rocks", "Ruin", "Run", "Salt Marsh", "Salts", "Sand Dunes", "Sands", "Sands", "Sea", "Sea", "Seas", "See", "Shaft", "Shelf", "Shield", "Shoal", "Shoulder", "Skog", "Skov", "Sliver", "Slope", "Snow", "Snowfield", "Snowlands", "Sound", "Spine", "Spires", "Spit", "Spring", "Stacks", "Steppe", "Stepstones", "Stones", "Stoneway", "Strait", "Strand", "Strath", "Stream", "Swamp", "Swamp", "Sweep", "Swell", "Table", "Teeth", "Terra", "Terrace", "Terrae", "Thicket", "Throat", "Tides", "Timberland", "Torrent", "Towhead", "Tract", "Trenches", "Tributary", "Tundra", "Vale", "Vales", "Valley", "Vent", "Void", "Volcano", "Wald", "Wastes", "Waterfall", "Waters", "Watershed", "Waves", "Wetlands", "Wilderlands", "Wilderness", "Wilds", "Wood", "Wood", "Woodlands", "Yeoland", "Frontier", "Wells", "Camp", "Chalet", "Fort", "Ruins", "Rubble", "Ashland", "Ashlands", "Shipwreck", "Decay", "Rotland", "Rotlands", "Swampland", "Swamplands", "Bogland", "Boglands", "Blights", "Gloryland", "Cairn", "Shambles", "Bombsite", "Wreckage", "Scrapyard", "Remains", "Dig", "Archeological Site", "Spoils", "Tangle", "Expedition", "Excavation", "Historical Site", "Hold", "Research Site", "Monument", "Monolyth", "Obelisk", "Ringstones", "Headstones", "Cemetery", "Masoleum", "Crypt", "Crypts", "Tomb", "Tomblands", "Shrine", "Temple", "Marker", "Pillar", "Tablet", "Megalith", "Edifice", "Tombstone", "Cross", "Crossing", "Pylon", "Pylons", "Chamber", "Burial Site", "Burial Chamber", "Dome", "Rock", "Rockyard", "Rocklands", "Cromlech", "Rest", "Spindle", "Fulcrum", "Wyrd", "Knee", "Weld", "Crossroads", "Anchor", "Crux", "Crucible", "Lock", "Gate", "Reach", "Braid", "Ballast", "Basket", "Ruggedlands", "Breach", "Portal", "Wound", "Crag", "Solitude", "Outback", "Dusklands", "Brushland", "Vastness", "Deluge", "Overflow", "Quicksand", "Bombard", "Dross", "Dregs", "Coil", "Peaks", "Gullion"];

const wordlist3 = ["the Uncanny", "the Blessed", "Claws", "Kings", "Lords", "Ladys", "Roars", "Bliss", "the Sacred", "Soaring", "Ancients", "Elders", "Fables", "the Dead", "Skulls", "Swords", "Shields", "the Hammer", "Queens", "Emperors", "Winters", "Summers", "Autumns", "Springs", "Hunters", "the Forsaken", "Ash", "Battles", "Beggars", "Crows", "Ravens", "Culling", "Death", "Dusk", "Watchers", "Eden", "Embers", "Aether", "Ether", "Flame", "the Fallen", "Horizons", "Iron", "Moons", "the Northwind", "the Southseas", "the Eastlands", "the Westlands", "the North", "Shimmering", "Shade", "Doom", "Wolfsbane", "the Winds", "the Forgotten", "Myths", "Legends", "Dragons", "Beasts", "Wishes", "Wanderers", "Darkness", "Thunder", "Amber", "the Blest", "Clouds", "the Dying", "Fae", "Mist", "Rivers", "Royalty", "Shadow", "Shallows", "Eternity", "Mirrors", "Stories", "Songs", "Birdsong", "the Vanguard", "Monarchs", "Barons", "Vassals", "Knights", "the Abbey", "Guilders", "Razors", "Pikes", "Spears", "Alewives", "Bandits", "Sailors", "Castles", "Holiness", "Unholiness", "Stargazers", "Warriors", "Bishops", "Candles", "Honor", "the Forlorn", "the Haunted", "Sorrow", "the Sun", "Dust", "Clay", "Dread", "Hearts", "Clubs", "Spades", "Diamonds", "the Blind", "Vagrants", "Devils", "Nights", "Tyrants", "Maidens", "Sellswords", "Slayers", "Silence", "Miners", "Titans", "Serpent", "the Wild", "the Wretched", "the Sanguine", "Lancers", "Hunger", "Laughter", "Slaughter", "Rebels", "Scythes", "Ice", "Earth", "Wind", "Spirit", "Anima", "Labyrinths", "Storms", "Singing", "Daggers", "Mourning", "Wraiths", "Valor", "Jesters", "Ruins", "Hellfire", "Bleakness", "Roses", "Groveling", "Seers", "Dragonscales", "Corals", "Mists", "Blackness", "the Hidden", "Lions", "Stags", "Winds", "the Witch", "Pines", "Elms", "the Cradle", "Traitors", "Dreams", "Burning", "Spells", "Moonlight", "Sunlight", "Moons", "Suns", "Light", "Dark", "Brilliance", "Redeemers", "Judgement", "Courage", "Mead", "Sleep", "Enchantment", "the Elders", "Daemons", "the Aegis", "the Empire", "Virtue", "Spades", "Plowshares", "Ignis", "Glacies", "Glaciers", "the Tempest", "Desolation", "the Endless", "Eternity", "Leaping", "Needles", "Arrows", "Splinters", "the Sacred", "the Divine", "the Arcane", "Seekers", "Widows", "Liars", "Madness", "Archons", "Praetors", "Heavens", "Swordbearers", "Shiledbearers", "Swordmaidens", "Shieldmaidens", "Magisters", "Regents", "Revenants", "Arches", "Vicars", "Viceroys", "the Duchess", "the Marquis", "Margraves", "Baronets", "Dames", "Heralds", "Gentry", "Thanes", "Journeymen", "Falcons", "Blades", "Mages", "Dragoons", "Emeralds", "Crimson", "Cerulean", "Shining", "Rotting", "Rot", "Obsidian", "Wars", "Bronze", "Gold", "Silver", "Copper", "Gloaming", "Billowing", "Angels", "Blight", "Junkers", "Remnants", "Turmoils", "Despair", "Hope", "Floods", "Wounds", "Wildlings", "Basalt", "Granite", "Bluestone", "Druidstone", "Temples", "Meteors", "Shivering", "Trembling", "Locusts", "Primevals", "Diamonds"];

function pickOne(wordlist) {
  return wordlist[parseInt(Math.random() * wordlist.length)];
}

function generateName() {
  switch (Math.floor(Math.random() * 3)) {
  case 0:
    return"The " + pickOne(wordlist1) + " " + pickOne(wordlist2);
  case 1:
    return pickOne(wordlist1) + " " + pickOne(wordlist2);
  case 2:
    return pickOne(wordlist2) + " of " + pickOne(wordlist3);
  }
}

window.onload = function() {
  loadMissionDataOrDefault();
  updateSlotList();
};
