/*
 * Project Labo
 * Description:
 * Author:
 * Date:
 */
int g_Counter = 0;
// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  Particle.variable("counter", g_Counter);
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  // The core of your code will likely live here.
  if(g_Counter < 100){
    g_Counter++;
  }
  else
  {
    String c;
    sprintf(const_cast<char *>(c.c_str()),"%d", g_Counter);
    Particle.publish("counter-resetted", c, PRIVATE);
    g_Counter = 0;
  }
  delay(10);
}