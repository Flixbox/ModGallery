# Community Mod & Map downloader for Hero's Hour

[![](https://img.shields.io/static/v1?label=Discuss&message=on%20Discord&color=7289DA&style=flat&logo=discord)](https://discord.gg/vnZMK2kyY5)

[![Required Node.JS >= v16.13](https://img.shields.io/static/v1?label=node&message=%3E=16.13&logo=node.js&color)](https://nodejs.org/about/releases/) [![Required npm >= v8.1](https://img.shields.io/static/v1?label=npm&message=%3E=8.1&logo=npm&color)](https://github.com/npm/cli/releases)
[![](https://img.shields.io/static/v1?label=&message=Electron%2021.0.1&color=fff&style=flat&logo=electron)](https://www.electronjs.org)

This program allows you to easily download and install mods and maps for the game Hero's Hour. No Steam required.

## Download

[Download installer from Releases](https://github.com/Flixbox/ModGallery/releases)

Screeenshot:

![image](https://user-images.githubusercontent.com/14835021/196058132-b38ce94e-c339-4422-9233-0f7fa6ba7810.png)

## Adding mods and maps

Mods and maps are managed in the [ModGallery-mods](https://github.com/Flixbox/ModGallery-Mods) repo. Feel free to add mods and maps! There's a guide in that repo's readme.

## Development

- Install Node.js
- Run `npm i --force`
- Run `npm run watch`

## Release

- Push to `main`
- Wait for the CI
- This will create a draft release
- Keep all the files when editing the release
- Finalize the release

## Other info

Generated from the amazing [`vite-electron-builder`](https://github.com/cawa-93/vite-electron-builder) template.
