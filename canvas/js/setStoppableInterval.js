let intervalIDS = [];


/**
* Creates Intervals and push them in an array
* @param {function} fn 
* @param {number} time 
*/
function setStoppableInterval(fn, time) {
    let id =  setInterval(fn, time);
    intervalIDS.push(id);
}
 
 /**
 * stop all stoppable Intervals
 */
  function stopInterval() {
    intervalIDS.forEach(clearInterval);
}

