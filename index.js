// Step 1: Simulate User Behavior
// - Add event listeners for button clicks and form submissions.
// - Use JavaScript to dynamically update the DOM based on user actions.

// Step 2: DOM Manipulation Functions
// - Implement functions to add, update, and remove DOM elements.
// - Ensure all elements are dynamically created with appropriate attributes and content.

// Step 3: Error Handling
// - Display error messages in the DOM for invalid inputs or missing elements.
// - Create reusable functions to handle common error cases.

// Step 4: Reusable Utilities
// - Create modular utility functions, such as createElement(tag, attributes).
// - Ensure all functions follow DRY principles for maintainability.
// Step 4: Reusable Utilities
function createElement(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  element.textContent = textContent;
  return element;
}

// Step 3: Error Handling
function displayError(message) {
  const errorDiv = document.getElementById("error-message");
  if (!errorDiv) return;
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

function clearError() {
  const errorDiv = document.getElementById("error-message");
  if (!errorDiv) return;
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

// Step 2: DOM Manipulation Functions
function addElementToDOM(containerId, text) {
  const container = document.getElementById(containerId);
  if (!container) {
    displayError("Container not found");
    return null;
  }
  const newElement = createElement("p", {}, text);
  container.appendChild(newElement);
  return newElement;
}

function removeElementFromDOM(elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    displayError("Element not found");
    return false;
  }
  element.remove();
  return true;
}

function updateElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (!element) {
    displayError("Element not found");
    return false;
  }
  element.textContent = text;
  return true;
}

// Step 1: Simulate User Behavior
function simulateClick(containerId, text) {
  clearError();
  return addElementToDOM(containerId, text);
}

function handleFormSubmit(formId, containerId) {
  const form = document.getElementById(formId);
  const input = form ? form.querySelector("input") : null;
  if (!form || !input) {
    displayError("Form not found");
    return false;
  }
  const value = input.value.trim();
  if (value === "") {
    displayError("Input cannot be empty");
    return false;
  }
  clearError();
  addElementToDOM(containerId, value);
  input.value = "";
  return true;
}

// Wire up the page
const clickButton = document.getElementById("simulate-click");
if (clickButton) {
  clickButton.addEventListener("click", () => {
    simulateClick("dynamic-content", "Button clicked!");
  });
}

const userForm = document.getElementById("user-form");
if (userForm) {
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmit("user-form", "dynamic-content");
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    createElement,
    displayError,
    clearError,
    addElementToDOM,
    removeElementFromDOM,
    updateElementText,
    simulateClick,
    handleFormSubmit,
  };
}