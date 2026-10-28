# Aura · installation via LiveContainer

Ce dossier publie Aura pour **LiveContainer**, dans deux formats de dépôt JSON, plus une copie de l'IPA directement téléchargeable depuis le dépôt.

| Gestionnaire | URL à ajouter | Format |
| --- | --- | --- |
| **LBox** (et lecteurs de sources JSON à plat) | `https://raw.githubusercontent.com/Leboxis/aura-ios/refs/heads/main/livecontainer/source.json` | tableau `apps[]` avec `downloadURL` vers l'IPA |
| **LC-DL** (format historique) | `https://raw.githubusercontent.com/Leboxis/aura-ios/refs/heads/main/livecontainer/repo.json` | `repo.json` + `apps.json` + fiche par `bundleID` |

Sans gestionnaire, l'IPA est aussi **versionné dans ce dossier** : [`Aura-1.0.0.ipa`](Aura-1.0.0.ipa) (bouton *Download* sur GitHub), et disponible sur la [release `com.leboxis.aura`](https://github.com/Leboxis/aura-ios/releases/tag/com.leboxis.aura).

## Installation

### LBox (recommandé pour LiveContainer)

1. Installer LBox sur l'iPhone (iOS 17.6+).
2. Onglet Sources → `+` → coller l'URL de `source.json` ci-dessus.
3. La fiche **Aura 1.0** apparaît ; toucher *Get* télécharge l'IPA.
4. Si *Auto .ipa to .app* est activé dans les réglages LBox, l'app est extraite dans le dossier LiveContainer ; sinon, l'importer avec le `+` de LiveContainer.

### LC-DL

LC-DL ajoute les dépôts par code court de 6 caractères ; ce dépôt n'en a pas. Utiliser LBox ou l'import direct de l'IPA.

### Import direct

1. Télécharger [`Aura-1.0.0.ipa`](Aura-1.0.0.ipa).
2. LiveContainer → `+` → sélectionner l'IPA.
3. Lancer **Aura**.

LiveContainer doit lui-même être installé (via SideStore ou AltStore, identifiant Apple gratuit accepté). L'IPA d'Aura est non signé : c'est LiveContainer qui le signe à l'installation.

## Contenu

| Fichier | Rôle |
| --- | --- |
| `source.json` | Source au format LBox : `apps[]`, `version`, `downloadURL`, `size` |
| `repo.json` | Descripteur de dépôt LC-DL (nom, message, icône, URL de base) |
| `apps.json` | Index LC-DL (`id` → nom + `bundleID`) |
| `apps/com.leboxis.aura.json` | Fiche LC-DL : description, icône, `appURL`, version, taille |
| `Aura-1.0.0.ipa` | Copie de l'IPA de la release, pour le téléchargement direct |
| `icons/com.leboxis.aura.png` | Icône 1024 × 1024 |
| `icon.png` | Icône du dépôt |

Le fichier LC-DL `appURL` pointe vers `app.zip`, dont la racine contient le bundle `com.leboxis.aura.app/` (et non `Payload/`), comme l'attendent les installeurs. Les binaires du zip sont stockés en `0755`.

## Caractéristiques

- Bundle : `com.leboxis.aura`
- Version : `1.0` (build `1`)
- Minimum : iOS 15.0, arm64
- `app.zip` : 2,1 Mo, 36 entrées · IPA : 2,2 Mo

## Mettre à jour l'app

1. Récupérer l'IPA depuis l'artifact `aura-ios-ipa` du workflow **iOS IPA**.
2. Mettre à jour `version`, `versionDate` et `size` dans [`source.json`](source.json), ainsi que `version` et `size` dans [`apps/com.leboxis.aura.json`](apps/com.leboxis.aura.json).
3. Reconstruire `app.zip` si le format LC-DL est conservé :

   ```bash
   unzip Aura.ipa -d build
   mv build/Payload/App.app build/com.leboxis.aura.app
   cd build && zip -r -y ../app.zip com.leboxis.aura.app
   ```

4. Remplacer l'IPA versionné, committer, puis mettre à jour la release :

   ```bash
   gh release upload com.leboxis.aura app.zip Aura-1.0.0.ipa --clobber --repo Leboxis/aura-ios
   ```

## Liens

- App : https://github.com/Leboxis/aura-ios
- Release : https://github.com/Leboxis/aura-ios/releases/tag/com.leboxis.aura
- LiveContainer : https://github.com/LiveContainer/LiveContainer
- LBox : https://github.com/Lolendor/LBox
- Format LC-DL : https://github.com/lc-dl/apps

Projet non affilié à LiveContainer, LC-DL ou LBox. Aura est une démonstration : les visuels et les données d'écoute sont fictifs.
