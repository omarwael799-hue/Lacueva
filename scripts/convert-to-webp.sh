#!/bin/zsh
set -euo pipefail

Q=80

convert_one () {
  local f="$1"
  local out="${f%.*}.webp"
  if [ -f "$out" ]; then
    return 0
  fi
  cwebp -quiet -q "$Q" "$f" -o "$out" >/dev/null 2>&1 || {
    magick "$f" -strip -quality "$Q" "$out"
  }
}

export -f convert_one >/dev/null 2>&1 || true

while IFS= read -r -d '' f; do convert_one "$f"; done < <(find public/images -type f -iname '*.png' -print0)
while IFS= read -r -d '' f; do convert_one "$f"; done < <(find public/images -type f -iname '*.jpg' -print0)
while IFS= read -r -d '' f; do convert_one "$f"; done < <(find public/images -type f -iname '*.jpeg' -print0)

for ext in ts tsx js jsx css html md json; do
  if [ -d . ]; then
    find . -type f -name "*.${ext}" -print0 | xargs -0 perl -pi -e 's/\.(png|jpe?g)\b/.webp/ig'
  fi
done

echo "done"
