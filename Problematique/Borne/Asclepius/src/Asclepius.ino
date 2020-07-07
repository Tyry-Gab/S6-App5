/* App5 S6 
 * Fait par: -Thierry Constantin (cont3301)
 *           -Gabriel Lessard    (lesg2605)
 */

#include "../include/iBeaconFinder.hpp" 

iBeaconFinder beaconFinder;

int setDEL(String state) {
  if (state == "on")
    pinSetFast(D7);
  else if (state == "off")
    pinResetFast(D7);
  else
    Serial.println("Fonction setDEL avec mauvais argument:" + state);
  return 1;
}

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  pinMode(D7, OUTPUT); // DEL
  Serial.begin(9600);
  BLE.begin();
  if (Particle.function("setDEL", setDEL))
    Serial.println("Fonction setDEL a ete exposee sur le cloud.");
  else  
    Serial.println("Fonction setDEL n'a pas ete exposee sur le cloud.");  
    
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  beaconFinder.scan();
  delay(100);
}
