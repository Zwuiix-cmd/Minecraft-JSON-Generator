const ps = require('prompt-sync');
const fs = require("fs");
const Path = require("path");
const utils = require("./utils");
const {Config} = require("./Config");
const prompt = ps(undefined);

const TYPE_NAME_WITH_ID = [];
TYPE_NAME_WITH_ID[1] = "helmet";
TYPE_NAME_WITH_ID[2] = "chestplate";
TYPE_NAME_WITH_ID[3] = "leggings";
TYPE_NAME_WITH_ID[4] = "boots";

main()
function main()
{
    fs.mkdirSync(Path.join(process.cwd() + "/pack"), {recursive: true});
    fs.mkdirSync(Path.join(process.cwd() + "/pack/texts"), {recursive: true});
    fs.mkdirSync(Path.join(process.cwd() + "/pack/attachables"), {recursive: true});
    fs.mkdirSync(Path.join(process.cwd() + "/pack/item"), {recursive: true});
    fs.mkdirSync(Path.join(process.cwd() + "/pack/textures"), {recursive: true});
    utils.writeItemTexture();
    utils.writeTerrainTexture();

    let type = null;
    let texture_path = null;

    let name_type = null;

    console.clear();
    console.log("" +
        "\n[1] Helmet" +
        "\n[2] Chestplate" +
        "\n[3] Leggings" +
        "\n[4] Boots" +
        "\n[5] All Armor" +
        "\n[6] Item basic" +
        "\n[7] Item tools" +
        "\n[8] Bow" +
        "\n[9] Block"
    );
    let options = prompt("Veuillez séléctionner une option > ");
    switch (options) {
        case "1":
            type = 1;
            name_type = "helmet";
            break;
        case "2":
            type = 1;
            name_type = "chestplate";
            break;
        case "3":
            name_type = "leggings";
            type = 2;
            break;
        case "4":
            type = 1;
            name_type = "boots";
            break;
        case "5":
            type = 0;
            name_type = "all";
            break;
        case "6":
            type = 0;
            name_type = "item";
            break;
        case "7":
            type = 0;
            name_type = "tools";
            break;
        case "8":
            type = 0;
            name_type = "bow";
            break;
        case "9":
            type = 0;
            name_type = "block";
            break;

    }

    if(type === null) {
        console.log("Désolée, vous avez séléctionner une option invalide.");
        return;
    }

    let optionsPath = prompt("Emplacement dans le texture pack (textures/models/armor/) > ");
    if(optionsPath === ""){
        console.log("Désolée, vous avez séléctionner une option invalide.");
        return;
    }

    let optionsItemName = prompt("Veuillez entrer le nom de l'item/armure > ");
    if(optionsItemName === "") {
        console.log("Désolée, vous avez séléctionner une option invalide.");
        return;
    }

    let name = optionsItemName;

    texture_path = optionsPath;
    if(
        name_type === "all" ||
        name_type === "helmet" ||
        name_type === "chestplate" ||
        name_type === "leggings" ||
        name_type === "boots"
    ) {
        let optionsItemPath = prompt("Emplacement dans le texture pack (textures/items/) > ");
        if(optionsItemPath === ""){
            console.log("Désolée, vous avez séléctionner une option invalide.");
            return;
        }

        if(name_type === "all"){
            for (let i = 1; i <= 4; i++) {
                let tt = 1;
                if(i === 3) tt = 2;

                name_type = TYPE_NAME_WITH_ID[i];
                utils.generateArmor(texture_path, optionsItemPath, name, name_type, tt);
            }
            return;
        }

        if(
            name_type === "helmet" ||
            name_type === "chestplate" ||
            name_type === "leggings" ||
            name_type === "boots"
        ) {
            utils.generateArmor(texture_path, optionsItemPath, name, name_type, type);
            return;
        }
    }

    if(
        name_type === "item" ||
        name_type === "tools"
    ) {
        if(!name.includes(", ")){
            utils.generateItem(texture_path, name, name_type);
            return;
        }
        let nt = `${name}`.split(", ");
        for (let i = 0; i < nt.length; i++) {
            utils.generateItem(texture_path, nt[i], name_type);
        }
        return;
    }

    if(name_type === "block") {
        if(!name.includes(", ")){
            utils.generateBlock(texture_path, name);
            return;
        }
        let nt = `${name}`.split(", ");
        for (let i = 0; i < nt.length; i++) {
            utils.generateBlock(texture_path, nt[i]);
        }
        return;
    }

    if(name_type === "bow") {
        utils.generateBow(texture_path, name, name_type);
        return;
    }
}