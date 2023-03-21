const DEFAULT = "erodia:";

module.exports = {
    generateArmor(path, name, type_name, type)
    {
        return "" +
            "{\n" +
            "\t\"format_version\": \"1.8.0\",\n" +
            "\t\"minecraft:attachable\": {\n" +
            "\t\t\"description\": {\n" +
            "\t\t\t\"identifier\": \"" + DEFAULT + name + "_" + type_name + "\",\n" +
            "\t\t\t\"materials\": {\n" +
            "\t\t\t\t\"default\": \"armor\",\n" +
            "\t\t\t\t\"enchanted\": \"armor_enchanted\"\n" +
            "\t\t\t},\n" +
            "\t\t\t\"textures\": {\n" +
            "\t\t\t\t\"default\": \"" + path + name + "_" + type + "\",\n" +
            "\t\t\t\t\"enchanted\": \"textures/misc/enchanted_item_glint\"\n" +
            "\t\t\t},\n" +
            "\t\t\t\"geometry\": {\n" +
            "\t\t\t\t\"default\": \"geometry.humanoid.armor." + type_name +"\"\n" +
            "\t\t\t},\n" +
            "\t\t\t\"scripts\": {\n" +
            "\t\t\t\t\"parent_setup\": \"variable.boot_layer_visible = 0.0;\"\n" +
            "\t\t\t},\n" +
            "\t\t\t\"render_controllers\": [\n" +
            "\t\t\t\t\"controller.render.armor\"\n" +
            "\t\t\t]\n" +
            "\t\t}\n" +
            "\t}\n" +
            "}"
    },

    generateArmorPlayer(path, name, type_name, type)
    {
        return "{\n" +
            "\t\"format_version\": \"1.10.0\",\n" +
            "\t\"minecraft:attachable\": {\n" +
            "\t\t\"description\": {\n" +
            "\t\t\t\"identifier\": \"" + DEFAULT + name + "_" + type_name + ".player\",\n" +
            "\t\t\t\"item\": {\n" +
            "\t\t\t\t\"minecraft:glace_boots\": \"query.owner_identifier == 'minecraft:player'\"\n" +
            "\t\t\t},\n" +
            "\t\t\t\"materials\": {\n" +
            "\t\t\t\t\"default\": \"armor\",\n" +
            "\t\t\t\t\"enchanted\": \"armor_enchanted\"\n" +
            "\t\t\t},\n" +
            "\t\t\t\"textures\": {\n" +
            "\t\t\t\t\"default\": \"" + path + name + "_" + type + "\",\n" +
            "\t\t\t\t\"enchanted\": \"textures/misc/enchanted_item_glint\"\n" +
            "\t\t\t},\n" +
            "\t\t\t\"geometry\": {\n" +
            "\t\t\t\t\"default\": \"geometry.player.armor." + type_name + "\"\n" +
            "\t\t\t},\n" +
            "\t\t\t\"scripts\": {\n" +
            "\t\t\t\t\"parent_setup\": \"variable." + type_name + "_layer_visible = 0.0;\"\n" +
            "\t\t\t},\n" +
            "\t\t\t\"render_controllers\": [\n" +
            "\t\t\t\t\"controller.render.armor\"\n" +
            "\t\t\t]\n" +
            "\t\t}\n" +
            "\t}\n" +
            "}"
    },

    generateArmorItem(name, type_name)
    {
        return "{\n" +
            "    \"format_version\": \"1.18\",\n" +
            "    \"minecraft:item\": {\n" +
            "        \"description\": {\n" +
            "            \"identifier\": \"" + DEFAULT + name +"_" + type_name +"\",\n" +
            "            \"category\": \"equipment\"\n" +
            "        },\n" +
            "        \"components\": {\n" +
            "            \"minecraft:icon\": \"" + name +"_" + type_name + "\",\n" +
            "            \"minecraft:render_offsets\": \"" + type_name + "\"\n" +
            "        }\n" +
            "    }\n" +
            "}"
    },

    generateItem(name, type)
    {
        return "{\n" +
            "    \"format_version\": \"1.18\",\n" +
            "    \"minecraft:item\": {\n" +
            "        \"description\": {\n" +
            "            \"identifier\": \"" + DEFAULT + name +"\",\n" +
            "            \"category\": \"equipment\"\n" +
            "        },\n" +
            "        \"components\": {\n" +
            "            \"minecraft:icon\": \"" + name + "\",\n" +
            "            \"minecraft:render_offsets\": \"" + type + "\"\n" +
            "        }\n" +
            "    }\n" +
            "}"
    },

    generateBow(path, name)
    {
        return "{\n" +
            "  \"format_version\": \"1.10.0\",\n" +
            "  \"minecraft:attachable\": {\n" +
            "    \"description\": {\n" +
            "      \"identifier\": \"" + DEFAULT + name + "\",\n" +
            "      \"materials\": {\n" +
            "        \"default\": \"entity_alphatest\",\n" +
            "        \"enchanted\": \"entity_alphatest_glint\"\n" +
            "      },\n" +
            "      \"textures\": {\n" +
            "        \"default\": \"" + path + name +"_bow_standby\",\n" +
            "        \"bow_pulling_0\": \"" + path + name + "_bow_pulling_0\",\n" +
            "        \"bow_pulling_1\": \"" + path + name + "_bow_pulling_1\",\n" +
            "        \"bow_pulling_2\": \"" + path + name + "_bow_pulling_2\",\n" +
            "        \"enchanted\": \"textures/misc/enchanted_item_glint\"\n" +
            "      },\n" +
            "      \"geometry\": {\n" +
            "        \"default\": \"geometry.bow_standby\",\n" +
            "        \"bow_pulling_0\": \"geometry.bow_pulling_0\",\n" +
            "        \"bow_pulling_1\": \"geometry.bow_pulling_1\",\n" +
            "        \"bow_pulling_2\": \"geometry.bow_pulling_2\"\n" +
            "      },\n" +
            "      \"animations\": {\n" +
            "        \"wield\": \"animation.bow.wield\",\n" +
            "        \"wield_first_person_pull\": \"animation.bow.wield_first_person_pull\"\n" +
            "      },\n" +
            "      \"scripts\": {\n" +
            "        \"pre_animation\": [\n" +
            "          \"variable.charge_amount = math.clamp((query.main_hand_item_max_duration - (query.main_hand_item_use_duration - query.frame_alpha + 1.0)) / 10.0, 0.0, 1.0f);\"\n" +
            "        ],\n" +
            "        \"animate\": [\n" +
            "          \"wield\",\n" +
            "          {\n" +
            "            \"wield_first_person_pull\": \"query.main_hand_item_use_duration > 0.0f && c.is_first_person\"\n" +
            "          }\n" +
            "        ]\n" +
            "      },\n" +
            "      \"render_controllers\": [ \"controller.render.bow\" ]\n" +
            "    }\n" +
            "  }\n" +
            "}";
    },

    generateItemTexture()
    {
        return "{\n" +
            "  \"resource_pack_name\": \"" + DEFAULT + "\",\n" +
            "  \"texture_name\": \"atlas.items\",\n" +
            "  \"texture_data\": {\n" +
            "  }\n" +
            "}\n";
    },

    generateTerrainTexture()
    {
        return "{\n" +
            "  \"resource_pack_name\": \"" + DEFAULT + "\",\n" +
            "  \"texture_name\": \"atlas.terrain\",\n" +
            "  \"padding\": 8,\n" +
            "  \"num_mip_levels\": 4,\n" +
            "  \"texture_data\": {\n" +
            "  }\n" +
            "}";
    }
}