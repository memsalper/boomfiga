export const GET_REPOS = 'my-awesome-app/repos/LOAD';
export const GET_REPOS_SUCCESS = 'my-awesome-app/repos/LOAD_SUCCESS';
export const GET_REPOS_FAIL = 'my-awesome-app/repos/LOAD_FAIL';

export const GET_REPO_INFO = 'my-awesome-app/repos/INFO';
export const GET_REPO_INFO_SUCCESS = 'my-awesome-app/repos/INFO_SUCCESS';
export const GET_REPO_INFO_FAIL = 'my-awesome-app/repos/INFO_FAIL';

export const GET_MOVIE = 'GET_MOVIE';
export const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
export const GET_MOVIE_FAIL = 'GET_MOVIE_FAIL';



export const GET_FILMS = 'GET_FILMS';
export const GET_FILMS_SUCCESS = 'GET_FILMS_SUCCESS';
export const GET_FILMS_FAIL = 'GET_FILMS_FAIL';

export const GET_SERIES = 'GET_SERIES';
export const GET_SERIES_SUCCESS = 'GET_SERIES_SUCCESS';
export const GET_SERIES_FAIL = 'GET_SERIES_FAIL';

export const GET_DENEME = 'GET_DENEME';

export const GET_MOVIEID = "GET_MOVIEID";
export const GET_MOVIEID_SUCCESS = 'GET_MOVIEID_SUCCESS';
export const GET_MOVIEID_FAIL = 'GET_MOVIEID_FAIL';

export const GET_SERIESID = "GET_SERIESID";
export const GET_SERIESID_SUCCESS = 'GET_SERIESID_SUCCESS';
export const GET_SERIESID_FAIL = 'GET_SERIESID_FAIL';

export const ADD_FRIENDS_INACTIVITY = "ADD_FRIENDS_INACTIVITY";
export  const DELETE_FRIENDS_INACTIVITY="DELETE_FRIENDS_INACTIVITY";

const initialState = { repos: [], repoInfo: {}, user: {}, series: {} , deneme: false, id:{}, friendsInActivity:[], films:[]};

const apiKey ="d6dfda7af1f3d311993806acc155757d";
const language ="tr-TR";

const apiKeyBooks="nt9xhMKGVAw7l0m5aMOn2Q";

/*key: nt9xhMKGVAw7l0m5aMOn2Q
secret: lbSgBeMPe1VEjKMcwLS9HKu6QEQ2KY4XrDJuLNY28M*/

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FRIENDS_INACTIVITY:
            return {...state, friendsInActivity: state.friendsInActivity.concat({
                    processId: action.payload.processId,
                    username: action.payload.username
                })};

        case DELETE_FRIENDS_INACTIVITY:
            return {...state, friendsInActivity: state.friendsInActivity.filter( activity=> action.payload.username !== activity.username && action.payload.processId !== activity.processId )};
        case GET_DENEME:
            return {...state, deneme: action.payload};
        case GET_REPOS:
            return { ...state, loading: true };
        case GET_REPOS_SUCCESS:
            return { ...state, loading: false, repos: action.payload.data };
        case GET_REPOS_FAIL:
            return { ...state, loading: false, error: 'Error getting repos info' };
        case GET_REPO_INFO:
            return { ...state, loadingInfo: true };
        case GET_REPO_INFO_SUCCESS:
            return { ...state, loadingInfo: false, repoInfo: action.payload.data };
        case GET_REPO_INFO_FAIL:
            console.log(action.payload);
            return {
                ...state,
                loadingInfo: false,
                errorInfo: 'Error getting repo info'
            };

        case GET_SERIES:
            return { ...state, loadingProfile: true };
        case GET_SERIES_SUCCESS:
            if (Array.isArray(action.payload.data.results) &&  action.payload.data.results.length){
                return { ...state, loadingProfile: false, visibleS:true, series: action.payload.data.results };
            }else
                return { ...state, loadingProfile: false, visibleS:false, series: action.payload.data.results };

        case GET_SERIES_FAIL:
            return {
                ...state,
                loadingProfile: false,
                errorUser: 'Error getting user info'
            };
        case GET_MOVIE:
            return { ...state, loadingProfile: true };
        case GET_MOVIE_SUCCESS:
            if (Array.isArray(action.payload.data.results) &&  action.payload.data.results.length){
                return { ...state, loadingProfile: false, visibleM:true, user: action.payload.data.results };
            }else
                return { ...state, loadingProfile: false, visibleM:false, user: action.payload.data.results };
        case GET_MOVIE_FAIL:
            return {
                ...state,
                loadingProfile: false,
                errorUser: 'Error getting user info'
            };


        case GET_MOVIEID:
            return { ...state, loadingProfile: true };
        case GET_MOVIEID_SUCCESS:
                return { ...state, loadingProfile: false, id: action.payload.data };
        case GET_MOVIEID_FAIL:
            return {
                ...state,
                loadingProfile: false,
                errorUser: 'Error getting user info'
            };


        case GET_SERIESID:
            return { ...state, loadingProfile: true };
        case GET_SERIESID_SUCCESS:
            return { ...state, loadingProfile: false, id: action.payload.data };
        case GET_SERIESID_FAIL:
            return {
                ...state,
                loadingProfile: false,
                errorUser: 'Error getting user info'
            };
        default:
            return state;
    }


    //debugger;
}

export function listRepos(user) {
    return {
        type: GET_REPOS,
        payload: {
            request: {
                url: `/users/${user}/repos`
            }
        }
    };
}

export function getRepoDetail(user, repo) {
    return {
        type: GET_REPO_INFO,
        payload: {
            request: {
                url: `/repos/${user}/${repo}`
            }
        }
    };
}

export function getMovie(user) {
    return {
        type: GET_MOVIE,
        payload: {
            request: {
                url: `/search/movie?api_key=${apiKey}&query=`+user
            }
        }
    };
}


export function getSeries(user) {
    return {
        type: GET_SERIES,
        payload: {
            request: {
                url: `/search/tv?api_key=${apiKey}&query=`+user
            }
        }
    };
}

export function getMovieId(id) {
    return {
        type: GET_MOVIEID,
        payload: {
            request: {
                url: `/movie/${id}?api_key=${apiKey}&language=`+language
            }
        }
    };
}

export function getSeriesId(id) {
    return {
        type: GET_SERIESID,
        payload: {
            request: {
                url: `/tv/${id}?api_key=${apiKey}&language=`+language
            }
        }
    };
}

export function getDeneme(deneme) {
    return {
        type: GET_DENEME,
        payload: deneme
    };
}

export function addFriendsInActivity(username, processId) {
    return {
        type: ADD_FRIENDS_INACTIVITY,
        payload:{
            username:username,
            processId:processId,
        }
    };
}

export function deleteFriendsInActivity(username, processId) {
    return {
        type: DELETE_FRIENDS_INACTIVITY,
        payload:{
            username:username,
            processId:processId,
        }
    };
}

