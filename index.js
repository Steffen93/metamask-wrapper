'use strict';

module.exports = createMetamaskWrapper;

function createMetamaskWrapper(options) {
    options = options || {}

    // variables

    const ACCOUNT_UPDATE_INTERVAL = options.updateInterval || 1000

    var accountUpdated = options.onAccountUpdate

    var accountUpdateIntervalID = -1

    // "public" functions

    var stopAccountUpdateListener = function(){
        if(accountUpdateIntervalID >= 0){
            clearInterval(accountUpdateIntervalID)
        }
    }

    var startAccountUpdateListener = function(){
        if(accountUpdateIntervalID >= 0){
            stopAccountUpdateListener()
        }
        accountUpdateIntervalID = setInterval(function(){
            updateAccount();
        },ACCOUNT_UPDATE_INTERVAL)
    }

    return {
        stopAccountUpdateListener: stopAccountUpdateListener
    }

    // "private" functions

    function updateAccount(){
        if(isFunction(accountUpdated)){
            accountUpdated(newAccount)
        }
    }

    function isFunction(func) {
        return typeof func === 'function'
    }
}