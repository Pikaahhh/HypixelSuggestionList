function closeGuide() {
    document.getElementById("overlay").style.display = "none";
}

function openGuide() {
    document.getElementById("overlay").style.display = "block";
}

var item_list = "";
var display_list = [];

// Add item to the list
function addItem() {
    let item = document.getElementById("items").value;
    let location = document.getElementById("item_loc").value;
    let enchant = document.getElementById("enchant");
    let nbt = document.getElementById("nbt").value;
    let stack = "," + document.getElementById("item_stack").value;

    if (item == "") {
        document.getElementById("action").innerHTML = "Missing Item Name!";
    } else if (location == "") {
        document.getElementById("action").innerHTML = "Missing Item Location!";
    } else {
        // Parse the location input to handle ranges and single numbers
        const ranges = location.split(/,\s*/); // Split by comma and optional space
        const locationList = [];

        ranges.forEach(range => {
            if (range.includes('-')) {
                const [start, end] = range.split('-').map(Number);
                if (Number.isInteger(start) && Number.isInteger(end) && start <= end) {
                    for (let i = start; i <= end; i++) {
                        locationList.push(i);
                    }
                }
            } else {
                const number = Number(range);
                if (Number.isInteger(number)) {
                    locationList.push(number);
                }
            }
        });

        const locationString = `[${locationList.join(',')}]`;

        if (enchant.checked == true) {
            var enchantMe = ",enchant";
        } else {
            var enchantMe = "";
        }
        if (nbt == "") {
            var nbtme = "";
        } else {
            var nbtme = "," + nbt.toString();
        }

        item_list += item + ":" + locationString + stack + "%%";

        let nbtmeFormatted = nbtme.replaceAll(",", "").replaceAll("", "None!");
        let enchantMeFormatted = enchantMe.replaceAll(",enchant", "ENCHANTED ");
        let ze_item = `<span style='color: black'><u>${enchantMeFormatted}${item.replaceAll("_", " ").toUpperCase()} x${stack.replaceAll(",", "")}</u> placed at slot <u>${locationString}</u></span>`;
        let deleteButton = `<a href='#' style='color: red; float: right; font-weight: bold;' class="delete-btn" onclick="removeItem('${item}', '${locationString}')">Delete</a>`;
        display_list.push(`<span id='${item}:${locationString}'>${ze_item} ${deleteButton}</span><br>`);
        
        document.getElementById("items").value = "";
        document.getElementById("item_loc").value = "";
        document.getElementById("action").innerHTML = "Successfully added '" + item + ":" + location + "'";
        updateDisplayList();
    }
}

// Remove item from the list
function removeItem(item, location) {
    // Filter out the item to be removed from the display_list
    display_list = display_list.filter(entry => !entry.includes(`${item}:${location}`));
    // Update item_list to remove the item
    item_list = item_list.split('%%').filter(entry => !entry.includes(`${item}:${location}`)).join('%%');
    // Update the displayed list
    updateDisplayList();
}

// Update the display list content and restore default message if empty
function updateDisplayList() {
    const displayElement = document.getElementById("display_list");
    
    if (display_list.length === 0) {
        displayElement.innerHTML = "<span style='color: black'>Your list of items will appear here!</span>";
    } else {
        displayElement.innerHTML = display_list.join("");
    }
    updateCommand();
}

function updateCommand() {
    let output = document.getElementById("output");
    let container_name = document.getElementById("container_name").value;
    let size = document.getElementById("rows").value;
    if (document.getElementById("show_publicly").checked) {
        var view_type = "True";
    } else {
        var view_type = "False";
    }

    output.innerHTML = "/gen2 inventory rows:" + size + " slots_per_row:9 container_name:" + container_name + " draw_border:True hidden:" + view_type + " inventory_string:" 
    + item_list;
}

function copyCommand() {
    let output = document.getElementById("output");
    navigator.clipboard.writeText(output.innerHTML);
    alert(output);
}

setInterval(updateCommand, 500);
var dataset = "";

const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
    let item = JSON.parse(this.responseText);
    for (i=0; i < item.length; i++) {
        dataset += "<option value='"+ item[i].name +"'>" + item[i].displayName + "</option>";
    }
    document.getElementById("item_names").innerHTML = dataset;
}
xhttp.open("GET", "assets/items.json");
xhttp.send();
