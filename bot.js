const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cliProgress = require('cli-progress');
const colors = require('colors');

// --- SISTEMA HUMANO (DIGITANDO...) ---
const simularHumano = async (chat) => {
    try {
        if (!chat) return;
        await chat.sendSeen();
        await new Promise(res => setTimeout(res, Math.random() * 1000 + 500));
        if (chat.sendStateTyping) await chat.sendStateTyping();
        const tempoDigitando = Math.floor(Math.random() * 2000) + 1500; 
        return new Promise(res => setTimeout(res, tempoDigitando));
    } catch (e) { console.log("Aguardando estabilização..."); }
};

// --- CONFIGURAÇÃO DA BARRA NO TERMINAL ---
const progressBar = new cliProgress.SingleBar({
    format: 'Iniciando VIP |' + colors.cyan('{bar}') + '| {percentage}% | {status}',
    barCompleteChar: '\u2588', barIncompleteChar: '\u2591', hideCursor: true
});

console.log(colors.brightMagenta('\n[ WINDOWS 11 ] - INICIALIZANDO SISTEMA...'));
progressBar.start(100, 0, { status: 'Carregando módulos...' });

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] }
});

let prog = 0;
const timer = setInterval(() => {
    prog += 10;
    if (prog <= 50) progressBar.update(prog, { status: 'Abrindo Chrome...' });
    if (prog > 50 && prog < 100) progressBar.update(prog, { status: 'Sincronizando...' });
    if (prog >= 100) clearInterval(timer);
}, 100);

client.on('qr', qr => {
    progressBar.stop();
    console.log(colors.green('\n[!] ESCANEIE O QR CODE:'));
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    progressBar.stop();
    console.log(colors.brightCyan('\n💎 BOT VIP ONLINE! SEM IA - MAIS LEVE E RÁPIDO. 🚀\n'));
});

client.on('message_create', async msg => {
    if (!msg.body.startsWith('!')) return;

    const chat = await msg.getChat();
    const command = msg.body.toLowerCase().split(' ')[0];
    const args = msg.body.split(' ').slice(1).join(' ');

    // --- COMANDO !LINK (RESPONDA A ALGUÉM) ---
    if (command === '!link') {
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            const author = await quotedMsg.getContact();
            await simularHumano(chat);
            chat.sendMessage(`@${author.id.user} link`, { mentions: [author] });
        } else if (chat.isGroup) {
            try {
                const code = await chat.getInviteCode();
                msg.reply(`🔗 https://whatsapp.com{code}`);
            } catch (e) { msg.reply("❌ Erro ao pegar link do grupo."); }
        }
        return;
    }

    // --- COMANDO !CALC (RESOLVE TUDO) ---
    if (command === '!calc') {
        if (!args) return msg.reply("❌ Digite a conta.");
        await simularHumano(chat);
        try {
            const resultado = eval(args.replace(/[^-()\d/*+.]/g, ''));
            msg.reply(`🧮 *Resultado:* ${resultado}`);
        } catch (e) { msg.reply("❌ Erro no cálculo."); }
    }

    // --- COMANDO !S (STICKER) ---
    if (command === '!s') {
        const mediaMsg = msg.hasQuotedMsg ? await msg.getQuotedMessage() : msg;
        if (mediaMsg.hasMedia) {
            await simularHumano(chat);
            const media = await mediaMsg.downloadMedia();
            client.sendMessage(msg.from, media, { sendMediaAsSticker: true, stickerName: "VIP Bot", stickerAuthor: "Win 11" });
        }
    }

    // --- ADMIN E GRUPO ---
    if (command === '!ban' && chat.isGroup) {
        await simularHumano(chat);
        const mentions = await msg.getMentions();
        if (mentions.length > 0) {
            try {
                await chat.removeParticipants([mentions[0].id._serialized]);
                msg.reply(`🚫 Removido.`);
            } catch (e) { msg.reply("❌ Preciso ser ADM."); }
        }
    }

    if (command === '!todos' && chat.isGroup) {
        await simularHumano(chat);
        let mentions = chat.participants.map(p => p.id._serialized);
        chat.sendMessage('📢 *𝑨𝑻𝑬𝑵𝑪̧𝑨̃𝑶 𝑮𝑬𝑹𝑨𝑳!*', { mentions });
    }

    // --- DIVERSÃO ---
    if (command === '!shippar') {
        await simularHumano(chat);
        msg.reply(`❤️ *SHIP:* ${args}\n📊 Chance: ${Math.floor(Math.random() * 101)}%`);
    }

    // --- MENU VIP (LIMPO) ---
    if (command === '!menu') {
        await simularHumano(chat);
        msg.reply(`
╭━━━〔 🤖 𝑾𝑰𝑵 𝟭𝟭 𝑽𝑰𝑷 〕━━━╮

  ◈ 🛠️ *𝑴𝑰́𝑫𝑰𝑨*
  ╰─ ➥ !s (Figurinha de Foto)

  ◈ 👥 *𝑨𝑫𝑴𝑰𝑵/𝑮𝑹𝑼𝑷𝑶*
  ╰─ ➥ !link (Responda a alguém)
  ╰─ ➥ !ban @nome | !todos
  ╰─ ➥ !adm

  ◈ ⚙️ *𝑼𝑻𝑰𝑳𝑰𝑻𝑨́𝑹𝑰𝑶𝑺*
  ╰─ ➥ !calc [conta]
  ╰─ ➥ !ping | !info

╰━━━━━━〔 💎 𝑽𝑰𝑷 〕━━━━━━╯`);
    }

    if (command === '!ping') { await simularHumano(chat); msg.reply('🏓 Pong!'); }
    if (command === '!info') {
        await simularHumano(chat);
        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        msg.reply(`📊 *SISTEMA:* Windows 11\n💾 *RAM:* ${ram} MB\n⚡ *Status:* Rápido`);
    }
});

client.initialize();