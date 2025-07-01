
import 'dotenv/config';
import { Client, GatewayIntentBits, PermissionsBitField } from 'discord.js';

const TOKEN = process.env.DISCORD_TOKEN;
const TARGET_USER_ID = '572917219340714055'; // boscat 572917219340714055



const jokes = [
    "Why don’t French people play hide and seek? Good luck hiding when you say 'I baguette where I hid.' 🥖",
    "I asked a French girl if she likes bread. She said oui-oui. Now we’re married.",
    "What do you call someone who speaks multiple languages? Multilingual. Two? Bilingual. One? British. 😅",
    "boscat doesn’t argue. She delivers final warnings with style.",
    "Did you hear about the French chef who died? He *pasta* way. 🍝",
    "French girls don’t sweat. They glisten with judgment ✨",
    "If boscat says 'non', she means 'maybe'. If she says 'maybe', she means 'yes'. If she says 'yes'... run. 😂",
    "Why do croissants never gossip? Because they don’t roll that way. 🥐",
    "Roses are red, wine is fine, boscat said ‘bonjour’ and now I’m in line. 🍷",
    "What’s the French version of déjà vu? 'Didn’t I baguette this already?'",
    "I tried flirting in French. I ended up proposing to her cat. 🐈",
    "Never interrupt a French girl mid eye-roll. It’s sacred.",
    "You think you're cool? boscat logged off Discord and started a trend.",
    "A croissant a day keeps the sadness away… unless boscat takes the last one. Then it’s WAR. 🥐🗡️",
    "Behind every cute French girl is a passive-aggressive emoji and a blocked number. 📵",
    "boscat’s sarcasm levels are government monitored.",
    "What do you call it when boscat doesn’t roast you? A national holiday. 🇫🇷",
    "Even Google couldn’t translate boscat’s attitude. 🗯️",
    "You don’t choose boscat. She lets you exist in her presence.",
    "French girls don’t ghost. They just vanish in a cloud of Chanel No.5.",
    "boscat’s typing… be afraid. Be very afraid.",
    "Legend says boscat once smiled — and it was still savage.",
    "boscat says ‘brb’ but never comes back. It’s tradition. 😌",
    "Don’t fight boscat. She has better insults in two languages.",
    "What’s sharper than a blade? boscat’s replies. 💅",
    "Some girls say 'hi'. boscat says 'who are you and why are you breathing near me?'",
    "When life gives boscat lemons, she makes a tart and judges your outfit.",
    "boscat doesn’t do drama. She *is* the plot twist.",
    "Why was the Eiffel Tower jealous? Because even it doesn’t stand as tall as boscat’s standards.",
    "HVN tried to roast boscat once. HVN now delivers her jokes instead."
];

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`🤖 HVN is online as ${client.user.tag}`);

    setInterval(async () => {
        for (const guild of client.guilds.cache.values()) {
            try {
                const member = await guild.members.fetch(TARGET_USER_ID);
                if (!member) continue;

                const channels = guild.channels.cache.filter(channel =>
                    channel.isTextBased() &&
                    channel.permissionsFor(member).has(PermissionsBitField.Flags.ViewChannel)
                );

                if (!channels.size) continue;

                const randomChannel = channels.random();
                const joke = jokes[Math.floor(Math.random() * jokes.length)];

                await randomChannel.send(`👋 <@${TARGET_USER_ID}>\n**HVN says:** ${joke}`);
                console.log(`✅ Sent to #${randomChannel.name} in ${guild.name}`);
            } catch (err) {
                console.error(`❌ Error in guild ${guild.name}:`, err);
            }
        }
    }, 2 * 60 * 60 * 1000);
});

client.login(TOKEN);
