const GITHUB_API_URL = 'https://api.github.com'

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { Allow: 'GET' },
      body: JSON.stringify({ message: 'Only GET requests are supported' }),
    }
  }

  const path = event.queryStringParameters?.path
  if (!path || !path.startsWith('/') || path.startsWith('//') || path.includes('://')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'A valid GitHub API path is required' }),
    }
  }

  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(`${GITHUB_API_URL}${path}`, { headers })
    const body = await response.text()

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Cache-Control': 'no-store',
      },
      body,
    }
  } catch (error) {
    return {
      statusCode: 502,
      body: JSON.stringify({ message: 'Unable to reach GitHub right now' }),
    }
  }
}
