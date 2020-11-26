import React, { Fragment, useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom'
import GithubContext from "../../context/github/githubContext";

const User = ({match}) => {
    const githubContext = useContext(GithubContext);
    const {user, loading, repos, getUser, getRepos} = githubContext;

    useEffect(() => {
        getUser(match.params.username);
        getRepos(match.params.username);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        company,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;

    if (loading) return <Spinner/>

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>Back To Search</Link>

            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="round-img" alt="" style={{width: '150px'}}/>
                    <h1>{name}</h1>
                    <p>{location}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>

                    <ul>
                        <li>
                            {login &&
                            <Fragment>
                                <strong>Username: </strong> {login}
                            </Fragment>}
                        </li>
                        <li>
                            {login &&
                            <Fragment>
                                <strong>Company: </strong> {company}
                            </Fragment>}
                        </li>
                        <li>
                            {login &&
                            <Fragment>
                                <strong>Website: </strong> {blog}
                            </Fragment>}
                        </li>
                        <li>
                            {login &&
                            <Fragment>
                                <strong>Hireable: </strong> {hireable ? <i className="fas fa-check text-sucess"/> : <i className="fas fa-times-circle text-danger"/>}
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos}/>
        </Fragment>
    )
}

export default User