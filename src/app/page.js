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
    const imageMatch = body.match(/^image:\s*(\S+)\s*\n?/i)
    if (imageMatch) {
      image = imageMatch[1]
      body = body.slice(imageMatch[0].length).trim()
    }
    return { prompt: heading.trim(), text: body, image }
  })

  return { intro: introChunk.trim(), sections }
}

export default function Page() {
  const { intro, sections } = loadProfile()
  return <Portfolio intro={intro} sections={sections} />
}
