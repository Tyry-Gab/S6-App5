/* App5 S6 
 * Fait par: -Thierry Constantin (cont3301)
 *           -Gabriel Lessard    (lesg2605)
 */

#include "../include/iBeaconFinder.hpp" 

iBeaconFinder beaconFinder;

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  Serial.begin(9600);
  BLE.begin();

}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  beaconFinder.scan();
  delay(100);
}
