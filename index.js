'use strict';

module.exports = createMetamaskWrapper;

function createMetamaskWrapper(options) {
    options = options || {}

    const ACCOUNT_UPDATE_INTERVAL = options.updateInterval || 1000

    var accountUpdated = options.onAccountUpdate

    var accountUpdateIntervalID = -1

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

    function updateAccount(){
        if(isFunction(accountUpdated)){
            accountUpdated(newAccount)
        }
    }

    var isFunction = function(func) {
        return typeof func === 'function'
    }
}