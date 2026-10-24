import fs from "fs"
import path from "path"
import Portfolio from "@/app/components/Portfolio"

// Read at build time, so the static export contains the text from profile.md.
// See the comment at the top of that file for the format.
function loadProfile() {
  const raw = fs.readFileSync(path.join(process.cwd(), "src/content/profile.md"), "utf8")
  const md = raw.replace(/<!--[\s\S]*?-->/g, "").replace(/\r\n/g, "\n")
  const [introChunk, ...sectionChunks] = md.split(/^## /m)

  const sections = sectionChunks.map((chunk) => {
    const [heading, ...bodyLines] = chunk.split("\n")
    let body = bodyLines.join("\n").trim()
    let image = null
    let keywords = []
    // Optional "image:" and "keywords:" lines at the top of a section, in any order
    let meta
    while ((meta = body.match(/^(image|keywords):[ \t]*(.*)\n?/i))) {
      if (meta[1].toLowerCase() === "image") {
        image = meta[2].trim()
      } else {
        keywords = meta[2].split(",").map((k) => k.trim().toLowerCase()).filter(Boolean)
      }
      body = body.slice(meta[0].length).trim()
    }
    return { prompt: heading.trim(), text: body, image, keywords }
  })

  return { intro: introChunk.trim(), sections }
}

export default function Page() {
  const { intro, sections } = loadProfile()
  return <Portfolio intro={intro} sections={sections} />
}
