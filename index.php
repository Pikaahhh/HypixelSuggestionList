<?php

    if (!isset($_GET["q"])) {
        $_GET["q"] = "Pikaahhh";
    }

?>

<script>
    let username = "<?php echo $_GET["q"]?>";

    const userReq = new XMLHttpRequest();
    userReq.onload = function() {
        user = JSON.parse(this.responseText);
        let uuid = user.uuid;
    };
    userReq.open("GET", "https://api.ashcon.app/mojang/v2/user/" + username)
    userReq.send();

    const profileReq = new XMLHttpRequest();
    profileReq.onload = function() {
        user = JSON.parse(this.responseText);
        let uuid = user.uuid;
    };
    profileReq.open("GET", "https://api.hypixel.net/v2/skyblock/profiles?key=" + API_KEY + "&uuid=" + username)
    profileReq.send();
</script>
<h1 id="test"></h1>