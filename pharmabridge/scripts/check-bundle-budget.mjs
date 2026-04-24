import fs from 'node:fs/promises'
import path from 'node:path'
import zlib from 'node:zlib'

const projectRoot = process.cwd()
const htmlPath = path.join(projectRoot, '.next', 'server', 'app', 'ar.html')
const html = await fs.readFile(htmlPath, 'utf8')

const stylesheetMatches = [...html.matchAll(/<link[^>]+href="(\/_next\/static\/chunks\/[^"'?]+\.css)"/g)]
const stylesheets = stylesheetMatches.map((match) => match[1])

const scriptMatches = [...html.matchAll(/<script[^>]+src="(\/_next\/static\/chunks\/[^"'?]+\.js)"([^>]*)><\/script>/g)]
const modernScripts = scriptMatches
  .filter((match) => !match[2].includes('noModule'))
  .map((match) => match[1])

const assets = [...new Set([...stylesheets, ...modernScripts])]

if (!assets.length) {
  throw new Error('No route assets were found for /ar while checking bundle budget.')
}

let totalGzipBytes = 0

for (const asset of assets) {
  const relativePath = asset.replace('/_next/', '').split('?')[0]
  const filePath = path.join(projectRoot, '.next', relativePath)
  const content = await fs.readFile(filePath)
  totalGzipBytes += zlib.gzipSync(content).byteLength
}

const budgetBytes = 200 * 1024

if (totalGzipBytes > budgetBytes) {
  throw new Error(`Modern bundle budget exceeded: ${(totalGzipBytes / 1024).toFixed(2)}KB gzipped (limit 200KB).`)
}

console.log(`Modern bundle budget passed: ${(totalGzipBytes / 1024).toFixed(2)}KB gzipped.`)
