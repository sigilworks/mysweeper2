/**
 * Created by tj on 1/7/17.
 */
'use strict';

// keep our delegate key private from external access
// (workaround for Symbol since Safari is behind the times...)
const _entries = typeof Symbol == "undefined" ? (':' + (+new Date)) : Symbol();

// Javascript equivalent of Java's Map<Object, Set<Object>>
export class SetMultimap {
    constructor() {
        this[_entries] = new Map;
    }

    clear() {
        this[_entries].clear();
        return this;
    }

    containsEntry(key, value) {
        if (this[_entries].has(key))
            return this[_entries].get(key).has(value);
        return false;
    }

    containsKey(key) {
        return this[_entries].has(key);
    }

    entries() {
        return this[_entries].entries();
    }

    get(key) {
        return this[_entries].get(key);
    }

    isEmpty() {
        return this[_entries].size === 0;
    }

    keys() {
        return this[_entries].keys();
    }

    put(key, value) {
        if (this[_entries].has(key))
            this[_entries].get(key).add(value);
        else {
            let set = new Set;
            set.add(value);
            this[_entries].set(key, set);
        }
        return this;
    }

    putAll(key, values) {
        let set = this[_entries].has(key) ? this[_entries].get(key) : new Set;
        values = Array.isArray(values) ? values : [values];
        values.forEach(value => set.add(value));
        this[_entries].set(key, set);
        return this;
    }

    remove(key, value) {
        if (this[_entries].has(key)) {
            let set = this[_entries].get(key);
            set.delete(value);
        }
        return this;
    }

    removeAll(key) {
        this[_entries].delete(key);
        return this;
    }

    replaceValues(key, values) {
        if (this[_entries].has(key)) {
            let set = new Set;
            values = Array.isArray(values) ? values : [values];
            values.forEach(value => set.add(value));
            this[_entries].set(key, set);
        } else
            this.putAll(key, values);
        return this;
    }

    // returns keys having `value` assigned to them
    findKeys(value) {
        let keys = [];
        for (let entry of this[_entries].entries()) {
            let [ key, set ] = entry;
            if (set.has(value))
                keys.push(key);
        }
        return keys;
    }

    size() {
        return this[_entries].size;
    }

    values() {
        let valueSet = new Set;
        for (let set of this[_entries].values()) {
            for (let entry of set)
                valueSet.add(entry);
        }
        return valueSet;
    }

    toJSON() {
        let entriesIterator = this.entries(),
            ret = {};
        for (let entry of entriesIterator) {
            let id = entry[0],
                set = entry[1],
                setValues = [];
            set.forEach(entry => setValues.push(entry));
            ret[id] = setValues;
        }
        return ret;
    }

    get [Symbol.toStringTag]() {
        return 'SetMultimap';
    }
}
