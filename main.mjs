import got from "got";
import { $, fs } from "zx";
import { pipeline } from "stream/promises";

const LINK = "https://discord.com/api/download/stable?platform=linux&format=deb";
const TMP_DIR = "tmp";
const DEB_PATH = `${TMP_DIR}/discord.deb`;

async function installDiscord() {
    try {
        await fs.mkdir(TMP_DIR, { recursive: true });

        console.log("Baixando o Discord...");
        const downloadStream = got.stream(LINK);

        downloadStream.on("downloadProgress", ({ transferred, total, percent }) => {
            const pct = Math.round(percent * 100);
            process.stdout.write(`\rBaixando... ${pct}% (${transferred}/${total} bytes)`);
        });

        await pipeline(downloadStream, fs.createWriteStream(DEB_PATH));
        console.log("\nDownload concluído. Instalando...");

        await $`sudo dpkg -i ${DEB_PATH}`;

        const check = await $`dpkg -l discord`.nothrow();
        if (check.exitCode === 0) {
            console.log("Discord instalado com sucesso!");
        } else {
            console.error("Falha ao verificar a instalação.");
            process.exit(1);
        }
    } catch (err) {
        console.error("\nErro:", err.message);
        process.exit(1);
    } finally {
        // apaga tudo
        await fs.rm(TMP_DIR, { recursive: true, force: true });
    }
}

console.log("AutoDismmy is running...");
await installDiscord();