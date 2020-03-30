import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const  AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = "LOUGOUT";

export const authenticate = (userId , token) =>{
    return {type : AUTHENTICATE , userId:userId , token : token};
}

export const signup = (email, name ,password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOmyTcetNH-6dDz9-G867pgd4Uo_cOIr0',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    name:name,
                    password: password,
                    returnSecureToken: true
                })
            }
        );
        if (!response.ok) {
            const errorResData = await response.json();
            const errorID = errorResData.error.message;
            const message = 'Somethig went wrong!';
            if (errorID == 'EMAIL_EXISTS') {
                message = 'this email exits already!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId , resData.idToken));
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOmyTcetNH-6dDz9-G867pgd4Uo_cOIr0',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
            throw new Error(message);
        }


        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId , resData.idToken));
        const expirationDate = new Date( new Date().getTime() + parseInt(resData.expiresIn) * 1000 );
        saveDataToStorage(resData.idToken , resData.localId , expirationDate);
    };
};

export const logout = () => {
    return{type: LOGOUT};
}

const saveDataToStorage = (token, userId , expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate : expirationDate.toISOString()
        })
    );
}