#!/bin/bash
# Script to complete git commit and push with optimizations
# Run this script in Git Bash

echo "=== Git Commit/Push Completion Script ==="
echo ""

# Navigate to repository
cd "/d/Weave Srl/CursorAI/Full-Stack Learning_Hasan/FullStack-Learning"

# Remove any lock files
echo "Removing git lock files..."
if [ -f ".git/index.lock" ]; then
    rm -f .git/index.lock
    echo "  Removed index.lock"
fi
if [ -f ".git/gc.pid.lock" ]; then
    rm -f .git/gc.pid.lock
    echo "  Removed gc.pid.lock"
fi
find .git -name "*.lock" -type f -delete 2>/dev/null

# Check git status
echo ""
echo "Checking git status..."
git status

# Add new files
echo ""
echo "Adding .gitignore and GIT_SPEED_FIX.md..."
git add .gitignore GIT_SPEED_FIX.md
if [ $? -eq 0 ]; then
    echo "  Files added successfully"
else
    echo "  Failed to add files. Please close Cursor/VS Code and try again."
    exit 1
fi

# Commit
echo ""
echo "Committing changes..."
git commit -m "Just Test"
if [ $? -eq 0 ]; then
    echo "  Commit successful"
else
    echo "  Commit failed. Please close Cursor/VS Code and try again."
    exit 1
fi

# Push
echo ""
echo "Pushing to remote..."
git push origin Hasan
if [ $? -eq 0 ]; then
    echo "  Push successful!"
else
    echo "  Push failed. You may need to authenticate with GitHub."
    echo "  Try: git push origin Hasan"
fi

echo ""
echo "=== Done ==="
