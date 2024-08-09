function test() {
    dialogueInput = ["&fWelcome to ", "&bSkyBlock", "&f!"];
    dialogue = [];

    for (i=0; i < dialogueInput.length; i++) {
        if (dialogueInput[i].includes("&f")) {
            console.log("True");
        } else {
            console.log("False");
        }
    }
}