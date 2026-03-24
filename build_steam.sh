#!/usr/bin/env bash

set -e

USERNAME="tesseractcat_dev"
VDF_PATH="/home/tesseractcat/Desktop/Projects/itmas/steam.vdf"

# Prompt for password (hidden input)
read -s -p "Steam password: " PASSWORD
echo

# Run SteamCMD
export STEAM_PASSWORD="$PASSWORD"

NIXPKGS_ALLOW_UNFREE=1 nix-shell -p steamcmd --run '
steamcmd +login "'"$USERNAME"'" "$STEAM_PASSWORD" \
+run_app_build "'"$VDF_PATH"'" \
+quit
'

# Clear password variable for safety
unset PASSWORD
