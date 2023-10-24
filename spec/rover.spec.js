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
    let singleCommand = new Command('STATUS_CHECk');
    let testingMessage = new Message('This is a test! Do not be alarmed!', singleCommand);
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
    /* This test will use the same test Message object from Test 9. It will evaluate if both the completed condition is present
    as well as if the STATUS_CHECK command is an object and also contains the right stuff. */
    let commandTest1 = new Command('STATUS_CHECK');
    let commandTest2 = new Command('MODE_CHANGE');
    let commandCombined = [commandTest1, commandTest2];
    let testingMessage = new Message('Another test baybee', commandCombined);
    let response = testRover1.receiveMessage(testingMessage);
    /*Copied Stuff ^*/
    expect(response.results[0].completed).toEqual(true);
    expect(typeof response.results[0].roverStatus).toEqual('object');
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.position).toEqual(123456789);
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
  });

/* Test 11 */
  test('responds correctly to the mode change command', function(){
    /* This test will use the same test Message as the previous two, but will give the MODE_CHANGE command a value this time. */
    let commandTest1 = new Command('STATUS_CHECK');
    let commandTest2 = new Command('MODE_CHANGE', 'LOW_POWER'); /* <- Testing this! */
    let commandCombined = [commandTest1, commandTest2];
    let testingMessage = new Message('Another test baybee', commandCombined);
    let response = testRover1.receiveMessage(testingMessage);
    /* Mostly copied stuff ^ */
    expect(response.results[0].completed).toEqual(true);
    expect(testRover1.mode).toEqual('LOW_POWER');
});

/* Test 12 */
test('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
  /* In this test, testRover is still in LOW_POWER mode from test 11. So it should NOT be able to move. */
  let commandTest1 = new Command('MOVE', 987654321);
  let testingMessage = new Message('Movement Test', commandTest1);
  let response = testRover1.receiveMessage(testingMessage);
  expect(testRover1.mode).toEqual('LOW_POWER');
  expect(response.results[0].completed).toEqual(false);
});

});
