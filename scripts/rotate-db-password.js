#!/usr/bin/env node
/**
 * Simple password rotation helper for Postgres (Supabase Postgres in this project).
 * - Generates a new strong password
 * - Replaces password in DATABASE_URL and DIRECT_URL inside .env.local
 * - Writes updated .env.local back to disk
 * - Outputs next manual steps to apply the new password in Supabase UI and update secrets
 */
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

function generatePassword(len = 32) {
  // Generate a URL-safe base64 password
  return crypto.randomBytes(Math.ceil(len * 3 / 4)).toString('base64').replace(/[+/=]/g, '').slice(0, len)
}

function replacePasswordInUrl(url, newPwd) {
  // format: postgres://username:password@host:port/db
  const re = /(postgresql:\/\/[^:]+:)([^@]+)(@.*)/
  const m = url.match(re)
  if (!m) return url
  return `${m[1]}${newPwd}${m[3]}`
}

async function main() {
  const envPath = path.resolve(__dirname, '..', '.env.local')
  let content
  try {
    content = await fs.promises.readFile(envPath, 'utf8')
  } catch (err) {
    console.error('Could not read .env.local at', envPath)
    process.exit(1)
  }

  const lines = content.split(/\r?\n/)
  let dbUrl = null
  let directUrl = null
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]
    if (l.startsWith('DATABASE_URL=')) {
      dbUrl = l.substring('DATABASE_URL='.length).trim()
    } else if (l.startsWith('DIRECT_URL=')) {
      directUrl = l.substring('DIRECT_URL='.length).trim()
    }
  }

  const newPwd = generatePassword()
  let updated = false
  const newLines = lines.map((l) => {
    if (l.startsWith('DATABASE_URL=') && dbUrl) {
      const updatedUrl = replacePasswordInUrl(dbUrl, newPwd)
      // store back the updated URL in the line
      return 'DATABASE_URL=' + updatedUrl
    }
    if (l.startsWith('DIRECT_URL=')) {
      if (directUrl) {
        const updatedUrl = replacePasswordInUrl(directUrl, newPwd)
        return 'DIRECT_URL=' + updatedUrl
      }
      return l
    }
    return l
  })

  // Check if password changed by comparing strings
  if (newLines.join('\n') !== content) {
    updated = true
  }

  if (!updated) {
    console.log('No changes detected. Nothing to rotate.')
    process.exit(0)
  }

  // Write back
  const newContent = newLines.join('\n') + '\n'
  await fs.promises.writeFile(envPath, newContent, 'utf8')
  console.log('DB password rotated. New password is:', newPwd)
  console.log('Updated', envPath, 'with new DATABASE_URL and DIRECT_URL passwords.')
  console.log('Next steps:')
  console.log('1) In Supabase, rotate the Postgres password manually to match the new value.')
  console.log('2) Update any external secrets/configs that reference DATABASE_URL or DIRECT_URL with the new password.')
  console.log('3) Redeploy or refresh your environment so the app uses the new credentials.')
}

main().catch((e) => {
  console.error('Error rotating DB password:', e)
  process.exit(1)
})
