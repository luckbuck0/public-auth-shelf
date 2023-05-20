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

function* addItemToShelf(action) {
    try {
        const response = yield axios.post('/api/shelf', action.payload)
        yield put({type: 'FETCH_SHELF'})
    } catch (error) {
        console.log('Error inside addItemToShelf saga function:', error);
    }
}

function* updateShelfItem(action){
    try{
        const response = yield axios.put('/api/shelf/${action.payload.id}',action.payload)
        yield put({type:'FETCH_SHELF'}) 
    } catch (error) {
        console.log('whoopsie daisy something is wrong in the update saga ', error);
    }
}

function* deleteItemFromShelf(action) {
    try {
        yield axios.delete(`/api/shelf/${action.payload}`);
        yield put({ type: 'FETCH_SHELF' });
    } catch (error) {
        console.error(`Error deleting shelf item in ${deleteItemFromShelf.name}:`, error);
    }
}

export default function* shelfSaga() {
    yield takeLatest('FETCH_SHELF', fetchShelf);
    yield takeLatest('ADD_ITEM_TO_SHELF', addItemToShelf);
    yield takeLatest('UPDATE_SHELF_ITEM', updateShelfItem);
    yield takeLatest('DELETE_ITEM_FROM_SHELF', deleteItemFromShelf);
}
