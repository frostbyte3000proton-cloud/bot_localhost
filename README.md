📦 Pré‑requisitos (o que você precisa ter instalado)
Node.js (versão 14 ou superior)

Baixe em nodejs.org (versão LTS recomendada).

Para verificar se já tem, abra o Prompt de Comando (cmd) ou Terminal e digite:

bash
node -v
Se aparecer algo como v18.x.x, está ok.

npm (gerenciador de pacotes, já vem junto com o Node.js)

Verifique com:

bash
npm -v
Um computador com Windows (ou Linux/Mac) – o bot vai rodar localmente e precisa ficar ligado enquanto quiser que ele funcione.

🗂️ Passo 1 – Criar a pasta do projeto
Abra o terminal (cmd, PowerShell, ou terminal do VS Code) e execute:

bash
mkdir whatsapp-bot
cd whatsapp-bot
📄 Passo 2 – Criar o arquivo do bot
Dentro da pasta whatsapp-bot, crie um arquivo chamado bot.js (pode ser qualquer nome, mas usaremos bot.js).

Copie todo o script que você mostrou e cole dentro do bot.js.

💡 Dica: Use um editor de texto como VS Code, Notepad++ ou até mesmo o Bloco de Notas.

📥 Passo 3 – Instalar as dependências
O bot precisa de algumas bibliotecas. No terminal (dentro da pasta do projeto), rode:

bash
npm init -y
Isso cria um arquivo package.json padrão.

Agora instale os pacotes necessários:

bash
npm install whatsapp-web.js qrcode-terminal cli-progress colors
Explicação de cada um:

whatsapp-web.js – faz a conexão com o WhatsApp Web.

qrcode-terminal – mostra o QR Code diretamente no terminal.

cli-progress – exibe uma barra de progresso bonita.

colors – colore as mensagens no terminal.

🚀 Passo 4 – Executar o bot pela primeira vez
No terminal, ainda dentro da pasta do projeto, digite:

bash
node bot.js
Você verá algo como:

text
[ WINDOWS 11 ] - INICIALIZANDO SISTEMA...
Iniciando VIP |████████████████████| 100% | Sincronizando...
Logo depois aparecerá um QR Code no terminal.

📱 Passo 5 – Escanear o QR Code
Abra o WhatsApp no seu celular.

Toque nos três pontinhos (Android) ou em Ajustes (iPhone) → WhatsApp Web.

Escaneie o QR Code que apareceu no terminal do seu computador.

Pronto! O bot vai conectar e mostrar a mensagem:

text
💎 BOT VIP ONLINE! SEM IA - MAIS LEVE E RÁPIDO. 🚀
A partir desse momento, qualquer comando enviado para o seu WhatsApp será respondido pelo bot.

⚠️ Importante: O bot só funciona enquanto o terminal estiver aberto e o computador ligado. Se fechar, o bot para.

🎮 Comandos disponíveis (todos começam com !)
Depois que o bot estiver online, você pode usá‑lo em qualquer conversa (individual ou grupo).

Comando	O que faz	Como usar
!menu	Mostra a lista completa de comandos	Digite !menu
!s	Converte uma imagem em figurinha (sticker)	Envie uma imagem e responda a ela com !s
!calc	Calcula expressões matemáticas	!calc 2+2*10 → resultado 22
!link	Gera o link de convite do grupo (se for grupo)	Dentro do grupo, digite !link
!link (respondendo)	Menciona a pessoa que você respondeu com "link"	Responda a uma mensagem com !link
!ban @membro	Remove um membro do grupo (precisa ser admin)	!ban @fulano
!todos	Marca todos os participantes do grupo	!todos
!shippar	Calcula uma chance de "ship" aleatória	!shippar nome1 e nome2
!ping	Responde "Pong!" – teste de latência	!ping
!info	Mostra informações do sistema e consumo de RAM	!info
⚠️ Para comandos de admin (!ban e !todos), o bot precisa ser administrador do grupo. Caso contrário, retornará erro.

🛠️ Possíveis problemas e soluções
1. "puppeteer" não instala ou dá erro
O whatsapp-web.js usa o Puppeteer (Chromium) nos bastidores. Pode demorar na primeira instalação.

Solução: No Windows, instale o Microsoft Visual C++ Redistributable (link oficial da Microsoft).

2. QR Code não aparece ou o bot desconecta
O WhatsApp Web exige que você escaneie o QR Code dentro de alguns segundos. Se demorar, peça um novo QR reiniciando o bot (Ctrl+C no terminal e node bot.js de novo).

O bot usa LocalAuth – isso significa que, depois do primeiro login, ele salva a sessão e não pedirá QR novamente (a menos que você limpe os arquivos).

3. Comando !ban não funciona
Verifique se o bot é administrador do grupo. Entre nos dados do grupo e promova o número do bot a admin.

Além disso, você deve mencionar a pessoa (ex: !ban @João).

4. O bot não envia figurinhas
Certifique‑se de que a imagem é uma foto (não um vídeo ou GIF). Se for GIF, o script não converte (mas daria para adaptar).

Você precisa responder à mensagem com a imagem usando !s.

5. O bot para de responder depois de algumas horas
O WhatsApp Web periodicamente desconecta por segurança. Para evitar, mantenha o computador ligado e sem suspensão. Ou use um serviço na nuvem (VPS) para rodar 24/7.

🔄 Como manter o bot sempre ligado (opcional)
Se quiser que o bot funcione mesmo com o terminal fechado, você pode usar:

Windows: Criar um arquivo .bat ou usar o PM2 (gerenciador de processos).
Instale o PM2:

bash
npm install -g pm2
pm2 start bot.js --name whatsapp-bot
pm2 save
pm2 startup
Linux/Mac: Use screen, tmux ou também o PM2.

✅ Resumo final
Instale Node.js.

Crie uma pasta, cole o script em bot.js.

Instale as dependências (npm install ...).

Execute node bot.js.

Escaneie o QR Code com seu WhatsApp.

Divirta‑se usando os comandos !menu, !s, !calc etc.
