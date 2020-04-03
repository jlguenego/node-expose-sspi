#include <string>
#include <Activeds.h>

namespace myADSI {
std::string GetErrorMessage(HRESULT hr);
std::string GetADSIError(HRESULT hr);
}  // namespace myADSI