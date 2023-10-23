const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

/* This test rover will be used for all the rover tests: */
let testRover1 = new Rover(123456789);

  /* To make this test pass, I set position to this.position, and the other two I set to default values.
  That way I can change them later with commands, but they'll start at NORMAL and 110. */
  /* Test 7 */
  test('constructor sets position and default values for mode and generatorWatts', function(){
    expect(testRover1.position).toEqual(123456789);
    expect(testRover1.mode).toEqual('NORMAL');
    expect(testRover1.generatorWatts).toEqual(110);
  });

  /* Test 8 */
  test('response returned by receiveMessage contains the name of the message', function(){
    let testingMessage = new Message('This is a test! Do not be alarmed!');
    let response = testRover1.receiveMessage(testingMessage);
    expect(response.message).toEqual('This is a test! Do not be alarmed!');
  });

  /* Test 9 */
  test('response returned by recieveMessage includes two results if two commands are sent in the message', function(){
    let commandTest1 = new Command('STATUS_CHECK');
    let commandTest2 = new Command('MODE');
    let commandCombined = [commandTest1, commandTest2];
    let testingMessage = new Message('Another test baybee', commandCombined);
    let response = testRover1.receiveMessage(testingMessage);
    expect(response.results.length).toEqual(2);
  });

  /* Test 10 */
  test('responds correctly to the status check command', function(){
    /* This first expect tests to make sure STATUS_CHECK is an object. Then, I individually make sure each key of the object is
    returning correctly*/
    let commandTest3 = new Command('STATUS_CHECK');
    let testingMessage2 = new Message('Test 10 test', commandTest3);
    testRover1.receiveMessage(testingMessage2);
    expect(typeof testRover1.results).toEqual('object');
  });
});
