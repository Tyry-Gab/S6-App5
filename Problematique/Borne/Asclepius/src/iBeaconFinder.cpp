#include "../include/iBeaconFinder.hpp"

iBeaconFinder::iBeaconFinder() {

}

void iBeaconFinder::scan() {
    int count = BLE.scan(m_ScanResults, MAX_SCAN_RESULT);
    for(int i = 0; i < count; i++) {
        uint8_t buf[BLE_MAX_ADV_DATA_LEN];
        if (m_ScanResults[i].advertisingData.customData(buf, sizeof(buf)) == 25) {
            if (buf[0] == 0x4c && buf[1] == 0x00 && buf[2] == 0x02 && buf[3] == 0x15) {
                int major = buf[20] * 256 + buf[21];
                int minor = buf[22] * 256 + buf[23];
                Serial.printlnf("iBeacon found with major %d and minor %d", major, minor);
            }
        }
    }
}