import { githubApiFetch } from './githubApi.service'

export async function getGithubRepositories(username) {
  return githubApiFetch(`/users/${username}/repos?sort=updated&per_page=100`)
}
