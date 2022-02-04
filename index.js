const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { adminId, guildId, token } = require('./config.json');
const { customIds } = require('./globals');

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

// Event listener for slash command interaction
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

// Event listener for button interaction
client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;

    let command;
    switch (interaction.customId) {
    case customIds.PAYOUT:
        command = client.commands.get('payout');
        command.payout(interaction);
        break;
    case customIds.RESET:
        command = client.commands.get('reset');
        command.reset(interaction);
        break;
    }
});

client.login(token);

// Adds default permissions to commands
async function setupPerms() {
    const adminRole = [{
        id: adminId,
        type: 'ROLE',
        permission: true,
    }];

    const fullPermissions = [
        {
            // cancel
            id: '938973913864626238',
            permissions: adminRole,
        },
        {
            // close
            id: '938973913864626239',
            permissions: adminRole,
        },
        {
            // open
            id: '938973913864626241',
            permissions: adminRole,
        },
        {
            // reset
            id: '938973913864626245',
            permissions: adminRole,
        },
        {
            // payout
            id: '938973913864626243',
            permissions: adminRole,
        },
    ];

    await client.guilds.cache.get(guildId)?.commands.permissions.set({ fullPermissions });
}