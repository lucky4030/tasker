export default function authMiddleWare (history) {
    const authToken = sessionStorage.getItem('AuthToken');
    // console.log(authToken);
    if(authToken === null){
        history.push('/login')
    }
};