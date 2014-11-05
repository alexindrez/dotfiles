// Generated by CoffeeScript 1.3.3
(function() {
  var $, bgSettings, canBeEmptyFields, editableFields, enableSaveButton, onDataLoaded, onOptionKeyup, populateOptions, restoreToDefaults, saveOptions, setFieldValue, toggleAdvancedOptions;

  $ = function(id) {
    return document.getElementById(id);
  };

  bgSettings = chrome.extension.getBackgroundPage().Settings;

  editableFields = ["scrollStepSize", "excludedUrls", "linkHintCharacters", "linkHintNumbers", "userDefinedLinkHintCss", "keyMappings", "filterLinkHints", "previousPatterns", "nextPatterns", "hideHud", "regexFindMode", "searchUrl", "searchEngines"];

  canBeEmptyFields = ["excludedUrls", "keyMappings", "userDefinedLinkHintCss", "searchEngines"];

  document.addEventListener("DOMContentLoaded", function() {
    var field, _i, _len;
    populateOptions();
    for (_i = 0, _len = editableFields.length; _i < _len; _i++) {
      field = editableFields[_i];
      $(field).addEventListener("keyup", onOptionKeyup, false);
      $(field).addEventListener("change", enableSaveButton, false);
      $(field).addEventListener("change", onDataLoaded, false);
    }
    $("advancedOptionsLink").addEventListener("click", toggleAdvancedOptions, false);
    $("showCommands").addEventListener("click", (function() {
      return showHelpDialog(chrome.extension.getBackgroundPage().helpDialogHtml(true, true, "Command Listing"), frameId);
    }), false);
    document.getElementById("restoreSettings").addEventListener("click", restoreToDefaults);
    return document.getElementById("saveOptions").addEventListener("click", saveOptions);
  });

  window.onbeforeunload = function() {
    if (!$("saveOptions").disabled) {
      return "You have unsaved changes to options.";
    }
  };

  onOptionKeyup = function(event) {
    if (event.target.getAttribute("type") !== "checkbox" && event.target.getAttribute("savedValue") !== event.target.value) {
      return enableSaveButton();
    }
  };

  onDataLoaded = function() {
    var hide, show;
    hide = function(el) {
      return el.parentNode.parentNode.style.display = "none";
    };
    show = function(el) {
      return el.parentNode.parentNode.style.display = "table-row";
    };
    if ($("filterLinkHints").checked) {
      hide($("linkHintCharacters"));
      return show($("linkHintNumbers"));
    } else {
      show($("linkHintCharacters"));
      return hide($("linkHintNumbers"));
    }
  };

  enableSaveButton = function() {
    return $("saveOptions").removeAttribute("disabled");
  };

  saveOptions = function() {
    var field, fieldName, fieldValue, _i, _len;
    for (_i = 0, _len = editableFields.length; _i < _len; _i++) {
      fieldName = editableFields[_i];
      field = $(fieldName);
      switch (field.getAttribute("type")) {
        case "checkbox":
          fieldValue = field.checked;
          break;
        case "number":
          fieldValue = parseFloat(field.value);
          break;
        default:
          fieldValue = field.value.trim();
          field.value = fieldValue;
      }
      if (!fieldValue && canBeEmptyFields.indexOf(fieldName) === -1) {
        bgSettings.clear(fieldName);
        fieldValue = bgSettings.get(fieldName);
      } else {
        bgSettings.set(fieldName, fieldValue);
      }
      $(fieldName).value = fieldValue;
      $(fieldName).setAttribute("savedValue", fieldValue);
      bgSettings.performPostUpdateHook(fieldName, fieldValue);
    }
    return $("saveOptions").disabled = true;
  };

  populateOptions = function() {
    var field, val, _i, _len;
    for (_i = 0, _len = editableFields.length; _i < _len; _i++) {
      field = editableFields[_i];
      val = bgSettings.get(field) || "";
      setFieldValue($(field), val);
    }
    return onDataLoaded();
  };

  restoreToDefaults = function() {
    var field, val, _i, _len;
    for (_i = 0, _len = editableFields.length; _i < _len; _i++) {
      field = editableFields[_i];
      val = bgSettings.defaults[field] || "";
      setFieldValue($(field), val);
    }
    onDataLoaded();
    return enableSaveButton();
  };

  setFieldValue = function(field, value) {
    if (field.getAttribute("type") !== "checkbox") {
      field.value = value;
      return field.setAttribute("savedValue", value);
    } else {
      return field.checked = value;
    }
  };

  toggleAdvancedOptions = (function(advancedMode) {
    return function(event) {
      if (advancedMode) {
        $("advancedOptions").style.display = "none";
        $("advancedOptionsLink").innerHTML = "Show advanced options&hellip;";
      } else {
        $("advancedOptions").style.display = "table-row-group";
        $("advancedOptionsLink").innerHTML = "Hide advanced options";
      }
      advancedMode = !advancedMode;
      return event.preventDefault();
    };
  })(false);

}).call(this);