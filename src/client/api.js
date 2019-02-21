import axios from 'axios';

export default function fetchPopularRepos(language = 'all') {
    const encodedURI = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`;

    return axios.get(encodedURI).then(res => res.data.items);
}