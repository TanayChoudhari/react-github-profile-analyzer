import { getGithubRepositories } from './getGithubRepositories.service'
import { githubApiFetch } from './githubApi.service'

export async function getLanguageCount(username, repositoryList = null) {
  const repositories = repositoryList || await getGithubRepositories(username)
  const languageCount = {}

  const languageResponses = await Promise.all(
    repositories.map(async (repo) => {
      try {
        return await githubApiFetch(`/repos/${repo.owner.login}/${repo.name}/languages`)
      } catch (error) {
        if (error.message.includes('rate limit exceeded')) throw error
        return {}
      }
    })
  )

  for (const languages of languageResponses) {
    for (const [language, bytes] of Object.entries(languages)) {
      languageCount[language] = (languageCount[language] || 0) + bytes
    }
  }

  return languageCount
}
