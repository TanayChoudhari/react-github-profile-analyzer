function cappedScore(value, maximum, weight) {
  return Math.min(Number(value) / maximum, 1) * weight
}

function getRepositorySignals(repositories) {
  return repositories.reduce((signals, repository) => ({
    stars: signals.stars + repository.stargazers_count,
    forks: signals.forks + repository.forks_count,
    size: signals.size + repository.size,
  }), { stars: 0, forks: 0, size: 0 })
}

export function calculateProfileScore({ profile, repositories, starredRepositories, languageCount }) {
  const repositorySignals = getRepositorySignals(repositories)
  const languageBytes = Object.values(languageCount).reduce((total, bytes) => total + bytes, 0)
  const topicCount = new Set(starredRepositories.flatMap((repository) => repository.topics || [])).size
  const hasProfileDetails = [profile.bio, profile.location, profile.company, profile.blog].filter(Boolean).length

  const completenessScore = cappedScore(hasProfileDetails, 4, 12.5) + (profile.avatar_url ? 2.5 : 0)
  const communityScore = cappedScore(Math.log10(profile.followers + 1), 4, 15) + cappedScore(profile.public_gists, 20, 5) + cappedScore(profile.following, 100, 5)
  const repositoryScore = cappedScore(profile.public_repos, 50, 10) + cappedScore(Math.log10(repositorySignals.stars + 1), 4, 10) + cappedScore(Math.log10(repositorySignals.forks + 1), 3, 5)
  const technicalScore = cappedScore(Object.keys(languageCount).length, 8, 10) + cappedScore(Math.log10(languageBytes + 1), 8, 10)
  const explorationScore = cappedScore(starredRepositories.length, 50, 10) + cappedScore(topicCount, 10, 5)

  return Math.round(Math.min(
    completenessScore + communityScore + repositoryScore + technicalScore + explorationScore,
    100
  ))
}
