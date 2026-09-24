import { githubApiFetch } from './githubApi.service'

export async function getStarredRepositories(username) {
  const starredItems = await githubApiFetch(
    `/users/${username}/starred?sort=created&direction=desc&per_page=100`
  )

  return starredItems.map((item) => item.repo
    ? { ...item.repo, starred_at: item.starred_at }
    : item
  )
}
