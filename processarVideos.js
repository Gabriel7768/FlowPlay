const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const inputDir = path.join(__dirname, 'cursos');
const thumbDir = path.join(inputDir, 'thumbnails');

// Garante que a pasta de thumbnails exista
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

fs.readdirSync(inputDir).forEach(folder => {
  const folderPath = path.join(inputDir, folder);

  // só processa se for pasta de curso
  if (fs.lstatSync(folderPath).isDirectory() && folder !== 'thumbnails') {
    fs.readdirSync(folderPath).forEach(file => {
      if (/\.(mp4|mov|avi|mkv)$/i.test(file)) {
        const videoPath = path.join(folderPath, file);

        // Saída com "_fixed.mp4" no nome
        const outputVideo = path.join(folderPath, file.replace(/\.(\w+)$/, '_fixed.mp4'));

        // Saída da thumbnail
        const outputThumb = path.join(thumbDir, file.replace(/\.(\w+)$/, '.jpg'));

        console.log(`🎬 Processando: ${videoPath}`);

        ffmpeg(videoPath)
          .videoFilter('transpose=1') // Corrige rotação
          .output(outputVideo)
          .on('end', () => {
            console.log(`✅ Vídeo corrigido: ${outputVideo}`);

            // Gerar thumbnail
            ffmpeg(outputVideo)
              .screenshots({
                count: 1,
                folder: thumbDir,
                filename: path.basename(outputThumb),
                size: '320x240'
              })
              .on('end', () => {
                console.log(`🖼 Thumbnail salva em: ${outputThumb}`);
              });
          })
          .on('error', err => console.error(`❌ Erro: ${err.message}`))
          .run();
      }
    });
  }
});
