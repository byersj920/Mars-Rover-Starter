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

      /* Sometimes, there can be only one command in a message. Meaning instead of an array of commands, the Message.commands key
      could contain a single string. Meaning, the sortingArray won't be able to sort it properly. By using a try catch block,
      I'll be able to have the program function one way if there's multiple commands, and another way if there's just one! */
      let sortingArray = Message.commands;
      try {
         for (let i = 0; i < sortingArray.length; i++){
            if (sortingArray[i] === 'STATUS_CHECK'){
               receivedMessage.results.push('First Item!');
            } else if (sortingArray[i] === 'MOVE'){
               receivedMessage.results.push('New Object!');
            } else if (sortingArray[i] === 'MODE_CHANGE'){
               receivedMessage.results.push('NEw OBJECETE');
            } else {
               receivedMessage.results.push('TEST TEST TEST');
            }
          }
          } catch(err){
            if (Message.commands === 'STATUS_CHECK'){
               receivedMessage.results.push('First Item!');
            } else if (Message.commands === 'MOVE'){
               receivedMessage.results.push('New Object!');
            } else if (Message.commands === 'MODE_CHANGE'){
               receivedMessage.results.push('NEw OBJECETE');
            } else {
               receivedMessage.results.push('TEST TEST TEST');
            }
          }
      return receivedMessage;
   };
}


module.exports = Rover;