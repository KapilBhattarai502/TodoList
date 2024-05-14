export const extractAccessTokenFromHeaders=(authorisation)=>{
    const splittedValue=authorisation.split(" ");
    const token =splittedValue[1];
    return token;
};