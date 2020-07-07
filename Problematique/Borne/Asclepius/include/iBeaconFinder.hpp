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

enum Events {
    LEFT,
    ENTERED
};

class iBeaconFinder {
private:
    static const size_t MAX_SCAN_RESULT = 10;
    BleScanResult m_ScanResults[MAX_SCAN_RESULT];

    std::map<uint32_t, uint8_t> m_BadgeMap;

    void generateEvent(Events type, uint32_t id);
public:
    iBeaconFinder();

    void scan();
};

#endif // IBEACONFINDER_HPP