module.exports = {  
 isVerified: (key) => {
    if(process.env.REACT_APP_API_SECRET === key) {
        return true;
    } else {
        return false;
    }
 }
}