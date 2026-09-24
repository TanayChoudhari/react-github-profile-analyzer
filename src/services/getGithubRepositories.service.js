import { API_URL } from '../constants/api.constants'

export async function getGithubRepositories(username) {
  const response = await fetch(
    `${API_URL}/users/${username}/repos?sort=updated&per_page=100`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories for ${username}`)
  }

  return response.json()
}
