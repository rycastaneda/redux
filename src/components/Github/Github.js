import React from 'react'
import GithubRepos from './GithubRepos'
import classes from './Github.scss'

export const Github = (props) => {
  console.log("props view", props);
  const { fetchRepos, github} = props

  return (
  <div>
    <button onClick={fetchRepos}>LOAD</button>
    <GithubRepos repos={github || []} />
  </div>
);
}

Github.propTypes = {
  repos: React.PropTypes.array.isRequired,
  user: React.PropTypes.string.isRequired,
  fetchRepos: React.PropTypes.func.isRequired,
}

export default Github
