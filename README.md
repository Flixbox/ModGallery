# ⚔ Community Mod & Map downloader for Hero's Hour

[![](https://img.shields.io/static/v1?label=Discuss&message=on%20Discord&color=7289DA&style=flat&logo=discord)](https://discord.gg/vnZMK2kyY5)

[![Required Node.JS >= v16.13](https://img.shields.io/static/v1?label=node&message=%3E=16.13&logo=node.js&color)](https://nodejs.org/about/releases/) [![Required npm >= v8.1](https://img.shields.io/static/v1?label=npm&message=%3E=8.1&logo=npm&color)](https://github.com/npm/cli/releases) [![](https://img.shields.io/static/v1?label=&message=Electron%2021.0.1&color=fff&style=flat&logo=electron)](https://www.electronjs.org)

This program allows you to easily download and install mods and maps for the game Hero's Hour. No Steam required.

## 💾 Download

[<img src="https://i.imgur.com/Vp5cDvU.png" width="300">](https://www.microsoft.com/store/productId/9NSLRVZF3C89)

[Download installer from Releases](https://github.com/Flixbox/ModGallery/releases)

Screenshot:

![image](https://user-images.githubusercontent.com/14835021/196058132-b38ce94e-c339-4422-9233-0f7fa6ba7810.png)

## 🗺 Adding mods and maps

Mods and maps are managed in the [ModGallery-mods](https://github.com/Flixbox/ModGallery-Mods) repo. Feel free to add mods and maps! There's a guide in that repo's readme.

---

> **Unimportant nerd stuff ahead, no need to continue reading. Here are the [downloads](https://github.com/Flixbox/ModGallery/releases)**

## 👩‍💻 Development

- Install Node.js
- Run `npm i --force`
- Run `npm run watch`

## 🚀 Release

- Push to `main`
- Wait for the CI
- This will create a draft release
- Keep all the files when editing the release
- Finalize the release

## 🍫 Choco

Sometimes it may be helpful to release the most recent version to Chocolatey. The application will auto update on the user's machines regardless of version, but having a halfway recent version on Chocolatey is helpful regardless.

Here's how the update process happens:

- Make sure you can authenticate on Chocolatey with write access to modgallery on the site
- Install Chocolatey
- Authenticate
- Navigate to `/scripts/choco/ModGallery`
- Open `scripts/chocolateyinstall.ps1`
- Adjust `$url` so that it points to the newest release
- Adjust `checksum` (use the `checksum` command to calculate it from the executable setup file)
- Open an admin PowerShell in the directory
- Run `choco pack` to build a new version of the application
- Run `choco install modgallery --source .\modgallery.<version>.nupkg -y` (adjust path to your version)
- Check if the software installed properly (might need to refresh windows or run `refreshenv` to see it pop up)
- Run and try out the software
- Close it again
- Run `choco uninstall modgallery -y`
- Check if the software uninstalled properly (might need to refresh windows or run `refreshenv`)
- If it's all ready to release, run `choco push --source https://push.chocolatey.org/`

## ❤ Other info

Generated from the amazing [`vite-electron-builder`](https://github.com/cawa-93/vite-electron-builder) template.
