#include "../include/iBeaconFinder.hpp"

iBeaconFinder::iBeaconFinder() {

}

void iBeaconFinder::scan() {
    for (auto& badge : m_BadgeMap) {
        badge.second.TTL--;
    }
    int count = BLE.scan(m_ScanResults, MAX_SCAN_RESULT);
    for(int i = 0; i < count; i++) {
        uint8_t buf[BLE_MAX_ADV_DATA_LEN];
        if (m_ScanResults[i].advertisingData.customData(buf, sizeof(buf)) == 25) {
            if (buf[0] == 0x4c && buf[1] == 0x00 && buf[2] == 0x02 && buf[3] == 0x15) {
                BadgeData badge;
                badge.id.data.major = buf[20] * 256 + buf[21];
                badge.id.data.minor = buf[22] * 256 + buf[23];
                Serial.printlnf("iBeacon found with major %d and minor %d", badge.id.data.major, badge.id.data.minor);
                if(m_BadgeMap.find(badge.id.ID) == m_BadgeMap.end()) {
                    //add and genereate entering event
                    badge.TTL = 3;
                    m_BadgeMap.emplace(badge.id.ID, badge);
                    generateEvent(ENTERED, badge);
                }
                else {
                    m_BadgeMap.at(badge.id.ID).TTL = 3;
                }
            }
        }
    }
    for (auto& badge : m_BadgeMap) {
        if (badge.second.TTL == 0){
            //remove and genereate leave event
            Serial.printlnf("iBeacon lost with major %d and minor %d", badge.first, badge.first);
            generateEvent(LEFT, badge.second);
            m_BadgeMap.erase(badge.first);
        }
    }
}


void iBeaconFinder::generateEvent(Events type, const BadgeData& badgeData){
    String data;
    sprintf(const_cast<char*>(data.c_str()), "{\"major\":%d,\"minor\":%d}", badgeData.id.data.major, badgeData.id.data.minor);
    if(type == LEFT) {
        Particle.publish("badge-left", data, PUBLIC);
    }
    else {
        Particle.publish("badge-entered", data, PUBLIC);
    }
}