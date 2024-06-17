api = "f0e0f6f9-1d74-44e7-abaf-47a134a5a8f0";

function search() {
    input = document.getElementById("username");
    if (!input.value == "") {
        sessionStorage.setItem("username", input.value);
        window.location.href = "search/";
    } else {
        document.getElementById("error").innerHTML = "No username provided! What the flip..";
    }
}

function callUUID() {
    const r = new XMLHttpRequest(); // r = request
    r.onload = function() {
        p = JSON.parse(this.responseText); // p = player
        sessionStorage.setItem("UUID", p.uuid);
        console.log(p.uuid);
        document.getElementById("username").innerHTML = p.username;
        callProfiles();
    }
    r.open("GET", "https://api.ashcon.app/mojang/v2/user/" + sessionStorage.getItem("username"));
    r.send();
}

function callProfiles() {
    const r = new XMLHttpRequest(); // r = request again.
    r.onload = function() {
        pr = JSON.parse(this.responseText); // pr = profile.
        let prList = "";
        for (i = 0; i < pr.profiles.length; i++) {
            prList += "<a class='link' href='#"+ pr.profiles[i].cute_name +"' onclick='callProfile("+ i +")'>"+ pr.profiles[i].cute_name +"</a>";
            if (i < pr.profiles.length - 1) {
                prList += " | ";
            }
        }
        document.getElementById("profiles").innerHTML = prList;
    }
    r.open("GET", "https://api.hypixel.net/v2/skyblock/profiles?uuid=" + sessionStorage.getItem("UUID") + "&key=" + api);
    r.send();
}

function callProfile(ProfileID) {
    const r = new XMLHttpRequest();
    r.onload = function() {
        pr = JSON.parse(this.responseText); // pr = profile again.
        let p = pr.profiles[ProfileID];
        console.log(p)
        uuid = sessionStorage.getItem("UUID").replaceAll("-", "");
        console.log(p.members);
        console.log(p.members.uuid);
    }
    r.open("GET", "https://api.hypixel.net/v2/skyblock/profiles?uuid=" + sessionStorage.getItem("UUID") + "&key=" + api);
    r.send();
}