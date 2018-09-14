# An LRU Cache implemented with Javascript

Usage:  
Create using **new LRUCache(capacity,init)**  

Members:  
**size**  
**capacity**  
**cache**  
**delete**  

Example:  
var store = new LRUCache(3 /* Size of the cache */, {a: 1}/*Optional initial values for cache*/ );  
store.size; //1  
store.capacity; //3  
store.a; //1;  
store.cache('b', 2)['b']; //2  
store.a = 5;  