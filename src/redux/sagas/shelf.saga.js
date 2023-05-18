import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchShelf(){
    try{
    const result = yield axios.get('/api/shelf') 
    
        yield put({ type:'SET_SHELF', payload: result.data})

    } catch (error) {
        console.log('whoopsie daisy something is wrong in the axious saga.js file',error);
    }
}


export default function* shelfSaga(){
    yield takeLatest('FETCH_SHELF', fetchShelf)
}

