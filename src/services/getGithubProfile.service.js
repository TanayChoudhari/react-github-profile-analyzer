import { githubApiFetch } from './githubApi.service'

export async function getGithubProfile(username) {
  return githubApiFetch(`/users/${username}`)
}
