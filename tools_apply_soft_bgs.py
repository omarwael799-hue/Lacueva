import re, glob, pathlib, sys

ROOT = pathlib.Path(".")
PAGE = ROOT / "app/[locale]/page.tsx"

# pick first match for each bg-soft-0X.(png|jpg|jpeg|webp)
def pick(n: int):
    patt = str(ROOT / f"public/images/gallery/backgrounds/section/bg-soft-0{n}.*")
    matches = sorted(glob.glob(patt))
    if not matches:
        print(f"❌ Missing bg-soft-0{n}.* in public/images/gallery/backgrounds/section/")
        sys.exit(1)
    # convert to public URL by stripping leading "public"
    p = matches[0].replace("public", "", 1)
    return p

bgs = {
    "about-lacueva": ("01", pick(1)),
    "location": ("02", pick(2)),
    "attractions": ("03", pick(3)),
    "segments": ("04", pick(4)),
    "facilities": ("05", pick(5)),
    "brand": ("06", pick(6)),
}

s = PAGE.read_text(encoding="utf-8")

for sec_id, (code, bgurl) in bgs.items():
    # skip if already wrapped
    if f'data-softbg="{code}"' in s:
        continue

    # match the whole SectionShell block by id
    pattern = re.compile(
        rf'(<SectionShell\b[^>]*\bid="{re.escape(sec_id)}"[^>]*>[\s\S]*?</SectionShell>)',
        re.M
    )

    m = pattern.search(s)
    if not m:
        print(f"⚠️  Could not find <SectionShell id=\"{sec_id}\"> block")
        continue

    block = m.group(1)
    wrapped = (
        f'<div data-softbg="{code}" className="relative bg-[url(\'{bgurl}\')] bg-cover bg-center bg-no-repeat">\n'
        f'  <div className="absolute inset-0 bg-white/70"></div>\n'
        f'  <div className="relative z-10">\n'
        f'{block}\n'
        f'  </div>\n'
        f'</div>'
    )

    s = s[:m.start()] + wrapped + s[m.end():]

PAGE.write_text(s, encoding="utf-8")
print("✅ Applied soft backgrounds to sections (where found).")
