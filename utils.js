const file = require("./file");
const fs = require("fs");
const Path = require("path");
const {generate} = require("./file");
const {Config} = require("./Config");

const translate = require('translate-api');
const Sleep = require("./Sleep");

/**
 * @type Config
 */
let item_texture;
let item_lang;

/**
 * @type Config
 */
let terrain_texture;

const blocks = new Config(Path.join(process.cwd() + "/pack/blocks.json"), "json");

const DEFAULT = "erodia:"

const langs = [
    "bg_BG",
    "cs_CZ",
    "da_DK",
    "de_DE",
    "el_GR",
    "en_GB",
    "en_US",
    "es_ES",
    "es_MX",
    "fi_FI",
    "fr_CA",
    "fr_FR",
    "hu_HU",
    "id_ID",
    "it_IT",
    "ja_JP",
    "ko_KR",
    "nb_NO",
    "nl_NL",
    "pl_PL",
    "pt_BR",
    "pt_PT",
    "ru_RU",
    "sk_SK",
    "sv_SE",
    "tr_TR",
    "uk_UA",
    "zh_CN",
    "zh_TW",
];
module.exports = {
    generateArmor(path_armor, path_item, name, type_name, type)
    {
        writeFile(Path.join(process.cwd() + `/pack/attachables/${name}_${type_name}.json`), file.generateArmor(path_armor, name, type_name, type));
        writeFile(Path.join(process.cwd() + `/pack/attachables/${name}_${type_name}.player.json`), file.generateArmorPlayer(path_armor, name, type_name, type));
        writeFile(Path.join(process.cwd() + `/pack/item/${name}_${type_name}.item.json`), file.generateArmorItem(name, type_name));
        setItemTexture(name + "_" + type_name, path_item + name + "_" + type_name);

        let cType = "";
        switch (type_name) {
            case "helmet":
                cType = "Casque";
                break;
            case "chestplate":
                cType = "Plastron";
                break;
            case "leggings":
                cType = "Jambières"
                break;
            case "boots":
                cType = "Bottes"
                break;
        }

        let determineName = `${cType} en ${capitalize(name)}`;
        writeLang(name + "_" + type_name, determineName).then(r => {});
    },

    generateItem(path, name, type)
    {
        writeFile(Path.join(process.cwd() + `/pack/item/${name}.item.json`), file.generateItem(name, type));
        setItemTexture(name, path + name);
        writeLang(name, capitalize(name)).then(r => {});
    },

    generateBow(path, name, name_type)
    {
        writeFile(Path.join(process.cwd() + `/pack/attachables/${name}_${name_type}.item.json`), file.generateBow(path, name));
        writeFile(Path.join(process.cwd() + `/pack/item/${name}_${name_type}.item.json`), file.generateItem(name, name_type));
        setItemTexture(`${name}_bow_pulling`, [
            path + name + "_bow_pulling_0",
            path + name + "_bow_pulling_1",
            path + name + "_bow_pulling_2"
        ]);
        setItemTexture(`${name}_bow_standby`, path + name + "_bow_standby");
        writeLang(name + "_bow", `Arc en ${capitalize(name)}`).then(r => {});
    },

    writeItemTexture()
    {
        let exist = fs.existsSync(Path.join(process.cwd() + `/pack/textures/item_texture.json`));
        if(!exist) writeFile(Path.join(process.cwd() + `/pack/textures/item_texture.json`), file.generateItemTexture());

        item_texture = new Config(Path.join(process.cwd() + "/pack/textures/item_texture.json"), "json");
    },

    writeTerrainTexture()
    {
        let exist = fs.existsSync(Path.join(process.cwd() + `/pack/textures/terrain_texture.json`));
        if(!exist) writeFile(Path.join(process.cwd() + `/pack/textures/terrain_texture.json`), file.generateTerrainTexture());

        terrain_texture = new Config(Path.join(process.cwd() + "/pack/textures/terrain_texture.json"), "json");
    },

    generateBlock(path, name)
    {
        blocks.setNested(`${DEFAULT}${name}.sound`, "stone");
        blocks.setNested(`${DEFAULT}${name}.textures`, name);
        blocks.save();

        terrain_texture.setNested(`texture_data.${name}.textures`, path + name);
        terrain_texture.save();

        writeBlockLang(name, capitalize(name));
    },
}

async function writeFile(path, str)
{
    let timestamp = Date.now();
    await fs.writeFileSync(path, str, {encoding: "utf8"}, function (err){});
    console.log(`[FILE] Writing \"${str.length}\" characters in \"${path}\" in ${Date.now() - timestamp}s`);
}

function setItemTexture(name, texture)
{
    item_texture.setNested(`texture_data.${name}`, {texture});
    item_texture.save();
}

async function writeLang(item, name)
{
    for (const lang of langs) {
        let path = Path.join(process.cwd() + `/pack/texts/${lang}.lang`);
        let exist = fs.existsSync(path);
        if(!exist) await writeFile(path, "## Author Zwuiix#0001 ##");
        let timestamp = Date.now();
        let read = await fs.readFileSync(path);

        let text = `item.${DEFAULT}${item}.name=${name}`;
        read += "\n" + text;

        await writeFile(path, read);
        console.log(`[LANG] Writing \"${text}\" in ${Date.now() - timestamp}s`);
        await Sleep.execute(125);
    }
}

async function writeBlockLang(item, name)
{
    for (const lang of langs) {
        let path = Path.join(process.cwd() + `/pack/texts/${lang}.lang`);
        let exist = fs.existsSync(path);
        if(!exist) await writeFile(path, "## Author Zwuiix#0001 ##");
        let timestamp = Date.now();
        let read = await fs.readFileSync(path);

        let text = `tile.${DEFAULT}${item}.name=${name}`;
        read += "\n" + text;

        await writeFile(path, read);
        console.log(`[LANG] Writing \"${text}\" in ${Date.now() - timestamp}s`);
        await Sleep.execute(125);
    }
}

/**
 *
 * @param str {string}
 * @return {string}
 */
function capitalize(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}