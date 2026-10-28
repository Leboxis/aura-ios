# Aura · dépôt LiveContainer

Ce dossier fait partie du dépôt **[Aura](https://github.com/Leboxis/aura-ios)** et publie son descripteur pour **LiveContainer**.

L'app y est exposée sous forme de bundle `.app` zippé (`app.zip`) et d'IPA non signé ; LiveContainer la signe à l'installation, il n'y a donc rien à re-signer à chaque build.

## Installation

### 1. Directement dans LiveContainer (le plus simple)

1. Télécharger **[Aura-1.0.0.ipa](https://github.com/Leboxis/aura-ios/releases/download/com.leboxis.aura/Aura-1.0.0.ipa)**.
2. Ouvrir LiveContainer → bouton `+` → sélectionner l'IPA.
3. Lancer **Aura** depuis la liste des apps.

LiveContainer doit lui-même être installé sur l'iPhone (via SideStore ou AltStore, identifiant Apple gratuit accepté). L'IPA d'Aura n'a pas besoin d'être signé : c'est LiveContainer qui s'en charge.

### 2. Via le dépôt JSON

URL du dépôt :

```
https://raw.githubusercontent.com/Leboxis/aura-ios/refs/heads/main/livecontainer/repo.json
```

- Les gestionnaires de dépôts compatibles avec le format LC-DL (LBox, etc.) peuvent pointer sur cette URL et proposer Aura directement.
- LC-DL, lui, ajoute les dépôts par code court de 6 caractères ; ce dépôt n'en a pas encore, utilisez donc l'option 1 ou un gestionnaire acceptant une URL.
- Fiche de l'app : [`apps/com.leboxis.aura.json`](apps/com.leboxis.aura.json)

## Format

| Fichier | Rôle |
| --- | --- |
| `repo.json` | Descripteur du dépôt : nom, message, icône, URL de base |
| `apps.json` | Index des apps (`id` → nom + `bundleID`) |
| `apps/com.leboxis.aura.json` | Fiche de l'app : description, icône, `appURL`, version, taille |
| `icons/com.leboxis.aura.png` | Icône 1024 × 1024 |
| `icon.png` | Icône du dépôt |

`appURL` pointe vers `app.zip`, dont la racine contient le bundle `com.leboxis.aura.app/` (et non `Payload/`), comme l'attendent les installeurs LiveContainer. Les fichiers du bundle sont stockés avec leurs permissions Unix (binaires en `0755`).

## Caractéristiques

- Bundle : `com.leboxis.aura`
- Version : `1.0` (build `1`)
- Minimum : iOS 15.0, arm64
- Contenu : `app.zip` (2,1 Mo, 36 entrées), `Aura-1.0.0.ipa` (2,2 Mo)

## Mettre à jour l'app

1. Récupérer l'IPA depuis l'artifact `aura-ios-ipa` du workflow **iOS IPA**.
2. Reconstruire `app.zip` :

   ```bash
   unzip Aura.ipa -d build
   mv build/Payload/App.app build/com.leboxis.aura.app
   cd build && zip -r -y ../app.zip com.leboxis.aura.app
   ```

3. Remplacer les assets de la release `com.leboxis.aura` :

   ```bash
   gh release upload com.leboxis.aura app.zip Aura-1.0.0.ipa --clobber --repo Leboxis/aura-ios
   ```

4. Mettre à jour `version` et `size` dans [`apps/com.leboxis.aura.json`](apps/com.leboxis.aura.json), puis pousser.

## Liens

- App : https://github.com/Leboxis/aura-ios
- Release LiveContainer : https://github.com/Leboxis/aura-ios/releases/tag/com.leboxis.aura
- LiveContainer : https://github.com/LiveContainer/LiveContainer
- Format de dépôt LC-DL : https://github.com/lc-dl/apps

Projet non affilié à LiveContainer ni à LC-DL. Aura est une démonstration : les visuels et les données d'écoute sont fictifs.
