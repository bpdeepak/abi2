#!/bin/bash

# Ask user for output format
echo "Choose output format (md/pdf/docx): "
read -r FORMAT
FORMAT=$(echo "$FORMAT" | tr '[:upper:]' '[:lower:]')  # lowercase

if [[ "$FORMAT" != "md" && "$FORMAT" != "pdf" && "$FORMAT" != "docx" ]]; then
  echo "Invalid format. Please choose md, pdf, or docx."
  exit 1
fi

OUTPUT="codebase_dump.md"

# Clear output file
> "$OUTPUT"

# Add directory tree (excluding __pycache__ and venv)
echo "## Project Directory Structure" >> "$OUTPUT"
echo '```' >> "$OUTPUT"
tree -F --dirsfirst -I '__pycache__|venv|models|node_modules' >> "$OUTPUT"
echo '```' >> "$OUTPUT"
echo -e "\n\n" >> "$OUTPUT"

# File extensions to include
EXTENSIONS="js|ts|tsx|py|css|html|json|sh|Dockerfile|md"

# Use find with pruning to exclude specific directories
find . -type d \( -name '__pycache__' -o -name 'venv' -o -name '.git' -o -name 'dist' -o -name 'build' -o -name 'ai_framework/models' -o -name 'node_modules' \) -prune -o -type f -print \
  | grep -Ev 'package-lock.json' \
  | grep -E "\.($EXTENSIONS)$|Dockerfile$" \
  | sort \
  | while read -r file; do
    # Skip the output file to avoid self-inclusion
    if [[ "$file" == "./$OUTPUT" ]]; then
      continue
    fi

    echo "### \`$file\`" >> "$OUTPUT"
    echo '```'$(basename "$file" | awk -F. '{print $NF}') >> "$OUTPUT"
    cat "$file" >> "$OUTPUT"
    echo -e '\n```\n' >> "$OUTPUT"
done

echo "✅ Markdown file created: $OUTPUT"

# Convert if needed
if [[ "$FORMAT" == "pdf" || "$FORMAT" == "docx" ]]; then
  # Check if pandoc is installed
  if ! command -v pandoc &> /dev/null; then
    echo "Error: pandoc is not installed. Please install pandoc to convert to $FORMAT."
    exit 1
  fi

  OUTFILE="codebase_dump.$FORMAT"
  echo "Converting to $OUTFILE..."

  if [[ "$FORMAT" == "pdf" ]]; then
    pandoc "$OUTPUT" -o "$OUTFILE" --highlight-style=tango
  else
    pandoc "$OUTPUT" -o "$OUTFILE"
  fi

  echo "✅ File created: $OUTFILE"
fi