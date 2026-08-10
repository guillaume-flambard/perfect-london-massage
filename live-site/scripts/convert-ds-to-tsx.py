#!/usr/bin/env python3
"""Convert DS .jsx + .d.ts pairs into typed .tsx (types inlined, imports on top)."""
import re, os, sys, glob

ROOT = "/Users/memo/projects/perfect-london-massage/ds/components"
ERRORS = []

def inline_types(dts_path, stem):
    dts = open(dts_path).read()
    blocks = []
    for m in re.finditer(r"export interface (\w+) \{[\s\S]*?\n\}", dts):
        blocks.append(m.group(0))
    # extra named type aliases referenced (e.g. IconName, RadioOption, SelectOption, AccordionItem, PostcodeResult)
    for m in re.finditer(r"export type (\w+) = [^;]+;", dts):
        blocks.append(m.group(0))
    # ICON_PATHS/ICON_NAMES consts for Icon
    for m in re.finditer(r"export (?:declare )?const (ICON_PATHS|ICON_NAMES): [^;]+;", dts):
        blocks.append(m.group(0))
    return "\n\n".join(blocks)

def convert(jsx_path, dts_path):
    src = open(jsx_path).read()
    stem = os.path.basename(jsx_path)[:-4]
    props_name = f"{stem}Props"

    # --- separate the import block (leading import statements) from the body ---
    lines = src.split("\n")
    imports = []
    body_start = 0
    for i, ln in enumerate(lines):
        if ln.startswith("import "):
            imports.append(ln)
        else:
            body_start = i
            break
    body = "\n".join(lines[body_start:])

    # --- fix import specifiers .jsx -> .tsx ---
    new_imports = []
    for imp in imports:
        imp = imp.replace("'./", "'./").replace(".jsx'", ".tsx'")
        # React default import -> namespace for TSX
        if imp == "import React from 'react';":
            new_imports.append("import * as React from 'react';")
        elif imp.startswith("import React, {"):
            new_imports.append("import * as React from 'react';")
            new_imports.append(imp.replace("import React, {", "import {", 1))
        else:
            new_imports.append(imp)

    # --- type ONLY the component function named `stem` ---
    # pattern: export function Stem({ ... }) or function Stem({ ... })
    def type_component(m):
        name = m.group(1)
        params = m.group(2)
        return f"export function {name}({params}: {props_name})"
    body2 = re.sub(
        rf"export function {stem}\(([^)]*)\) \{{",
        lambda m: f"export function {stem}({m.group(1)}: {props_name}) {{",
        body, count=1)
    body2 = re.sub(
        rf"^function {stem}\(([^)]*)\) \{{",
        lambda m: f"export function {stem}({m.group(1)}: {props_name}) {{",
        body2, count=1, flags=re.M)

    # --- assemble: imports first, then types, then body ---
    types_block = inline_types(dts_path, stem)
    out = "\n".join(new_imports) + "\n\n" + types_block + "\n\n" + body2
    return out

for jsx in sorted(glob.glob(f"{ROOT}/**/*.jsx", recursive=True)):
    stem = os.path.basename(jsx)[:-4]
    dts = os.path.join(os.path.dirname(jsx), stem + ".d.ts")
    if not os.path.exists(dts):
        ERRORS.append(f"no .d.ts for {jsx}")
        continue
    out = convert(jsx, dts)
    tsx = jsx[:-4] + ".tsx"
    open(tsx, "w").write(out)
    print("converted", os.path.relpath(tsx, ROOT))

if ERRORS:
    print("ERRORS:", ERRORS)
    sys.exit(1)
