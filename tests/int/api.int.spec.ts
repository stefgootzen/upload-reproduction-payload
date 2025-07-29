import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'
import path from 'path'
import * as fs from 'node:fs'

let payload: Payload

const filepathPng = path.resolve(__dirname, './placeholder.png')
const filepathJpg = path.resolve(__dirname, './placeholder.jpeg')

describe('Local upload', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('with filePath works (png)', async () => {
    const media = await payload.create({
      collection: 'media',
      filePath: filepathPng,
      data: {
        alt: 'alt',
      },
    })

    expect(media).toBeDefined()
  })

  it('with filebuffer works (png)', async () => {
    const fileBuffer = fs.readFileSync(filepathPng)
    const stats = fs.statSync(filepathPng)

    const media = await payload.create({
      collection: 'media',
      file: {
        data: fileBuffer,
        size: stats.size,
        name: "random.png",
        mimetype: "image/png",
      },
      data: {
        alt: 'alt',
      },
    })

    expect(media).toBeDefined()
  })


  it('with filePath works (jpg)', async () => {
    const media = await payload.create({
      collection: 'media',
      filePath: filepathJpg,
      data: {
        alt: 'alt',
      },
    })

    expect(media).toBeDefined()
  })

  it('with filebuffer works (jpg)', async () => {
    const fileBuffer = fs.readFileSync(filepathJpg)
    const stats = fs.statSync(filepathJpg)

    const media = await payload.create({
      collection: 'media',
      file: {
        data: fileBuffer,
        size: stats.size,
        name: "random.png",
        mimetype: "image/jpeg",
      },
      data: {
        alt: 'alt',
      },
    })

    expect(media).toBeDefined()
  })
})
