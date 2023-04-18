async function getGithubProfile(username) {
  const url = `https://api.github.com/users/${username}`
  return await fetch(url).then(res => res.json())
};

export default getGithubProfile;
