class Rover {
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(Message){
      let receivedMessage = {
         message: Message.name,
         results: []
      };
      for (let i = 0; i < Message.commands.length; i++){
            /* For each command, the code creates a completion object, and sets it to true if it works. Then,
            for the STATUS_CHECK command, it bundles it together into one big ol' object to send back into the results array. */
            if (Message.commands[i].commandType === 'STATUS_CHECK'){
               let roverStatus = {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position};
               let returnedData = {
                  completed: true,
                  roverStatus: roverStatus
               }
                  receivedMessage.results.push(returnedData);

            } else if (Message.commands[i].commandType === 'MOVE'){
               let returnedData2 = {
                  completed: true
               }
               if (this.mode === 'LOW_POWER'){
                  returnedData2['completed'] = false;
               } else{
               this.position = Message.commands[i].value;
               }
               receivedMessage.results.push(returnedData2);
               
            } else if (Message.commands[i].commandType === 'MODE_CHANGE'){
               this.mode = Message.commands[i].value;
               let returnedData3 = {
                  completed: true
               }
               receivedMessage.results.push(returnedData3);
            } else {
               receivedMessage.results.push('TEST TEST TEST');
            }
          }
      return receivedMessage;
   };
}

module.exports = Rover;