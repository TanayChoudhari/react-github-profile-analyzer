import { API_URL } from '../constants/api.constants'

export async function getGithubProfile(username) {
  const response = await fetch(
    `${API_URL}/users/${username}`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch Github profile for ${username}. Please enter a valid username`)
  }

  return response.json()
}
