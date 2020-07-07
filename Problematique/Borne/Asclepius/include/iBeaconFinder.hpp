#include "Particle.h"

#ifndef IBEACONFINDER_HPP
#define IBEACONFINDER_HPP

#include <map>

struct iBeaconData {
    uint16_t major;
    uint16_t minor;
};

union BadgeID {
    iBeaconData data;
    uint32_t ID;
};

struct BadgeData {
    BadgeID id;
    uint8_t TTL;
};

enum Events {
    LEFT,
    ENTERED
};

class iBeaconFinder {
private:
    static const size_t MAX_SCAN_RESULT = 10;
    BleScanResult m_ScanResults[MAX_SCAN_RESULT];

    std::map<uint32_t, BadgeData> m_BadgeMap;

    void generateEvent(Events type, const BadgeData& badgeData);
public:
    iBeaconFinder();

    void scan();
};

#endif // IBEACONFINDER_HPP