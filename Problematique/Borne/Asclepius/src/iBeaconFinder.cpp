#include "../include/iBeaconFinder.hpp"

iBeaconFinder::iBeaconFinder() {

}

void iBeaconFinder::scan() {
    for (auto& badge : m_BadgeMap) {
        badge.second--;
    }
    int count = BLE.scan(m_ScanResults, MAX_SCAN_RESULT);
    for(int i = 0; i < count; i++) {
        uint8_t buf[BLE_MAX_ADV_DATA_LEN];
        if (m_ScanResults[i].advertisingData.customData(buf, sizeof(buf)) == 25) {
            if (buf[0] == 0x4c && buf[1] == 0x00 && buf[2] == 0x02 && buf[3] == 0x15) {
                BadgeID id;
                id.data.major = buf[20] * 256 + buf[21];
                id.data.minor = buf[22] * 256 + buf[23];
                Serial.printlnf("iBeacon found with major %d and minor %d", id.data.major, id.data.minor);
                if(m_BadgeMap.find(id.ID) == m_BadgeMap.end()) {
                    //add and genereate entering event
                    m_BadgeMap.emplace(id.ID, 3);
                    generateEvent(ENTERED, id.ID);
                }
                else {
                    m_BadgeMap.at(id.ID) = 3;
                }
            }
        }
    }
    for (auto& badge : m_BadgeMap) {
        if (badge.second == 0){
            //remove and genereate leave event
            Serial.printlnf("iBeacon lost with major %d and minor %d", badge.first, badge.first);
            generateEvent(LEFT, badge.first);
            m_BadgeMap.erase(badge.first);
        }
    }
}


void iBeaconFinder::generateEvent(Events type, uint32_t id){
    String data;
    sprintf(const_cast<char*>(data.c_str()), "{\"major\":%d,\"minor\":%d}", id, id);
    if(type == LEFT) {
        Particle.publish("badge-left", data, PUBLIC);
    }
    else {
        Particle.publish("badge-entered", data, PUBLIC);
    }
}