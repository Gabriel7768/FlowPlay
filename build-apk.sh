#!/bin/bash

# Copiar arquivos web para a plataforma
echo "Copiando arquivos web..."
npx cap copy

# Abrir no Android Studio para construir o APK
echo "Abrindo Android Studio..."
npx cap open android

echo "No Android Studio, selecione:"
echo "1. Build > Generate Signed Bundle / APK"
echo "2. Selecione APK e clique Next"
echo "3. Crie uma chave ou use uma existente"
echo "4. Selecore build type (Release)"
echo "5. Marque V1 (Jar Signature) e V2 (Full APK Signature)"
echo "6. Clique Finish para gerar o APK"
