#!/usr/bin/env bash
set -euo pipefail

FILE="app/[locale]/page.tsx"
BG_DIR="public/images/gallery/backgrounds/section"

pick_bg () {
  local n="$1"
  local f
  f="$(ls "$BG_DIR/bg-soft-0${n}."* 2>/dev/null | head -n 1 || true)"
  if [ -z "$f" ]; then
    echo "❌ Missing bg-soft-0${n}.* in $BG_DIR"
    exit 1
  fi
  echo "/${f#public/}"
}

BG1="$(pick_bg 1)"
BG2="$(pick_bg 2)"
BG3="$(pick_bg 3)"
BG4="$(pick_bg 4)"
BG5="$(pick_bg 5)"
BG6="$(pick_bg 6)"

# شيل أي wrappers قديمة (لو اتعملت قبل كده)
perl -0777 -i -pe '
  s{
    <div\s+data-softbg="[^"]+"\s+className="relative\s+bg-\[url\([^\)]*\)\]\s+bg-cover\s+bg-center\s+bg-no-repeat">\s*
      <div\s+className="absolute\s+inset-0\s+bg-white/70"></div>\s*
      <div\s+className="relative\s+z-10">\s*
        ( <SectionShell\b[\s\S]*?<\/SectionShell> )
      \s*<\/div>\s*
    <\/div>
  }{$1}gsx
' "$FILE"

wrap () {
  local id="$1"
  local bg="$2"
  local tag="$3"

  BG_URL="$bg" perl -0777 -i -pe '
    BEGIN { $bg = $ENV{BG_URL} }
    s{
      ( <SectionShell \s+ id="'$id'" [\s\S]*? <\/SectionShell> )
    }{
      "<div data-softbg=\"'$tag'\" className=\"relative bg-[url('\''$bg'\'')] bg-cover bg-center bg-no-repeat\">\n"
      ."  <div className=\"absolute inset-0 bg-white/70\"></div>\n"
      ."  <div className=\"relative z-10\">$1</div>\n"
      ."</div>"
    }gsxe
  ' "$FILE"
}

wrap "about-lacueva" "$BG1" "01"
wrap "location"      "$BG2" "02"
wrap "rides"         "$BG3" "03"
wrap "segments"      "$BG4" "04"
wrap "facilities"    "$BG5" "05"
wrap "brand"         "$BG6" "06"

echo "✅ wrappers added:"
grep -n "data-softbg" "$FILE" | head -n 20
