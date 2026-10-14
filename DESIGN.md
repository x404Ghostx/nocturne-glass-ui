# 👻 NOCTURNE GLASS OS — AI AGENT DESIGN SYSTEM (`DESIGN.md`)
> **Open-Source UI Specification by [@x404ghostx](https://x.com/x404ghostx) // [github.com/x404Ghostx](https://github.com/x404Ghostx)**
> Drop this `DESIGN.md` into the root of any project (Cursor, Claude Code, Windsurf, v0, Bolt, or Lovable) and prompt:
> *"Build my dashboard following every token, component recipe, and layout rule inside `DESIGN.md`."*

---

## 1. SYSTEM ARCHITECTURE & REQUIRED LIBRARIES
When initializing or modifying this repository, always use the following stack:
- **Framework**: React 18+ (Vite or Next.js App Router) + TypeScript / JSX
- **Styling**: Tailwind CSS (`v3.4+` or `v4`) with arbitrary value support
- **Component Primitives**: `shadcn/ui` (`Dialog`, `Command`, `Checkbox`, `Progress`, `Tooltip`, `ScrollArea`, `Sheet`)
- **Carousel Engine**: `embla-carousel-react` + `embla-carousel-autoplay` (for the Vertical Focus Media Carousel & Mobile Widget Swiper)
- **Icons**: `lucide-react` (1.75px stroke width) + inline brand SVGs
- **Animation**: `framer-motion` or CSS GPU transitions (`transition-all duration-300 ease-out`)

```bash
# Quick One-Line Install for AI Agents
npx shadcn@latest init -d && npx shadcn@latest add card button dialog command checkbox progress badge scroll-area tooltip
npm install lucide-react embla-carousel-react embla-carousel-autoplay framer-motion clsx tailwind-merge
```

---

## 2. ATMOSPHERIC DARK-GLASS DESIGN TOKENS

### 2.1 Color Palette & Surface Hierarchy
| Token Role | CSS / Tailwind Value | Hex / RGBA | Usage Rule |
| :--- | :--- | :--- | :--- |
| **Canvas Obsidian Base** | `bg-[#08090C]` | `#08090C` | Root viewport fallback behind wallpaper |
| **Wallpaper Vignette** | `bg-black/55` | `rgba(8, 9, 12, 0.55)` | Radial darkening over high-res night photography |
| **Primary Glass Card** | `bg-[#12141A]/75 backdrop-blur-2xl` | `rgba(18, 20, 26, 0.75)` | All outer Bento widgets, sidebar dock, top pills |
| **Recessed Inner Row** | `bg-[#1A1D24]/75 hover:bg-[#232732]/90` | `rgba(26, 29, 36, 0.75)` | Bookmark items, Quick Access tiles, To-Do items |
| **Specular Outer Border** | `border border-white/[0.08]` | `rgba(255, 255, 255, 0.08)` | 1px crisp glass rim on every floating card |
| **Top Rim Inner Highlight** | `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)]` | `rgba(255, 255, 255, 0.14)` | Simulates overhead moonlight catching top glass edge |
| **Primary Accent (Coral Rose (Reference))** | `text-[#E85D68] bg-[#E85D68]` | `#E85D68` | Active dock border, checked tasks, audio progress, quote icon |
| **Secondary Accent (Moon)** | `text-[#6384FF]` | `#6384FF` | Weather crescent moon & atmospheric indicators |
| **Text Primary** | `text-[#F3F4F6]` | `#F3F4F6` | Clock hero, widget titles, primary item labels |
| **Text Secondary** | `text-[#9CA3AF]` | `#9CA3AF` | Subtitles, domain URLs, weather location |
| **Text Muted** | `text-[#6B7280]` | `#6B7280` | Timestamps (`2m ago`), keyboard shortcuts (`⌘K`) |

### 2.2 Master Glass Card Class (Copy-Paste Utility)
```html
<div class="rounded-[24px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] p-4">
  <!-- Widget Content -->
</div>
```

### 2.3 Inner Interactive Pill / Row Class
```html
<div class="group flex items-center justify-between px-3.5 py-2.5 rounded-[14px] bg-[#1A1D24]/75 hover:bg-[#232732]/90 border border-white/[0.05] hover:border-white/[0.12] transition-all duration-200 cursor-pointer">
  <!-- Row Content -->
</div>
```

---

## 3. TYPOGRAPHY & SCALING SYSTEM
- **Font Stack**: `'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`
- **Hero Clock Display**: `text-6xl md:text-[76px] font-extralight tracking-[-0.04em] text-[#F3F4F6] tabular-nums`
  - Suffix (`PM`/`AM`): `text-lg md:text-xl font-normal text-[#9CA3AF] ml-2 tracking-normal`
- **Widget Header Title**: `text-[14px] font-medium tracking-[-0.01em] text-[#F3F4F6]`
- **Header Action Pill** (`View all`, `Edit`, `+ Add`, `Clear all`):
  `px-2.5 py-1 rounded-full text-[11px] font-medium text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07]`

---

## 4. RESPONSIVE BENTO GRID ARCHITECTURE (MOBILE + DESKTOP)

### 4.1 Desktop Layout (`lg:grid-cols-12`)
1. **Left Floating Dock**: Fixed or flex column `w-[54px] rounded-[26px]` with 6 navigation icons + bottom `+` square button. Active icon features `border border-[#E85D68]/60 bg-[#E85D68]/10 shadow-[0_0_15px_rgba(232,93,104,0.25)]`.
2. **Hero Header Zone**:
   - Top-Left Pill: Greeting pill (`Good evening, Name 👋`)
   - Top-Right Utility Pill: Segmented 3-icon bar (`Edit | Theme | Settings`)
   - Center Stack: Clock Hero + Date + `⌘K` Search Bar (`max-w-[460px]`)
   - Floating Weather Card: Positioned top-right (`w-[215px] rounded-[22px]`)
3. **Bento Matrix (4 Columns x 2 Rows)**:
   - **Row 1**: `Bookmarks` (3 cols) + `Quick Access` 4x2 squircle grid (3 cols) + `To Do` with 4-segment progress bar (3 cols) + `Focus Media Carousel` (2 cols, spans 2 rows vertically).
   - **Row 2**: `Notes` (3 cols) + `Quote` (2.5 cols) + `Recently Closed` (4.5 cols).

### 4.2 Mobile Adaptive Rules (`< 768px`)
- Hide left vertical dock; render a **Floating Glass Bottom Navigation Bar** (`fixed bottom-4 inset-x-4 h-14 rounded-full z-50`).
- Collapse Bento Grid into a single-column vertical flow (`grid-cols-1 gap-3.5`) with horizontal touch swipe on the Focus Carousel and Quick Access grid.
- Ensure all interactive tap targets meet `min-h-[44px]`.

---

## 5. AI AGENT EXECUTION CHECKLIST
- [x] Never use flat opaque gray cards; always layer `backdrop-blur` over an atmospheric dark background.
- [x] Always include the `1px` top specular inner highlight (`inset 0 1px 0 0 rgba(255,255,255,0.14)`).
- [x] Use `#E85D68` sparingly (under 8% of total pixels) so it pops against the obsidian glass.
