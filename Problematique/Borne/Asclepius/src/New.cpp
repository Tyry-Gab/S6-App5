/* App5 S6 
 * Fait par: -Thierry Constantin (cont3301)
 *           -Gabriel Lessard    (lesg2605)
 */

#include "../include/New.hpp"
#include <stdlib.h>


/*******************************************************************/
void* operator new(size_t size, void* ptr) {
    return ptr;
}  /* operator new (size_t, void*) */


