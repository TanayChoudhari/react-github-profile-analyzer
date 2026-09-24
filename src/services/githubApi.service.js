export async function githubApiFetch(path) {
  const response = await fetch(
    `/.netlify/functions/github-api?path=${encodeURIComponent(path)}`
  )
  const responseText = await response.text()
  let responseData = null

  try {
    responseData = JSON.parse(responseText)
  } catch {
    throw new Error(
      'GitHub proxy is unavailable. Confirm the Netlify Function is deployed and redeploy the site.'
    )
  }

  if (!response.ok) {
    if (response.status === 403 && responseData?.message?.toLowerCase().includes('rate limit')) {
      throw new Error('GitHub API rate limit exceeded. Configure GITHUB_TOKEN in Netlify environment variables.')
    }

    throw new Error(responseData?.message || `GitHub API request failed with status ${response.status}`)
  }

  return responseData
}
