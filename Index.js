"use strict";

var Alexa = require("alexa-sdk");

const SKILL_NAME = 'beauty barometer';

const HELP_MESSAGE = 'This skill can tell you whether a beauty brand is cruelty free or not. Cruelty entails testing on animals. Just say "Alexa, Open Beauty Barometer", and then tell me the brand name. For example, Urban Decay.';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Hope I could help! Goodbye!';

const CF_MESSAGE = "It's cruelty free! Woohoo!";
const NCF_MESSAGE = "Unfortunately, that is not cruelty free.";


var BRAND_LIST = ['anastasia beverly hills', 'too faced', 'benefit', 'mac', 'colour pop', 'maybelline', 'cover girl', 'elf'];
var CRUELTY_COEFFICIENT = ['Y', 'Y', 'N', 'N', 'Y', 'N', 'N', 'Y'];


var handlers = {
  'LaunchRequest': function() {
    this.response.speak('Welcome to Beauty Barometer. I can tell you whether a beauty brand is cruelty free or not. What brand are you curious about?').listen("Tell me what brand you're curious about.");
    this.emit(':responseReady');
  },

    'CrueltyTestIntent': function () {
        const factArr = BRAND_LIST;
        const speechOutput1 = CF_MESSAGE;
        const speechOutput2 = NCF_MESSAGE;
        
        // listen for response
        // map response onto index in BRAND - make it x
        var x = BRAND_LIST.indexOf(this.event.request.intent.slots.brand.value)
        
        
        // if CRUELTY_COEFFICIENT[x] = Y, then 
        // CF MESSAGE
        // response ready
        
        if (CRUELTY_COEFFICIENT[x] === "Y") {
        this.response.speak(CF_MESSAGE);
        this.emit(':responseReady');
}
        // elseif
        // play NCF MESSAGE
        // response ready
        
        else if (CRUELTY_COEFFICIENT[x] === "N") {
        this.response.speak(NCF_MESSAGE);
        this.emit(':responseReady');
}
        
        // else, (if not found)
        // say not found, prompt again
        // response ready
        else {
        this.response.speak("I'm sorry, I couldn't find that brand. Could you say it again, slowly?").listen("Tell me what brand you're curious about.");
        this.emit(':responseReady');
    }
},

 

'AMAZON.FallbackIntent': function () {
     const speechOutput = STOP_MESSAGE;
     this.emit(':tell', speechOutput);
},

'AMAZON.NavigateHomeIntent': function () {
    this.emit('SessionEndRequest');
},
 
 
'AMAZON.CancelIntent': function () {
    this.emit('SessionEndRequest');
},

'AMAZON.StopIntent': function () {
    this.emit('SessionEndRequest');
},

'EndSessionIntent': function () {
    this.emit('SessionEndRequest');
},


'SessionEndRequest': function() {
    const speechOutput = STOP_MESSAGE;

    this.emit(':tell', speechOutput);
},

'Unhandled': function () {
     const speechOutput = STOP_MESSAGE;
     this.emit(':tell', speechOutput);
},

'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },

'AMAZON.StartOverIntent': function() {
        this.toIntent('LaunchRequest');
    }


};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
