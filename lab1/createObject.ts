import {DataStructureCommonInterface} from './common'

export function createObject(length: number): DataStructureCommonInterface {
    const object = {}
    for (let i = 0; i < length; i++) {
        let val = Math.floor(Math.random() * 100);
        object[val] = true;
    }

    return {
        getLength() {
           return Object.keys(object).length;
        },
        getByIndex(i) {
            //return Object.keys(object)[i] getByIndex ожидает number
            return 1
        },
        setByIndex(i, v) {
            object[i] = v //???
        },
        contains(element) {
            return object[element] == true;
        },
        deleteFirst(element) {
            object[element] = false;
        },
        insert(element) {
            object[element] = true;
        }
    }
}
