/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "Particle.h"
#line 1 "/home/casto/git/Sherbrooke/APPs/S6-App5/Problematique/Borne/Asclepius/src/Asclepius.ino"
/* App5 S6 
 * Fait par: -Thierry Constantin (cont3301)
 *           -Gabriel Lessard    (lesg2605)
 */


// setup() runs once, when the device is first turned on.
void setup();
void loop();
#line 8 "/home/casto/git/Sherbrooke/APPs/S6-App5/Problematique/Borne/Asclepius/src/Asclepius.ino"
void setup() {
  // Put initialization like pinMode and begin functions here.
  Serial.begin(9600);
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  // The core of your code will likely live here.
  Serial.printlnf("Stuff");
  delay(100);
}