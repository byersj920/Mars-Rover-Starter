const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {
/* Test 1 */
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  /* For these two tests, I made a dummy value to put into both arguments in the constructor. Meaning it should spit out
   the correcct dummy value */
   /* Test 2 */
  test ('constructor sets command type', function(){
    let testCommand1 = new Command('testType');
    expect(testCommand1.commandType).toBe('testType');
  });

  /* Test 3 */
  test ('constructor sets a value passed in as the 2nd argument', function(){
    let testCommand2 = new Command('nonesense', 'testValue');
    expect (testCommand2.value).toBe('testValue');
  });

});