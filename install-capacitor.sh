#!/bin/bash

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Node.js não está instalado. Instalando..."
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "npm não está instalado. Instalando..."
    sudo apt-get install -y npm
fi

# Instalar o Capacitor CLI globalmente
echo "Instalando Capacitor CLI..."
sudo npm install -g @capacitor/cli

# Inicializar o projeto Capacitor
echo "Inicializando o projeto Capacitor..."
npx cap init

# Adicionar a plataforma Android
echo "Adicionando plataforma Android..."
npx cap add android

# Copiar arquivos web para a plataforma
echo "Copiando arquivos web..."
npx cap copy

echo "Instalação concluída! Para abrir no Android Studio:"
echo "npx cap open android"
