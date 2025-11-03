import { Helmet } from 'react-helmet'

/**
 * SEO Component for reusable meta tags across pages
 * @param {Object} props - SEO configuration object
 * @param {string} props.title - Page title (required)
 * @param {string} props.description - Page description (required)
 * @param {string} props.keywords - Comma-separated keywords (optional)
 * @param {string} props.image - OG image URL (optional, defaults to site image)
 * @param {string} props.url - Canonical URL (optional)
 * @param {string} props.type - OG type (optional, defaults to 'website')
 * @param {boolean} props.noindex - Whether to prevent indexing (optional, defaults to false)
 */
function SEO({
  title = 'KidzKorner | Fun Learning for Children',
  description = 'KidzKorner is an interactive educational platform for children featuring alphabet, numbers, shapes, colors, animals, and story lessons.',
  keywords = 'kids learning, educational games, children education, preschool activities',
  image = 'https://your-squarespace-domain.squarespace.com/Bg/kidzBackground.webp',
  url = 'https://your-squarespace-domain.squarespace.com',
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title.includes('KidzKorner') ? title : `${title} | KidzKorner`
  const siteUrl = process.env.VITE_SITE_URL || 'https://your-squarespace-domain.squarespace.com'
  const canonicalUrl = url.startsWith('http') ? url : `${siteUrl}${url}`
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="KidzKorner" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}

export default SEO

