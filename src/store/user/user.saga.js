import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import { signInFailed, signInSuccess, signUpSuccess, signOutFailed, signOutSuccess } from "./user.action";

import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch(err) {
        yield put(signInFailed(err))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield call(signInWithGooglePopup)
        yield call(getSnapShotFromUserAuth, user)
    } catch(err){
        yield put(signInFailed(err))
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try {
        const {user} = yield call(signInUserWithEmailAndPassword, email, password)
        yield call(getSnapShotFromUserAuth, user)
    } catch(err) {
        yield put(signInFailed(err))
    }
}

export function* signUp({payload: {email, password, displayName}}){
    try {
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signUpSuccess(user, {displayName}))
    } catch(err) {
        yield put(signInFailed(err))
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
    yield call(getSnapShotFromUserAuth, user, additionalDetails)
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield call(getCurrentUser)
        if(!userAuth) return
        yield call(getSnapShotFromUserAuth, userAuth)
    } catch(err){
        yield put(signInFailed(err))
    }
}

export function* signOut(){
    try {
        yield call(signOutUser)
        yield put(signOutSuccess())
    } catch(err) {
        yield put(signOutFailed(err))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)])
}