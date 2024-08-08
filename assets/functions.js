var item_list = "";
var display_list = "";

function addItem() {
    let item = document.getElementById("items").value;
    let location = document.getElementById("item_loc").value;
    let enchant = document.getElementById("enchant");
    let nbt = document.getElementById("nbt").value;
    let stack = "," + document.getElementById("item_stack").value;

    const ranges = stack.split(', ');

    const numberList = [];

    ranges.forEach(item => {
        if (item.includes('-')) {
            const [start, end] = item.split('-').map(Number);
            for (let i = start; i <= end; i++) {
                numberList.push(i);
            }
        } else {
            numberList.push(Number(item));
        }
    });

    console.log(numberList);

    if (item == "") {
        document.getElementById("action").innerHTML = "Missing Item Name!";
    } else if (location == "") {
        document.getElementById("action").innerHTML = "Missing Item Location!";
    } else {
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
        item_list += item + nbtme + enchantMe + ":" + location + stack + "%%";
        nbtme = nbtme.replaceAll(",", "").replaceAll("", "None!");
        enchantMe = enchantMe.replaceAll(",enchant", "ENCHANTED ");
        var ze_item = "<u>" + enchantMe + item.replaceAll("_"," ").toUpperCase() + " x" + stack.replaceAll(",","") + "</u> AT SLOT <u>" + location + " | Additional NBT: "+ nbtme + "</u>";
        console.log(ze_item);
        display_list += "<span id='" + ze_item + "'>" + ze_item + "</span><br>";
        document.getElementById("items").value = "";
        document.getElementById("item_loc").value = "";
        document.getElementById("action").innerHTML = "Sucessfully added '" + item + ":" + location + "'";
        document.getElementById("display_list").innerHTML = display_list;
    }
}

function updateCommand() {
    let output = document.getElementById("output");
    let container_name = document.getElementById("container_name").value;
    let size = document.getElementById("rows").value;
    let view_type = document.getElementById("show_publicly").value;

    output.innerHTML = "/gen2 inventory rows:" + size + " slots_per_row:9 container_name:" + container_name + " draw_border:True show_publicly:" + view_type + " inventory_string:" 
    + item_list;
}

function copyCommand() {
    let output = document.getElementById("output");
    navigator.clipboard.writeText(output.innerHTML);
    document.getElementById("copied").innerHTML = "Successfully copied '" + output.innerHTML + "'.";
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

