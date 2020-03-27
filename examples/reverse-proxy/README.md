# Reverse Proxy Example

This example shows a *reverse proxy* taking care of SSO, then passing in the header of the request the SSO object to the *target server*.

## Warning

If the SSO object is too big, you may have an HTTP error 431 (Header too big).

It is up to you to reduce the SSO object size if needed by taking only the important fields.

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>

