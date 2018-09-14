function LRUCache(capacity, init) {
    var internalList = [];
    defineProperty(this, 'size', null, function() {
        return Object.keys(this).length;
    }, undefined);
    defineProperty(this, 'capacity', null, function() {
        return capacity;
    }, function(newVal) {
        capacity = newVal;
        onCapacityChange(this, newVal, internalList)
    });
    defineProperty(this, 'delete', key => {
        if (internalList.indexOf(key) > -1)
            internalList.splice(internalList.indexOf(key), 1);
        return delete this[key];
    });

    defineProperty(this, 'cache', (key, value) => {
        if (this.capacity === this.size)
            this.delete(internalList[internalList.length - 1]);
        defineProperty(this, key, null, () => {
            updateInternalList(internalList, key);
            return value;
        }, function(val) {
            value = val;
        }, true, true, true);
        updateInternalList(internalList, key);
        return this;
    });

    for (prop in init)
        this.cache(prop, init[prop]);

}

function defineProperty(obj, key, value, getter, setter, isEnumerable, isConfigurable, isWriteable) {
    var defObj = {
        enumerable: !!isEnumerable,
        configurable: !!isConfigurable,
        writeable: !!isWriteable
    };
    if (value !== null) {
        defObj.value = value;
    } else {
        defObj.get = getter;
        defObj.set = setter;
    }
    Object.defineProperty(obj, key, defObj);
}


function onCapacityChange(obj, newCapValue, internalList) {
    var objLength = Object.keys(obj).length;
    if (newCapValue > objLength)
        return;
    for (i = 0; i < objLength - newCapValue; i++) {
        obj.delete(internalList[internalList.length - 1 - i]);
    }
}

function updateInternalList(internalList, key) {
    if (internalList.indexOf(key) !== -1)
        internalList.splice(internalList.indexOf(key), 1);
    internalList.unshift(key);
}