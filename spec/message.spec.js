const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

/* I followed the command.spec example of a missing entry for this test. */
/* Test 4 */
test('throws error if a name is NOT passed into the constructor as the first parameter', function(){
    expect(function() {new Message();}).toThrow(new Error ('Your Message needs a name!'));
});

 /* These next two tests are used to make sure the class is constructing properly.*/
 /* Test 5 */
test('the constructor sets name', function(){
    let testMessage1 = new Message('Jonathan Byers');
    expect(testMessage1.name).toBe('Jonathan Byers');
});
/* Test 6 */
test('contains a commands array passed into the second argument', function(){
    let testCommands = [0, 1, 2, 3];
    let testMessage2 = new Message('Filler Message', testCommands);
    expect(testMessage2.commands).toEqual([0, 1, 2, 3]);
});



});
