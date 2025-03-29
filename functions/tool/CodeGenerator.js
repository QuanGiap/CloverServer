/**
 * Generates a random code as a number.
 * @return {number} A random number between 0 and 99999.
 */
function CodeGenerator() {
  return Math.floor(Math.random() * 100000);
}

module.exports = CodeGenerator;
