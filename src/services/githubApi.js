const API_URL = 'https://api.github.com'

export async function getGithubProfile(username) {
  const response = await fetch(
    `${API_URL}/users/${username}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch profile')
  }

  return response.json()
}