#include "Particle.h"

#ifndef IBEACONFINDER_HPP
#define IBEACONFINDER_HPP

class iBeaconFinder {
private:
    static const size_t MAX_SCAN_RESULT = 10;
    BleScanResult m_ScanResults[MAX_SCAN_RESULT];
public:
    iBeaconFinder();

    void scan();
};

#endif // IBEACONFINDER_HPP