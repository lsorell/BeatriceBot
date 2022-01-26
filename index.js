const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { adminId, guildId, token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Add slash commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('#RotMWin');
    setupPerms();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(token);

// Adds default permissions to commands
async function setupPerms() {
    // open: 930520235679834112
    const fullPermissions = [
        {
            id: '930520235679834112',
            permissions: [{
                id: adminId,
                type: 'ROLE',
                permission: true,
            }],
        },
    ];

    await client.guilds.cache.get(guildId)?.commands.permissions.set({ fullPermissions });
}