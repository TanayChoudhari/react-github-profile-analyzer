import { API_URL } from '../constants/api.constants'
import { getGithubRepositories } from './getGithubRepositories.service'

export async function getLanguageCount(username, repositoryList = null) {
  const repositories = repositoryList || await getGithubRepositories(username)
  const languageCount = {}

  const languageResponses = await Promise.all(
    repositories.map(async (repo) => {
      const response = await fetch(
        `${API_URL}/repos/${repo.owner.login}/${repo.name}/languages`
      )

      if (!response.ok) return {}

      return response.json()
    })
  )

  for (const languages of languageResponses) {
    for (const [language, bytes] of Object.entries(languages)) {
      languageCount[language] = (languageCount[language] || 0) + bytes
    }
  }

  return languageCount
}
