name: Sync BotLi Python Files

on:
  workflow_dispatch:  # run manually
  push:
    branches:
      - main

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repo
        uses: actions/checkout@v4

      - name: Clone Torom/BotLi
        run: |
          git clone --depth 1 https://github.com/Torom/BotLi temp_BotLi

      - name: Copy over .py files
        run: |
          find temp_BotLi -name "*.py" -type f -exec cp --parents {} . \;

      - name: Commit changes
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add .
          git commit -m "Sync .py files from Torom/BotLi" || echo "No changes to commit"
          git push
