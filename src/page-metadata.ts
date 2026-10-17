import { useEffect } from 'react'

const siteUrl = 'https://forgewell-business-systems-and-tech.vercel.app'

export function usePageMetadata(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title

    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    descriptionTag?.setAttribute('content', description)

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    canonical?.setAttribute('href', `${siteUrl}${path}`)

    const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    openGraphTitle?.setAttribute('content', title)

    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    openGraphDescription?.setAttribute('content', description)

    const openGraphUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    openGraphUrl?.setAttribute('content', `${siteUrl}${path}`)
  }, [title, description, path])
}