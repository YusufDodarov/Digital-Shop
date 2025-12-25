import { Metadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { ProductMetadata } from '@/app/types'

export default function customMetadata({title = 'Digital Shop',description = 'A digital shop for electronics',keywords = ['digital', 'laptop', 'mobile'],images,}: ProductMetadata): Metadata {
  return {title,description,keywords,openGraph: {title,description,type: 'website',images,} as OpenGraph}
}
