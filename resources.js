// CRUD
let resources = [];

const resourceForm = document.getElementById("resource-form");
const resourceList = document.getElementById("resource-list");
const message = document.getElementById("resource-message");

async function loadResources() {
  try {
    const savedItems = localStorage.getItem("beyondSightResources");

    if (savedItems !== null) {
      resources = JSON.parse(savedItems);
    } else {
      const response = await fetch("resources.json");
      resources = await response.json();
    }
  } catch (error) {
    resources = [];
    message.textContent = "Could not load resources. You can add a new one.";
  }

  showResources();
}

function saveResources() {
  try {
    localStorage.setItem("beyondSightResources", JSON.stringify(resources));
  } catch (error) {
    message.textContent = "The browser could not save the list.";
  }
}

function showResources() {
  resourceList.innerHTML = "";

  const search = document.getElementById("resource-search").value.toLowerCase();
  const statusFilter = document.getElementById("resource-filter").value;

  // Keep items that match the search and selected status.
  const foundItems = resources.filter(function(item) {
    const titleMatches = item.title.toLowerCase().includes(search);
    const descriptionMatches = item.description.toLowerCase().includes(search);
    const statusMatches = statusFilter === "All" || item.status === statusFilter;

    return (titleMatches || descriptionMatches) && statusMatches;
  });

  if (foundItems.length === 0) {
    resourceList.textContent = "No resources found. Try another search or add one.";
    return;
  }

  // Make a card for every resource.
  foundItems.forEach(function(item) {
    const card = document.createElement("div");
    card.className = "resource-item";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const category = document.createElement("p");
    category.textContent = "Category: " + item.category;

    const description = document.createElement("p");
    description.textContent = item.description;

    const status = document.createElement("p");
    status.className = "status-label";
    status.textContent = "Status: " + item.status;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
      editResource(item.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      deleteResource(item.id);
    });

    card.append(title, category, description, status, editButton, deleteButton);
    resourceList.appendChild(card);
  });
}

function checkResource(title, category, description) {
  if (title.trim() === "" || category === "" || description.trim() === "") {
    message.textContent = "Please fill in the name, category and description.";
    return false;
  }

  return true;
}

function addResource(title, category, description, status) {
  const item = {
    id: Date.now(),
    title: title.trim(),
    category: category,
    description: description.trim(),
    status: status
  };

  resources.push(item);
  saveResources();
  showResources();
  message.textContent = "Resource added.";
}

function editResource(id) {
  console.log("Editing resource ID:", id);
  console.log("Resources:", resources);

  const item = resources.find(function(resource) {
    return resource.id === id;
  });

  if (item === undefined) {
    alert("Resource not found!");
    return;
  }
  const newTitle = prompt("Resource name:", item.title);
  if (newTitle === null) return;

  const newDescription = prompt("Description:", item.description);
  if (newDescription === null) return;

  if (!checkResource(newTitle, item.category, newDescription)) {
    return;
  }

  item.title = newTitle.trim();
  item.description = newDescription.trim();

  saveResources();
  showResources();
  message.textContent = "Resource updated.";
}

function deleteResource(id) {
  const sure = confirm("Delete this resource?");
  if (!sure) return;

  resources = resources.filter(function(item) {
    return item.id !== id;
  });

  saveResources();
  showResources();
  message.textContent = "Resource deleted.";
}

// Add a resource when the form is submitted.
resourceForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("resource-title").value;
  const category = document.getElementById("resource-category").value;
  const description = document.getElementById("resource-description").value;
  const status = document.getElementById("resource-status").value;

  if (!checkResource(title, category, description)) {
    return;
  }

  addResource(title, category, description, status);
  resourceForm.reset();
});

// Update the list when search or filter changes.
document.getElementById("resource-search").addEventListener("input", showResources);
document.getElementById("resource-filter").addEventListener("change", showResources);

// Load the first list when the page opens.
loadResources();
