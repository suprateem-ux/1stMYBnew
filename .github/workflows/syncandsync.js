name: Sync BotLi Python Files

on:
  workflow_dispatch:  # Run manually
  push:
    branches:
      - main

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repo (full history)
        uses: actions/checkout@v4
        with:
          fetch-depth: 0   # important for rebase/pull

      - name: Clone Torom/BotLi
        run: |
          git clone --depth 1 https://github.com/Torom/BotLi temp_BotLi

      - name: Copy over only .py files (excluding chatter.py)
        run: |
          rsync -av \
            --include='*/' \
            --include='*.py' \
            --exclude='chatter.py' \
            --exclude='*' \
            temp_BotLi/ ./

      - name: Configure Git
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"

      - name: Commit changes
        run: |
          git add -u
          git add *.py || true
          git commit -m "Sync .py files from Torom/BotLi (excluding chatter.py)" || echo "No changes to commit"

      - name: Pull remote changes (avoid rejected push)
        run: |
          git fetch origin main
          git rebase origin/main || true

      - name: Push changes
        run: |
          git push origin main
