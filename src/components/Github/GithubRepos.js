import React from 'react'
import classes from './Github.scss'

export const GithubRepos = (props) => {
    let repos = props.repos.repos.map(r => {
        return (
            <li>{r.name}</li>
        );
    });
    console.log("props", props, repos);

    return (
        <div>asdasdad
            <ul>
            {repos}
            </ul>
        </div>
    );
}
export default GithubRepos
